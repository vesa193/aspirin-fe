import { createEmployee } from "lib/api";
import { useMutation, useQueryClient } from "react-query";
import CacheKeyTypes from "./cacheKeyTypes";

const useCreationEmployee = () => {
    const queryClient = useQueryClient();
    const { mutate } = useMutation(createEmployee, {
        onSuccess: () => queryClient.invalidateQueries(CacheKeyTypes.Employees),
    });

    return { mutate };
};

export { useCreationEmployee };
