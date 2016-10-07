var got		= require('got');
var _ 		= require('underscore');
var util 	= require('util');
var config 	= require('../config/config.json');

var API_PROFILE_ENDPOINT ="https://graph.facebook.com/v2.6/%s";

var API_MESSAGES_ENDPOINT ="https://graph.facebook.com/v2.6/me/messages";

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

		})

		.catch(function(err){

			if(config.log_active)
				console.log(err);

		});

}

/**
 * @method post
 * @desc post request to facebook messages api
 * @param {object} data : text or message object
 * @returns {function} promise
 */
function post(data){

	return got(API_MESSAGES_ENDPOINT, {

			headers: {

				'Content-type': 'application/json'

			},

			query : {

				access_token : config.facebook.api_token

			},

			body : JSON.stringify(data),

			json: true,

			method: 'POST'

		})

		.catch(function(err){

			if(config.log_active)
				console.log(err);

		});
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

	if(config.log_active)
		console.log("facebook.reply > data: " + JSON.stringify(body));

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

	if(config.log_active)
		console.log("facebook.typingOn > data: " + JSON.stringify(body));

	return post(body);
}


var facebook = {

	reply		: reply,

	typingOn	: typingOn,

	getProfile	: getProfile

};

module.exports = facebook;