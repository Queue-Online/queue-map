/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
export namespace Components {
    interface QueueMap {
        /**
          * Sets the view of the map (geographical center) of the map.
         */
        "center": string;
        /**
          * Select queues to show by specifying a list of comma separated queue IDs.
         */
        "queues": any;
        /**
          * Sets the zoom of the map.
         */
        "zoom": number;
    }
}
declare global {
    interface HTMLQueueMapElement extends Components.QueueMap, HTMLStencilElement {
    }
    var HTMLQueueMapElement: {
        prototype: HTMLQueueMapElement;
        new (): HTMLQueueMapElement;
    };
    interface HTMLElementTagNameMap {
        "queue-map": HTMLQueueMapElement;
    }
}
declare namespace LocalJSX {
    interface QueueMap {
        /**
          * Sets the view of the map (geographical center) of the map.
         */
        "center"?: string;
        /**
          * Select queues to show by specifying a list of comma separated queue IDs.
         */
        "queues"?: any;
        /**
          * Sets the zoom of the map.
         */
        "zoom"?: number;
    }
    interface IntrinsicElements {
        "queue-map": QueueMap;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "queue-map": LocalJSX.QueueMap & JSXBase.HTMLAttributes<HTMLQueueMapElement>;
        }
    }
}