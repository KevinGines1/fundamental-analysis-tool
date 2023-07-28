import Company from "./company";

export interface UpdateCompanyModalProps {
    showModal: boolean;
    companyToEdit: Company;
    onClose: () => void;
    onUpdateSubmit: (company: Company) => void;
}