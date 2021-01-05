import GraphQLJSON, { GraphQLJSONObject } from 'graphql-type-json';
import { GraphQLDate, GraphQLTime, GraphQLDateTime } from 'graphql-iso-date';


export const resolvers = {
    JSON: GraphQLJSON,
    JSONObject: GraphQLJSONObject,
    Date: GraphQLDate,
    Time: GraphQLTime,
    DateTime: GraphQLDateTime,
};
