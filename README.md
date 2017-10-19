# IoT Power Consumption

## Description

The purpose of this project is reading power consumption from refrigerators. This project uses an IoT Edge package to stream data from power sensors into an IoT Edge pipeline, process it and forward it to IoT Hub

### Creating a BLE Module

Followed this [Tutorial](https://docs.microsoft.com/en-us/azure/iot-hub/iot-hub-iot-edge-create-module-js) to create a Node.js BLE module to generate fridge readings from the [UMass Trace Repository](http://traces.cs.umass.edu/index.php/Smart/Smart) and to stream them to the IoT Edge.

### Datastructure

The data used in the csv files follows the following format:

| Timestamp     | Refrigerator Power Usage (kW) |
| ------------- | ----------------------------- |
| 1/1/2016 0:00 | 0.132692222                   |

## Deployment Steps

### Creating The IoTHub
1. Deploy [ARM Template](assets/deployment.json)
2. Once deployed, open the newly created IoT Hub, go to Device Explorer, click Add and enter a deviceId (the name of each device in [Gateway Config](gw.config.json)).
3. Repeat for all devices.
4. After all are created, go to each one and copy the primary key into the [Gateway Config](gw.config.json), replacing all the values resembling `<<DeviceKey1>>`.
5. Replace the value for `IoTHubName` with the name you chose for your IoT Hub.

### Creating the Function Handler
1. Open your new function app. 
2. Create a new function for `EventHubTrigger - Javascript` called IoTHubHandler
3. Click new next to Event Hub connection
4. Click IoT hub, select your IoT hub name and the events endpoint and click select.
5. Enter your IoT hub name in the Event Hub name field and click create.

### Deploy IoT Edge to a FunctionApp
1. Open your new function app.
2. Create a new function called IoTEdge
3. Upload the folders: `data`, `devices` and files: `function.json`, `gw.config.json`, `index.js` and `package.json`.
4. Navigate to the project Kudu console
5. Run:
    ```powershell
    cd site\wwwroot\IoTEdge
    npm install
    ```
6. Using the function url, start the function.

## Development Environment

### Install the dependencies
```bash
npm install
```
### Run the IoTEdge
```bash
npm start
```

## References

1. [NILMTK: An Open Source Toolkit for Non-intrusive Load Monitoring](https://arxiv.org/pdf/1404.3878.pdf)
2. [An electrical load measurements dataset of United Kingdom households from a two-year longitudinal study](https://www.nature.com/articles/sdata2016122)
3. [UMass Trace Repository](http://traces.cs.umass.edu/index.php/Smart/Smart)