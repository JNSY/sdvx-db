import { useQuery } from "urql";

const queryStr = `mutation MyMutation($songid:Int! ,$uid:String!) {insert_likes(objects: {id_Chart:$songid, id_User: $uid}){returning {
      likes_to_charts {
            bpm
            chain
            composer
            effector
            id
          }
        }}
    }`;

//いいねに追加する関数
const useAddLike: any = (
  user: any,
  songid: string,
  idToken: string,
  setBpmDataRows: any
) => {
  const [result, reexecuteQuery] = useQuery({
    query: queryStr,
    variables: { songid: songid, uid: user?.uid },
  });
  const { data, fetching, error } = result;
  return { data };
};

export default useAddLike;
