import { HASURA_ENDPOINT, LIKE_TABLE_NAME } from "../../constants";

//NOTE:この関数は使ってないと思われるのでしばらくしたら削除

//いいねに追加する関数
export const addLike: any = (user: any, songid: string, idToken: string) => {
  const queryStr = `mutation MyMutation {    insert_${LIKE_TABLE_NAME}(objects: {id_Chart:${songid} , id_User: ${user.uid}}){      returning{id}}
}`;
  console.log(queryStr);

  const mutationFree: any = async () => {
    const query = { query: queryStr };
    fetch(HASURA_ENDPOINT, {
      method: "POST",
      headers: { Authorization: `Bearer ${idToken}` },
      body: JSON.stringify(query),
    }).then((response) => {
      response.json().then((result) => {
        console.log("addLikeのレスポンス", result);
      });
    });
  };
  mutationFree();
  console.log(user.uid, songid);
};

//いいねを削除する関数
export const deleteLike: any = (user: any, songid: string, idToken: string) => {
  const queryStr = `mutation MyMutation {    delete_${LIKE_TABLE_NAME}(where: {id_Chart:{_eq:${songid}} , id_User: {_eq:${user.uid}}}){      returning{id}}
  }`;
  console.log(queryStr);

  const mutationFree: any = async () => {
    const query = { query: queryStr };
    fetch(HASURA_ENDPOINT, {
      method: "POST",
      headers: { Authorization: `Bearer ${idToken}` },
      body: JSON.stringify(query),
    }).then((response) => {
      response.json().then((result) => {
        console.log(result);
      });
    });
  };
  mutationFree();
  console.log(user.uid, songid);
};
