import { Company } from "./company";

export default interface GenericTableProps {
    title: string;
    subtitle?: string;
    headers: string[];
    data: Company[];
}