import { IClientsData, IPaginationData } from '../ClientsScreen';

interface IClientAccount {
    [key: string]: string;
}

interface IDivisionName {
    name: string;
}

export interface IClient {
    id: number;
    companyName: string;
    location: string;
    companySize: string;
    website: string;
    division: IDivisionName;
    accounts: IClientAccount[];
}

export interface Column {
    id: 'clientCompany' | 'companySize' | 'website' | 'clientRepresentatives' | 'accounts' | 'division' | 'actions';
    label: string;
    minWidth?: number;
    align?: 'right' | 'left';
}

export interface ClientsTableProps {
    clientsData: IClientsData;
    paginationData: IPaginationData;
}
