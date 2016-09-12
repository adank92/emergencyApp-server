var httpsPost = require('./httpsPost')
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var firebase = require("firebase");

app.set('port', (process.env.PORT || 5000));
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({extended: true})); // support encoded bodies

const firebaseConfig = {
	serviceAccount: {
		type: process.env.SA_TYPE,
		project_id: process.env.SA_PROJECT_ID,
		private_key_id: process.env.SA_PRIVATE_KEY_ID,
		private_key: process.env.SA_PRIVATE_KEY.replace(/\\n/g, '\n'),
		client_email: process.env.SA_CLIENT_EMAIL,
		client_id: process.env.SA_CLIENT_ID,
		auth_uri: "https://accounts.google.com/o/oauth2/auth",
		token_uri: "https://accounts.google.com/o/oauth2/token",
		auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
		client_x509_cert_url: process.env.SA_CLIENT_X509_CERT_URL
	},
	databaseURL: "https://redpager-e6f7c.firebaseio.com",
	apiKey: process.env.Firebase_apiKey,
	authDomain: "redpager-e6f7c.firebaseapp.com",
	storageBucket: "redpager-e6f7c.appspot.com"
}

var firebaseapp = firebase.initializeApp(firebaseConfig);

app.post('/generateToken', function (req, res) {
	var uid = req.body.uid;
	var customToken = firebase.auth().createCustomToken(uid);
	res.send(JSON.stringify({token: customToken}));
});

app.post('/sendAlert', function (req, res) {
	var targetPhone = req.body.target;
	var sourcePhone = req.body.source;
	var db = firebaseapp.database().ref();
	db.child('alerts/' + targetPhone).set(sourcePhone);
	db.child('users/' + targetPhone).once("value", function (snapshot) {
		var alert = httpsPost.sendAlert(res);
		alert.write(httpsPost.postCode(snapshot.val(), sourcePhone));
		alert.end();
	})
});

app.get('/alerts/:target', function (req,res) {
	var target = req.params.target;
	var db = firebaseapp.database().ref();
	db.child('alerts/' + target).once("value", function (snapshot) {
		res.send(snapshot.val());
		console.log(snapshot.val())
	})
});

app.listen(app.get('port'), function () {
	console.log('Node app is running on port', app.get('port'));
});
