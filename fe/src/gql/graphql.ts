/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  DateTime: { input: any; output: any; }
};

export type AddPoseToSequenceInput = {
  order: Scalars['Int']['input'];
  poseId: Scalars['Int']['input'];
  sequenceId: Scalars['Int']['input'];
};

export type CreateSequenceInput = {
  description: Scalars['String']['input'];
  name: Scalars['String']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  AddPoseToSequence: PosesInSequences;
  CreateSequence: Sequence;
};


export type MutationAddPoseToSequenceArgs = {
  data: AddPoseToSequenceInput;
};


export type MutationCreateSequenceArgs = {
  data: CreateSequenceInput;
};

export type Pose = {
  __typename?: 'Pose';
  englishName: Scalars['String']['output'];
  foundInSequences?: Maybe<Array<Maybe<PosesInSequences>>>;
  id: Scalars['Int']['output'];
  imageUrl?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
};

export type PoseCreateInput = {
  englishName: Scalars['String']['input'];
  imageUrl: Scalars['String']['input'];
  name: Scalars['String']['input'];
};

export type PosesInSequences = {
  __typename?: 'PosesInSequences';
  order: Scalars['Int']['output'];
  pose: Pose;
  sequence: Sequence;
};

export type Query = {
  __typename?: 'Query';
  allPoses?: Maybe<Array<Maybe<Pose>>>;
  allSequences?: Maybe<Array<Maybe<Sequence>>>;
  oneSequence?: Maybe<Sequence>;
};


export type QueryOneSequenceArgs = {
  id?: InputMaybe<Scalars['Int']['input']>;
};

export type Sequence = {
  __typename?: 'Sequence';
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  poses?: Maybe<Array<Maybe<PosesInSequences>>>;
};

export enum SortOrder {
  Asc = 'asc',
  Desc = 'desc'
}

export type AllPosesQueryVariables = Exact<{ [key: string]: never; }>;


export type AllPosesQuery = { __typename?: 'Query', allPoses?: Array<{ __typename?: 'Pose', id: number, name: string, englishName: string, imageUrl?: string | null } | null> | null };

export type AllSequencesQueryVariables = Exact<{ [key: string]: never; }>;


export type AllSequencesQuery = { __typename?: 'Query', allSequences?: Array<{ __typename?: 'Sequence', id: number, name: string, poses?: Array<{ __typename?: 'PosesInSequences', pose: { __typename?: 'Pose', englishName: string } } | null> | null } | null> | null };

export type OneSequenceQueryVariables = Exact<{
  id?: InputMaybe<Scalars['Int']['input']>;
}>;


export type OneSequenceQuery = { __typename?: 'Query', oneSequence?: { __typename?: 'Sequence', id: number, name: string, description?: string | null, poses?: Array<{ __typename?: 'PosesInSequences', pose: { __typename?: 'Pose', englishName: string } } | null> | null } | null };


export const AllPosesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"allPoses"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"allPoses"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"englishName"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrl"}}]}}]}}]} as unknown as DocumentNode<AllPosesQuery, AllPosesQueryVariables>;
export const AllSequencesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"allSequences"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"allSequences"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"poses"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"pose"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"englishName"}}]}}]}}]}}]}}]} as unknown as DocumentNode<AllSequencesQuery, AllSequencesQueryVariables>;
export const OneSequenceDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"OneSequence"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"oneSequence"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"poses"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"pose"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"englishName"}}]}}]}}]}}]}}]} as unknown as DocumentNode<OneSequenceQuery, OneSequenceQueryVariables>;