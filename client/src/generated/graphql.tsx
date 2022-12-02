import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
};

export type Choice = {
  __typename?: 'Choice';
  id: Scalars['Int'];
  pollId: Scalars['Float'];
  title: Scalars['String'];
  votes: Array<Vote>;
};

export type Comment = {
  __typename?: 'Comment';
  comment_text: Scalars['String'];
  created_at: Scalars['DateTime'];
  id: Scalars['Int'];
  pollId: Scalars['Float'];
  updated_at: Scalars['DateTime'];
  userId: Scalars['Float'];
};

export type Friendship = {
  __typename?: 'Friendship';
  sourceId: User;
  targetId: User;
};

export type LoginResponse = {
  __typename?: 'LoginResponse';
  accessToken: Scalars['String'];
  user: User;
};

export type Mutation = {
  __typename?: 'Mutation';
  addChoice: Choice;
  addComment: Comment;
  addFriend: Scalars['Boolean'];
  addPoll: Poll;
  addVote: Vote;
  deleteChoice: Choice;
  deleteComment: Comment;
  deletePoll: Poll;
  deleteVote: Vote;
  login: LoginResponse;
  logout: Scalars['String'];
  register: User;
  updateChoice: Choice;
  updateComment: Comment;
  updatePoll: Poll;
  updateVote: Vote;
};


export type MutationAddChoiceArgs = {
  pollId: Scalars['Float'];
  title: Scalars['String'];
};


export type MutationAddCommentArgs = {
  comment_text: Scalars['String'];
  pollId: Scalars['Float'];
};


export type MutationAddFriendArgs = {
  targetId: Scalars['Float'];
};


export type MutationAddPollArgs = {
  is_open: Scalars['Boolean'];
  title: Scalars['String'];
  userId: Scalars['Float'];
};


export type MutationAddVoteArgs = {
  choiceId: Scalars['Float'];
  userId: Scalars['Float'];
  value: Scalars['Float'];
};


export type MutationDeleteChoiceArgs = {
  id: Scalars['Float'];
};


export type MutationDeleteCommentArgs = {
  id: Scalars['Float'];
};


export type MutationDeletePollArgs = {
  id: Scalars['Float'];
};


export type MutationDeleteVoteArgs = {
  id: Scalars['Float'];
};


export type MutationLoginArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type MutationRegisterArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
  username: Scalars['String'];
};


export type MutationUpdateChoiceArgs = {
  id: Scalars['Float'];
  title: Scalars['String'];
};


export type MutationUpdateCommentArgs = {
  data: UpdateCommentInput;
  id: Scalars['Float'];
};


export type MutationUpdatePollArgs = {
  data: UpdatePollInput;
  id: Scalars['Float'];
};


export type MutationUpdateVoteArgs = {
  id: Scalars['Float'];
  value: Scalars['Float'];
};

export type Poll = {
  __typename?: 'Poll';
  choices: Array<Choice>;
  comments: Array<Comment>;
  id: Scalars['Int'];
  is_open: Scalars['Boolean'];
  title: Scalars['String'];
  userId: Scalars['Float'];
};

export type Query = {
  __typename?: 'Query';
  choice: Choice;
  choices: Array<Choice>;
  comments: Array<Comment>;
  getFriendsBySourceId: Array<User>;
  getPollAndChoices: Poll;
  isEmailUsed: Scalars['Boolean'];
  me?: Maybe<User>;
  poll: Poll;
  polls: Array<Poll>;
  user: User;
  users: Array<User>;
  vote: Vote;
  votes: Array<Vote>;
};


export type QueryChoiceArgs = {
  id: Scalars['Float'];
};


export type QueryGetFriendsBySourceIdArgs = {
  sourceId: Scalars['Float'];
};


export type QueryGetPollAndChoicesArgs = {
  id: Scalars['Float'];
};


export type QueryIsEmailUsedArgs = {
  email: Scalars['String'];
};


export type QueryPollArgs = {
  id: Scalars['Float'];
};


export type QueryUserArgs = {
  id: Scalars['Float'];
};


export type QueryVoteArgs = {
  id: Scalars['Float'];
};

export type UpdateCommentInput = {
  comment_text: Scalars['String'];
};

export type UpdatePollInput = {
  is_open: Scalars['Boolean'];
  title: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  email: Scalars['String'];
  id: Scalars['Int'];
  username: Scalars['String'];
};

export type Vote = {
  __typename?: 'Vote';
  choiceId: Scalars['Float'];
  id: Scalars['Int'];
  userId: Scalars['Float'];
  value: Scalars['Float'];
};

export type AddChoiceMutationVariables = Exact<{
  title: Scalars['String'];
  pollId: Scalars['Float'];
}>;


export type AddChoiceMutation = { __typename?: 'Mutation', addChoice: { __typename?: 'Choice', id: number, title: string } };

export type AddPollMutationVariables = Exact<{
  title: Scalars['String'];
  is_open: Scalars['Boolean'];
  userId: Scalars['Float'];
}>;


export type AddPollMutation = { __typename?: 'Mutation', addPoll: { __typename?: 'Poll', title: string, is_open: boolean, userId: number, id: number } };

export type DeleteChoiceMutationVariables = Exact<{
  id: Scalars['Float'];
}>;


export type DeleteChoiceMutation = { __typename?: 'Mutation', deleteChoice: { __typename?: 'Choice', title: string } };

export type IsEmailUsedQueryVariables = Exact<{
  email: Scalars['String'];
}>;


export type IsEmailUsedQuery = { __typename?: 'Query', isEmailUsed: boolean };

export type LoginMutationVariables = Exact<{
  password: Scalars['String'];
  email: Scalars['String'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'LoginResponse', accessToken: string, user: { __typename?: 'User', id: number, username: string, email: string } } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: string };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: { __typename?: 'User', id: number, username: string, email: string } | null };

export type PollQueryVariables = Exact<{
  id: Scalars['Float'];
}>;


export type PollQuery = { __typename?: 'Query', poll: { __typename?: 'Poll', id: number, is_open: boolean, title: string, userId: number, comments: Array<{ __typename?: 'Comment', comment_text: string, id: number, userId: number }>, choices: Array<{ __typename?: 'Choice', title: string, id: number }> } };

export type RegisterMutationVariables = Exact<{
  password: Scalars['String'];
  email: Scalars['String'];
  username: Scalars['String'];
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'User', id: number, username: string, email: string } };

export type UserQueryVariables = Exact<{
  userId: Scalars['Float'];
}>;


export type UserQuery = { __typename?: 'Query', user: { __typename?: 'User', id: number, username: string, email: string } };


export const AddChoiceDocument = gql`
    mutation addChoice($title: String!, $pollId: Float!) {
  addChoice(title: $title, pollId: $pollId) {
    id
    title
  }
}
    `;
export type AddChoiceMutationFn = Apollo.MutationFunction<AddChoiceMutation, AddChoiceMutationVariables>;

/**
 * __useAddChoiceMutation__
 *
 * To run a mutation, you first call `useAddChoiceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddChoiceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addChoiceMutation, { data, loading, error }] = useAddChoiceMutation({
 *   variables: {
 *      title: // value for 'title'
 *      pollId: // value for 'pollId'
 *   },
 * });
 */
export function useAddChoiceMutation(baseOptions?: Apollo.MutationHookOptions<AddChoiceMutation, AddChoiceMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddChoiceMutation, AddChoiceMutationVariables>(AddChoiceDocument, options);
      }
export type AddChoiceMutationHookResult = ReturnType<typeof useAddChoiceMutation>;
export type AddChoiceMutationResult = Apollo.MutationResult<AddChoiceMutation>;
export type AddChoiceMutationOptions = Apollo.BaseMutationOptions<AddChoiceMutation, AddChoiceMutationVariables>;
export const AddPollDocument = gql`
    mutation addPoll($title: String!, $is_open: Boolean!, $userId: Float!) {
  addPoll(title: $title, is_open: $is_open, userId: $userId) {
    title
    is_open
    userId
    id
  }
}
    `;
export type AddPollMutationFn = Apollo.MutationFunction<AddPollMutation, AddPollMutationVariables>;

/**
 * __useAddPollMutation__
 *
 * To run a mutation, you first call `useAddPollMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddPollMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addPollMutation, { data, loading, error }] = useAddPollMutation({
 *   variables: {
 *      title: // value for 'title'
 *      is_open: // value for 'is_open'
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useAddPollMutation(baseOptions?: Apollo.MutationHookOptions<AddPollMutation, AddPollMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddPollMutation, AddPollMutationVariables>(AddPollDocument, options);
      }
export type AddPollMutationHookResult = ReturnType<typeof useAddPollMutation>;
export type AddPollMutationResult = Apollo.MutationResult<AddPollMutation>;
export type AddPollMutationOptions = Apollo.BaseMutationOptions<AddPollMutation, AddPollMutationVariables>;
export const DeleteChoiceDocument = gql`
    mutation deleteChoice($id: Float!) {
  deleteChoice(id: $id) {
    title
  }
}
    `;
export type DeleteChoiceMutationFn = Apollo.MutationFunction<DeleteChoiceMutation, DeleteChoiceMutationVariables>;

/**
 * __useDeleteChoiceMutation__
 *
 * To run a mutation, you first call `useDeleteChoiceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteChoiceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteChoiceMutation, { data, loading, error }] = useDeleteChoiceMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteChoiceMutation(baseOptions?: Apollo.MutationHookOptions<DeleteChoiceMutation, DeleteChoiceMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteChoiceMutation, DeleteChoiceMutationVariables>(DeleteChoiceDocument, options);
      }
export type DeleteChoiceMutationHookResult = ReturnType<typeof useDeleteChoiceMutation>;
export type DeleteChoiceMutationResult = Apollo.MutationResult<DeleteChoiceMutation>;
export type DeleteChoiceMutationOptions = Apollo.BaseMutationOptions<DeleteChoiceMutation, DeleteChoiceMutationVariables>;
export const IsEmailUsedDocument = gql`
    query IsEmailUsed($email: String!) {
  isEmailUsed(email: $email)
}
    `;

/**
 * __useIsEmailUsedQuery__
 *
 * To run a query within a React component, call `useIsEmailUsedQuery` and pass it any options that fit your needs.
 * When your component renders, `useIsEmailUsedQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useIsEmailUsedQuery({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useIsEmailUsedQuery(baseOptions: Apollo.QueryHookOptions<IsEmailUsedQuery, IsEmailUsedQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<IsEmailUsedQuery, IsEmailUsedQueryVariables>(IsEmailUsedDocument, options);
      }
export function useIsEmailUsedLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<IsEmailUsedQuery, IsEmailUsedQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<IsEmailUsedQuery, IsEmailUsedQueryVariables>(IsEmailUsedDocument, options);
        }
export type IsEmailUsedQueryHookResult = ReturnType<typeof useIsEmailUsedQuery>;
export type IsEmailUsedLazyQueryHookResult = ReturnType<typeof useIsEmailUsedLazyQuery>;
export type IsEmailUsedQueryResult = Apollo.QueryResult<IsEmailUsedQuery, IsEmailUsedQueryVariables>;
export const LoginDocument = gql`
    mutation Login($password: String!, $email: String!) {
  login(password: $password, email: $email) {
    accessToken
    user {
      id
      username
      email
    }
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      password: // value for 'password'
 *      email: // value for 'email'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, options);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const MeDocument = gql`
    query Me {
  me {
    id
    username
    email
  }
}
    `;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const PollDocument = gql`
    query poll($id: Float!) {
  poll(id: $id) {
    id
    is_open
    title
    userId
    comments {
      comment_text
      id
      userId
    }
    choices {
      title
      id
    }
  }
}
    `;

/**
 * __usePollQuery__
 *
 * To run a query within a React component, call `usePollQuery` and pass it any options that fit your needs.
 * When your component renders, `usePollQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePollQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function usePollQuery(baseOptions: Apollo.QueryHookOptions<PollQuery, PollQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PollQuery, PollQueryVariables>(PollDocument, options);
      }
export function usePollLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PollQuery, PollQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PollQuery, PollQueryVariables>(PollDocument, options);
        }
export type PollQueryHookResult = ReturnType<typeof usePollQuery>;
export type PollLazyQueryHookResult = ReturnType<typeof usePollLazyQuery>;
export type PollQueryResult = Apollo.QueryResult<PollQuery, PollQueryVariables>;
export const RegisterDocument = gql`
    mutation Register($password: String!, $email: String!, $username: String!) {
  register(password: $password, email: $email, username: $username) {
    id
    username
    email
  }
}
    `;
export type RegisterMutationFn = Apollo.MutationFunction<RegisterMutation, RegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      password: // value for 'password'
 *      email: // value for 'email'
 *      username: // value for 'username'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, options);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const UserDocument = gql`
    query User($userId: Float!) {
  user(id: $userId) {
    id
    username
    email
  }
}
    `;

/**
 * __useUserQuery__
 *
 * To run a query within a React component, call `useUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useUserQuery(baseOptions: Apollo.QueryHookOptions<UserQuery, UserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserQuery, UserQueryVariables>(UserDocument, options);
      }
export function useUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserQuery, UserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserQuery, UserQueryVariables>(UserDocument, options);
        }
export type UserQueryHookResult = ReturnType<typeof useUserQuery>;
export type UserLazyQueryHookResult = ReturnType<typeof useUserLazyQuery>;
export type UserQueryResult = Apollo.QueryResult<UserQuery, UserQueryVariables>;