import styled from "styled-components"
import { RowProps } from "../Props"

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