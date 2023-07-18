import Company from "./company";

export interface UpdateCompanyModalProps {
    showModal: boolean;
    companyToEdit: Company | undefined;
    onClose: () => void;
}