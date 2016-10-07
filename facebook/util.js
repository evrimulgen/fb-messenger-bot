
// exclude: Receipt Template
// exclude: Airline Templates

function createAttachment(url, type){
    return {
        "attachment":{
            "type" : type,
            "payload": {
                "url": url
            }
        }
    };
};

function createTemplate(elements, type, text){

    if(type === 'generic'){

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

    return {
        "attachment"	: {
            "type"		: "template",
            "payload"	: {
                "template_type"	: "button",
                "text"			: text,
                "buttons"		: elements
            }
        }
    };

}

var attachment = {

    image : function (url){

        return createAttachment(url, 'image');

    },

    audio : function (url){

        return createAttachment(url, 'audio');

    },

    video : function (url){

        return createAttachment(url, 'video');

    },

    file : function (url){

        return createAttachment(url, 'file');

    }

};

var template = {

    button : function (text, buttons){

        return createTemplate(buttons, 'button', text);

    },

    generic: function (elements){

        return createTemplate(elements, 'generic');

    }

};

var button = {

    postback : function(payload, title){

        return {
            "type"      : "postback",
            "title"     : title,
            "payload"   : payload
        };

    },

    url : function(title, url, webview_height_ratio, messenger_extensions, fallback_url){

        return {
            "type"  : "web_url",
            "url"   : url,
            "title" : title,
            "webview_height_ratio"  : webview_height_ratio, // compact, full, tall
            "messenger_extensions"  : messenger_extensions || false,
            "fallback_url"          : fallback_url || url
        };

    },

    call : function(payload, title){

        return {
            "type"      : "phone_number",
            "title"     : title,
            "payload"   : payload
        };

    },

    share : function(){ // only work with generic template

        return {
            "type" : "element_share"
        };

    }

};

var quick_reply = {

    item : function(type, payload, title, image_url){

        if(type === 'location')
            return {

                "content_type" : "location"

            };

        return {
            "content_type"  : "text",
            "title"         : title,
            "payload"       : payload,
            "image_url"     : image_url
        }

    },

    create : function(text, items){

        return {
            "text"          : text,
            "quick_replies" : items
        };

    }

};

var util = {

    template	: template,

    attachment	: attachment,

    button      : button,

    quick_reply : quick_reply

};

module.exports = util;