import { Component, Prop, State, h, Watch, getAssetPath } from '@stencil/core';
import * as L from 'leaflet'

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: getAssetPath('./assets/marker-icon-2x.png'),
  iconUrl: getAssetPath('./assets/marker-icon.png'),
  shadowUrl: getAssetPath('./assets/marker-shadow.png'),
});

type Queue = {
  id: string,
  name: string,
  description: string,
  categories: string[],
  location: {
    latitude: number,
    longitude: number
  },
  images: {
    uri: string
  }[]
};

@Component({
  tag: 'queue-map',
  styleUrl: '../../../node_modules/leaflet/dist/leaflet.css',
  assetsDirs: ['assets'],
  shadow: false,
})
export class QueueMap {
  static readonly queueApiBaseUrl = 'https://queue-api.northbricks.io';
  static readonly centerDefault = "59.334591,18.063240";
  static readonly zoomDefault = 10;
  static readonly parkingIcon = L.icon({
    iconUrl: getAssetPath('./assets/parking-icon.png'),
    iconSize: [34, 48],
    iconAnchor: [16, 48],
    popupAnchor: [0, -51]
  });
  style = {
    height: '100%',
    width: '100%'
  }
  map


  @State() markers: L.Marker[] = [];

  /**
   * Sets the view of the map (geographical center) of the map.
   */
  @Prop() center = QueueMap.centerDefault

  /**
   * Sets the zoom of the map.
   */
  @Prop() zoom = QueueMap.zoomDefault

  /**
   * Select queues to show by specifying a list of comma separated queue IDs.
   */
  @Prop() queues

  @Watch('center')
  watchMove() {
    this.setCenter();
  }

  @Watch('zoom')
  watchZoom() {
    this.setZoom();
  }

  @Watch('queues')
  watchQueues() {
    this.updateMarkers();
  }

  openMarkerPopup = null;
  @Watch('markers')
  watchMarkers(newValue: L.Marker[], oldValue: L.Marker[]) {
    if (this.openMarkerPopup && !this.openMarkerPopup.isPopupOpen()) {
      this.map.removeLayer(this.openMarkerPopup);
      this.openMarkerPopup = null;
    }

    oldValue.forEach((marker) => {
      if (marker.isPopupOpen()) {
        this.openMarkerPopup = marker
      } else {
        this.map.removeLayer(marker);
      }
    })

    newValue.forEach((marker) => {
      if (!this.openMarkerPopup || this.openMarkerPopup.options.queueId != marker.options.queueId) {
        marker.addTo(this.map);
      }
    })
  }

  componentDidLoad() {
    this.setMap();
    this.updateMarkers();
  }

  render() {
    return <div id="map" style={this.style}></div>
  }

  private setMap = () => {
    this.map = L.default.map('map', {
      center: this.getCenterLatLng(),
      zoom: this.zoom
    })
    
    const mapLink = '<a href="https://queue.online">Queue Online</a>';
    L.default.tileLayer(
      'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; ' + mapLink,
        maxZoom: 18,
        noWrap: true
    }).addTo(this.map);

    let _this = this;
    this.map.on('moveend', () => {
      if (!this.queues) {
        _this.updateMarkers();
      }
    });
  }

  private setCenter = () => {
    if (typeof this.center == 'undefined' || !this.center) {
      this.center = QueueMap.centerDefault;
    }
    this.map.panTo(this.getCenterLatLng());
  }

  private getCenterLatLng() {
    return this.center.split(",")
  }

  private setZoom = () => {
    if (typeof this.zoom == 'undefined' || !this.zoom) {
      this.zoom = QueueMap.zoomDefault;
    }
    this.map.setZoom(this.zoom);
  }

  private updateMarkers = async () => {
    if (this.queues) {
      this.markers = (await Promise.all(this.queues.split(',')
        .map(async (queueId) => {
          let response = await fetch(QueueMap.queueApiBaseUrl + '/queue-admin-bff/queues/' + queueId);
          if (!response.ok) {
            console.error(`Could not fetch queue by id ${queueId}. Status: ${response.status}, Error: ${response.statusText}`);
            return;
          }
          return response.json();
        })))
        .filter((queue) => typeof queue != 'undefined' && queue.location)
        .map((queue) => this.toMarker(queue));
    } else {
      let mapLocation = this.map.getBounds();
      let northBound = Math.min(mapLocation.getNorth(), 90);
      let southBound = Math.max(mapLocation.getSouth(), -90);
      let eastBound = Math.min(mapLocation.getEast(), 180);
      let westBound = Math.max(mapLocation.getWest(), -180);
      let response = await fetch(`${QueueMap.queueApiBaseUrl}/queue-admin-bff/queues?locationbias=rectangle%3A${southBound}%2C${westBound}%7C${northBound}%2C${eastBound}`);
      if (!response.ok) {
        console.error(`Could not fetch queue locations. Error: ${response.statusText}`);
        return;
      }
      this.markers = (await response.json()).queues
        .filter(queue => queue.location)
        .map(queue => this.toMarker(queue));
    }
  }

  private toMarker(queue: Queue) {
    let markerOptions: any = {
      title: queue.name,
      queueId: queue.id
    };
    if (queue.categories.indexOf("PARKING") > -1) {
      markerOptions.icon = QueueMap.parkingIcon;
    }

    return L.marker([queue.location.latitude, queue.location.longitude], markerOptions).bindPopup(
      (queue.images && queue.images.length > 0 ? `<img src="${QueueMap.queueApiBaseUrl}${queue.images[0].uri}" style="height:150px;display:block;margin-left:auto;margin-right:auto" /><br />` : '') +
      `<b>${queue.name}</b>` +
      `<p>${queue.description}<br /><a href="https://queue.online">Läs mer</a></p>`
    );
  }
}
