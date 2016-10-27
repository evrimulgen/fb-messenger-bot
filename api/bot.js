var got	= require('got');
var util	= require('util');
var _ = require('underscore');
var facebook = require('../facebook/client.js');
var config 	= require('../config/config.json');

function onPostback (userId, payload, event){

	if(config.log_active) {

		console.log("bot.onPostback");
		console.log(arguments);

	}

	// logic

	switch (payload){

		default :
			break;

	}

}

function onAttachment (userId, attachments, event) {

	if(config.log_active) {

		console.log("bot.onAttachment");

		console.log(arguments);

	}

	// logic

}

function onQuickReply (userId, payload, event){

	if(config.log_active) {

		console.log("bot.onQuickReply");

		console.log(arguments);

	}

	switch(payload){

		// logic

		default :
			break;
	}

}

function onText (userId, messageText, event){

	if(config.log_active) {

		console.log("bot.onText");

		console.log(arguments);

	}

	switch(messageText){

		// logic

		default :

			facebook
				.reply(userId, "You said \"" + messageText + "\"");

			break;
	}

}

var bot = {

	onText			: onText,

	onQuickReply	: onQuickReply,

	onAttachment	: onAttachment,

	onPostback		: onPostback

};

module.exports = bot;