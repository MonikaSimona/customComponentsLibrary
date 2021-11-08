import axios from 'axios'
import React, { useEffect, useMemo, useState } from 'react'
import Select, { OptionProps } from 'react-select';
import { useTable } from 'react-table';
import { Container, HeaderButton, HeaderButtonsWrapper, HeadingIconWrapper, NumberOfInvoice, PageHeader, PageHeading, PageHeadingWrapper, RowIcon, RowIconsWrapper, SelectOptionImg, SelectOptionInitial, SelectOptionText, SelectOptionWrapper, SelectWrapper, TabButton, TabButtonsWrapper, } from './Style/InvoicesStyles.style';
import { CgFileDocument } from 'react-icons/cg'
import { BsFunnel, BsArchive } from 'react-icons/bs'
import { CgCloseO } from 'react-icons/cg'
import { useHistory } from 'react-router'
import _, { uniqueId } from "lodash";
import Tooltip from '../customCumponents/Tooltip/Tooltip';
import useModal from '../customCumponents/Modal/useModal';
import Modal from '../customCumponents/Modal/Modal';
import { IoMdClose } from 'react-icons/io';
import { AiOutlineFileAdd } from 'react-icons/ai';
import { TableRow, Table, TableBody, TableData, TableHead, TableHeader, EmptyCell } from './Style/InvoiceTableStyles.style';
import { DateInput, Form, FormHeading, FormWrapper, Input, InputSufix, InputWrapper, Label, SubmitButton } from './Style/InvoiceFormStyles.style';
import { useForm } from 'react-hook-form';


interface Props {


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




const Invoices = (props: Props) => {
    const history = useHistory();
    const [hover, setHover] = useState(false);
    const [invoiceData, setInvoiceData] = useState<InvoiceData[]>([]);
    const [supplierData, setSupplierData] = useState<SupplierData[]>([]);
    const [approverData, setApproverData] = useState<ApproverData[]>([]);
    const [approverOptions, setApproverOptions] = useState<Options[]>([])
    const [supplierOptions, setSupplierOptions] = useState<Options[]>([])

    const [newInvoiceData, setNewInvoice] = useState<InvoiceData>();
    const { visible, toggle } = useModal();


    const getData = async (url: string) => {
        const response = await axios.get(`http://localhost:3000/${url}`).catch(err => console.log(err));
        if (response) {
            const data = response.data;
            console.log(`${url} Data`, data);
            if (url === "posts") {
                setInvoiceData(data);

            } else if (url === "suppliers") {
                setSupplierData(data)
            } else {
                setApproverData(data)
            }

        }
    }
    useEffect(() => {
        getData("posts");
        getData("suppliers");
        getData("approvers");
        const temp: Options[] = []
        const temp2: Options[] = []

        approverData.forEach((data: any) => {
            const obj = {
                value: data.name.split(" ")[0].toLowerCase(),
                label: data.name,
                customAbbreviation: data.imgUrl
            }
            temp.push(obj)
        })
        setApproverOptions(temp)

        supplierData.forEach((data: any) => {
            const obj = {
                value: data.name.split(" ")[0].toLowerCase(),
                label: data.name,
                customAbbreviation: data.name.split("")[0].toUpperCase()
            }
            temp2.push(obj)
        })
        setSupplierOptions(temp2)
    }, [])






    const newInvoice = () => {
        let newInvoice: InvoiceData;


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
        ).then((response) => { window.location.reload(); console.log(response); })
            .catch((err) => console.log(err))


    }

    const deleteInvoice = (id: number) => {
        axios.delete(`http://localhost:3000/posts/${id}`)
            .then(res => { window.location.reload(); console.log(res) })
            .catch(err => console.log(err))
    }




    const formatOptionLabel = (props: Options) => (
        <SelectOptionWrapper>
            <SelectOptionImg src={props.customAbbreviation} alt="" />
            <SelectOptionText>{props.label}</SelectOptionText>
        </SelectOptionWrapper>
    )
    const formatSupplierOptionLabel = (props: Options) => (
        <SelectOptionWrapper>
            <SelectOptionInitial  >
                {props.customAbbreviation}
            </SelectOptionInitial>
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
                    const approver: ApproverData = value.cell.value;
                    const defVal: any | undefined = _.find(approverOptions, { label: approver.name })

                    return <SelectWrapper onClick={(e) => { e.stopPropagation(); console.log("fate select "); }}>
                        <Select
                            defaultValue={defVal} formatOptionLabel={formatOptionLabel} options={approverOptions} />
                    </SelectWrapper>
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
                            <RowIcon isBlock={true} onClick={(e) => { e.stopPropagation(); console.log('fate icon'); deleteInvoice(row.values.id) }}>
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
    const { register, handleSubmit } = useForm();
    const onSubmit = (data: any) => {
        console.log(data)
    }

    return (
        <>
            <Modal visible={visible} toggle={toggle} closeButtonElement={<IoMdClose />}>
                <FormWrapper>
                    <Form onSubmit={handleSubmit(onSubmit)}>
                        <FormHeading>
                            Create New Invoice
                        </FormHeading>
                        <Label>
                            Invoice date
                        </Label>
                        <InputWrapper>
                            <DateInput {...register("invoice_date")} type="date" />
                        </InputWrapper>

                        <Label>
                            Supplier
                        </Label>
                        <Select options={supplierOptions} formatOptionLabel={formatSupplierOptionLabel} />
                        <Label>
                            Due date
                        </Label>
                        <InputWrapper>
                            <DateInput {...register("due_date")} type="date" />
                        </InputWrapper>
                        <Label>
                            Invoice number
                        </Label>
                        <InputWrapper>
                            <Input {...register("invoice_number")} type="text" placeholder="XXX-123" />
                        </InputWrapper>
                        <Label>
                            Total amount
                        </Label>
                        <InputWrapper>
                            <Input {...register("total")} type="text" placeholder="1000" />
                        </InputWrapper>
                        <Label>
                            Approver
                        </Label>
                        <Select
                            formatOptionLabel={formatOptionLabel} options={approverOptions} />

                        <SubmitButton type="submit">Submit</SubmitButton>

                    </Form>
                </FormWrapper>
            </Modal>
            <Container>
                <button onClick={() => newInvoice()}>new post </button>
                <button onClick={() => deleteInvoice(4)}>delete invoice</button>
                <button onClick={toggle}>Open modal</button>

                <PageHeader>
                    <PageHeadingWrapper>
                        <HeadingIconWrapper>
                            <CgFileDocument />
                        </HeadingIconWrapper>
                        <PageHeading>Pending supplier invoices</PageHeading> <NumberOfInvoice>({invoiceData.length})</NumberOfInvoice>
                    </PageHeadingWrapper>

                    <HeaderButtonsWrapper>
                        <HeaderButton onClick={toggle}>
                            <AiOutlineFileAdd className="icon" />
                            New Invoice
                        </HeaderButton>
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
                            return <TableRow isHeader={false} {...row.getRowProps}

                                onClick={() => {
                                    const dataToPass = _.set(row.values, 'options', approverOptions);
                                    console.log("fate row", dataToPass);
                                    history.push("/details", dataToPass)
                                }}
                            >
                                {row.cells.map((cell, index) => (
                                    <TableData  {...cell.getCellProps()}>{cell.render("Cell")}</TableData>
                                ))}
                            </TableRow>
                        })}
                    </TableBody>
                </Table>
            </Container>
        </>
    )
}

export default Invoices

