var got	= require('got');
var _ = require('underscore');
var facebook = require('../api/facebook.js');
var bot = require('../api/bot.js');
var config 	= require('../config/config.json');

function onReceived (event) {

	var userId = event.sender.id;

	if(config.log_active)
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

				if(config.log_active)
					console.log("Webhook received unknown messagingEvent: ", event);

			}

		});

}

function onMessage (event) {

	if(config.log_active)
		console.log("onMessage > event: " + JSON.stringify(event));

	var userId = event.sender.id;
	var recipientID = event.recipient.id;
	var timeOfMessage = event.timestamp;

	var message = event.message;
	var quick_reply = message.quick_reply;
	var messageText = message.text; // You may get a text or attachment but not both
	var messageAttachments = message.attachments;
	var attachments = event.message.attachments;

	if(config.log_active)
		console.log("Received message for user %d and page %d at %d with message: %s", userId, recipientID, timeOfMessage, message.text);

	if (messageText) {

		if(quick_reply){

			bot.onQuickReply(userId, quick_reply.payload, event);

		} else {

			bot.onText(userId, messageText, event);

		}

	} else if (messageAttachments) {

		bot.onAttachment(userId, attachments, event);

	}
}

function onPostback (event){

	if(config.log_active)
		console.log("onPostback > event: " + JSON.stringify(event));

	var userId = event.sender.id;
	var recipientID = event.recipient.id;
	var timeOfPostback = event.timestamp;

	// The 'payload' param is a developer-defined field which is set in a postback
	// button for Structured Messages.
	var payload = event.postback.payload;

	if(config.log_active)
		console.log("Received postback for user %d and page %d with payload '%s' " +
		"at %d", userId, recipientID, payload, timeOfPostback);

	bot.onPostback(userId, payload, event);
}

var handler = {

	onReceived	: onReceived

};

module.exports = handler;