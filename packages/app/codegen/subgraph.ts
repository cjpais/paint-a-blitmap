import { gql } from 'urql';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  BigDecimal: any;
  BigInt: any;
  Bytes: any;
};

export type Blitmap = {
  readonly __typename?: 'Blitmap';
  readonly affinity?: Maybe<ReadonlyArray<Scalars['String']>>;
  readonly blockCreatedAt: Scalars['BigInt'];
  readonly creator: Scalars['Bytes'];
  readonly creatorName: Scalars['String'];
  readonly data: Scalars['Bytes'];
  readonly id: Scalars['ID'];
  readonly isOriginal: Scalars['Boolean'];
  readonly name: Scalars['String'];
  readonly owner: Scalars['Bytes'];
  readonly parents?: Maybe<ReadonlyArray<Scalars['BigInt']>>;
  readonly remainingVariants: Scalars['BigInt'];
  readonly slabs?: Maybe<ReadonlyArray<Scalars['String']>>;
  readonly svg?: Maybe<Scalars['String']>;
  readonly timeCreatedAt: Scalars['BigInt'];
  readonly tokenID: Scalars['BigInt'];
};

export type Blitmap_Filter = {
  /** Filter for the block changed event. */
  readonly _change_block?: InputMaybe<BlockChangedFilter>;
  readonly affinity?: InputMaybe<ReadonlyArray<Scalars['String']>>;
  readonly affinity_contains?: InputMaybe<ReadonlyArray<Scalars['String']>>;
  readonly affinity_contains_nocase?: InputMaybe<ReadonlyArray<Scalars['String']>>;
  readonly affinity_not?: InputMaybe<ReadonlyArray<Scalars['String']>>;
  readonly affinity_not_contains?: InputMaybe<ReadonlyArray<Scalars['String']>>;
  readonly affinity_not_contains_nocase?: InputMaybe<ReadonlyArray<Scalars['String']>>;
  readonly blockCreatedAt?: InputMaybe<Scalars['BigInt']>;
  readonly blockCreatedAt_gt?: InputMaybe<Scalars['BigInt']>;
  readonly blockCreatedAt_gte?: InputMaybe<Scalars['BigInt']>;
  readonly blockCreatedAt_in?: InputMaybe<ReadonlyArray<Scalars['BigInt']>>;
  readonly blockCreatedAt_lt?: InputMaybe<Scalars['BigInt']>;
  readonly blockCreatedAt_lte?: InputMaybe<Scalars['BigInt']>;
  readonly blockCreatedAt_not?: InputMaybe<Scalars['BigInt']>;
  readonly blockCreatedAt_not_in?: InputMaybe<ReadonlyArray<Scalars['BigInt']>>;
  readonly creator?: InputMaybe<Scalars['Bytes']>;
  readonly creatorName?: InputMaybe<Scalars['String']>;
  readonly creatorName_contains?: InputMaybe<Scalars['String']>;
  readonly creatorName_contains_nocase?: InputMaybe<Scalars['String']>;
  readonly creatorName_ends_with?: InputMaybe<Scalars['String']>;
  readonly creatorName_ends_with_nocase?: InputMaybe<Scalars['String']>;
  readonly creatorName_gt?: InputMaybe<Scalars['String']>;
  readonly creatorName_gte?: InputMaybe<Scalars['String']>;
  readonly creatorName_in?: InputMaybe<ReadonlyArray<Scalars['String']>>;
  readonly creatorName_lt?: InputMaybe<Scalars['String']>;
  readonly creatorName_lte?: InputMaybe<Scalars['String']>;
  readonly creatorName_not?: InputMaybe<Scalars['String']>;
  readonly creatorName_not_contains?: InputMaybe<Scalars['String']>;
  readonly creatorName_not_contains_nocase?: InputMaybe<Scalars['String']>;
  readonly creatorName_not_ends_with?: InputMaybe<Scalars['String']>;
  readonly creatorName_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  readonly creatorName_not_in?: InputMaybe<ReadonlyArray<Scalars['String']>>;
  readonly creatorName_not_starts_with?: InputMaybe<Scalars['String']>;
  readonly creatorName_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  readonly creatorName_starts_with?: InputMaybe<Scalars['String']>;
  readonly creatorName_starts_with_nocase?: InputMaybe<Scalars['String']>;
  readonly creator_contains?: InputMaybe<Scalars['Bytes']>;
  readonly creator_in?: InputMaybe<ReadonlyArray<Scalars['Bytes']>>;
  readonly creator_not?: InputMaybe<Scalars['Bytes']>;
  readonly creator_not_contains?: InputMaybe<Scalars['Bytes']>;
  readonly creator_not_in?: InputMaybe<ReadonlyArray<Scalars['Bytes']>>;
  readonly data?: InputMaybe<Scalars['Bytes']>;
  readonly data_contains?: InputMaybe<Scalars['Bytes']>;
  readonly data_in?: InputMaybe<ReadonlyArray<Scalars['Bytes']>>;
  readonly data_not?: InputMaybe<Scalars['Bytes']>;
  readonly data_not_contains?: InputMaybe<Scalars['Bytes']>;
  readonly data_not_in?: InputMaybe<ReadonlyArray<Scalars['Bytes']>>;
  readonly id?: InputMaybe<Scalars['ID']>;
  readonly id_gt?: InputMaybe<Scalars['ID']>;
  readonly id_gte?: InputMaybe<Scalars['ID']>;
  readonly id_in?: InputMaybe<ReadonlyArray<Scalars['ID']>>;
  readonly id_lt?: InputMaybe<Scalars['ID']>;
  readonly id_lte?: InputMaybe<Scalars['ID']>;
  readonly id_not?: InputMaybe<Scalars['ID']>;
  readonly id_not_in?: InputMaybe<ReadonlyArray<Scalars['ID']>>;
  readonly isOriginal?: InputMaybe<Scalars['Boolean']>;
  readonly isOriginal_in?: InputMaybe<ReadonlyArray<Scalars['Boolean']>>;
  readonly isOriginal_not?: InputMaybe<Scalars['Boolean']>;
  readonly isOriginal_not_in?: InputMaybe<ReadonlyArray<Scalars['Boolean']>>;
  readonly name?: InputMaybe<Scalars['String']>;
  readonly name_contains?: InputMaybe<Scalars['String']>;
  readonly name_contains_nocase?: InputMaybe<Scalars['String']>;
  readonly name_ends_with?: InputMaybe<Scalars['String']>;
  readonly name_ends_with_nocase?: InputMaybe<Scalars['String']>;
  readonly name_gt?: InputMaybe<Scalars['String']>;
  readonly name_gte?: InputMaybe<Scalars['String']>;
  readonly name_in?: InputMaybe<ReadonlyArray<Scalars['String']>>;
  readonly name_lt?: InputMaybe<Scalars['String']>;
  readonly name_lte?: InputMaybe<Scalars['String']>;
  readonly name_not?: InputMaybe<Scalars['String']>;
  readonly name_not_contains?: InputMaybe<Scalars['String']>;
  readonly name_not_contains_nocase?: InputMaybe<Scalars['String']>;
  readonly name_not_ends_with?: InputMaybe<Scalars['String']>;
  readonly name_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  readonly name_not_in?: InputMaybe<ReadonlyArray<Scalars['String']>>;
  readonly name_not_starts_with?: InputMaybe<Scalars['String']>;
  readonly name_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  readonly name_starts_with?: InputMaybe<Scalars['String']>;
  readonly name_starts_with_nocase?: InputMaybe<Scalars['String']>;
  readonly owner?: InputMaybe<Scalars['Bytes']>;
  readonly owner_contains?: InputMaybe<Scalars['Bytes']>;
  readonly owner_in?: InputMaybe<ReadonlyArray<Scalars['Bytes']>>;
  readonly owner_not?: InputMaybe<Scalars['Bytes']>;
  readonly owner_not_contains?: InputMaybe<Scalars['Bytes']>;
  readonly owner_not_in?: InputMaybe<ReadonlyArray<Scalars['Bytes']>>;
  readonly parents?: InputMaybe<ReadonlyArray<Scalars['BigInt']>>;
  readonly parents_contains?: InputMaybe<ReadonlyArray<Scalars['BigInt']>>;
  readonly parents_contains_nocase?: InputMaybe<ReadonlyArray<Scalars['BigInt']>>;
  readonly parents_not?: InputMaybe<ReadonlyArray<Scalars['BigInt']>>;
  readonly parents_not_contains?: InputMaybe<ReadonlyArray<Scalars['BigInt']>>;
  readonly parents_not_contains_nocase?: InputMaybe<ReadonlyArray<Scalars['BigInt']>>;
  readonly remainingVariants?: InputMaybe<Scalars['BigInt']>;
  readonly remainingVariants_gt?: InputMaybe<Scalars['BigInt']>;
  readonly remainingVariants_gte?: InputMaybe<Scalars['BigInt']>;
  readonly remainingVariants_in?: InputMaybe<ReadonlyArray<Scalars['BigInt']>>;
  readonly remainingVariants_lt?: InputMaybe<Scalars['BigInt']>;
  readonly remainingVariants_lte?: InputMaybe<Scalars['BigInt']>;
  readonly remainingVariants_not?: InputMaybe<Scalars['BigInt']>;
  readonly remainingVariants_not_in?: InputMaybe<ReadonlyArray<Scalars['BigInt']>>;
  readonly slabs?: InputMaybe<ReadonlyArray<Scalars['String']>>;
  readonly slabs_contains?: InputMaybe<ReadonlyArray<Scalars['String']>>;
  readonly slabs_contains_nocase?: InputMaybe<ReadonlyArray<Scalars['String']>>;
  readonly slabs_not?: InputMaybe<ReadonlyArray<Scalars['String']>>;
  readonly slabs_not_contains?: InputMaybe<ReadonlyArray<Scalars['String']>>;
  readonly slabs_not_contains_nocase?: InputMaybe<ReadonlyArray<Scalars['String']>>;
  readonly svg?: InputMaybe<Scalars['String']>;
  readonly svg_contains?: InputMaybe<Scalars['String']>;
  readonly svg_contains_nocase?: InputMaybe<Scalars['String']>;
  readonly svg_ends_with?: InputMaybe<Scalars['String']>;
  readonly svg_ends_with_nocase?: InputMaybe<Scalars['String']>;
  readonly svg_gt?: InputMaybe<Scalars['String']>;
  readonly svg_gte?: InputMaybe<Scalars['String']>;
  readonly svg_in?: InputMaybe<ReadonlyArray<Scalars['String']>>;
  readonly svg_lt?: InputMaybe<Scalars['String']>;
  readonly svg_lte?: InputMaybe<Scalars['String']>;
  readonly svg_not?: InputMaybe<Scalars['String']>;
  readonly svg_not_contains?: InputMaybe<Scalars['String']>;
  readonly svg_not_contains_nocase?: InputMaybe<Scalars['String']>;
  readonly svg_not_ends_with?: InputMaybe<Scalars['String']>;
  readonly svg_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  readonly svg_not_in?: InputMaybe<ReadonlyArray<Scalars['String']>>;
  readonly svg_not_starts_with?: InputMaybe<Scalars['String']>;
  readonly svg_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  readonly svg_starts_with?: InputMaybe<Scalars['String']>;
  readonly svg_starts_with_nocase?: InputMaybe<Scalars['String']>;
  readonly timeCreatedAt?: InputMaybe<Scalars['BigInt']>;
  readonly timeCreatedAt_gt?: InputMaybe<Scalars['BigInt']>;
  readonly timeCreatedAt_gte?: InputMaybe<Scalars['BigInt']>;
  readonly timeCreatedAt_in?: InputMaybe<ReadonlyArray<Scalars['BigInt']>>;
  readonly timeCreatedAt_lt?: InputMaybe<Scalars['BigInt']>;
  readonly timeCreatedAt_lte?: InputMaybe<Scalars['BigInt']>;
  readonly timeCreatedAt_not?: InputMaybe<Scalars['BigInt']>;
  readonly timeCreatedAt_not_in?: InputMaybe<ReadonlyArray<Scalars['BigInt']>>;
  readonly tokenID?: InputMaybe<Scalars['BigInt']>;
  readonly tokenID_gt?: InputMaybe<Scalars['BigInt']>;
  readonly tokenID_gte?: InputMaybe<Scalars['BigInt']>;
  readonly tokenID_in?: InputMaybe<ReadonlyArray<Scalars['BigInt']>>;
  readonly tokenID_lt?: InputMaybe<Scalars['BigInt']>;
  readonly tokenID_lte?: InputMaybe<Scalars['BigInt']>;
  readonly tokenID_not?: InputMaybe<Scalars['BigInt']>;
  readonly tokenID_not_in?: InputMaybe<ReadonlyArray<Scalars['BigInt']>>;
};

export enum Blitmap_OrderBy {
  Affinity = 'affinity',
  BlockCreatedAt = 'blockCreatedAt',
  Creator = 'creator',
  CreatorName = 'creatorName',
  Data = 'data',
  Id = 'id',
  IsOriginal = 'isOriginal',
  Name = 'name',
  Owner = 'owner',
  Parents = 'parents',
  RemainingVariants = 'remainingVariants',
  Slabs = 'slabs',
  Svg = 'svg',
  TimeCreatedAt = 'timeCreatedAt',
  TokenId = 'tokenID'
}

export type BlockChangedFilter = {
  readonly number_gte: Scalars['Int'];
};

export type Block_Height = {
  readonly hash?: InputMaybe<Scalars['Bytes']>;
  readonly number?: InputMaybe<Scalars['Int']>;
  readonly number_gte?: InputMaybe<Scalars['Int']>;
};

export type Contract = {
  readonly __typename?: 'Contract';
  readonly allowedOriginals: Scalars['Int'];
  readonly allowedVariants: Scalars['Int'];
  readonly id: Scalars['ID'];
  readonly published: Scalars['Boolean'];
  readonly remainingOriginals: Scalars['Int'];
  readonly totalSupply: Scalars['BigInt'];
};

export type Contract_Filter = {
  /** Filter for the block changed event. */
  readonly _change_block?: InputMaybe<BlockChangedFilter>;
  readonly allowedOriginals?: InputMaybe<Scalars['Int']>;
  readonly allowedOriginals_gt?: InputMaybe<Scalars['Int']>;
  readonly allowedOriginals_gte?: InputMaybe<Scalars['Int']>;
  readonly allowedOriginals_in?: InputMaybe<ReadonlyArray<Scalars['Int']>>;
  readonly allowedOriginals_lt?: InputMaybe<Scalars['Int']>;
  readonly allowedOriginals_lte?: InputMaybe<Scalars['Int']>;
  readonly allowedOriginals_not?: InputMaybe<Scalars['Int']>;
  readonly allowedOriginals_not_in?: InputMaybe<ReadonlyArray<Scalars['Int']>>;
  readonly allowedVariants?: InputMaybe<Scalars['Int']>;
  readonly allowedVariants_gt?: InputMaybe<Scalars['Int']>;
  readonly allowedVariants_gte?: InputMaybe<Scalars['Int']>;
  readonly allowedVariants_in?: InputMaybe<ReadonlyArray<Scalars['Int']>>;
  readonly allowedVariants_lt?: InputMaybe<Scalars['Int']>;
  readonly allowedVariants_lte?: InputMaybe<Scalars['Int']>;
  readonly allowedVariants_not?: InputMaybe<Scalars['Int']>;
  readonly allowedVariants_not_in?: InputMaybe<ReadonlyArray<Scalars['Int']>>;
  readonly id?: InputMaybe<Scalars['ID']>;
  readonly id_gt?: InputMaybe<Scalars['ID']>;
  readonly id_gte?: InputMaybe<Scalars['ID']>;
  readonly id_in?: InputMaybe<ReadonlyArray<Scalars['ID']>>;
  readonly id_lt?: InputMaybe<Scalars['ID']>;
  readonly id_lte?: InputMaybe<Scalars['ID']>;
  readonly id_not?: InputMaybe<Scalars['ID']>;
  readonly id_not_in?: InputMaybe<ReadonlyArray<Scalars['ID']>>;
  readonly published?: InputMaybe<Scalars['Boolean']>;
  readonly published_in?: InputMaybe<ReadonlyArray<Scalars['Boolean']>>;
  readonly published_not?: InputMaybe<Scalars['Boolean']>;
  readonly published_not_in?: InputMaybe<ReadonlyArray<Scalars['Boolean']>>;
  readonly remainingOriginals?: InputMaybe<Scalars['Int']>;
  readonly remainingOriginals_gt?: InputMaybe<Scalars['Int']>;
  readonly remainingOriginals_gte?: InputMaybe<Scalars['Int']>;
  readonly remainingOriginals_in?: InputMaybe<ReadonlyArray<Scalars['Int']>>;
  readonly remainingOriginals_lt?: InputMaybe<Scalars['Int']>;
  readonly remainingOriginals_lte?: InputMaybe<Scalars['Int']>;
  readonly remainingOriginals_not?: InputMaybe<Scalars['Int']>;
  readonly remainingOriginals_not_in?: InputMaybe<ReadonlyArray<Scalars['Int']>>;
  readonly totalSupply?: InputMaybe<Scalars['BigInt']>;
  readonly totalSupply_gt?: InputMaybe<Scalars['BigInt']>;
  readonly totalSupply_gte?: InputMaybe<Scalars['BigInt']>;
  readonly totalSupply_in?: InputMaybe<ReadonlyArray<Scalars['BigInt']>>;
  readonly totalSupply_lt?: InputMaybe<Scalars['BigInt']>;
  readonly totalSupply_lte?: InputMaybe<Scalars['BigInt']>;
  readonly totalSupply_not?: InputMaybe<Scalars['BigInt']>;
  readonly totalSupply_not_in?: InputMaybe<ReadonlyArray<Scalars['BigInt']>>;
};

export enum Contract_OrderBy {
  AllowedOriginals = 'allowedOriginals',
  AllowedVariants = 'allowedVariants',
  Id = 'id',
  Published = 'published',
  RemainingOriginals = 'remainingOriginals',
  TotalSupply = 'totalSupply'
}

/** Defines the order direction, either ascending or descending */
export enum OrderDirection {
  Asc = 'asc',
  Desc = 'desc'
}

export type Query = {
  readonly __typename?: 'Query';
  /** Access to subgraph metadata */
  readonly _meta?: Maybe<_Meta_>;
  readonly blitmap?: Maybe<Blitmap>;
  readonly blitmaps: ReadonlyArray<Blitmap>;
  readonly contract?: Maybe<Contract>;
  readonly contracts: ReadonlyArray<Contract>;
};


export type Query_MetaArgs = {
  block?: InputMaybe<Block_Height>;
};


export type QueryBlitmapArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryBlitmapsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Blitmap_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Blitmap_Filter>;
};


export type QueryContractArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryContractsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Contract_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Contract_Filter>;
};

export type Subscription = {
  readonly __typename?: 'Subscription';
  /** Access to subgraph metadata */
  readonly _meta?: Maybe<_Meta_>;
  readonly blitmap?: Maybe<Blitmap>;
  readonly blitmaps: ReadonlyArray<Blitmap>;
  readonly contract?: Maybe<Contract>;
  readonly contracts: ReadonlyArray<Contract>;
};


export type Subscription_MetaArgs = {
  block?: InputMaybe<Block_Height>;
};


export type SubscriptionBlitmapArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionBlitmapsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Blitmap_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Blitmap_Filter>;
};


export type SubscriptionContractArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionContractsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Contract_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Contract_Filter>;
};

export type _Block_ = {
  readonly __typename?: '_Block_';
  /** The hash of the block */
  readonly hash?: Maybe<Scalars['Bytes']>;
  /** The block number */
  readonly number: Scalars['Int'];
};

/** The type for the top-level _meta field */
export type _Meta_ = {
  readonly __typename?: '_Meta_';
  /**
   * Information about a specific subgraph block. The hash of the block
   * will be null if the _meta field has a block constraint that asks for
   * a block number. It will be filled if the _meta field has no block constraint
   * and therefore asks for the latest  block
   *
   */
  readonly block: _Block_;
  /** The deployment ID */
  readonly deployment: Scalars['String'];
  /** If `true`, the subgraph encountered indexing errors at some past block */
  readonly hasIndexingErrors: Scalars['Boolean'];
};

export enum _SubgraphErrorPolicy_ {
  /** Data will be returned even if the subgraph has indexing errors */
  Allow = 'allow',
  /** If the subgraph has indexing errors, data will be omitted. The default. */
  Deny = 'deny'
}

export type BlitmapsQueryVariables = Exact<{ [key: string]: never; }>;


export type BlitmapsQuery = { readonly __typename?: 'Query', readonly blitmaps: ReadonlyArray<{ readonly __typename?: 'Blitmap', readonly id: string, readonly name: string, readonly creator: any, readonly creatorName: string, readonly data: any }> };


export const BlitmapsDocument = gql`
    query Blitmaps {
  blitmaps(first: 100, orderBy: tokenID, orderDirection: asc) {
    id
    name
    creator
    creatorName
    data
  }
}
    `;

export function useBlitmapsQuery(options: Omit<Urql.UseQueryArgs<BlitmapsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<BlitmapsQuery>({ query: BlitmapsDocument, ...options });
};