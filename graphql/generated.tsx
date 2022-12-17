import { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";
import gql from "graphql-tag";
import * as Urql from "urql";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

/** Boolean expression to compare columns of type "Int". All fields are combined with logical 'AND'. */
export type Int_Comparison_Exp = {
  _eq?: InputMaybe<Scalars["Int"]>;
  _gt?: InputMaybe<Scalars["Int"]>;
  _gte?: InputMaybe<Scalars["Int"]>;
  _in?: InputMaybe<Array<Scalars["Int"]>>;
  _is_null?: InputMaybe<Scalars["Boolean"]>;
  _lt?: InputMaybe<Scalars["Int"]>;
  _lte?: InputMaybe<Scalars["Int"]>;
  _neq?: InputMaybe<Scalars["Int"]>;
  _nin?: InputMaybe<Array<Scalars["Int"]>>;
};

/** Boolean expression to compare columns of type "String". All fields are combined with logical 'AND'. */
export type String_Comparison_Exp = {
  _eq?: InputMaybe<Scalars["String"]>;
  _gt?: InputMaybe<Scalars["String"]>;
  _gte?: InputMaybe<Scalars["String"]>;
  /** does the column match the given case-insensitive pattern */
  _ilike?: InputMaybe<Scalars["String"]>;
  _in?: InputMaybe<Array<Scalars["String"]>>;
  /** does the column match the given POSIX regular expression, case insensitive */
  _iregex?: InputMaybe<Scalars["String"]>;
  _is_null?: InputMaybe<Scalars["Boolean"]>;
  /** does the column match the given pattern */
  _like?: InputMaybe<Scalars["String"]>;
  _lt?: InputMaybe<Scalars["String"]>;
  _lte?: InputMaybe<Scalars["String"]>;
  _neq?: InputMaybe<Scalars["String"]>;
  /** does the column NOT match the given case-insensitive pattern */
  _nilike?: InputMaybe<Scalars["String"]>;
  _nin?: InputMaybe<Array<Scalars["String"]>>;
  /** does the column NOT match the given POSIX regular expression, case insensitive */
  _niregex?: InputMaybe<Scalars["String"]>;
  /** does the column NOT match the given pattern */
  _nlike?: InputMaybe<Scalars["String"]>;
  /** does the column NOT match the given POSIX regular expression, case sensitive */
  _nregex?: InputMaybe<Scalars["String"]>;
  /** does the column NOT match the given SQL regular expression */
  _nsimilar?: InputMaybe<Scalars["String"]>;
  /** does the column match the given POSIX regular expression, case sensitive */
  _regex?: InputMaybe<Scalars["String"]>;
  /** does the column match the given SQL regular expression */
  _similar?: InputMaybe<Scalars["String"]>;
};

/** columns and relationships of "charts" */
export type Charts = {
  __typename?: "charts";
  bpm: Scalars["String"];
  chain?: Maybe<Scalars["Int"]>;
  composer?: Maybe<Scalars["String"]>;
  effector?: Maybe<Scalars["String"]>;
  id: Scalars["Int"];
  /** An array relationship */
  likes: Array<Likes>;
  lv?: Maybe<Scalars["Int"]>;
  official_ranking_url?: Maybe<Scalars["String"]>;
  sdvxin_url?: Maybe<Scalars["String"]>;
  song_name: Scalars["String"];
};

/** columns and relationships of "charts" */
export type ChartsLikesArgs = {
  distinct_on?: InputMaybe<Array<Likes_Select_Column>>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  order_by?: InputMaybe<Array<Likes_Order_By>>;
  where?: InputMaybe<Likes_Bool_Exp>;
};

/** Boolean expression to filter rows from the table "charts". All fields are combined with a logical 'AND'. */
export type Charts_Bool_Exp = {
  _and?: InputMaybe<Array<Charts_Bool_Exp>>;
  _not?: InputMaybe<Charts_Bool_Exp>;
  _or?: InputMaybe<Array<Charts_Bool_Exp>>;
  bpm?: InputMaybe<String_Comparison_Exp>;
  chain?: InputMaybe<Int_Comparison_Exp>;
  composer?: InputMaybe<String_Comparison_Exp>;
  effector?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<Int_Comparison_Exp>;
  likes?: InputMaybe<Likes_Bool_Exp>;
  lv?: InputMaybe<Int_Comparison_Exp>;
  official_ranking_url?: InputMaybe<String_Comparison_Exp>;
  sdvxin_url?: InputMaybe<String_Comparison_Exp>;
  song_name?: InputMaybe<String_Comparison_Exp>;
};

/** Ordering options when selecting data from "charts". */
export type Charts_Order_By = {
  bpm?: InputMaybe<Order_By>;
  chain?: InputMaybe<Order_By>;
  composer?: InputMaybe<Order_By>;
  effector?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  likes_aggregate?: InputMaybe<Likes_Aggregate_Order_By>;
  lv?: InputMaybe<Order_By>;
  official_ranking_url?: InputMaybe<Order_By>;
  sdvxin_url?: InputMaybe<Order_By>;
  song_name?: InputMaybe<Order_By>;
};

/** select columns of table "charts" */
export enum Charts_Select_Column {
  /** column name */
  Bpm = "bpm",
  /** column name */
  Chain = "chain",
  /** column name */
  Composer = "composer",
  /** column name */
  Effector = "effector",
  /** column name */
  Id = "id",
  /** column name */
  Lv = "lv",
  /** column name */
  OfficialRankingUrl = "official_ranking_url",
  /** column name */
  SdvxinUrl = "sdvxin_url",
  /** column name */
  SongName = "song_name",
}

/** Streaming cursor of the table "charts" */
export type Charts_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Charts_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Charts_Stream_Cursor_Value_Input = {
  bpm?: InputMaybe<Scalars["String"]>;
  chain?: InputMaybe<Scalars["Int"]>;
  composer?: InputMaybe<Scalars["String"]>;
  effector?: InputMaybe<Scalars["String"]>;
  id?: InputMaybe<Scalars["Int"]>;
  lv?: InputMaybe<Scalars["Int"]>;
  official_ranking_url?: InputMaybe<Scalars["String"]>;
  sdvxin_url?: InputMaybe<Scalars["String"]>;
  song_name?: InputMaybe<Scalars["String"]>;
};

/** ordering argument of a cursor */
export enum Cursor_Ordering {
  /** ascending ordering of the cursor */
  Asc = "ASC",
  /** descending ordering of the cursor */
  Desc = "DESC",
}

/** columns and relationships of "likes" */
export type Likes = {
  __typename?: "likes";
  /** An object relationship */
  charts?: Maybe<Charts>;
  id: Scalars["Int"];
  id_Chart?: Maybe<Scalars["Int"]>;
  id_User?: Maybe<Scalars["String"]>;
  /** An array relationship */
  likes: Array<Likes>;
};

/** columns and relationships of "likes" */
export type LikesLikesArgs = {
  distinct_on?: InputMaybe<Array<Likes_Select_Column>>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  order_by?: InputMaybe<Array<Likes_Order_By>>;
  where?: InputMaybe<Likes_Bool_Exp>;
};

/** order by aggregate values of table "likes" */
export type Likes_Aggregate_Order_By = {
  avg?: InputMaybe<Likes_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Likes_Max_Order_By>;
  min?: InputMaybe<Likes_Min_Order_By>;
  stddev?: InputMaybe<Likes_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Likes_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Likes_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Likes_Sum_Order_By>;
  var_pop?: InputMaybe<Likes_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Likes_Var_Samp_Order_By>;
  variance?: InputMaybe<Likes_Variance_Order_By>;
};

/** order by avg() on columns of table "likes" */
export type Likes_Avg_Order_By = {
  id?: InputMaybe<Order_By>;
  id_Chart?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "likes". All fields are combined with a logical 'AND'. */
export type Likes_Bool_Exp = {
  _and?: InputMaybe<Array<Likes_Bool_Exp>>;
  _not?: InputMaybe<Likes_Bool_Exp>;
  _or?: InputMaybe<Array<Likes_Bool_Exp>>;
  charts?: InputMaybe<Charts_Bool_Exp>;
  id?: InputMaybe<Int_Comparison_Exp>;
  id_Chart?: InputMaybe<Int_Comparison_Exp>;
  id_User?: InputMaybe<String_Comparison_Exp>;
  likes?: InputMaybe<Likes_Bool_Exp>;
};

/** order by max() on columns of table "likes" */
export type Likes_Max_Order_By = {
  id?: InputMaybe<Order_By>;
  id_Chart?: InputMaybe<Order_By>;
  id_User?: InputMaybe<Order_By>;
};

/** order by min() on columns of table "likes" */
export type Likes_Min_Order_By = {
  id?: InputMaybe<Order_By>;
  id_Chart?: InputMaybe<Order_By>;
  id_User?: InputMaybe<Order_By>;
};

/** Ordering options when selecting data from "likes". */
export type Likes_Order_By = {
  charts?: InputMaybe<Charts_Order_By>;
  id?: InputMaybe<Order_By>;
  id_Chart?: InputMaybe<Order_By>;
  id_User?: InputMaybe<Order_By>;
  likes_aggregate?: InputMaybe<Likes_Aggregate_Order_By>;
};

/** select columns of table "likes" */
export enum Likes_Select_Column {
  /** column name */
  Id = "id",
  /** column name */
  IdChart = "id_Chart",
  /** column name */
  IdUser = "id_User",
}

/** order by stddev() on columns of table "likes" */
export type Likes_Stddev_Order_By = {
  id?: InputMaybe<Order_By>;
  id_Chart?: InputMaybe<Order_By>;
};

/** order by stddev_pop() on columns of table "likes" */
export type Likes_Stddev_Pop_Order_By = {
  id?: InputMaybe<Order_By>;
  id_Chart?: InputMaybe<Order_By>;
};

/** order by stddev_samp() on columns of table "likes" */
export type Likes_Stddev_Samp_Order_By = {
  id?: InputMaybe<Order_By>;
  id_Chart?: InputMaybe<Order_By>;
};

/** Streaming cursor of the table "likes" */
export type Likes_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Likes_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Likes_Stream_Cursor_Value_Input = {
  id?: InputMaybe<Scalars["Int"]>;
  id_Chart?: InputMaybe<Scalars["Int"]>;
  id_User?: InputMaybe<Scalars["String"]>;
};

/** order by sum() on columns of table "likes" */
export type Likes_Sum_Order_By = {
  id?: InputMaybe<Order_By>;
  id_Chart?: InputMaybe<Order_By>;
};

/** order by var_pop() on columns of table "likes" */
export type Likes_Var_Pop_Order_By = {
  id?: InputMaybe<Order_By>;
  id_Chart?: InputMaybe<Order_By>;
};

/** order by var_samp() on columns of table "likes" */
export type Likes_Var_Samp_Order_By = {
  id?: InputMaybe<Order_By>;
  id_Chart?: InputMaybe<Order_By>;
};

/** order by variance() on columns of table "likes" */
export type Likes_Variance_Order_By = {
  id?: InputMaybe<Order_By>;
  id_Chart?: InputMaybe<Order_By>;
};

/** column ordering options */
export enum Order_By {
  /** in ascending order, nulls last */
  Asc = "asc",
  /** in ascending order, nulls first */
  AscNullsFirst = "asc_nulls_first",
  /** in ascending order, nulls last */
  AscNullsLast = "asc_nulls_last",
  /** in descending order, nulls first */
  Desc = "desc",
  /** in descending order, nulls first */
  DescNullsFirst = "desc_nulls_first",
  /** in descending order, nulls last */
  DescNullsLast = "desc_nulls_last",
}

export type Query_Root = {
  __typename?: "query_root";
  /** fetch data from the table: "charts" */
  charts: Array<Charts>;
  /** fetch data from the table: "charts" using primary key columns */
  charts_by_pk?: Maybe<Charts>;
  /** An array relationship */
  likes: Array<Likes>;
  /** fetch data from the table: "likes" using primary key columns */
  likes_by_pk?: Maybe<Likes>;
};

export type Query_RootChartsArgs = {
  distinct_on?: InputMaybe<Array<Charts_Select_Column>>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  order_by?: InputMaybe<Array<Charts_Order_By>>;
  where?: InputMaybe<Charts_Bool_Exp>;
};

export type Query_RootCharts_By_PkArgs = {
  id: Scalars["Int"];
};

export type Query_RootLikesArgs = {
  distinct_on?: InputMaybe<Array<Likes_Select_Column>>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  order_by?: InputMaybe<Array<Likes_Order_By>>;
  where?: InputMaybe<Likes_Bool_Exp>;
};

export type Query_RootLikes_By_PkArgs = {
  id: Scalars["Int"];
};

export type Subscription_Root = {
  __typename?: "subscription_root";
  /** fetch data from the table: "charts" */
  charts: Array<Charts>;
  /** fetch data from the table: "charts" using primary key columns */
  charts_by_pk?: Maybe<Charts>;
  /** fetch data from the table in a streaming manner: "charts" */
  charts_stream: Array<Charts>;
  /** An array relationship */
  likes: Array<Likes>;
  /** fetch data from the table: "likes" using primary key columns */
  likes_by_pk?: Maybe<Likes>;
  /** fetch data from the table in a streaming manner: "likes" */
  likes_stream: Array<Likes>;
};

export type Subscription_RootChartsArgs = {
  distinct_on?: InputMaybe<Array<Charts_Select_Column>>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  order_by?: InputMaybe<Array<Charts_Order_By>>;
  where?: InputMaybe<Charts_Bool_Exp>;
};

export type Subscription_RootCharts_By_PkArgs = {
  id: Scalars["Int"];
};

export type Subscription_RootCharts_StreamArgs = {
  batch_size: Scalars["Int"];
  cursor: Array<InputMaybe<Charts_Stream_Cursor_Input>>;
  where?: InputMaybe<Charts_Bool_Exp>;
};

export type Subscription_RootLikesArgs = {
  distinct_on?: InputMaybe<Array<Likes_Select_Column>>;
  limit?: InputMaybe<Scalars["Int"]>;
  offset?: InputMaybe<Scalars["Int"]>;
  order_by?: InputMaybe<Array<Likes_Order_By>>;
  where?: InputMaybe<Likes_Bool_Exp>;
};

export type Subscription_RootLikes_By_PkArgs = {
  id: Scalars["Int"];
};

export type Subscription_RootLikes_StreamArgs = {
  batch_size: Scalars["Int"];
  cursor: Array<InputMaybe<Likes_Stream_Cursor_Input>>;
  where?: InputMaybe<Likes_Bool_Exp>;
};

export type MyQueryQueryVariables = Exact<{
  bpm: Scalars["String"];
  uid: Scalars["String"];
}>;

export type MyQueryQuery = {
  __typename?: "query_root";
  charts: Array<{
    __typename?: "charts";
    song_name: string;
    id: number;
    official_ranking_url?: string | null;
    effector?: string | null;
    lv?: number | null;
    bpm: string;
    likes: Array<{
      __typename?: "likes";
      id: number;
      id_Chart?: number | null;
      id_User?: string | null;
    }>;
  }>;
};

export const MyQueryDocumentQuery = gql`
  query MyQuery($bpm: String!, $uid: String!) {
    charts(where: { bpm: { _eq: $bpm } }) {
      likes(where: { id_User: { _eq: $uid } }) {
        id
        id_Chart
        id_User
      }
      song_name
      id
      official_ranking_url
      effector
      lv
      bpm
    }
  }
`;

export function useMyQueryQuery(
  options: Omit<Urql.UseQueryArgs<MyQueryQueryVariables>, "query">
) {
  return Urql.useQuery<MyQueryQuery, MyQueryQueryVariables>({
    query: MyQueryDocumentQuery,
    ...options,
  });
}

export const MyQueryDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "MyQuery" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "bpm" } },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "uid" } },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "charts" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "where" },
                value: {
                  kind: "ObjectValue",
                  fields: [
                    {
                      kind: "ObjectField",
                      name: { kind: "Name", value: "bpm" },
                      value: {
                        kind: "ObjectValue",
                        fields: [
                          {
                            kind: "ObjectField",
                            name: { kind: "Name", value: "_eq" },
                            value: {
                              kind: "Variable",
                              name: { kind: "Name", value: "bpm" },
                            },
                          },
                        ],
                      },
                    },
                  ],
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "likes" },
                  arguments: [
                    {
                      kind: "Argument",
                      name: { kind: "Name", value: "where" },
                      value: {
                        kind: "ObjectValue",
                        fields: [
                          {
                            kind: "ObjectField",
                            name: { kind: "Name", value: "id_User" },
                            value: {
                              kind: "ObjectValue",
                              fields: [
                                {
                                  kind: "ObjectField",
                                  name: { kind: "Name", value: "_eq" },
                                  value: {
                                    kind: "Variable",
                                    name: { kind: "Name", value: "uid" },
                                  },
                                },
                              ],
                            },
                          },
                        ],
                      },
                    },
                  ],
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "id_Chart" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "id_User" },
                      },
                    ],
                  },
                },
                { kind: "Field", name: { kind: "Name", value: "song_name" } },
                { kind: "Field", name: { kind: "Name", value: "id" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "official_ranking_url" },
                },
                { kind: "Field", name: { kind: "Name", value: "effector" } },
                { kind: "Field", name: { kind: "Name", value: "lv" } },
                { kind: "Field", name: { kind: "Name", value: "bpm" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<MyQueryQuery, MyQueryQueryVariables>;
