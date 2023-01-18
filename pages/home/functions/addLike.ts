import { useQuery } from "urql";
const queryStr = "mutation($songid: String!, $uid: String!)";
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
