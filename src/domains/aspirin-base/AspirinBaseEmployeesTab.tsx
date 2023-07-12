import { IEmployeesData, IPaginationData } from './AspirinBaseScreen';
import AspirinBaseEmployeesTable from './ui-elements/AspirinBaseEmployeesTable';

interface AspirinBaseEmployeesTabProps {
    employeesData: IEmployeesData;
    paginationData: IPaginationData;
}

const AspirinBaseEmployeesTab = ({ employeesData, paginationData }: AspirinBaseEmployeesTabProps) => (
    <AspirinBaseEmployeesTable employeesData={employeesData} paginationData={paginationData} />
);

AspirinBaseEmployeesTab.displayName = 'AspirinBaseEmployeesTab';

export default AspirinBaseEmployeesTab;
