import styled from 'styled-components';

export const Container = styled.div`
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;500;600;700;800&display=swap');
    padding: 25px;
    padding-top: 30px;
    font-family: "Poppins",sans-serif;
`
export const PageHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;

`
export const HeaderButtonsWrapper = styled.div`

`
export const HeaderButton = styled.button`
    border: 1px solid #ebeef4;
    background-color: white;
    font-weight: 300;
    color: black;
    padding: 10px 30px;
    margin-left: 10px;
`
export const HeaderButtonIcon = styled.span`

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

export const TableRow = styled.tr`
    
    transition: 0.3s;
    &:hover{
        background-color: white;
        box-shadow: 9px 11px 17px -7px rgba(156,156,156,0.78);
    }
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
    padding: 5px;
    font-weight: 300;
    text-align: left;
    font-size: 15px;
    color: black;
`
export const TabButtonsWrapper = styled.div`
    margin-bottom: 10px;
`

export interface TabButtonProps {
    status: string;
}

export const TabButton = styled.button<TabButtonProps>`
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
export interface IconProps {
    isBlock: boolean;
}

export const RowIcon = styled.span<IconProps>`
    display: ${props => props.isBlock ? "block" : "none"};
    color:#ebeef4 ;

`

