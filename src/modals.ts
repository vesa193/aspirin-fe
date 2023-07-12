import CreateEmployeeModal from 'domains/aspirin-base/modals/CreateEmployeeModal';
import DeleteEmployeeConfirmationModal from 'domains/aspirin-base/modals/DeleteEmployeeConfirmationModal';
import UpdateEmployeeModal from 'domains/aspirin-base/modals/UpdateEmployeeModal';
import ClientRepresentativesViewModal from 'domains/clients/modals/ClientRepresentativesViewModal';
import CreateClientModal from 'domains/clients/modals/CreateClientModal';
import { ModalIds } from 'modalIds';
/*
 * Modal configuration
 */
export const modals = [
    {
        id: ModalIds.CREATE_EMPLOYEE,
        component: CreateEmployeeModal,
        hideBackdrop: false,
    },
    {
        id: ModalIds.DELETE_EMPLOYEE,
        component: DeleteEmployeeConfirmationModal,
        hideBackdrop: false,
    },
    {
        id: ModalIds.UPDATE_EMPLOYEE,
        component: UpdateEmployeeModal,
        hideBackdrop: false,
    },
    {
        id: ModalIds.CREATE_CLIENT,
        component: CreateClientModal,
        hideBackdrop: false,
    },
    {
        id: ModalIds.CLIENT_REPRESENTATIVES_VIEW,
        component: ClientRepresentativesViewModal,
        hideBackdrop: false,
    },
];
