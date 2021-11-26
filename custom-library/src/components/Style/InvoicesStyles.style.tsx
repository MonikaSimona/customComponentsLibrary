import styled from 'styled-components';
import { HeaderButtonProps, IconProps, InvoiceProps } from '../Props';

export enum Colors {
    statusNew = "#f7bf41",
    lightStatusNew = "#fef8ec",
    statusRecorded = "#4dbef7",
    lightStatusRecorded = "#e6f2f9",
    statusApproved = "#57ab47",
    lightStatusApproved = "#e7f0e7",
    statusPaid = "#4543c7",
    lightStatusPaid = "#e5e6f4",
    lightGray = "#bfc1c5",
    gray = "#9a9b9e"

}

export const Container = styled.div`
    @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800&display=swap');
    padding: 30px;
    padding-top: 35px;
    font-family: "Poppins",sans-serif;
`
export const BackButton = styled.span`
    color: gray;
    cursor: pointer;
    font-size: 15px;
    display: flex;
    align-items: center;
    &:hover{
        color: #014768;
    }
`
export const PageHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;

`
export const HeaderButtonsWrapper = styled.div`
    display: flex;

`
export const HeaderButton = styled.button<HeaderButtonProps>`
    display: flex;
    align-items: center;
    border: 1px solid  ${({ isReject, isRecord }) => isReject ? "#ee6276" : isRecord ? "transparent" : '#c8ccd4'};
    background-color: ${({ isRecord, isApprove }) => isApprove ? "#01589f" : isRecord ? '#3682ae' : "white"};
    font-weight: ${({ isRecord }) => isRecord ? "bold" : 300};
    color: ${({ isReject, isRecord }) => isReject ? "#ee6276" : isRecord ? "white" : 'black'};
    padding: 10px 30px;
    margin-left: 10px;
    position: relative;
    opacity: 0.7;
    .icon{
        font-size: 15px;
        margin-right: 5px;
    }
    .icon-gray{
        color: gray;
    }
    transition: 0.3s;
    &:hover{
        cursor: pointer;
        opacity: 1;
    }
    :disabled{
        :hover{
            opacity: 0.7;
            cursor: default;
        }
    }
`
export const PageHeadingWrapper = styled.div`
    display: flex;
    align-items: center;
`
export const PageHeading = styled.h1`
    font-weight: 700;
    font-size: 22px;
    color: black;
    margin-left: 5px;
`
export const HeadingIconWrapper = styled.span`
    font-size: 20px;
    color: #008cff;

`
export const NumberOfInvoice = styled.span`
    color: gray;
    font-size: 13px;
    margin-left: 5px;
`
export const StatusIndicator = styled.span<InvoiceProps>`
    display: inline-block;
    padding: 10px 35px;
    font-weight: 700;
    font-size: 14px;
    margin-left: 10px;
    text-transform: uppercase;
    ${({ status }) => status && status === "new"
        ? `
        color:${Colors.statusNew};
        background-color:${Colors.lightStatusNew};
    `
        : status === "approved"
            ? `
        color:${Colors.statusApproved};
        background-color:${Colors.lightStatusApproved};
    `
            : status === "recorded"
                ? `
        color:${Colors.statusRecorded};
        background-color:${Colors.lightStatusRecorded};
    `
                : `
        color:${Colors.lightStatusPaid};
        background-color:${Colors.lightStatusPaid}
    `}
    position: relative;
        &::after{
        content: "";
        position: absolute;
        top: 50%;
        left: 10%;
        transform: translateY(-50%);
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background-color: ${props => props.status && props.status === "new" ? `${Colors.lightStatusNew}` : props.status === "recorded" ? `${Colors.statusRecorded}` : props.status === "approved" ? `${Colors.statusApproved}` : `${Colors.lightStatusPaid}`};
    }

`

export const TabButtonsWrapper = styled.div`
    margin-bottom: 10px;
`
export const TabButton = styled.button<InvoiceProps>`
    border: 1px solid #c8ccd4;
    background-color: transparent;
    color: black;
    font-weight: 300;
    padding: 10px 40px;
    font-size: 15px;
    position: relative;
    &::after{
        content: "";
        position: absolute;
        top: 50%;
        left: 9%;
        transform: translateY(-50%);
        width: 8px;
        height: 8px;
        border-radius: 50%;
        border: 6px solid ${props => props.status && props.status === "new" ? `${Colors.lightStatusNew}` : props.status === "recorded" ? `${Colors.lightStatusRecorded}` : props.status === "approved" ? `${Colors.lightStatusApproved}` : `${Colors.lightStatusPaid}`};
        background-color: ${props => props.status && props.status === "new" ? `${Colors.statusNew}` : props.status === "recorded" ? `${Colors.statusRecorded}` : props.status === "approved" ? `${Colors.statusApproved}` : `${Colors.statusPaid}`};
    }
    &:hover{
        background-color: white;
        box-shadow: 6px 7px 15px -9px rgba(115,115,115,0.65);
        position: relative;
        cursor: pointer;
        &::before{
            position: absolute;
            content: "";
            width: 100%;
            left: 0;
            bottom:-1px;
            height: 3px;
            background-color: #3682ae;
        }
      
    }
    ${({ active }) => active && `
           background-color: white;
        box-shadow: 6px 7px 15px -9px rgba(115,115,115,0.65);
        position: relative;
        cursor: pointer;
        &::before{
            position: absolute;
            content: "";
            width: 100%;
            left: 0;
            bottom:-1px;
            height: 3px;
            background-color: #3682ae;
        }
        `}
`
export const RowIconsWrapper = styled.div`
    width: 100px;
    display: flex;
    justify-content: end;
`

export const RowIcon = styled.p<IconProps>`
    display: ${props => props.isBlock ? "block" : "none"};
    color:${Colors.lightGray} ;
    margin: 0;
    transition: .3s;
    &:hover{
        color:  black;
    }
`
export const SelectWrapper = styled.div`
  
`
export const SelectOptionWrapper = styled.div`
    display: flex;
    width: 100%;
    align-items: center;
`
export const SelectOptionImg = styled.img`
    width: 30px;
    height: 30px;
    border-radius: 50%;
    object-position: center center;
    object-fit: cover;
`
export const SelectOptionInitial = styled.div`
    width: 25px;
    height: 25px;
    border-radius: 50%;
    background-color: #c8ccd4;
    display: flex;
    justify-content:center;
    align-items: center;
    font-size: 15px;
    color: black;
`
export const SelectOptionText = styled.span`
    font-size: 14px;
    color: black;
    margin-left: 10px;
`


