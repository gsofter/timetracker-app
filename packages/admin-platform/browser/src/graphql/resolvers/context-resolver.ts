
import { IClientCacheTypeNames, IResolvers } from '@admin-layout/core';

export const contextResolver: (services: () => any) => IResolvers = (services) =>  ({

    Query: {
        getOrgNameFromContext: ( root, args, context ) => {
            const data = services().cache.readFragment({
                orgName: String,
                id: `${IClientCacheTypeNames.Context}`
            });
            return data;
        },
    }
});