const {catchError} = require('rxjs/operators');

module.exports = function (RED) {

    function ZiGateInNode(config) {
        RED.nodes.createNode(this, config);
        const node = this;

        this.configNode = RED.nodes.getNode(config.zigate);

        if (this.configNode.zigate) {
            const messages$ = this.configNode.zigate.messages$.pipe(
                catchError((err, caught$) => {
                    node.error(err);
                    return caught$;
                })
            );

            messages$.subscribe(zgMsg => {
                node.send({
                    topic: zgMsg.getLabel(),
                    payload: zgMsg.getPayload()
                });
            });
        }
    }

    RED.nodes.registerType("zigate-in", ZiGateInNode);

};