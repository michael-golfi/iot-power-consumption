# IoT Power Consumtion

## Description

The purpose of this project is reading power consumption from refrigerators. This project uses an IoT Edge package to stream data from power sensors into an IoT Edge pipeline, process it and forward it to IoT Hub

### Creating a BLE Module

Followed this [Tutorial](https://docs.microsoft.com/en-us/azure/iot-hub/iot-hub-iot-edge-create-module-js) to create a Node.js BLE module to generate fridge readings from the [UMass Trace Repository](http://traces.cs.umass.edu/index.php/Smart/Smart) and to stream them to the IoT Edge.

### Datastructure

The data used in the csv files follows the following format:

| Timestamp     | Refrigerator Power Usage (kW) |
| ------------- | ----------------------------- |
| 1/1/2016 0:00 | 0.132692222                   |

## Installation

```bash
npm install
```

## Run

```bash
npm start
```