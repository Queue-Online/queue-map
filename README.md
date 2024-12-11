# queue-map-webcomponent

A web component showing a map with queues. Fetches all public queues or selected queues from the [Queue API](https://queue-api.northbricks.io/queue-admin-bff/queues) and displayus them on a map.

See [demo](https://matsedel.wikman.nu/test/queue-map-webcomponent).

## Run

```sh
npm install
npm start
```

## Create prod build

To build the component for production, run:

```sh
npm run build
```


## Run tests

To run the unit tests for the components, run:

```sh
npm test
```

## Installation

Import the script and add the component in your website.

```html
<head>
  ...
  <-- Import element definition and auto-register -->
  <script type="module" src="queue-map-webcomponent.esm.js"></script>
</head>
<body>
  ...
  <-- Profit! -->
  <queue-map center="59.334591,18.063240" zoom="9"></queue-map>
</body>
```

### Configuration parameters

|  Name  |                           Default value |     Example value |          Description       |
|--------|-----------------------------------------|-------------------|----------------------------|
| center | 59.334591,18.063240 59.334591,18.063240 | See default value | Center of the map to show. |
| zoom   |                                      10 |                10 | Initial map zoom level.    |
| queues |                                    null | 67578195b4447c276cb0828b, 67578195b4447c276cb0828b | Comma separated list of queue id to show on map. If none is specified all public queues will be displayed |
