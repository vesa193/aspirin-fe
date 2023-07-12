import { createClient } from 'lib/api';
import { useMutation, useQueryClient } from 'react-query';
import CacheKeyTypes from './cacheKeyTypes';

const useCreationClient = () => {
    const queryClient = useQueryClient();
    const { mutate } = useMutation(createClient, {
        onSuccess: () => queryClient.invalidateQueries(CacheKeyTypes.Clients),
    });

    return { mutate };
};

export { useCreationClient };
