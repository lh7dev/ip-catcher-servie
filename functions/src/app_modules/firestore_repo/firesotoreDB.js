/* eslint-disable promise/catch-or-return */
const admin = require("firebase-admin");
const serviceAccount = require("../../config/keys/firebaseServiceAccount.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://crm-api-gateway.firebaseio.com",
});
const db = admin.firestore();

function createDoc(collection, doc) {
  return db.collection(collection).add(doc);
}

function getDocById(collection, id) {
  let collectionRef = db.collection(collection);
  let query = collectionRef.doc(id);
  return query.get();
}

function updateDoc(collection, id, data) {
  let collectionRef = db.collection(collection);
  let query = collectionRef.doc(id);
  return query.update(data);
}

function deleteDoc(collection, id) {
  console.log(id);
  return db.collection(collection).doc(id).delete();
}

function getAllDocs(collection) {
  return db.collection(collection).get();
}

function queryDocs(collection, key, filter) {
  let collectionRef = db.collection(collection);
  let query = collectionRef.where(key, "==", filter);
  return query.get();
}

module.exports = {
  createDoc,
  getDocById,
  updateDoc,
  deleteDoc,
  getAllDocs,
};
