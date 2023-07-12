import { camelCase } from "change-case";
import { useEffect, useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";

const useModalPagination = (pageNumber: number = 0, pageSize: number = 10, modalName?: string) => {
    const location = useLocation();
    const [page, setPage] = useState(pageNumber);
    const [rowsPerPage, setRowsPerPage] = useState(pageSize);
    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        setPage(0);
        setRowsPerPage(10);
    }, [location.pathname])

    const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
        if (!event?.currentTarget) return;

        setPage(newPage);
        searchParams.set(`${camelCase(modalName as string)}Page`, `${newPage + 1}`);
        searchParams.set(`${camelCase(modalName as string)}PageSize`, `${rowsPerPage}`);
        setSearchParams(searchParams);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>, pageNum: number) => {
        if (!event?.target?.value) return;

        setRowsPerPage(+event.target.value);
        setPage(pageNum);
        searchParams.set(`${camelCase(modalName as string)}Page`, `${pageNum + 1}`);
        searchParams.set(`${camelCase(modalName as string)}PageSize`, `${+event.target.value}`);
        setSearchParams(searchParams);
    };

    return { page, rowsPerPage, handleChangePage, handleChangeRowsPerPage };
}

export { useModalPagination };
