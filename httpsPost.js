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
			data = JSON.parse(data);
			if(typeof data.errors != "undefined"){
				res.send("Error Occured");
			} else {
				res.send("Message Sent");
			}
		});
	});
};

exports.postCode = function (playerID, senderID, date) {
	var postData = JSON.stringify({
		'app_id': process.env.Onesignal_app_id,
		'contents': {'en': senderID},
		'data' : {'date' : date},
		'include_player_ids': [
			playerID
		]
	})

	return postData;
};
