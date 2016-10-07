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

/*****************************************
********** Util functions ****************
*********** starts here ******************
*****************************************/

function getImageTemplate(url){

	return {
		"attachment":{
			"type" : "image",
			"payload":{
				"url" : url
			}
		}
	};

}

function getAudioTemplate(url){

	return {
		"attachment":{
			"type":"audio",
			"payload":{
				"url":url
			}
		}
	};

}

function getVideoTemplate(url){

	return {
		"attachment":{
			"type":"video",
			"payload":{
				"url":url
			}
		}
	};

}

function getFileTemplate(url){

	return {
		"attachment":{
			"type":"file",
			"payload":{
				"url":url
			}
		}
	};

}

function getGenericTemplate(elements){

	return {
		"attachment" : {
			"type" 	: "template",
			"payload" : {
				"template_type"	: "generic",
				"elements"		: elements
			}
		}
	};

}

function getButtonTemplate(text, buttons){

	return {
		"attachment"	: {
			"type"		: "template",
			"payload"	: {
				"template_type"	: "button",
				"text"			: text,
				"buttons"		: buttons
			}
		}
	};

}

function getQuickRepliesTemplate(text, replies){

	return {
		"text": text,
		"quick_replies": replies
	};

}

var bot = {

	onText			: onText,

	onQuickReply	: onQuickReply,

	onAttachment	: onAttachment,

	onPostback		: onPostback

};

module.exports = bot;