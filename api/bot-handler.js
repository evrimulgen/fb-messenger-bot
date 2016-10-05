var got	= require('got');
var underscore = require('underscore');
var facebook = require('../api/facebook.js');
var bot = require('../api/bot.js');

function onReceived (event) {

	var userId = event.sender.id;

	console.log("onReceived > userId: " + userId);

	facebook

		.getProfile(userId)

		.then(function(response){

			if(response.statusCode != 200)
				return;

			var data = JSON.parse(response.body);

			event.first_name = data.first_name; // or other infos

			if (event.message) {

				onMessage(event);

			} else if (event.postback) {

				onPostback(event);

			} else if (event.optin) { // receivedAuthentication

			} else if (event.delivery) { // receivedDeliveryConfirmation

			} else { // unknown messaging event

				console.log("Webhook received unknown messagingEvent: ", event);

			}

		});

}

function onMessage (event) {

	console.log("onMessage > event: " + JSON.stringify(event));

	var userId = event.sender.id;
	var recipientID = event.recipient.id;
	var timeOfMessage = event.timestamp;

	var message = event.message;
	var quick_reply = message.quick_reply;
	var messageText = message.text; // You may get a text or attachment but not both
	var messageAttachments = message.attachments;
	var attachments = event.message.attachments;

	console.log("Received message for user %d and page %d at %d with message: %s", userId, recipientID, timeOfMessage, message.text);

	if (messageText) {

		bot.reply(userId, messageText, quick_reply, event);

	} else if (messageAttachments) {

		bot.replyAttachment(userId, attachments, event);

	}
}

function onPostback (event){

	console.log("onPostback > event: " + JSON.stringify(event));

	var userId = event.sender.id;
	var recipientID = event.recipient.id;
	var timeOfPostback = event.timestamp;

	// The 'payload' param is a developer-defined field which is set in a postback
	// button for Structured Messages.
	var payload = event.postback.payload;

	console.log("Received postback for user %d and page %d with payload '%s' " +
		"at %d", userId, recipientID, payload, timeOfPostback);

	bot.onPostback(userId, payload, event);
}

var handler = {

	onReceived	: onReceived

};

module.exports = handler;