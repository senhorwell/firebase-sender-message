var express = require("express");
var app = express();
app.listen(3000, () => {
 console.log("Server running on port 3000");
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
    //const  registrationToken = req.params.token
    const  registrationToken = "ehFdwe6FRk67XEMFSL43oh:APA91bELslNoKrpS1YD5VLkJ7C3ZJuS-hpWyXbtuOpVuJyez8lm3GrYdomeVBHjC4B5VrJDh0_TWHv3Gbz3lDnsXoCrapn1-vCcbfFEj9yjispd2MgfqhmrLIlxfdmbj5K0B13BrDzEC"
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
    .then( response => {
        res.status(200).send("Notification sent successfully")
    })
    .catch( error => {
        console.log(error);
    });
});