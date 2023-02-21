import { initializeApp } from "firebase-admin/app";
import { credential, messaging, ServiceAccount } from "firebase-admin";
import credentials from "./config/firebase.json";

initializeApp({
  credential: credential.cert(<ServiceAccount>credentials),
});

export interface MessagePayload extends messaging.DataMessagePayload {
  // priority?: Priority;
  // module?: Module;
  // type?: Type;
  //field?: string;
  //id?: string;
}

async function sendNotificationFirebase(
  tokens: string[],
  title: string,
  body: string,
  data?: MessagePayload
) {
  try {
    if (tokens.length > 0) {
      const payload: messaging.MessagingPayload = {
        notification: {
          title,
          body,
        },
      };
      if (data) payload.data = data;
      const options: messaging.MessagingOptions = {};
      const result = await messaging().sendToDevice(tokens, payload, options);
      console.dir(result, { depth: null });
    }
  } catch (error) {
    console.log(error);
  }
}

async function send() {
  sendNotificationFirebase(['token'],'Nova mensagem','Mensagem recebida com sucesso')
}