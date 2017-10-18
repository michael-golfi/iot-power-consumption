# Fridge Data

## Description

This contains fridge measurements in kW taken at twice hourly and minute intervals.

## Source

http://traces.cs.umass.edu/index.php/Smart/Smart

## Creating a BLE Module

Followed this [Tutorial](https://docs.microsoft.com/en-us/azure/iot-hub/iot-hub-iot-edge-create-module-js) to create a Node.js BLE module to generate fridge readings from the datasets and to stream them to the IoT Edge.

## Install

```bash
npm install -g yo
npm install -g generator-az-iot-gw-module

mkdir FridgeA && yo az-iot-gw-module

# Follow steps...
```