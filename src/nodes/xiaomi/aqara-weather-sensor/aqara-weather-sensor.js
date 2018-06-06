const {catchError} = require('rxjs/operators');
const {ZGDeviceType} = require('@neonox31/zigate');
const {toNodeError} = require('../../../utils');

module.exports = function (RED) {

    function ZGXiaomiAqaraWeatherSensorNode(config) {
        RED.nodes.createNode(this, config);
        const node = this;
        const configNode = RED.nodes.getNode(config.zigate);

        if (configNode.zigate) {
            const weatherSensor = configNode.zigate.createDevice(ZGDeviceType.XiaomiAqaraWeatherSensor, config.shortAddress);

            weatherSensor.temperature$
                .pipe(catchError(toNodeError(node)))
                .subscribe((temperature) => {
                    node.send({
                        payload: {
                            temperature
                        }
                    })
                });

            weatherSensor.humidity$
                .pipe(catchError(toNodeError(node)))
                .subscribe((humidity) => {
                    node.send({
                        payload: {
                            humidity
                        }
                    })
                });

            weatherSensor.pressure$
                .pipe(catchError(toNodeError(node)))
                .subscribe((pressure) => {
                    node.send({
                        payload: {
                            pressure
                        }
                    })
                });

            weatherSensor.battery$
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

    RED.nodes.registerType("zigate-xiaomi-aqara-weather-sensor", ZGXiaomiAqaraWeatherSensorNode);

};