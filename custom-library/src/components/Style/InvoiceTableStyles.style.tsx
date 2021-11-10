import styled from "styled-components"
import { InvoiceProps, RowProps } from "../Props"
import { Colors } from "./InvoicesStyles.style"

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
  border: 1px solid ${Colors.lightGray};
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
  color: ${Colors.lightGray};
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
// export const TableDataWrapper = styled

export const CellStatusIndicator = styled.div<InvoiceProps>`
vertical-align: middle;
  display: inline-block;
  margin-right: 5px;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  border: 6px solid ${props => props.status && props.status === "new" ? "#fef8ec" : props.status === "recorded" ? "#e6f2f9" : props.status === "approved" ? "#e7f0e7" : "#e5e6f4"};
  background-color: ${props => props.status && props.status === "new" ? "#f7bf41" : props.status === "recorded" ? "#4dbef7" : props.status === "approved" ? "#57ab47" : "#4543c7"};
    
`
export const EmptyCell = styled.span`
  display: inline-block;
  width: 0;
`