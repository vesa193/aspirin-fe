import { IEmployeeData, IPaginationData } from "../AspirinBaseScreen";

interface IProject {
    [key: string]: string;
}

export interface IPosition {
    id: number,
    name: string;
    shortName: string;
    isPMPosition: boolean;
}

export interface IEmployee {
    id: number;
    fullName: string;
    email: string;
    positions: IPosition[];
    divisionName: string;
    divisionId: number;
    projects: IProject[];
}

export interface Column {
    id: 'name' | 'positions' | 'division' | 'email' | 'projects' | 'actions';
    label: string;
    minWidth?: number;
    align?: 'right' | 'left' | 'inherit' | 'center' | 'justify';
}

export interface AspirinBaseEmployeesTableProps {
    employeesData: IEmployeeData;
    paginationData: IPaginationData;
}