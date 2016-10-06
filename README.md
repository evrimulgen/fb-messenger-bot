## Facebook Messenger Bot

A simple messenger bot server client with Express.js.

## Installation

Let's consider your domain is mydomain.com.

The client handles facebook webhook with the following path.

```
mydomain.com/facebook

GET     : Validating webhook
POST    : Received message callback
```

If you wanna change the path, just edit the following code in app.js file.

```
app.use('/facebook', facebook);
```

Set your verify token for validating webhook in routes/facebook.js file.

```
var HUB_VERIFY_TOKEN = 'MY_HUB_VERIFY_TOKEN';
```

Set your page access token in api/facebook.js file.

```
var API_TOKEN = 'MY_FACEBOOK_API_TOKEN';
```

Then write your code in api/bot.js file which has the following callbacks.

```
onText			: text callback
onQuickReply	: quick reply callback
onAttachment	: attachment callback (image, audio, location etc.)
onPostback		: postback callback
```