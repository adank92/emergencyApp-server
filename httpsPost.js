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

		sendRes.setEncoding('utf8');
		sendRes.on('data', function (chunk) {
		});
		sendRes.on('end', function () {
			console.log('No more data in response.');
			res.send('Sent');
		});
	});
};

exports.postCode = function (playerID, senderID) {
	var postData = JSON.stringify({
		'app_id': process.env.Onesignal_app_id,
		'contents': {'en': 'Alert'},
		'data': {'source': senderID},
		'include_player_ids': [
			playerID
		]
	})

	return postData;
};
