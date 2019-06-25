var
	exec = require('cordova/exec'),
	channel = require('cordova/channel'),
	CDVNetEvent = require('com.fgtit.reader.CDVNetEvent')
;

exports.getListDevice = function (arg0, success, error) {
    exec(success, error, 'FingerPrintPlugin2', 'getListDevice', [arg0]);
};

exports.doEnroll = function (arg0, success, error) {
    exec(success, error, 'FingerPrintPlugin2', 'doEnroll', [arg0]);
};

exports.startDiscovery = function (success, error) {
    exec(success, error, 'FingerPrintPlugin2', 'startDiscovery', []);
};

exports.stopDiscovery = function (success, error) {
    exec(success, error, 'FingerPrintPlugin2', 'stopDiscovery', []);
};

exports.getDevices = function (success, error) {
	exec(success, error, 'FingerPrintPlugin2', 'getDevices', []);
};

exports.connect = function (address, uuid, success, error) {
	exec(success, error, 'FingerPrintPlugin2', 'connect', [address, uuid]);
};

exports.send = function (socketId, data, success, error) {
	exec(success, error, 'FingerPrintPlugin2', 'send', [socketId, data]);
};

exports.enroll = function (socketId, data, success, error) {
	exec(success, error, 'FingerPrintPlugin2', 'enroll', [socketId, data]);
};
exports.verify = function (socketId, data, success, error) {
	exec(success, error, 'FingerPrintPlugin2', 'verify', [socketId, data]);
};

exports.listenUsingRfcomm = function (uuid, success, error) {
	exec(success, error, 'FingerPrintPlugin2', 'listenUsingRfcomm', [uuid]);
};

// Events
exports.onAdapterStateChanged = Object.create(CDVNetEvent);
exports.onAdapterStateChanged.init();

exports.onDeviceAdded = Object.create(CDVNetEvent);
exports.onDeviceAdded.init();

exports.onReceive = Object.create(CDVNetEvent);
exports.onReceive.init();

exports.onReceiveError = Object.create(CDVNetEvent);
exports.onReceiveError.init();

exports.onAccept = Object.create(CDVNetEvent);
exports.onAccept.init();

exports.onAcceptError = Object.create(CDVNetEvent);
exports.onAcceptError.init();

channel.onCordovaReady.subscribe(function() {
	exec(function (adapterState) {
		exports.onAdapterStateChanged.fire(adapterState);
	}, null, 'FingerPrintPlugin2', 'registerAdapterStateChanged', []);

	exec(function (deviceInfo) {
		exports.onDeviceAdded.fire(deviceInfo);
	}, null, 'FingerPrintPlugin2', 'registerDeviceAdded', []);

	exec(function (socketId, data, method) {
		exports.onReceive.fire({
			socketId: socketId,
			data: data,
			method: method
		});
	}, null, 'FingerPrintPlugin2', 'registerReceive', []);

	exec(function (info) {
		exports.onReceiveError.fire(info);
	}, null, 'FingerPrintPlugin2', 'registerReceiveError', []);

	exec(function (serverSocketId, clientSocketId) {
		exports.onAccept.fire({
			socketId: serverSocketId,
			clientSocketId: clientSocketId
		});
	}, null, 'FingerPrintPlugin2', 'registerAccept', []);

	exec(function (info) {
		exports.onAcceptError.fire(info);
	}, null, 'FingerPrintPlugin2', 'registerAcceptError', []);
});