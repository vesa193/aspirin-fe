import { IDivisionsData, IPaginationData } from '../AspirinBaseScreen';

interface IClient {
    [key: string]: string;
}

interface IDivisionLead {
    fullName: string;
}

interface IHeadOfPM {
    fullName: string;
}

export interface IDivision {
    id: number;
    name: string;
    numberOfEmployees: number;
    divisionLead: IDivisionLead;
    headOfPM: IHeadOfPM;
    employees: IClient[];
}

export interface Column {
    id: 'name' | 'employees' | 'clientCompanies' | 'divisionLeader' | 'divisionHeadOfPM' | 'actions';
    label: string;
    minWidth?: number;
    align?: 'right' | 'left' | 'inherit' | 'center' | 'justify';
}

export interface Data {
    id: number;
    name: string;
    employees: number;
    clientCompanies: React.ReactElement;
    divisionLeader: React.ReactElement;
    divisionHeadOfPM: React.ReactElement;
    actions: React.ReactElement;
}

export interface AspirinBaseDivisionsTableProps {
    divisionsData: IDivisionsData;
    paginationData: IPaginationData;
}
