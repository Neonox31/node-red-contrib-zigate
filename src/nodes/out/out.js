module.exports = function (RED) {

    function ZiGateOutNode(config) {
        RED.nodes.createNode(this, config);
        const node = this;

        this.configNode = RED.nodes.getNode(config.zigate);

        node.on('input', msg => {
            if (this.configNode.zigate) {
                this.configNode.zigate.sendCommand(parseInt(msg.topic), msg.payload);
                node.send(msg);
            }
        });
    }

    RED.nodes.registerType("zigate-out", ZiGateOutNode);

};