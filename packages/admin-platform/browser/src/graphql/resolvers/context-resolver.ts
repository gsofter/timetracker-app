
import { IClientCacheTypeNames, IResolvers, OrgNameInContextFragmentDoc } from '@admin-layout/core';

export const contextResolver: (services: () => any) => IResolvers = (services) =>  ({

    Query: {
        getOrgNameFromContext: ( root, args, { cache } ) => {
            const data = cache.readFragment({
                fragment: OrgNameInContextFragmentDoc,
                id: `${IClientCacheTypeNames.Context}`
            });
            console.log('----data', data);
            return data;
        },
    }
});