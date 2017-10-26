'use strict';

const LineByLineReader = require('line-by-line')
    , parse = require('csv-parse')
    , uuidv4 = require('uuid/v4');

function sleep(time, callback) {
    var stop = new Date().getTime();
    while (new Date().getTime() < stop + time) {
        ;
    }
    callback();
}

module.exports = {
    broker: null,
    config: null,

    create: function (broker, config) {
        this.broker = broker;
        this.config = config;

        return true;
    },

    start: function () {
        var ctx = this;
        var messageId = 0;

        let lr = new LineByLineReader(ctx.config.dataSetPath);
        lr.on('line', function (line) {
            lr.pause();

            parse(line, { delimiter: ',' }, function (err, instance) {
                let properties = {
                    source: ctx.config.sensorName,
                    macAddress: ctx.config.macAddress
                };

                let row = instance[0];
                let content = {
                    id: uuidv4(),

                    // Addressing Information
                    controllerId: 0,
                    storeId: 0,
                    deviceId: ctx.config.sensorName,

                    
                    timestamp: new Date().toISOString(),
                    
                    // Data row
                    averagePower: parseFloat(row[1]),
                    reactivePower: parseFloat(row[2]),
                    current: parseFloat(row[3]),
                    voltage: parseFloat(row[4]),
                    outsideTemperature: parseFloat(row[5]),
                    insideTemperature: parseFloat(row[6]),
                    insideHumidity: parseFloat(row[7]),
                    doorOpen: parseFloat(row[8]),
                    state: parseFloat(row[9])
                };

                setTimeout(function () {
                    ctx.broker.publish({
                        properties: properties,
                        content: new Uint8Array(Buffer.from(JSON.stringify(content), 'utf8'))
                    });

                    lr.resume();
                }, 2000);
            })
        })
    },

    receive: function (message) { },

    destroy: function () {
        console.log(`Stop reading from ${this.config.sensorName}`);
    }
};
