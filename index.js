var express = require("express");
var app = express();

const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

app.listen(port, () => {
  console.log("Server running on port " + port);
});

var serviceAccount = require("./config/firebase.json");

var admin = require("firebase-admin");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const notification_options = {
  priority: "high",
  timeToLive: 60 * 60 * 24
};

app.get("/glampartner/:type/:token", (req, res, next) => {
    const  messageType = req.params.type
    const  registrationToken = req.params.token
    let payload;
    switch(messageType.toString()){
        case "0":
            payload = {
                notification: {
                  title: "Foto premiada!!",
                  body: "Sua foto acaba de ganhar a promoção Glamluxo"
                }
              };
        break;

    case "1":
      payload = {
        notification: {
          title: "Dim dim!",
          body: "Acabamos de receber uma compra com seu cupom!"
        }
      };
      break;

    case "2":
      payload = {
        notification: {
          title: "Março das divas!",
          body: "Venha concorrer a prêmios e aproveitar 50% de desconto"
        }
      };
      break;
  }
  payload = {
    notification: {
      title: "Falcons vs. Patriots",
      body: "Get the inside scoop on the big game."
    }
  };
  admin.messaging().sendToDevice(registrationToken, payload, notification_options)
    .then(response => {
      res.status(200).send("Notification sent successfully")
    })
    .catch(error => {
      console.log(error);
    });
});

function normalizePort(val) {
  const _port = parseInt(val, 10);

  if (isNaN(_port)) {
    return val;
  }

  if (_port >= 0) {
    return _port;
  }

  return false;
}