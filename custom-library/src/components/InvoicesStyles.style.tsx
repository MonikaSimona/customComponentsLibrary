import styled from 'styled-components';
export interface InvoiceProps {
    status: string;
}
export interface IconProps {
    isBlock: boolean;
}
export interface RowProps {
    isHeader: boolean;
}
interface HeaderButtonProps {
    isReject?: boolean;
    isRecord?: boolean;
    isApprove?: boolean;
}

export const Container = styled.div`
    @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800&display=swap');
    padding: 25px;
    padding-top: 30px;
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

`
export const HeaderButtonsWrapper = styled.div`
    display: flex;

`
export const HeaderButton = styled.button<HeaderButtonProps>`
    display: flex;
    align-items: center;
    border: 1px solid  ${({ isReject, isRecord, isApprove }) => isReject ? "#ee6276" : isRecord ? "transparent" : '#ebeef4'};
    background-color: ${({ isReject, isRecord, isApprove }) => isApprove ? "#01589f" : isRecord ? '#3682ae' : "white"};
    font-weight: ${({ isReject, isRecord, isApprove }) => isRecord ? "bold" : 300};
    color: ${({ isReject, isRecord, isApprove }) => isReject ? "#ee6276" : isRecord ? "white" : 'black'};
    padding: 10px 30px;
    margin-left: 10px;
    position: relative;
    .icon{
        font-size: 15px;
        margin-right: 5px;
    }
    .icon-gray{
        color: gray;
    }
`
export const PageHeadingWrapper = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 20px ;
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
        color:#f7bf41;
        background-color:#fef8ec;
    `
        : status === "approved"
            ? `
        color:#57ab47;
        background-color:#e7f0e7;
    `
            : status === "recorded"
                ? `
        color:#4dbef7;
        background-color:#e6f2f9;
    `
                : `
        color:#4543c7;
        background-color:#e5e6f4
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
        background-color: ${props => props.status && props.status === "new" ? "#f7bf41" : props.status === "recorded" ? "#4dbef7" : props.status === "approved" ? "#57ab47" : "#4543c7"};
    }

`
export const DetailsHeader = styled.div`
    display: flex;
    background-color: white;
    border:1px solid #ebeef4 ;
`
export const DetailsSection = styled.div`
    padding:20px;
    display: flex;
    width: 100%;
    justify-content:space-between;
    align-items: center;
    border-right: 1px solid #ebeef4;
`
export const Company = styled.div`
    display: flex;
    align-items: center;

`
export const CompanyInitial = styled.div`
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color: #ebeef4;
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
    color:#ebeef4 ;
    font-weight: 400;
    margin: 0;
`
export const CompanyBillingAmount = styled.span`
    font-size: 25px;
    color: black;
`
export const Sub = styled.sub`
    color: #ebeef4;
    font-size: small;
`



export const Table = styled.table`
    width: 100%;
    color: white;
    background-color: #f8f8f8;
    border-collapse: collapse;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    background-color: white;
    
`
export const TableHead = styled.thead`
    border: 1px solid #b4bed5;
    background-color: white;
`

export const TableRow = styled.tr<RowProps>`
    
    transition: 0.3s;
    ${({ isHeader }) => !isHeader && `
          &:hover{
            cursor: pointer;
            background-color: white;
            box-shadow: 9px 11px 17px -7px rgba(156,156,156,0.78);
    }
    `}
  
`
export const TableHeader = styled.th`
    text-transform: uppercase;
    color: #b4bed5;
    padding: 5px;
    border-left: 1px solid #b4bed5;
    border-right: 1px solid #b4bed5;
    font-size: 13px;
    font-weight: 700;
    text-align: left;
`
export const TableBody = styled.tbody`

`
export const TableData = styled.td`
    padding: 10px 5px;
    font-weight: 300;
    text-align: left;
    font-size: 15px;
    color: black;
`
export const EmptyCell = styled.span`
    display: inline-block;
    width: 0;
`
export const TabButtonsWrapper = styled.div`
    margin-bottom: 10px;
`



export const TabButton = styled.button<InvoiceProps>`
    border: 1px solid #ebeef4;
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
        border: 6px solid ${props => props.status && props.status === "new" ? "#fef8ec" : props.status === "recorded" ? "#e6f2f9" : props.status === "approved" ? "#e7f0e7" : "#e5e6f4"};
        background-color: ${props => props.status && props.status === "new" ? "#f7bf41" : props.status === "recorded" ? "#4dbef7" : props.status === "approved" ? "#57ab47" : "#4543c7"};
    }
    /* transition: 0.3s; */
    &:hover{
        background-color: white;
        box-shadow: 6px 7px 15px -9px rgba(115,115,115,0.65);
        position: relative;
        cursor: pointer;
        /* transition: 0.3s; */
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


`
export const RowIconsWrapper = styled.div`
    width: 200px;
    display: flex;
    justify-content: space-between;
`


export const RowIcon = styled.span<IconProps>`
    display: ${props => props.isBlock ? "block" : "none"};
    color:#ebeef4 ;

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
export const SelectOptionText = styled.span`
    font-size: 14px;
    color: black;
    margin-left: 10px;
`


