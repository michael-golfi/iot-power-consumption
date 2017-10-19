module.exports = function() {
    const Gateway = require('azure-iot-gateway');
    new Gateway('./gw.config.json').run();
}