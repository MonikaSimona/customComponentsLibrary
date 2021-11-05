import axios from 'axios'
import React, { useEffect, useMemo, useState } from 'react'
import Select, { OptionProps } from 'react-select';
import { useTable } from 'react-table';
import { Container, EmptyCell, HeaderButton, HeaderButtonsWrapper, HeadingIconWrapper, NumberOfInvoice, PageHeader, PageHeading, PageHeadingWrapper, RowIcon, RowIconsWrapper, SelectOptionImg, SelectOptionText, SelectOptionWrapper, TabButton, TabButtonsWrapper, Table, TableBody, TableData, TableHead, TableHeader, TableRow } from './InvoicesStyles.style';
import { CgFileDocument } from 'react-icons/cg'
import { BsFunnel, BsArchive } from 'react-icons/bs'
import { CgCloseO } from 'react-icons/cg'
import { useHistory } from 'react-router'
import _, { uniqueId } from "lodash";
import Tooltip from '../customCumponents/Tooltip/Tooltip';
interface Props {


}

export interface Approver {
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
    approver: Approver;

}
export interface ApproverOptions {
    value: string;
    label: string;
    customAbbreviation: string;

}
export const selectApproverOptions: ApproverOptions[] = [
    {
        value: "approver1",
        label: "Hubert Durand",
        customAbbreviation: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"

    },
    {
        value: "approver2",
        label: "Louis Pignet",
        customAbbreviation: "https://images.unsplash.com/photo-1562788869-4ed32648eb72?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1172&q=80"


    },

]


const Invoices = (props: Props) => {
    const history = useHistory();
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


    const formatOptionLabel = (props: ApproverOptions) => (
        <SelectOptionWrapper>
            <SelectOptionImg src={props.customAbbreviation} alt="" />
            <SelectOptionText>{props.label}</SelectOptionText>
        </SelectOptionWrapper>
    )

    const invoices = useMemo(() => [...invoiceData], [invoiceData])

    const invoicesColumns: any = useMemo(() => invoiceData[0] ? Object.keys(invoiceData[0]).filter((key) => key !== "random").map((key) => {
        if (key === "approver") {

            return {
                Header: key,
                accessor: key,
                Cell: (value: any) => {
                    const approver: Approver = value.cell.value;
                    const defVal: any | undefined = _.find(selectApproverOptions, { label: approver.name })

                    return <Select defaultValue={defVal} formatOptionLabel={formatOptionLabel} options={selectApproverOptions} />
                },

            }
        }
        if (key === "id") {
            return {
                Header: "",
                accessor: "id",
                Cell: ({ value }: any) => <EmptyCell></EmptyCell>,

            }
        }
        if (key === "status") {
            return {
                Header: "",
                accessor: "status",
                Cell: ({ value }: any) => <EmptyCell></EmptyCell>,

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
                        <Tooltip message="DELETE" bgColor="#193169" textColor="white" position="top center">
                            <RowIcon isBlock={true} onClick={() => deleteInvoice(row.values.id)}>

                                <CgCloseO />

                            </RowIcon>
                        </Tooltip>
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
    const newInvoice = () => {
        axios.post("http://localhost:3000/posts", {
            id: 4,
            invoice_date: "20/01/2021",
            supplier: "simona",
            due_date: "21/03/2021",
            invoice_number: "384848NN",
            total: 500.52,
            approver: {
                name: "Hubert Durand",
                imgUrl: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
            },
            status: "new"
        }, {
            headers: {
                "Content-Type": "application/json",
            }
        }
        ).then((response) => { console.log(response); })
            .catch((err) => console.log(err))
    }

    const deleteInvoice = (id: number) => {
        axios.delete(`http://localhost:3000/posts/${id}`)
            .then(res => console.log(res))
            .catch(err => console.log(err))
    }
    return (
        <Container>
            <button onClick={() => newInvoice()}>new post </button>
            <button onClick={() => deleteInvoice(4)}>delete invoice</button>
            <PageHeader>
                <PageHeadingWrapper>
                    <HeadingIconWrapper>
                        <CgFileDocument />
                    </HeadingIconWrapper>
                    <PageHeading>Pending supplier invoices</PageHeading> <NumberOfInvoice>({invoiceData.length})</NumberOfInvoice>
                </PageHeadingWrapper>

                <HeaderButtonsWrapper>
                    <HeaderButton>
                        <BsFunnel className="icon" />
                        Filters
                    </HeaderButton>
                    <HeaderButton>
                        <BsArchive className="icon" />
                        Archives
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
                        <TableRow isHeader={true} {...headerGroup.getHeaderGroupProps()} >
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
                        return <TableRow isHeader={false} {...row.getRowProps} onMouseOver={() => setHover(true)} onMouseOut={() => setHover(false)}

                        // onClick={() => { history.push("/details", row.values) }}
                        >
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

