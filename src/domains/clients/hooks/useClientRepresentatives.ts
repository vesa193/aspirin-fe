import { getClientRepresentatives } from 'lib/api';
import { useQuery } from 'react-query';
import CacheKeyTypes from './cacheKeyTypes';

const useClientRepresentatives = (clientId: number, page: number, rowsPerPage: number) => {
    const { isLoading, data, isFetching } = useQuery(
        [CacheKeyTypes.ClientRepresentatives, clientId, page, rowsPerPage],
        () => getClientRepresentatives(clientId, page * rowsPerPage, rowsPerPage),
        {
            cacheTime: 300000,
            enabled: !!clientId,
            refetchOnMount: true,
        }
    );

    return { data, isLoading, isFetching };
};

export { useClientRepresentatives };
