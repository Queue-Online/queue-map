# Queue Map Web Component

Enhance your website by integrating the Queue Map Web Component, which displays queues on an interactive map, providing users with real-time queue locations and statuses.

## Features

- **Interactive Map Display**: Showcases queues on a dynamic map centered at specified coordinates.
- **Customizable View**: Set the map's center and zoom level to focus on areas relevant to your users.
- **Selective Queue Display**: Choose to display specific queues or all public queues based on your preferences.

## Demo

Experience the component in action: [Queue Map Demo](https://www.jonwikman.com/cdn/)

## Installation

To integrate the Queue Map Web Component into your website, follow these steps:

1. **Import the Component**: Include the module script in the `<head>` section of your HTML.

    ```html
    <head>
      ...
      <!-- Import element definition and auto-register -->
      <script type="module" src="queue-map-webcomponent.esm.js"></script>
    </head>
    ```

2. **Add the Component to Your Page**: Place the `<queue-map>` element in the desired location within the `<body>`, configuring its attributes as needed.

    ```html
    <head>
  ...
  <!-- Import element definition and auto-register -->
  <script type="module" src="https://www.jonwikman.com/cdn/queue-map-webcomponent.esm.js"></script>
</head>
<body>
  ...
  <!-- Profit! -->
  <queue-map center="59.334591,18.063240" zoom="9"></queue-map>
</body>
    
    ```

## Configuration Parameters

Customize the component using the following attributes:

| Attribute | Default Value          | Example Value                     | Description                                                                                  |
|-----------|------------------------|-----------------------------------|----------------------------------------------------------------------------------------------|
| `center`  | `59.334591,18.063240`  | `59.334591,18.063240`             | Sets the latitude and longitude for the map's center.                                        |
| `zoom`    | `9`                    | `12`                              | Defines the initial zoom level of the map.                                                   |
| `queues`  | `null`                 | `67578195b4447c276cb0828b,67578195b4447c276cb0828b` | Comma-separated list of queue IDs to display. If not specified, all public queues are shown. |

## Usage Example

To display a map centered over Stockholm with a zoom level of 10, showing specific queues:

```html
<queue-map center="59.3293,18.0686" zoom="10" queues="queueID1,queueID2"></queue-map>
