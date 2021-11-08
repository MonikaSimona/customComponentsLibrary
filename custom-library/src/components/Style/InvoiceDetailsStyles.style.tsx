import styled from "styled-components"
import { DetailsProps } from "../Props"

export const DetailsHeader = styled.div`
    display: flex;
    background-color: white;
    border:1px solid #c8ccd4 ;
    border-radius: 5px;
    border-collapse: collapse;
`
export const DetailsSection = styled.div<DetailsProps>`
    padding:20px;
    display: flex;
    justify-content:space-between;
    align-items: center;
    border-left: 1px solid #c8ccd4;
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
    background-color: #c8ccd4;
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
    color:#c8ccd4 ;
    font-weight: 400;
    margin: 0;
`
export const CompanyBillingAmount = styled.span`
    font-size: 25px;
    color: black;
    font-weight: 500;
`
export const Sub = styled.sub`
    color: #c8ccd4;
    font-size: small;
`

export const DateWrapper = styled.div`
    display: flex;
    flex-direction: column;
    padding-right: 100px;

`
export const SectionHeading = styled.p`
    font-size: 13px;
    color:#c8ccd4 ;
    text-transform: uppercase;
    margin: 0 0 10px 0;
    font-weight:600;
`
export const Date = styled.p`
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

export const InvoiceInfo = styled.div`
    display: flex;
    gap: 15px;
`
export const InvoiceInfoLeft = styled.div`
    width: 50%;
    height: 500px;
    background-color: white;
    border:1px solid #c8ccd4;
    border-radius: 5px;

`
export const InvoiceInfoRight = styled.div`
    display: flex;
    flex-direction: column;
`
