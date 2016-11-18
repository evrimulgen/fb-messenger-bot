var got		= require('got');
var _ 		= require('underscore');
var util 	= require('util');
var config 	= require('../config/config.json');

const API_PROFILE_ENDPOINT = "https://graph.facebook.com/v2.6/%s";
const API_MESSAGES_ENDPOINT = "https://graph.facebook.com/v2.6/me/messages";
const API_THREAD_SETTINGS_ENDPOINT = "https://graph.facebook.com/v2.6/me/thread_settings";

/**
 * @method getProfile
 * @desc get facebook profile info
 * @param {string} userId : facebook sender/user id
 * @returns {function} promise
 */
function getProfile(userId){

	var url = util.format(API_PROFILE_ENDPOINT, userId);

	return got(url, {

			query : {

				access_token : config.facebook.api_token

			},

			method: 'GET'

		});

}

/**
 * @method call
 * @desc do request to api
 * @param {string} url : api url
 * @param {object} data : text or message object
 * @returns {function} promise
 */
function call(url, data){

	return got(url, {

		headers: {

			'Content-type': 'application/json'

		},

		query : {

			access_token : config.facebook.api_token

		},

		body : JSON.stringify(data),

		json: true,

		method: 'POST'

	});
}

/**
 * @method post
 * @desc post request to facebook messages api
 * @param {object} data : text or message object
 * @returns {function} promise
 */
function post(data){

	return call(API_MESSAGES_ENDPOINT, data);

}

/**
 * @method reply
 * @desc Send message to facebook user
 * @param {string} userId : facebook sender/user id
 * @param {object} messageData : text or message object
 * @returns {function} promise
 */
function reply(userId, messageData){

	var body = {

		recipient: {

			id: userId

		},

		message: {

			text : messageData

		}

	};

	if(_.isObject(messageData))
		body.message = messageData;

	return post(body);

}

/**
 * @method typingOn
 * @desc Send sender action to facebook messages api
 * @param {string} userId : facebook sender/user id
 * @returns {function} promise
 */
function typingOn(userId){

	var body = {

		recipient: {

			id: userId

		},

		sender_action: 'typing_on'
	};

	return post(body);
}

/**
 * @method setPersistentMenu
 * @desc Set persistent menu via facebook api
 * @param {array} actions : action buttons
 * @returns {function} promise
 */
function setPersistentMenu(actions){

	return call(API_THREAD_SETTINGS_ENDPOINT, {

		setting_type	: "call_to_actions",

		thread_state	: "existing_thread",

		call_to_actions	: actions

	});

}

/**
 * @method setGetStartedButton
 * @desc Set get started button via facebook api
 * @returns {function} promise
 */
function setGetStartedButton(){

	return call(API_THREAD_SETTINGS_ENDPOINT, {

		setting_type	: "call_to_actions",

		thread_state	: "new_thread",

		call_to_actions	: [
			{
				payload	: "PAYLOAD_GET_STARTED_BUTTON"
			}
		]

	});

}

var facebook = {

	reply				: reply,

	typingOn			: typingOn,

	getProfile			: getProfile,

	setPersistentMenu	: setPersistentMenu,

	setGetStartedButton	: setGetStartedButton

};

module.exports = facebook;