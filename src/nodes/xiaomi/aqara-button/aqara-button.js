const {catchError} = require('rxjs/operators');
const {ZGDeviceType} = require('@neonox31/zigate');
const {toNodeError} = require('../../../utils');

module.exports = function (RED) {

    function ZGXiaomiAqaraButtonNode(config) {
        RED.nodes.createNode(this, config);
        const node = this;
        const configNode = RED.nodes.getNode(config.zigate);

        if (configNode.zigate) {
            const button = configNode.zigate.createDevice(ZGDeviceType.XiaomiAqaraButton, config.shortAddress);

            button.pushes$
                .pipe(catchError(toNodeError(node)))
                .subscribe((pushes) => {
                    node.send({
                        payload: {
                            pushes
                        }
                    })
                });

            button.battery$
                .pipe(catchError(toNodeError(node)))
                .subscribe((battery) => {
                    let color = 'red';

                    if (battery.level > 70) {
                        color = 'green';
                    } else if (battery.level < 50 && battery.level > 20) {
                        color = 'yellow';
                    }

                    node.status({
                        fill: color,
                        shape: "dot",
                        text: `Battery: ${ battery.level }% (${ battery.voltage } V)`
                    });
                    node.send({
                        payload: {
                            battery
                        }
                    })
                })
        }
    }

    RED.nodes.registerType("zigate-xiaomi-aqara-button", ZGXiaomiAqaraButtonNode);

};