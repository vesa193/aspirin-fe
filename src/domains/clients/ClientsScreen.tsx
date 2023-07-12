import { Box } from '@mui/material';
import { usePagination } from 'hooks/usePagination';
import { useSearchParams } from 'react-router-dom';
import Heading from 'ui-components/src/heading/Heading';
import BaseButton from 'ui-components/src/buttons/BaseButton';
import { useModal } from 'hooks/useModal';
import { ModalIds } from 'modalIds';
import ClientsTable from './ui-elements/ClientsTable';
import { useClients } from './hooks/useClients';
import { IClient } from './ui-elements/ClientsTableTypes';

export interface IClientData {
    totalCount: number;
    values: IClient[];
}

export interface IClientsData {
    clients: IClientData;
    isLoading: boolean;
    isFetching: boolean;
}

export interface IPaginationData {
    page: number;
    rowsPerPage: number;
    handleChangePage: () => void;
    handleChangeRowsPerPage: (event: React.ChangeEvent<HTMLInputElement>, pageNumber: number) => void;
}

const ClientsScreen = () => {
    const [searchParams] = useSearchParams();
    const pageNumber = searchParams.get('page') ? +searchParams.get('page')! - 1 : 0;
    const pageSize = searchParams.get('pageSize') ? +searchParams.get('pageSize')! : 10;
    const { page, rowsPerPage, handleChangePage, handleChangeRowsPerPage } = usePagination(pageNumber, pageSize);
    const { isLoading, data: clients, isFetching } = useClients(page, rowsPerPage);
    const { handleOpenModal } = useModal();

    return (
        <Box sx={{ width: '100%' }}>
            <Box
                sx={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}
            >
                <Heading title='Clients'>Information and details around Clients, Accounts and Projects</Heading>
                <BaseButton
                    color='primary'
                    startIcon
                    label='Add Client'
                    sx={{ height: '40px', width: '142px', textTransform: 'initial' }}
                    onClick={() => handleOpenModal(ModalIds.CREATE_CLIENT)}
                />
            </Box>
            <ClientsTable
                clientsData={{ clients, isLoading, isFetching } as IClientsData}
                paginationData={{ page, rowsPerPage, handleChangePage, handleChangeRowsPerPage } as IPaginationData}
            />
        </Box>
    );
};

ClientsScreen.displayName = 'ClientsScreen';

export default ClientsScreen;
