import { getEmployees } from "lib/api";
import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";
import AspirinBaseTabs from "../aspirinBaseTabs";
import CacheKeyTypes from "./cacheKeyTypes";

const useEmployees = (page: number, rowsPerPage: number) => {
    const location = useLocation();
    const {
        isLoading,
        data,
        isFetching,
    } = useQuery([CacheKeyTypes.Employees, page, rowsPerPage], () => getEmployees(page * rowsPerPage, rowsPerPage), {
        keepPreviousData: true,
        staleTime: 300000,
        enabled: !!location?.pathname?.includes(AspirinBaseTabs.EMPLOYEES)
    });

    return { data, isLoading, isFetching };
};

export { useEmployees };
