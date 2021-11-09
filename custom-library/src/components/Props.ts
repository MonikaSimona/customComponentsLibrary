export interface InvoiceProps {
    status: string;
    active?: boolean;
}
export interface IconProps {
    isBlock: boolean;
}
export interface RowProps {
    isHeader: boolean;
}
export interface HeaderButtonProps {
    isReject?: boolean;
    isRecord?: boolean;
    isApprove?: boolean;
}
export interface DetailsProps {
    first?: boolean;
}

export interface ApproverData {
    name: string;
    imgUrl: string;
}
export interface InvoiceData {
    id: number;
    invoice_date: string;
    supplier: string;
    due_date: string;
    invoice_number: string;
    total: number;
    status: string;
    approver: ApproverData;

}
export interface SupplierData {
    id: number;
    name: string;
}
export interface Options {
    value: string;
    label: string;
    customAbbreviation: string;

}