'use strict';

const LineByLineReader = require('line-by-line')
    , parse = require('csv-parse');

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

            if (messageId > 0) {
                lr.pause();

                parse(line, { delimiter: ',' }, function (err, row) {
                    console.log(row[0][1]);

                    let properties = {
                        source: ctx.config.sensorName,
                        macAddress: ctx.config.macAddress
                    };

                    let content = {
                        deviceId: ctx.config.sensorName,
                        messageId: messageId,
                        consumption: parseFloat(row[0][1])
                    };

                    setTimeout(function () {
                        ctx.broker.publish({
                            properties: properties,
                            content: new Uint8Array(Buffer.from(JSON.stringify(content), 'utf8'))
                        });

                        lr.resume();
                        messageId++;
                    }, 1000);
                })
            } else
                messageId++;
        })
    },

    receive: function (message) { },

    destroy: function () {
        console.log(`Stop reading from ${this.config.sensorName}`);
    }
};
