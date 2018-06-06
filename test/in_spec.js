const helper = require("node-red-node-test-helper");
const inNode = require("../src/nodes/in/in.js");

helper.init(require.resolve('node-red'));

describe('ZiGate In Node', function () {

    beforeEach(function (done) {
        helper.startServer(done);
    });

    afterEach(function (done) {
        helper.unload();
        helper.stopServer(done);
    });

    xit('should be loaded', function (done) {
        const flow = [{ id: "n1", type: "zigate-in", name: "zigate-in" }];
        helper.load(inNode, flow, function () {
            const n1 = helper.getNode("n1");
            console.log(n1);
            n1.should.have.property('name', 'zigate-in');
            done();
        });
    });

});