import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://aspirinbe.azurewebsites.net/api' || '',
    headers: {
        'Content-Type': 'application/json',
    },
});

const endpoints = {
    employees: '/employees',
    positions: '/positions',
    clients: '/clients',
    clientrepresentatives: '/clientrepresentatives',
    divisions: '/divisions',
    projects: '/projects',
};

/*
 *Employees
 */
export const getEmployees = (startIndex: number = 0, pageSize: number = 10) =>
    axiosInstance
        .get(`${endpoints.employees}?startIndex=${startIndex}&pageSize=${pageSize}`)
        .then((response) => response.data?.data)
        .catch((error) => new Error(error.message));

export const createEmployee = (employeeData: any) =>
    axiosInstance
        .post(endpoints.employees, employeeData)
        .then((response) => response.data?.data)
        .catch((error) => new Error(error.message));

export const getEmployee = (employeeId: number) =>
    axiosInstance
        .get(`${endpoints.employees}/${employeeId}`)
        .then((response) => response.data?.data)
        .catch((error) => new Error(error.message));

export const updateEmployee = (employeeId: number, employeeData: any) =>
    axiosInstance
        .put(`${endpoints.employees}/${employeeId}`, employeeData)
        .then((response) => response.data?.data)
        .catch((error) => new Error(error.message));

export const removeEmployee = (employeeId: number) =>
    axiosInstance
        .delete(`${endpoints.employees}/${employeeId}`)
        .then((response) => response.data?.data)
        .catch((error) => new Error(error.message));

/*
 *Positions
 */
export const getPositions = () =>
    axiosInstance
        .get(endpoints.positions)
        .then((response) => response.data?.data)
        .catch((error) => new Error(error.message));

/*
 *Clients
 */
export const getClients = (startIndex: number = 0, pageSize: number = 10) =>
    axiosInstance
        .get(`${endpoints.clients}?startIndex=${startIndex}&pageSize=${pageSize}`)
        .then((response) => response.data?.data)
        .catch((error) => new Error(error.message));

export const createClient = (clientData: any) =>
    axiosInstance
        .post(endpoints.clients, clientData)
        .then((response) => response.data?.data)
        .catch((error) => new Error(error.message));

/*
 *Clientrepresentatives
 */
export const getClientRepresentatives = (clientId: number, startIndex: number = 0, pageSize: number = 10) =>
    axiosInstance
        .get(`${endpoints.clientrepresentatives}?companyId=${clientId}&startIndex=${startIndex}&pageSize=${pageSize}`)
        .then((response) => response.data?.data)
        .catch((error) => new Error(error.message));

/*
 *Divisions
 */
export const getDivisions = (startIndex: number = 0, pageSize: number = 10) =>
    axiosInstance
        .get(`${endpoints.divisions}?startIndex=${startIndex}&pageSize=${pageSize}`)
        .then((response) => response.data?.data)
        .catch((error) => new Error(error.message));

/*
 *Projects
 */
export const getProjects = (accountId: string = '', startIndex: number = 0, pageSize: number = 10) =>
    axiosInstance
        .get(`${endpoints.projects}?accountId=${accountId}&startIndex=${startIndex}&pageSize=${pageSize}`)
        .then((response) => response.data?.data)
        .catch((error) => new Error(error.message));
