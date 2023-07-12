import {
    Box,
    Divider,
    ListItemIcon,
    MenuItem,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    Typography,
    useTheme,
} from '@mui/material';
import { useModalPagination } from 'hooks/useModalPagination';
import { ModalIds } from 'modalIds';
import Badge from 'ui-components/src/badge/Badge';
import { useSearchParams } from 'react-router-dom';
import DropdownMenuIcon from 'ui-components/src/dropdown/DropdownMenuIcon';
import Modal from 'ui-components/src/modal/Modal';
import TableLabelWithIcon from 'ui-components/src/table/TableLabelWithIcon';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';

import TableLabelAvatarWithBadge from 'ui-components/src/table/TableLabelAvatarWithBadge';
import TableSearchFilter from 'ui-components/src/table/TableSearchFilter';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import IconButton from 'ui-components/src/buttons/IconButton';
import { useModal } from 'hooks/useModal';
import { useClientRepresentatives } from '../hooks/useClientRepresentatives';

interface Column {
    id: 'name' | 'position' | 'email' | 'projectSponsor' | 'clientsCompany' | 'actions';
    label: string;
    minWidth?: number;
    align?: 'right' | 'left';
}

const columns: Column[] = [
    { id: 'name', label: 'Full Name', minWidth: 150 },
    { id: 'position', label: 'Position', minWidth: 170 },
    {
        id: 'email',
        label: 'Email Address',
        minWidth: 100,
    },
    {
        id: 'projectSponsor',
        label: 'Project Sponsor',
        minWidth: 190,
    },
    {
        id: 'clientsCompany',
        label: 'Clients Company',
        minWidth: 150,
    },
    {
        id: 'actions',
        label: '',
        minWidth: 70,
    },
];

interface ClientModalProps {
    hideBackdrop: boolean;
}

interface IClientsRepresentatives {
    id: string;
    fullName: string;
    email: string;
    position: string;
    companyName: string;
    location: string;
}

const ClientRepresentativesViewModal = ({ hideBackdrop }: ClientModalProps) => {
    const [searchParams] = useSearchParams();
    const clientId = searchParams.get('clientRepresentativesId');
    const pageNumber = searchParams.get('clientRepresentativesPage')
        ? +searchParams.get('clientRepresentativesPage')! - 1
        : 0;
    const pageSize = searchParams.get('clientRepresentativesPageSize')
        ? +searchParams.get('clientRepresentativesPageSize')!
        : 10;
    const { page, rowsPerPage, handleChangePage, handleChangeRowsPerPage } = useModalPagination(
        pageNumber,
        pageSize,
        ModalIds.CLIENT_REPRESENTATIVES_VIEW
    );
    const {
        isLoading,
        data: clientRepresentatives,
        isFetching,
    } = useClientRepresentatives(+clientId!, page, rowsPerPage);
    const { palette } = useTheme();
    const { handleCloseModal } = useModal();

    return (
        <Modal
            modalId={ModalIds.CLIENT_REPRESENTATIVES_VIEW}
            hideBackdrop={hideBackdrop}
            sx={{
                '& .MuiDialog-paper': {
                    maxWidth: '1100px !important',
                    minWidth: '1100px !important',
                    padding: '20px',
                    overflowY: 'hidden',
                },
            }}
            callback={() => {
                handleCloseModal(ModalIds.CLIENT_REPRESENTATIVES_VIEW, {
                    key: 'clientRepresentativesId',
                });
            }}
        >
            <Paper
                sx={{
                    width: '100%',
                    borderRadius: 2,
                    boxShadow: 'none',
                }}
            >
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <TableSearchFilter title='Clients Representatives' />
                    <Box sx={{ height: '48px', marginRight: '12px' }}>
                        <Divider
                            orientation='vertical'
                            flexItem
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                height: '48px',
                                borderColor: `${palette.divider}`,
                            }}
                        />
                    </Box>
                    <IconButton
                        color='primary'
                        sx={{ height: '48px', width: '40px', fontSize: '30px', textTransform: 'initial' }}
                    >
                        <AddRoundedIcon />
                    </IconButton>
                </Box>
                <TableContainer sx={{ height: { xl: '600px', md: '400px' }, overflow: 'auto' }}>
                    <Table stickyHeader aria-label='sticky table'>
                        <TableHead>
                            <TableRow>
                                {columns?.map((column) => (
                                    <TableCell
                                        key={column.id}
                                        sx={{
                                            top: 0,
                                            minWidth: column.minWidth,
                                            background: palette.background.paper,
                                            borderBottom: `none`,
                                            fontWeight: 600,
                                        }}
                                    >
                                        {column?.label?.length > 0 && (
                                            <TableLabelWithIcon>{column?.label}</TableLabelWithIcon>
                                        )}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {isLoading || isFetching ? (
                                <TableRow>
                                    <TableCell>Loading ...</TableCell>
                                </TableRow>
                            ) : clientRepresentatives?.values?.length ? (
                                clientRepresentatives?.values?.map((clientRepresentative: IClientsRepresentatives) => (
                                    <TableRow key={clientRepresentative.id}>
                                        <TableCell align='left' sx={{ borderBottom: `none` }}>
                                            {clientRepresentative?.fullName ? clientRepresentative.fullName : ''}
                                        </TableCell>
                                        <TableCell align='left' sx={{ borderBottom: `none` }}>
                                            {clientRepresentative?.position ? clientRepresentative.position : ''}
                                        </TableCell>
                                        <TableCell align='left' sx={{ borderBottom: `none` }}>
                                            {clientRepresentative?.email ? clientRepresentative.email : ''}
                                        </TableCell>
                                        <TableCell align='left' sx={{ borderBottom: `none` }}>
                                            No
                                        </TableCell>
                                        <TableCell align='left' sx={{ borderBottom: `none` }}>
                                            <TableLabelAvatarWithBadge
                                                label={
                                                    clientRepresentative?.companyName
                                                        ? clientRepresentative.companyName
                                                        : ''
                                                }
                                            >
                                                <Badge
                                                    label={
                                                        clientRepresentative?.location
                                                            ? clientRepresentative.location
                                                            : ''
                                                    }
                                                    size='sm'
                                                />
                                            </TableLabelAvatarWithBadge>
                                        </TableCell>
                                        <TableCell align='left' sx={{ borderBottom: `none` }}>
                                            <DropdownMenuIcon>
                                                <MenuItem onClick={() => {}}>
                                                    <ListItemIcon sx={{ color: 'text.primary' }}>
                                                        <EditRoundedIcon />
                                                    </ListItemIcon>
                                                    <Typography>Edit Client Representative</Typography>
                                                </MenuItem>
                                                <MenuItem onClick={() => {}}>
                                                    <ListItemIcon sx={{ color: 'error.main' }}>
                                                        <DeleteOutlineRoundedIcon />
                                                    </ListItemIcon>
                                                    <Typography color='error.main'>
                                                        Remove Client Representative
                                                    </Typography>
                                                </MenuItem>
                                            </DropdownMenuIcon>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : null}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    SelectProps={{
                        IconComponent: KeyboardArrowDownRoundedIcon,
                    }}
                    rowsPerPageOptions={[10, 25, 100]}
                    component='div'
                    count={clientRepresentatives?.totalCount ? clientRepresentatives.totalCount : 0}
                    rowsPerPage={rowsPerPage}
                    page={page > 0 && clientRepresentatives?.totalCount < rowsPerPage ? 0 : page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                        handleChangeRowsPerPage(event, 0)
                    }
                    sx={{
                        position: 'sticky' || '-webkit-sticky',
                        bottom: 0,
                        zIndex: 11,
                        borderTop: `1px solid ${palette.divider}`,
                        '& .MuiTablePagination-selectLabel': {
                            fontWeight: 600,
                        },
                        '& .MuiTablePagination-select': {
                            fontWeight: 600,
                        },
                        '& .MuiTablePagination-displayedRows': {
                            fontWeight: 600,
                        },
                    }}
                />
            </Paper>
        </Modal>
    );
};

ClientRepresentativesViewModal.displayName = 'ClientRepresentativesViewModal';

export default ClientRepresentativesViewModal;
