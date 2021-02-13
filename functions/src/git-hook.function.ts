import * as functions from "firebase-functions";

import * as admin from "firebase-admin";

admin.initializeApp();
const db = admin.firestore();

const expTable = [
  20,
  40,
  100,
  250,
  500,
  1000,
  1500,
  4000,
  10000,
];

const EARN_EXP: number = 10;

export const gitHook = functions.https.onRequest(async (request, response) => {
  console.log(request.body.sender.id);
  const pets = await db.collection("pets")
      .where("ownerGitHubId", "==", request.body.sender.id)
      .get();

  const pet = pets.docs[0].data();
  let level: number = 1;
  expTable.some((nextExp) => {
    if (pet.exp + EARN_EXP >= nextExp) {
      level++;
      return false;
    } else {
      return true;
    }
  });
  const increment = admin.firestore.FieldValue.increment(EARN_EXP);
  pets.docs.forEach((doc) => doc.ref.update({
    exp: increment,
    level: level,
  }));
  response.send("success");
});


