import GraphQLJSON, { GraphQLJSONObject } from 'graphql-type-json';
import { GraphQLDate, GraphQLTime, GraphQLDateTime } from 'graphql-iso-date';
import GraphQLURI from '@cdmbase/graphql-type-uri';

export const resolvers = {
    JSON: GraphQLJSON,
    JSONObject: GraphQLJSONObject,
    Date: GraphQLDate,
    Time: GraphQLTime,
    URI: GraphQLURI('URI'),
    URIInput: GraphQLURI('URIInput'),
    DateTime: GraphQLDateTime,
};
