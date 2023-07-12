import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import TableRow from '@mui/material/TableRow';
import { useTheme } from '@mui/material/styles';
import * as React from 'react';
import Badge from 'ui-components/src/badge/Badge';
import DropdownMenuIcon from 'ui-components/src/dropdown/DropdownMenuIcon';
import TableLabelAvatarWithBadge from 'ui-components/src/table/TableLabelAvatarWithBadge';
import TableLabelWithIcon from 'ui-components/src/table/TableLabelWithIcon';
import TableSearchFilter from 'ui-components/src/table/TableSearchFilter';
import TableAvatarGroup from 'ui-components/src/table/TableAvatarGroup';
import TableLabelWithInteractiveIcon from 'ui-components/src/table/TableLabelWithInteractiveIcon';
import { ListItemIcon, MenuItem, Typography } from '@mui/material';
import { ModalIds } from 'modalIds';
import { useModal } from 'hooks/useModal';
import Box from '@mui/material/Box/Box';
import { IClient, Column, ClientsTableProps } from './ClientsTableTypes';
import { companySizes } from '../CreateClientModalClientsInformationTab';

const columns: Column[] = [
    { id: 'clientCompany', label: 'Client Company', minWidth: 210 },
    { id: 'companySize', label: 'Company Size', minWidth: 100 },
    {
        id: 'website',
        label: 'Website',
        minWidth: 180,
    },
    {
        id: 'clientRepresentatives',
        label: 'Client Representatives',
        minWidth: 180,
    },
    {
        id: 'accounts',
        label: 'Accounts',
        minWidth: 150,
        align: 'left',
    },
    {
        id: 'division',
        label: 'Division',
        minWidth: 70,
    },
    {
        id: 'actions',
        label: '',
        minWidth: 70,
    },
];

const ClientsTable = ({ clientsData, paginationData }: ClientsTableProps) => {
    const { palette } = useTheme();
    const { isLoading, clients, isFetching } = clientsData;
    const { page, rowsPerPage, handleChangePage, handleChangeRowsPerPage } = paginationData;
    const { handleOpenModal } = useModal();

    return (
        <Paper
            sx={{
                width: '100%',
                overflow: 'auto',
                borderRadius: 2,
                boxShadow: 'none',
            }}
        >
            <TableSearchFilter title='Clients List' />
            <TableContainer sx={{ maxHeight: 'calc(100vh - 420px)' }}>
                <Table stickyHeader aria-label='sticky table'>
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    sx={{
                                        top: 0,
                                        minWidth: column.minWidth,
                                        background: palette.background.paper,
                                        borderBottom: `1px solid ${palette.divider}`,
                                        fontWeight: 600,
                                    }}
                                >
                                    {column.label.length > 0 && <TableLabelWithIcon>{column.label}</TableLabelWithIcon>}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {isLoading || isFetching ? (
                            <TableRow>
                                <TableCell>Loading ...</TableCell>
                            </TableRow>
                        ) : (
                            clients?.values?.map((client: IClient) => (
                                <TableRow
                                    hover
                                    key={client.id}
                                    sx={{ border: 1, '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell sx={{ borderBottom: `1px solid ${palette.divider}` }} align='left'>
                                        <TableLabelAvatarWithBadge
                                            label={client?.companyName ? client.companyName : ''}
                                        >
                                            <Badge label={client?.location ? client.location : ''} size='sm' />
                                        </TableLabelAvatarWithBadge>
                                    </TableCell>
                                    <TableCell sx={{ borderBottom: `1px solid ${palette.divider}` }} align='left'>
                                        {client?.companySize ? companySizes?.[client.companySize]?.name : ''}
                                    </TableCell>
                                    <TableCell sx={{ borderBottom: `1px solid ${palette.divider}` }} align='left'>
                                        {client?.website ? client.website : ''}
                                    </TableCell>
                                    <TableCell sx={{ borderBottom: `1px solid ${palette.divider}` }} align='left'>
                                        <Box
                                            onClick={() =>
                                                handleOpenModal(ModalIds.CLIENT_REPRESENTATIVES_VIEW, {
                                                    key: 'clientRepresentativesId',
                                                    value: `${client.id}`,
                                                })
                                            }
                                        >
                                            <TableLabelWithInteractiveIcon
                                                label='View representatives'
                                                avatarSource=''
                                            />
                                        </Box>
                                    </TableCell>
                                    <TableCell sx={{ borderBottom: `1px solid ${palette.divider}` }} align='left'>
                                        {client?.accounts?.length > 0 ? (
                                            // NOTE: This should be changed to client.accounts when the backend implements
                                            <TableAvatarGroup avatars={client?.accounts} />
                                        ) : (
                                            <p>Unassignee</p>
                                        )}
                                    </TableCell>
                                    <TableCell sx={{ borderBottom: `1px solid ${palette.divider}` }} align='left'>
                                        {client?.division.name ? client.division.name : ''}
                                    </TableCell>
                                    <TableCell align='left' sx={{ borderBottom: `1px solid ${palette.divider}` }}>
                                        <DropdownMenuIcon>
                                            <MenuItem onClick={() => {}}>
                                                <ListItemIcon sx={{ color: 'text.primary' }}>
                                                    <EditRoundedIcon />
                                                </ListItemIcon>
                                                <Typography>Edit Client</Typography>
                                            </MenuItem>
                                            <MenuItem onClick={() => {}}>
                                                <ListItemIcon sx={{ color: 'error.main' }}>
                                                    <DeleteOutlineRoundedIcon />
                                                </ListItemIcon>
                                                <Typography color='error.main'>Remove Client</Typography>
                                            </MenuItem>
                                        </DropdownMenuIcon>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                SelectProps={{
                    IconComponent: KeyboardArrowDownRoundedIcon,
                }}
                rowsPerPageOptions={[10, 25, 100]}
                component='div'
                count={clients?.totalCount || 0}
                rowsPerPage={rowsPerPage}
                page={clients?.totalCount ? page : 0}
                onPageChange={handleChangePage}
                onRowsPerPageChange={(event: React.ChangeEvent<HTMLInputElement>) => handleChangeRowsPerPage(event, 0)}
                sx={{
                    position: 'sticky' || '-webkit-sticky',
                    bottom: 0,
                    zIndex: 11,
                    backgroundColor: palette.background.paper,
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
    );
};

ClientsTable.displayName = 'ClientsTable';

export default ClientsTable;
