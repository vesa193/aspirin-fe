import { Box, DialogActions, DialogContent, MenuItem, TextField, useTheme } from '@mui/material';
import { useModal } from 'hooks/useModal';
import { ModalIds } from 'modalIds';
import UploadImage from 'ui-components/src/file-inputs/UploadImage';
import BaseButton from 'ui-components/src/buttons/BaseButton';
import { useQuery } from 'react-query';
import CacheKeyTypes from 'domains/aspirin-base/hooks/cacheKeyTypes';
import { getDivisions } from 'lib/api';
import { useEffect, useCallback, Dispatch, SetStateAction, ChangeEvent } from 'react';
import ClientModalTabs from './clientModalTabs';

enum CompanySizeTypes {
    MICRO = 'Micro',
    SMALL = 'Small',
    MEDIUM = 'Medium',
    LARGE = 'Large',
}

enum CompanyLocationTypes {
    SERBIA = 'Serbia',
    BOSNIA_AND_HERZEGOVINA = 'Bosnia-and-Herzegovina',
    NORTH_MACEDONIA = 'North-Macedonia',
    AMERICA = 'America',
}

interface CompanySizeProps {
    [key: string]: { id: string; name: string };
}

interface CompanyLocationProps {
    [key: string]: { id: string; name: string };
}

interface ClientInformationFieldsProps {
    companyName: string;
    companySize: string;
    companyLogo: string;
    location: string;
    website: string;
    email: string;
    industryAndDomain: string;
    divisionId: string;
}

interface ClientInformationDataProps {
    clientInformationFields: ClientInformationFieldsProps;
    handleChangeClientInformationFields: (value: {}) => void;
    onChangeClientInformationData: (e: ChangeEvent<HTMLInputElement>) => void;
    onResetClientInformationFormData: () => void;
    clientInformationErrors: ClientInformationFieldsProps;
}

interface ClientModalDataProps {
    setIsDisabledClientRepresentativesTab: Dispatch<SetStateAction<boolean>>;
    setModalTabId: Dispatch<SetStateAction<string>>;
    clientInformationData: ClientInformationDataProps;
}

interface IDivision {
    id: string;
    name: string;
}

export const companySizes: CompanySizeProps = {
    [CompanySizeTypes.MICRO]: { id: CompanySizeTypes.MICRO, name: '1 to 9' },
    [CompanySizeTypes.SMALL]: { id: CompanySizeTypes.SMALL, name: '10 to 49' },
    [CompanySizeTypes.MEDIUM]: { id: CompanySizeTypes.MEDIUM, name: '50 to 249' },
    [CompanySizeTypes.LARGE]: { id: CompanySizeTypes.LARGE, name: '250+' },
};

const companyLocations: CompanyLocationProps = {
    [CompanyLocationTypes.SERBIA]: { id: CompanyLocationTypes.SERBIA, name: 'Serbia' },
    [CompanyLocationTypes.BOSNIA_AND_HERZEGOVINA]: {
        id: CompanyLocationTypes.BOSNIA_AND_HERZEGOVINA,
        name: 'Bosnia and Herzegovina',
    },
    [CompanyLocationTypes.NORTH_MACEDONIA]: { id: CompanyLocationTypes.NORTH_MACEDONIA, name: 'North Macedonia' },
    [CompanyLocationTypes.AMERICA]: { id: CompanyLocationTypes.AMERICA, name: 'America' },
};

const CreateClientModalClientsInformationTab = ({
    setIsDisabledClientRepresentativesTab,
    setModalTabId,
    clientInformationData,
}: ClientModalDataProps) => {
    const { palette } = useTheme();
    const { handleCloseModal } = useModal();

    const {
        clientInformationFields: fields,
        onChangeClientInformationData: onChange,
        onResetClientInformationFormData: onReset,
        clientInformationErrors: errors,
        handleChangeClientInformationFields: onFields,
    } = clientInformationData;

    // NOTE: hardcoded to getAll division always, this should be temporary solution, while BE create endpoint for divisions list
    const { data: divisionsList } = useQuery([CacheKeyTypes.Divisions], () => getDivisions(0, 1000), {
        keepPreviousData: true,
        staleTime: 300000,
    });

    useEffect(() => {
        onFields(fields);
    }, [fields]);

    const isSubmitButtonDisabled =
        !fields.companyName ||
        !fields.website ||
        !fields.email ||
        !fields.divisionId ||
        !fields.location ||
        !fields.industryAndDomain ||
        !fields.companySize;

    useEffect(() => {
        if (!isSubmitButtonDisabled) {
            setIsDisabledClientRepresentativesTab(false);
        } else {
            setIsDisabledClientRepresentativesTab(true);
        }
    }, [setIsDisabledClientRepresentativesTab, isSubmitButtonDisabled]);

    const handleEnableClientRepresentativesTab = useCallback(() => {
        setIsDisabledClientRepresentativesTab(false);
        setModalTabId(ClientModalTabs.CLIENTS_REPRESENTATIVES);
    }, [setIsDisabledClientRepresentativesTab, setModalTabId]);

    return (
        <Box
            component='form'
            sx={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
            }}
            noValidate
            autoComplete='off'
        >
            <Box sx={{ overflowY: 'auto', maxHeight: { xl: '520px', md: '300px' } }}>
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
                    <UploadImage title='Client Logo' text='Image file size must be < 2 MB' />
                    <TextField
                        type='text'
                        name='companyName'
                        label='Client Name*'
                        variant='outlined'
                        value={fields.companyName || ''}
                        onChange={onChange}
                        error={!!errors.companyName}
                        helperText={errors.companyName}
                    />
                    <TextField
                        name='companySize'
                        select
                        label='Client Company Size*'
                        value={fields.companySize || ''}
                        onChange={onChange}
                    >
                        {Object.keys(companySizes)?.length
                            ? (Object.keys(companySizes) || {})?.map((key: string) =>
                                  companySizes[key]?.name ? (
                                      <MenuItem key={companySizes[key].id} value={companySizes[key].id || ''}>
                                          {companySizes[key].name}
                                      </MenuItem>
                                  ) : null
                              )
                            : null}
                    </TextField>
                    <TextField
                        type='text'
                        name='website'
                        label='Client Website*'
                        variant='outlined'
                        value={fields.website || ''}
                        onChange={onChange}
                        error={!!errors.website}
                        helperText={errors.website}
                    />
                    <TextField
                        type='email'
                        name='email'
                        label='Client Email Address*'
                        variant='outlined'
                        value={fields.email || ''}
                        onChange={onChange}
                        error={!!errors.email}
                        helperText={errors.email}
                    />
                    <TextField
                        name='divisionId'
                        select
                        label='Division*'
                        value={fields.divisionId || ''}
                        onChange={onChange}
                    >
                        {(divisionsList?.values || [])?.map((division: IDivision) =>
                            division?.name ? (
                                <MenuItem key={division.id} value={division.id || ''}>
                                    {division.name}
                                </MenuItem>
                            ) : null
                        )}
                    </TextField>
                    <TextField
                        name='location'
                        select
                        label='Client Location*'
                        value={fields.location || ''}
                        onChange={onChange}
                    >
                        {Object.keys(companyLocations)?.length
                            ? (Object.keys(companyLocations) || [])?.map((key: string) =>
                                  companyLocations[key]?.name ? (
                                      <MenuItem key={companyLocations[key].id} value={companyLocations[key].id || ''}>
                                          {companyLocations[key].name}
                                      </MenuItem>
                                  ) : null
                              )
                            : null}
                    </TextField>
                </DialogContent>
                <DialogContent sx={{ borderTop: `1px solid ${palette.divider}` }}>
                    <TextField
                        sx={{ width: '100%' }}
                        type='text'
                        name='industryAndDomain'
                        label='Industry & Domain*'
                        variant='outlined'
                        value={fields.industryAndDomain || ''}
                        onChange={onChange}
                        error={!!errors.industryAndDomain}
                        helperText={errors.industryAndDomain}
                    />
                </DialogContent>
            </Box>
            <DialogActions sx={{ p: 6 }}>
                <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
                    <BaseButton
                        color='secondary'
                        label='Cancel'
                        onClick={() => {
                            onReset();
                            handleCloseModal(ModalIds.CREATE_CLIENT);
                        }}
                    />
                    <BaseButton
                        color='primary'
                        label='Continue'
                        type='submit'
                        onClick={handleEnableClientRepresentativesTab}
                        disabled={isSubmitButtonDisabled}
                    />
                </Box>
            </DialogActions>
        </Box>
    );
};

export default CreateClientModalClientsInformationTab;
