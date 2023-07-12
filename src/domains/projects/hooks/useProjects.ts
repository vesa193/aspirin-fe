import { getProjects } from "lib/api";
import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";
import ProjectsTabs from "../projectsTabs";
import CacheKeyTypes from "./cacheKeyTypes";

const useProjects = (accountId: string, page: number, rowsPerPage: number) => {
    const location = useLocation();
    const {
        isLoading,
        data,
        isFetching,
    } = useQuery([CacheKeyTypes.AllProjects, page, rowsPerPage], () => getProjects(accountId, page * rowsPerPage, rowsPerPage), {
        keepPreviousData: true,
        staleTime: 300000,
        enabled: !!location?.pathname?.includes(ProjectsTabs.ALL_PROJECTS)
    });

    return { data, isLoading, isFetching };
};

export { useProjects };
