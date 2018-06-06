const {ZiGate} = require('@neonox31/zigate');

module.exports = function(RED) {
    function ZiGateConfigNode(n) {
        RED.nodes.createNode(this, n);

        this.serialPort = n.serialPort;
        this.zigate = new ZiGate(this.serialPort);

        this.on('close', function (done) {
            this.zigate.serialPort.close();
            done();
        });
    }
    RED.nodes.registerType("zigate-config", ZiGateConfigNode);
};