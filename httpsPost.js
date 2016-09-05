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
            console.log(chunk);
        });
        sendRes.on('end', function () {
            console.log('No more data in response.');
            res.send('Sent');
        });
        console.log(sendRes)
    });
};

exports.postCode = function (playerID) {
    var postData = JSON.stringify({
        'app_id': process.env.Onesignal_app_id,
        'contents': {'en': 'Alert'},
        'include_player_ids': [
            playerID
        ]
    })

    return postData;
};
