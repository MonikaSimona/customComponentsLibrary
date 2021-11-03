import axios from 'axios'
import React, { useEffect, useMemo, useState } from 'react'
import { NavLink } from 'react-router-dom'
import Select from 'react-select';
import { useTable } from 'react-table';
import { Container, HeaderButton, HeaderButtonIcon, HeaderButtonsWrapper, HeadingIconWrapper, NumberOfInvoice, PageHeader, PageHeading, PageHeadingWrapper, RowIcon, RowIconsWrapper, TabButton, TabButtonsWrapper, Table, TableBody, TableData, TableHead, TableHeader, TableRow } from './InvoicesStyles.style';
import { CgFileDocument } from 'react-icons/cg'
import { BsFunnel, BsArchive } from 'react-icons/bs'
import { CgCloseO } from 'react-icons/cg'
interface Props {

}

export interface Approver {
    name: string;
    imgUrl: string;
}
interface InvoiceData {
    id: number;
    invoiceDate: string;
    supplier: string;
    dueDate: string;
    invoiceNumber: string;
    totalPrice: number;
    approver: Approver;

}



const Invoices = (props: Props) => {
    const [hover, setHover] = useState(false);
    const [invoiceData, setInvoiceData] = useState<InvoiceData[]>([]);

    const getData = async () => {
        const response = await axios.get("http://localhost:3000/posts").catch(err => console.log(err));
        if (response) {
            const data = response.data;
            console.log("Invoice Data", data);
            setInvoiceData(data);

        }
    }

    useEffect(() => {
        getData();


    }, [])
    // console.log(Object.keys(invoiceData[0]));
    const invoices = useMemo(() => [...invoiceData], [invoiceData])

    // const columns: any = useMemo(() => [
    //     {
    //         Header: "Invoice Date",
    //         accessor: "invoiceDate"
    //     },
    //     {
    //         Header: "Supplier",
    //         accessor: "supplier",
    //     },
    //     {
    //         Header: "Due date",
    //         accessor: "dueDate"
    //     },
    //     {
    //         Header: "Invoice number",
    //         accessor: "invoiceNumber"
    //     },
    //     {
    //         Header: "total",
    //         accessor: "totalPrice"
    //     },
    //     {
    //         Header: "Approver",
    //         accessor: "approver"
    //     }
    // ], [])
    const invoicesColumns: any = useMemo(() => invoiceData[0] ? Object.keys(invoiceData[0]).filter((key) => key !== "rating" && key !== "id" && key !== "status").map((key) => {
        if (key === "approver") {
            return {
                Header: key,
                accessor: key,
                Cell: (value: Approver) => <p > test</p>,
                maxWidth: 10,
            }
        }
        var headerKey = key;
        if (headerKey.includes("_")) {
            headerKey = headerKey.split("_")[0] + " " + headerKey.split("_")[1]
        }
        return { Header: headerKey, accessor: key }
    }) : [], [invoiceData]);

    const tableHooks = (hooks: any) => {
        hooks.visibleColumns.push((columns: any) => [
            {
                id: "checkBox",
                Header: "",
                Cell: ({ row }: any) => (
                    <input type="checkbox" />
                )
            }, ...columns,
            {
                id: "icons",
                Header: "",
                Cell: ({ row }: any) => {

                    return <RowIconsWrapper>
                        <RowIcon isBlock={hover}>
                            <CgCloseO />
                        </RowIcon>
                        <RowIcon isBlock={true}>
                            text
                        </RowIcon>
                    </RowIconsWrapper>
                }
            }

        ])
    }
    const tableInstance = useTable({ columns: invoicesColumns, data: invoices }, tableHooks);
    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = tableInstance;
    return (
        <Container>
            <PageHeader>
                <PageHeadingWrapper>
                    <HeadingIconWrapper>
                        <CgFileDocument />
                    </HeadingIconWrapper> <PageHeading>Pending supplier invoices</PageHeading> <NumberOfInvoice>({invoiceData.length})</NumberOfInvoice>
                </PageHeadingWrapper>

                <HeaderButtonsWrapper>
                    <HeaderButton>
                        <HeaderButtonIcon>
                            <BsFunnel /> Filters
                        </HeaderButtonIcon>
                    </HeaderButton>
                    <HeaderButton>
                        <HeaderButtonIcon>
                            <BsArchive /> Archives
                        </HeaderButtonIcon>
                    </HeaderButton>
                </HeaderButtonsWrapper>
            </PageHeader>

            <TabButtonsWrapper>
                <TabButton status="new">New<NumberOfInvoice>({7})</NumberOfInvoice></TabButton>
                <TabButton status="recorded">Recorded<NumberOfInvoice>({4})</NumberOfInvoice></TabButton>
                <TabButton status="approved">Approved<NumberOfInvoice>({2})</NumberOfInvoice></TabButton>
                <TabButton status="paid">Paid<NumberOfInvoice>({1})</NumberOfInvoice></TabButton>
            </TabButtonsWrapper>
            <Table {...getTableProps()}>
                <TableHead>
                    {headerGroups.map((headerGroup) => (
                        <TableRow {...headerGroup.getHeaderGroupProps()} >
                            {headerGroup.headers.map((column) => (
                                <TableHeader {...column.getHeaderProps()}>
                                    {column.render("Header")}
                                </TableHeader>
                            ))}
                        </TableRow>
                    ))}
                </TableHead>
                <TableBody {...getTableBodyProps()}>
                    {rows.map((row) => {
                        prepareRow(row);
                        return <TableRow {...row.getRowProps} onMouseOver={() => setHover(true)} onMouseOut={() => setHover(false)}>
                            {row.cells.map((cell, index) => (
                                <TableData  {...cell.getCellProps()}>{cell.render("Cell")}</TableData>
                            ))}
                        </TableRow>
                    })}
                </TableBody>
            </Table>
        </Container>
    )
}

export default Invoices
