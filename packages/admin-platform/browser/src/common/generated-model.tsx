import gql from "graphql-tag";
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export const OrgNameContextQueryDocument = gql`
  query GetOrgNameFromContext {
    getOrgNameFromContext @client {
        orgName
    }
  }
`;
