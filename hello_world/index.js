const { Application, genesisBlockDevnet, configDevnet} = require('lisk-sdk');
const HelloTransaction = require('./hello_transaction');
const PaymentTransaction = require('./payment_transaction');

configDevnet.app.label = 'HelloWorld-blockchain-app';

// configDevnet.components.storage.database = 'lisk_dev2'; //server
configDevnet.components.storage.database = 'lisk_dev3'; //local
configDevnet.components.storage.host = 'postgres.feddema.dev';
configDevnet.components.storage.port = 5433;
configDevnet.components.storage.user = 'lisk';
configDevnet.components.storage.password = 'pass1234';
configDevnet.modules.http_api.access.public = true;

configDevnet.modules.network.seedPeers = [{ip: "167.86.83.197", wsPort: 5000}];

const app = new Application(genesisBlockDevnet, configDevnet);
app.registerTransaction(HelloTransaction);
app.registerTransaction(PaymentTransaction);

app
	.run()
	.then(() => app.logger.info('App started...'))
	.catch(error => {
		console.error('Faced error in application', error);
		process.exit(1);
	});
