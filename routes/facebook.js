var express = require('express');
var router = express.Router();
var handler = require('../api/bot-handler.js');

var HUB_MODE = 'subscribe';
var HUB_VERIFY_TOKEN = 'MY_HUB_VERIFY_TOKEN';

router.get('/', function (req, res){

  if (req.query['hub.mode'] === HUB_MODE && req.query['hub.verify_token'] === HUB_VERIFY_TOKEN) {

    console.log("Validating webhook");

    res.status(200).send(req.query['hub.challenge']);

  } else {

    console.error("Failed validation. Make sure the validation tokens match.");

    res.sendStatus(403);
  }

});

router.post('/', function (req, res) {

  var data = req.body;

  if (data.object == 'page') { // Make sure this is a page subscription

    data.entry.forEach(function(pageEntry) { // Iterate over each entry, there may be multiple if batched

      var pageID = pageEntry.id;
      var timeOfEvent = pageEntry.time;

      pageEntry.messaging.forEach(function(messagingEvent) { // Iterate over each messaging event

        handler.onReceived(messagingEvent);

      });
    });

    // Assume all went well.
    //
    // You must send back a 200, within 20 seconds, to let us know you've
    // successfully received the callback. Otherwise, the request will time out.
    res.sendStatus(200);
  }
});

module.exports = router;
