import { getClients } from 'lib/api';
import { useQuery } from 'react-query';
import CacheKeyTypes from './cacheKeyTypes';

const useClients = (page: number, rowsPerPage: number) => {
    const { isLoading, data, isFetching } = useQuery(
        [CacheKeyTypes.Clients, page, rowsPerPage],
        () => getClients(page * rowsPerPage, rowsPerPage),
        {
            keepPreviousData: true,
            staleTime: 300000,
        }
    );

    return { data, isLoading, isFetching };
};

export { useClients };
