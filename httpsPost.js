var https = require('https');

var postOptions = {
	host: 'onesignal.com',
	method: 'POST',
	path: '/api/v1/notifications',
	headers: {
		'Content-Type': 'application/json'
	},
};

exports.sendAlert = function (res) {
	return https.request(postOptions, function (sendRes) {

		var data = "";

		sendRes.setEncoding('utf8');
		sendRes.on('data', function (chunk) {
			data += chunk;
		});
		sendRes.on('end', function () {
			res.send(data);
		});
	});
};

exports.postCode = function (playerID, senderID) {
	var postData = JSON.stringify({
		'app_id': process.env.Onesignal_app_id,
		'contents': {'en': senderID},
		'include_player_ids': [
			playerID
		]
	})

	return postData;
};
