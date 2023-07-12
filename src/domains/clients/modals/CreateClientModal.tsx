import { SyntheticEvent, useEffect, useState } from 'react';
import { Box, useTheme } from '@mui/material';
import { ModalIds } from 'modalIds';
import { useLocation } from 'react-router-dom';
import Modal from 'ui-components/src/modal/Modal';
import TabBar from 'ui-components/src/tab/TabBar';
import Tab from '@mui/material/Tab';
import TabPanel from 'ui-components/src/tab/TabPanel';
import { useForm } from 'hooks/useForm';
import ClientModalTabs from '../clientModalTabs';
import CreateClientModalClientsInformationTab from '../CreateClientModalClientsInformationTab';
import CreateClientModalClientsRepresentativesTab, {
    ClientRepresentativesFieldsTypes,
} from '../CreateClientModalClientsRepresentativesTab';

interface ClientModalProps {
    hideBackdrop: boolean;
}

export interface ClientInformationData {
    companyName?: string;
    companySize?: string;
    companyLogo?: string;
    location?: string;
    website?: string;
    email?: string;
    industryAndDomain?: string;
    divisionId?: number;
    clientRepresentatives?: ClientRepresentativesFieldsTypes;
}

const CreateClientModal = ({ hideBackdrop }: ClientModalProps) => {
    const location = useLocation();
    const tabIntialState = ClientModalTabs.CLIENTS_INFORMATION;
    const [modalTabId, setModalTabId] = useState<string>(tabIntialState);
    const [clientInformationFormData, setClientInformationFormData] = useState({});
    // NOTE reminder for refactoring in the future of any type here.
    const [clientRepresentativesFormData, setClientRepresentativesFormData] = useState<
        ClientRepresentativesFieldsTypes[] | []
    >([]);
    const [isDisabledClientRepresentativesTab, setIsDisabledClientRepresentativesTab] = useState(true);
    const { palette } = useTheme();

    const clientInformationInitialState = {
        companyName: '',
        companySize: '',
        companyLogo: '',
        website: '',
        email: '',
        divisionId: '',
        location: '',
        industryAndDomain: '',
    };

    const clientRepresentativesInitialState = {
        id: Math.random().toString(),
        fullName: '',
        position: '',
        email: '',
    };

    const {
        fields: clientInformationFields,
        onChange: onChangeClientInformationData,
        onReset: onResetClientInformationFormData,
        errors: clientInformationErrors,
    } = useForm(clientInformationInitialState);

    const {
        fields: clientRepresentativesFields,
        onChange: onChangeClientRepresentativesData,
        onReset: onResetClientRepresentativesData,
        errors: clientRepresentativesErrors,
        setErrors: setErrorsClientRepresentativesData,
    } = useForm(clientRepresentativesInitialState);

    useEffect(() => {
        setModalTabId(tabIntialState);
    }, [location.pathname]);

    const handleChangeModalTab = (_event: SyntheticEvent, newModalTabId: string) => {
        setModalTabId(newModalTabId);
    };

    const handleChangeClientInformationFields = (fields: ClientInformationData) => {
        setClientInformationFormData(fields);
    };

    return (
        <Modal
            title='Add Client'
            modalId={ModalIds.CREATE_CLIENT}
            hideBackdrop={hideBackdrop}
            callback={() => {
                setClientInformationFormData({});
                onResetClientInformationFormData();
                onResetClientRepresentativesData();
                setModalTabId(ClientModalTabs.CLIENTS_INFORMATION);
                setIsDisabledClientRepresentativesTab(true);
                setClientRepresentativesFormData([]);
            }}
            sx={{
                '& .MuiDialog-paper': {
                    maxWidth: '1000px !important',
                    overflowY: 'hidden',
                },
            }}
        >
            <Box
                sx={{
                    paddingInline: '24px',
                }}
            >
                <TabBar
                    activeTabId={modalTabId}
                    handleChangeTab={handleChangeModalTab}
                    tabBarName='create-client-modal-tabs'
                >
                    <Tab
                        id={`create-client-modal-tab-${ClientModalTabs.CLIENTS_INFORMATION}`}
                        value={ClientModalTabs.CLIENTS_INFORMATION}
                        sx={{ textTransform: 'capitalize' }}
                        label='Clients Information'
                    />
                    <Tab
                        id={`create-client-modal-tab-${ClientModalTabs.CLIENTS_REPRESENTATIVES}`}
                        value={ClientModalTabs.CLIENTS_REPRESENTATIVES}
                        sx={{ textTransform: 'capitalize' }}
                        label='Client Representatives'
                        disabled={isDisabledClientRepresentativesTab}
                    />
                </TabBar>
            </Box>
            <TabPanel value={modalTabId} index={ClientModalTabs.CLIENTS_INFORMATION}>
                <CreateClientModalClientsInformationTab
                    setIsDisabledClientRepresentativesTab={setIsDisabledClientRepresentativesTab}
                    setModalTabId={setModalTabId}
                    clientInformationData={{
                        clientInformationFields,
                        onChangeClientInformationData,
                        onResetClientInformationFormData,
                        clientInformationErrors,
                        handleChangeClientInformationFields,
                    }}
                />
            </TabPanel>
            <TabPanel value={modalTabId} index={ClientModalTabs.CLIENTS_REPRESENTATIVES}>
                <Box
                    component='span'
                    sx={{
                        position: 'absolute',
                        left: '36.5%',
                        top: '0',
                        width: '1px',
                        height: 'calc(100% - 85.5px)',
                        background: palette.divider,
                    }}
                />
                <CreateClientModalClientsRepresentativesTab
                    clientInformationData={{ clientInformationFormData, onResetClientInformationFormData }}
                    setModalTabId={setModalTabId}
                    clientRepresentativesData={{
                        clientRepresentativesFormData,
                        clientRepresentativesFields,
                        onResetClientRepresentativesData,
                        clientRepresentativesErrors,
                        setErrorsClientRepresentativesData,
                        onChangeClientRepresentativesData,
                        setClientRepresentativesFormData,
                        setIsDisabledClientRepresentativesTab,
                    }}
                />
            </TabPanel>
        </Modal>
    );
};

CreateClientModal.displayName = 'CreateClientModal';

export default CreateClientModal;
