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

function replyAttachment (userId, attachments, event) {

	console.log("bot.replyAttachment");

	console.log(arguments);

	// logic

}

function reply (userId, messageText, quick_reply, event){

	console.log("bot.reply");

	console.log(arguments);

	// logic

	if(quick_reply){

		var payload = quick_reply.payload;

		// quick replies

		return;
	}

	switch(messageText){

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

	reply			: reply,

	replyAttachment	: replyAttachment,

	onPostback		: onPostback

};

module.exports = bot;