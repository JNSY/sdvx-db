const functions = require("firebase-functions");
const admin = require("firebase-admin");
const axios = require("axios");

admin.initializeApp(functions.config().firebase);

const createUser = `
mutation createUser($id: String = "", $email: String = "") {
  insert_users_one(object: {id: $id, email: $email}, on_conflict: {constraint: users_pkey, update_columns: []}) {
    id
    email
  }
}
`;

exports.processSignUp = functions.auth.user().onCreate((user) => {
  let customClaims;
  customClaims = {
    "https://hasura.io/jwt/claims": {
      "x-hasura-default-role": "user",
      "x-hasura-allowed-roles": ["user"],
      "x-hasura-user-id": user.uid,
    },
  };

  return admin
    .auth()
    .setCustomUserClaims(user.uid, customClaims)
    .then(() => {
      let queryStr = {
        query: createUser,
        variables: { id: user.uid, email: user.email },
      };

      axios({
        method: "post",
        url: process.env.HASURA_PROJECT_ENDPOINT,
        data: queryStr,
        headers: {
          "x-hasura-admin-secret": process.env.HASURA_GRAPHQL_ADMIN_SECRET,
        },
      });

      admin.firestore().collection("user_meta").doc(user.uid).create({
        refreshTime: admin.firestore.FieldValue.serverTimestamp(),
      });
    })
    .catch((error) => {
      console.log(error);
    });
});
