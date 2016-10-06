var got	= require('got');
var util	= require('util');
var underscore = require('underscore');
var facebook = require('../api/facebook.js');

function onPostback (userId, payload, event){

	console.log("bot.onPostback");

	console.log(arguments);

	// logic

	switch (payload){

		default :
			break;

	}

}

function onAttachment (userId, attachments, event) {

	console.log("bot.onAttachment");

	console.log(arguments);

	// logic

}

function onQuickReply (userId, payload, event){

	console.log("bot.onQuickReply");

	console.log(arguments);

	switch(payload){

		// logic

		default :
			break;
	}

}

function onText (userId, messageText, event){

	console.log("bot.onText");

	console.log(arguments);

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

var bot = {

	onText			: onText,

	onQuickReply	: onQuickReply,

	onAttachment	: onAttachment,

	onPostback		: onPostback

};

module.exports = bot;