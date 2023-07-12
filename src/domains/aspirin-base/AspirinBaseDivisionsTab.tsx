import { IDivisionsData, IPaginationData } from './AspirinBaseScreen';
import AspirinBaseDivisionsTable from './ui-elements/AspirinBaseDivisionsTable';

interface AspirinBaseDivisionsTabProps {
    divisionsData: IDivisionsData;
    paginationData: IPaginationData;
}

const AspirinBaseDivisionsTab = ({ divisionsData, paginationData }: AspirinBaseDivisionsTabProps) => (
    <AspirinBaseDivisionsTable divisionsData={divisionsData} paginationData={paginationData} />
);

AspirinBaseDivisionsTab.displayName = 'AspirinBaseDivisionsTab';

export default AspirinBaseDivisionsTab;
