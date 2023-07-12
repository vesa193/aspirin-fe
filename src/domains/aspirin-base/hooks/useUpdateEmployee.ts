import { useMutation, useQueryClient } from "react-query";
import { updateEmployee } from "lib/api";
import CacheKeyTypes from "./cacheKeyTypes";

const useUpdateEmployee = (employeeId: number, employeeData: any) => {
    const queryClient = useQueryClient();
    const { mutate, mutateAsync } = useMutation(() => updateEmployee(employeeId, employeeData), {
        onSuccess: () => queryClient.invalidateQueries(CacheKeyTypes.Employees),
    });

    return { mutate, mutateAsync };
};

export { useUpdateEmployee };
