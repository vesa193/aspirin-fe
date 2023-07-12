import { Box, DialogActions, DialogContent, TextField } from '@mui/material';
import { useModal } from 'hooks/useModal';
import { ModalIds } from 'modalIds';
import BaseButton from 'ui-components/src/buttons/BaseButton';
import { ChangeEvent, Dispatch, SetStateAction } from 'react';
import { validateInfo } from 'hooks/validateInfo';
import ClientRepresentativesTable from './ui-elements/ClientRepresentativesTable';
import { ClientInformationData } from './modals/CreateClientModal';
import { useCreationClient } from './hooks/useCreationClient';
import ClientModalTabs from './clientModalTabs';

export interface ClientRepresentativesFieldsTypes {
    fullName: string;
    email: string;
    position: string;
    id: string;
}

interface ClientRepresentativesDataProps {
    clientRepresentativesFields: ClientRepresentativesFieldsTypes;
    clientRepresentativesErrors: ClientRepresentativesFieldsTypes;
    onResetClientRepresentativesData: () => void;
    onChangeClientRepresentativesData: (e: React.ChangeEvent<HTMLInputElement>) => void;
    setErrorsClientRepresentativesData: (value: {}) => void;
    clientRepresentativesFormData: ClientRepresentativesFieldsTypes[];
    setClientRepresentativesFormData: (
        value:
            | ClientRepresentativesFieldsTypes[]
            | ((prevState: ClientRepresentativesFieldsTypes[]) => ClientRepresentativesFieldsTypes[])
    ) => void;

    setIsDisabledClientRepresentativesTab: Dispatch<SetStateAction<boolean>>;
}

interface ClientInformationDataProps {
    clientInformationFormData: ClientInformationData;
    onResetClientInformationFormData: () => void;
}

interface ClientModalDataProps {
    clientInformationData: ClientInformationDataProps;
    clientRepresentativesData: ClientRepresentativesDataProps;
    setModalTabId: (value: string) => void;
}

const CreateClientModalClientsRepresentativesTab = ({
    clientInformationData,
    clientRepresentativesData,
    setModalTabId,
}: ClientModalDataProps) => {
    const { handleCloseModal } = useModal();

    const {
        clientRepresentativesFields: fields,
        onResetClientRepresentativesData,
        clientRepresentativesErrors: errors,
        setErrorsClientRepresentativesData: setErrors,
        onChangeClientRepresentativesData: onChange,
        clientRepresentativesFormData: formClientRepresentativesData,
        setClientRepresentativesFormData,
        setIsDisabledClientRepresentativesTab,
    } = clientRepresentativesData;

    const { clientInformationFormData, onResetClientInformationFormData } = clientInformationData;

    const { mutate } = useCreationClient();

    // NOTE reminder for refactoring in the future of any type here.
    const handleAddClientRepresentatives = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();

        // NOTE reminder for refactoring in the future of any type here.
        setClientRepresentativesFormData((prevState: ClientRepresentativesFieldsTypes[]) => [...prevState, fields]);
        onResetClientRepresentativesData();
    };

    const formClientData = {
        ...clientInformationFormData,
        clientRepresentatives: formClientRepresentativesData,
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (Object.keys(validateInfo(fields))?.length) {
            setErrors(validateInfo(fields));
            return;
        }

        try {
            await mutate(formClientData);
            onResetClientInformationFormData();
            onResetClientRepresentativesData();
            setModalTabId(ClientModalTabs.CLIENTS_INFORMATION);
            setIsDisabledClientRepresentativesTab(true);
            setClientRepresentativesFormData([]);
            handleCloseModal(ModalIds.CREATE_CLIENT);
        } catch (error) {
            // TODO: Error handling of the form
        }
    };

    return (
        <>
            <Box sx={{ display: 'flex', width: '1000px' }}>
                <Box
                    sx={{
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        flexBasis: '37%',
                    }}
                >
                    <DialogContent
                        sx={{
                            width: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '24px',
                            '& .MuiDialogContent-root': {
                                paddingInline: '24px !important',
                            },
                        }}
                    >
                        <TextField
                            type='text'
                            name='fullName'
                            label='Full Name*'
                            variant='outlined'
                            value={fields.fullName || ''}
                            onChange={onChange}
                            error={!!errors.fullName}
                            helperText={errors.fullName}
                        />
                        <TextField
                            type='text'
                            name='position'
                            label='Position in Company*'
                            variant='outlined'
                            value={fields?.position || ''}
                            onChange={onChange}
                            error={!!errors.position}
                            helperText={errors.position}
                        />
                        <TextField
                            type='text'
                            name='email'
                            label='Email Address*'
                            variant='outlined'
                            value={fields?.email || ''}
                            onChange={onChange}
                            error={!!errors.email}
                            helperText={errors.email}
                        />
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <BaseButton
                                onClick={handleAddClientRepresentatives}
                                color='primary'
                                label='Add Client Representative'
                                startIcon
                            />
                        </Box>
                    </DialogContent>
                </Box>
                <Box sx={{ flexBasis: '63%' }}>
                    <ClientRepresentativesTable fields={formClientRepresentativesData} />
                </Box>
            </Box>
            <DialogActions sx={{ p: 6 }}>
                <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
                    <BaseButton
                        color='secondary'
                        label='Cancel'
                        onClick={() => {
                            onResetClientInformationFormData();
                            onResetClientRepresentativesData();
                            setClientRepresentativesFormData([]);
                            handleCloseModal(ModalIds.CREATE_CLIENT);
                        }}
                    />
                    <BaseButton
                        color='primary'
                        label='Create Client'
                        type='button'
                        onClick={(event) => handleSubmit(event)}
                    />
                </Box>
            </DialogActions>
        </>
    );
};

export default CreateClientModalClientsRepresentativesTab;
