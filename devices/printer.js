'use strict';

module.exports = {
  broker: null,
  configuration: null,

  create: function (broker, configuration) {
    this.broker = broker;
    this.configuration = configuration;

    return true;
  },

  start: function () {
  },

  receive: function (message) {
    let b = Buffer.from(message.content);
    
    console.log(`printer.receive - ${b.toString('utf-8')}`);
  },

  destroy: function () {
    console.log('printer.destroy');
  }
};
