import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const usePagination = (pageNumber: number = 0, pageSize: number = 10) => {
    const location = useLocation();
    const navigate = useNavigate();
    const [page, setPage] = useState(pageNumber);
    const [rowsPerPage, setRowsPerPage] = useState(pageSize);

    useEffect(() => {
        setPage(0);
        setRowsPerPage(10);
    }, [location.pathname])

    const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
        if (!event?.currentTarget) return;

        setPage(newPage);
        navigate(`?page=${newPage + 1}&pageSize=${rowsPerPage}`);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>, pageNum: number) => {
        if (!event?.target?.value) return;

        setRowsPerPage(+event.target.value);
        setPage(pageNum);
        navigate(`?page=${pageNum + 1}&pageSize=${+event.target.value}`);
    };

    return { page, rowsPerPage, handleChangePage, handleChangeRowsPerPage };
}

export { usePagination };
