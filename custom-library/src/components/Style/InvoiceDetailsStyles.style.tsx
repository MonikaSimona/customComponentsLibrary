import styled from "styled-components"
import { DetailsProps } from "../Props"
import { Colors } from "./InvoicesStyles.style"

export const VerticalDivider = styled.span`
    display: inline-block;
    height: 100px;
    margin: auto 0;
    width: 1px;
    background-color:${Colors.lightGray}  ;
`
export const DetailsHeader = styled.div`
    display: flex;
    background-color: white;
    border:1px solid ${Colors.lightGray} ;
    border-radius: 3px;
`
export const DetailsSection = styled.div<DetailsProps>`
    padding:20px;
    display: flex;
    justify-content:space-between;
    align-items: center;
    width: ${({ first }) => first && "60%"};
   
`
export const Company = styled.div`
    display: flex;
    align-items: center;

`
export const CompanyInitial = styled.div`
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color: ${Colors.lightGray};
    display: flex;
    justify-content:center;
    align-items: center;
    font-size: 25px;
    color: black;
    margin: 0 15px;
`
export const CompanyInfo = styled.div`
    display: flex;
    flex-direction: column;
`
export const CompanyName = styled.p`
    color:${Colors.lightGray} ;
    font-weight: 400;
    margin: 0;
`
export const CompanyBillingAmount = styled.span`
    font-size: 25px;
    color: black;
    font-weight: 500;
`
export const Sub = styled.sub`
    color: ${Colors.lightGray};
    font-size: small;
`

export const DateWrapper = styled.div`
    display: flex;
    flex-direction: column;
    padding-right: 100px;

`
export const SectionHeading = styled.p`
    font-size: 13px;
    color:${Colors.lightGray} ;
    text-transform: uppercase;
    margin: 0 0 10px 0;
    font-weight:600;
`
export const InvoiceDate = styled.p`
    font-size: 17px;
    color: black;
    margin: 0;
    font-weight: 600;
`
export const ApproverImage = styled.img`
    width: 50px;
    height: 50px;
    border-radius: 50%;
    object-fit: cover;
    object-position: center top;
    margin-right: 10px;
`

export const InvoiceInfoContainer = styled.div`
    margin-top: 20px;
    display: flex;
    gap: 15px;
`
export const InvoiceDocumentPanel = styled.div`
    width: 100%;
    height: 500px;
    background-color: white;
    border:1px solid ${Colors.lightGray};
    border-radius: 3px;

`
export const InvoiceInfoPanel = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    background-color: white;
    padding: 20px;
    border:1px solid ${Colors.lightGray};
    border-radius: 3px;

`
export const Title = styled.h3`
    font-size: 18px;
    font-weight: 500;

`
export const SupplierInfo = styled.div`
    display: flex;
    flex-direction: column;




`
export const FormRow = styled.div`
    display: flex;
    margin: 10px 0;
    align-items: flex-end;
    gap: 15px;
`
export const InvoiceInfo = styled.div`

`
export const BigButton = styled.button`
    width: 100%;
    height: 40px;
    background-color: transparent;
    color: ${Colors.gray};
    border: 1px solid ${Colors.gray};
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    gap: 5px;
    
    

`
export const LinkButton = styled.button`
    background-color: transparent;
    border: none;
    color: #01589f;
    font-size: 13px;
    font-weight: 500;
    text-decoration: underline;
    cursor: pointer;

`

