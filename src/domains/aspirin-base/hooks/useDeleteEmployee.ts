import { removeEmployee } from "lib/api";
import { useMutation, useQueryClient } from "react-query";
import CacheKeyTypes from "./cacheKeyTypes";

const useDeleteEmployee = (employeeId: number) => {
    const queryClient = useQueryClient();
    const { mutate } = useMutation(() => removeEmployee(employeeId), {
        onSuccess: () => queryClient.invalidateQueries(CacheKeyTypes.Employees),
    });

    return { mutate };
};

export { useDeleteEmployee };
