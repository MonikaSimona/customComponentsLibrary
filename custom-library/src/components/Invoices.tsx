import axios from 'axios'
import React, { useEffect, useMemo, useState } from 'react'
import Select from 'react-select';
import { useTable } from 'react-table';
import { Colors, Container, HeaderButton, HeaderButtonsWrapper, HeadingIconWrapper, NumberOfInvoice, PageHeader, PageHeading, PageHeadingWrapper, RowIcon, RowIconsWrapper, SelectOptionImg, SelectOptionInitial, SelectOptionText, SelectOptionWrapper, SelectWrapper, TabButton, TabButtonsWrapper, } from './Style/InvoicesStyles.style';
import { CgFileDocument } from 'react-icons/cg'
import { BsFunnel, BsArchive } from 'react-icons/bs'
import { CgCloseO } from 'react-icons/cg'
import { useHistory, useLocation } from 'react-router'
import _, { uniqueId } from "lodash";
import Tooltip from '../customCumponents/Tooltip/Tooltip';
import useModal from '../customCumponents/Modal/useModal';
import Modal from '../customCumponents/Modal/Modal';
import { IoMdClose } from 'react-icons/io';
import { AiOutlineFileAdd } from 'react-icons/ai';
import { TableRow, Table, TableBody, TableData, TableHead, TableHeader, EmptyCell, CellStatusIndicator } from './Style/InvoiceTableStyles.style';
import { DateInput, ErrorMessage, Form, FormHeading, FormWrapper, Input, InputSufix, InputWrapper, Label, SubmitButton } from './Style/InvoiceFormStyles.style';
import { Controller, useForm } from 'react-hook-form';
import { ApproverData, InvoiceData, Options, SupplierData } from './Props';
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import { v4 as uuid } from "uuid"
import { MdArrowDropDown } from 'react-icons/md';
import { currencyOptions } from './InvoiceDetails';

interface Props {
}
export const formatSupplierOptionLabel = (props: Options) => {

    return <SelectOptionWrapper>
        <SelectOptionInitial  >
            {props.customAbbreviation}
        </SelectOptionInitial>
        <SelectOptionText>{props.label}</SelectOptionText>
    </SelectOptionWrapper>
}
export const boxSelectTheme = (theme: any) => {
    return {
        ...theme,
        borderRadius: 0,
    }

}
export const selectStyles = {
    control: (provided: any) => ({
        ...provided,
        padding: 0,
        border: "none",
        width: 300
    }),
    option: (provided: any) => ({
        ...provided,
        width: 300
    }),
    container: (provided: any) => ({
        ...provided,
        width: 300
    })

}

const Invoices = (props: Props) => {
    const history = useHistory();
    const location = useLocation();
    const [invoiceData, setInvoiceData] = useState<InvoiceData[]>([]);
    const [filteredInvoiceData, setFilteredInvoiceData] = useState<InvoiceData[]>([])
    const [supplierData, setSupplierData] = useState<SupplierData[]>([]);
    const [approverData, setApproverData] = useState<ApproverData[]>([]);
    const [approverOptions, setApproverOptions] = useState<Options[]>([])
    const [supplierOptions, setSupplierOptions] = useState<Options[]>([])
    const [invoiceStatus, setInvoiceStatus] = useState("")
    const [statusLenghts, setStatusLenghts] = useState({ numberNew: 0, numberRecorded: 0, numberApproved: 0, numberPaid: 0 })

    const { visible, toggle } = useModal();

    const getData = async (url: string) => {
        const response = await axios.get(`http://localhost:3000/${url}`).catch(err => console.log(err));
        if (response) {
            const data = response.data;
            if (url === "posts") {
                setFilteredInvoiceData(data)
                const numberNew: number = _.filter(data, { status: "new" }).length;
                const numberRecorded: number = _.filter(data, { status: "recorded" }).length;
                const numberApproved: number = _.filter(data, { status: "approved" }).length;
                const numberPaid: number = _.filter(data, { status: "paid" }).length;
                setStatusLenghts({
                    numberNew,
                    numberRecorded,
                    numberApproved,
                    numberPaid
                })

                setInvoiceData(data);

            } else if (url === "suppliers") {
                const temp2: Options[] = []
                data.forEach((data: any) => {
                    const obj = {
                        value: data.name.split(" ")[0].toLowerCase(),
                        label: data.name,
                        customAbbreviation: data.name.split("")[0].toUpperCase()
                    }
                    temp2.push(obj)
                })
                setSupplierOptions(temp2); //getting data for the select option menu
                setSupplierData(data) // getting raw supplier data
            } else {
                const temp1: Options[] = []

                data.forEach((data: any) => {
                    const obj = {
                        value: data.name.split(" ")[0].toLowerCase(),
                        label: data.name,
                        customAbbreviation: data.imgUrl
                    }
                    temp1.push(obj)
                })
                setApproverOptions(temp1); //getting data for the select option menu
                setApproverData(data) // getting raw approver data
            }
        }
    }

    useEffect(() => {

        getData("approvers");
        getData("posts");
        getData("suppliers");


    }, [])


    useEffect(() => {
        const forFilter = [...invoiceData];
        const invoicesStatus = _.filter(forFilter, { status: `${invoiceStatus}` })

        setFilteredInvoiceData(invoicesStatus)

    }, [invoiceStatus])

    const newInvoice = (formData: InvoiceData) => {
        let newInvoice: any;
        const approverName = formData?.approver;
        let newInvoiceApprover: any | undefined;
        let duedate = formData?.due_date.split("-")[2] + "/" + formData?.due_date.split("-")[1] + "/" + formData?.due_date.split("-")[0];
        let invoicedate = formData?.invoice_date.split("-")[2] + "/" + formData?.invoice_date.split("-")[1] + "/" + formData?.invoice_date.split("-")[0];
        //creating approver object
        newInvoiceApprover = _.find(approverData, { name: approverName })
        _.unset(newInvoiceApprover, "id")

        //creating invoice object
        newInvoice = { ...formData };
        _.set(newInvoice, 'approver', newInvoiceApprover);
        _.set(newInvoice, 'id', uuid());
        _.set(newInvoice, 'due_date', duedate);
        _.set(newInvoice, 'invoice_date', invoicedate);
        _.set(newInvoice, 'status', "new");


        console.log(newInvoice)

        axios.post("http://localhost:3000/posts", newInvoice, {
            headers: {
                "Content-Type": "application/json",
            }
        }
        ).then((response) => {
            getData("posts");

        })
            .catch((err) => console.log(err))
    }

    const deleteInvoice = (id: string) => {
        axios.delete(`http://localhost:3000/posts/${id}`)
            .then(res => {
                getData("posts");
            })
            .catch(err => console.log(err))
    }
    const formatOptionLabel = (props: Options) => {
        return <SelectOptionWrapper>
            <SelectOptionImg src={props.customAbbreviation} alt="" />
            <SelectOptionText>{props.label}</SelectOptionText>
        </SelectOptionWrapper>
    }


    //REACT-TABLE
    const invoices = useMemo(() => [...filteredInvoiceData], [filteredInvoiceData])
    const invoicesColumns: any = useMemo(() => filteredInvoiceData[0] ? Object.keys(filteredInvoiceData[0]).filter((key) => key !== "random").map((key) => {
        if (key === "approver") {
            return {
                Header: key,
                accessor: key,
                Cell: (value: any) => {
                    const approver: ApproverData = value.cell.value;
                    const defVal: any | undefined = _.find(approverOptions, { label: approver && approver.name })
                    return <SelectWrapper onClick={(e) => { e.stopPropagation(); }}>
                        <Select
                            key={defVal}
                            defaultValue={defVal} formatOptionLabel={formatOptionLabel} options={approverOptions && approverOptions} isSearchable={false}
                            theme={boxSelectTheme}
                            components={{ DropdownIndicator: () => <MdArrowDropDown fontSize={30} color={Colors.lightGray} />, IndicatorSeparator: () => null }}
                            styles={selectStyles}
                        />
                    </SelectWrapper>
                },
            }
        }
        var headerKey = key;
        if (headerKey.includes("_")) {
            headerKey = headerKey.split("_")[0] + " " + headerKey.split("_")[1]
        }
        if (key === "id" || key === "status" || key === "currency") {
            return {
                Header: "",
                accessor: key,
                Cell: ({ value }: any) => <EmptyCell></EmptyCell>,

            }
        }

        if (key === "invoice_date") {
            return {
                Header: headerKey,
                accessor: "invoice_date",
                Cell: (value: any) => { return <TableData> <CellStatusIndicator status={value.cell.row.values.status} /> {value.cell.row.values.invoice_date}</TableData> },

            }
        }
        if (key === "total") {
            return {
                Headers: key,
                accessor: "total",
                Cell: (value: any) => { return <TableData> {value.cell.row.values.total.toLocaleString()}  {value.cell.row.values.currency === "usd" ? "$" : "€"} </TableData> }
            }
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
                        <Tooltip message="Delete" bgColor="#193169" textColor="white" position="top center">
                            <RowIcon isBlock={true} onClick={(e) => { e.stopPropagation(); deleteInvoice(row.values.id) }}>
                                <CgCloseO />
                            </RowIcon>
                        </Tooltip>
                    </RowIconsWrapper>
                }
            }

        ])
    }
    const tableInstance = useTable({ columns: invoicesColumns, data: invoices }, tableHooks);
    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = tableInstance;
    //REACT-TABLE


    //REACT-HOOK-FORM

    const schema = yup.object().shape({
        invoice_date: yup.string().required("Must provide invoice date"),
        supplier: yup.string().required("Must choose supplier"),
        due_date: yup.string().required("Must provide due date"),
        invoice_number: yup.string().required("Must provide invoice number"),
        total: yup.number().typeError("Total should be number").required("Must total amount"),
        approver: yup.string().required("Must choose approver"),
        currency: yup.string().required("Must provide currency")
    })
    const { register, handleSubmit, control, reset, formState: { errors }, setValue, getValues } = useForm({
        resolver: yupResolver(schema),
    });


    const onSubmit = (data: InvoiceData) => {
        newInvoice(data);
        reset();
        //reseting the selects
        setValue("supplier", null);
        setValue("approver", null);



    }
    //REACT-HOOK-FORM

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
                        <ErrorMessage>{errors.invoice_date?.message}</ErrorMessage>
                        <Label>
                            Supplier
                        </Label>
                        <Controller control={control} render={({ field: { onChange, value, name, ref } }) => (
                            <Select
                                key={`supplier${value && value.label}`}
                                ref={ref}
                                value={_.find(supplierOptions, (c) => c.value === value)}
                                name={name}
                                options={supplierOptions}
                                formatOptionLabel={formatSupplierOptionLabel}
                                onChange={(selectedOption: any): any => {
                                    return onChange(selectedOption.label)
                                }}
                                theme={boxSelectTheme}
                                components={{ DropdownIndicator: () => <MdArrowDropDown fontSize={30} color={Colors.lightGray} />, IndicatorSeparator: () => null }}
                            />
                        )} name={"supplier"} rules={{ required: true }} />
                        <ErrorMessage>{errors.supplier?.message}</ErrorMessage>
                        <Label>
                            Due date
                        </Label>
                        <InputWrapper>
                            <DateInput {...register("due_date")} type="date" />
                        </InputWrapper>
                        <ErrorMessage>{errors.due_date?.message}</ErrorMessage>
                        <Label>
                            Invoice number
                        </Label>
                        <InputWrapper>
                            <Input {...register("invoice_number")} type="text" placeholder="XXX-123" />
                        </InputWrapper>
                        <ErrorMessage>{errors.invoice_number?.message}</ErrorMessage>
                        <Label>
                            Total amount
                        </Label>
                        <InputWrapper>
                            <Input {...register("total")} type="text" placeholder="1000" />
                        </InputWrapper>
                        <ErrorMessage>{errors.total?.message}</ErrorMessage>
                        <Label>Currency</Label>
                        <Controller control={control} render={({ field: { onChange, value, name, ref } }) => (
                            <Select
                                key={`currency${value && value.label}`}
                                ref={ref}
                                value={_.find(currencyOptions, (c) => c.value === value)}
                                name={name}
                                options={currencyOptions}
                                onChange={(selectedOption: any): any => {
                                    return onChange(selectedOption.value)
                                }}
                                components={{ DropdownIndicator: () => <MdArrowDropDown fontSize={30} color={Colors.lightGray} />, IndicatorSeparator: () => null }}

                                theme={boxSelectTheme}
                            />
                        )} name={"currency"} rules={{ required: true, }} />
                        <ErrorMessage>{errors.currency?.message}</ErrorMessage>
                        <Label>
                            Approver
                        </Label>
                        <Controller control={control} render={({ field: { onChange, value, name, ref } }) => (
                            <Select
                                key={`approver${value && value.label}`}

                                ref={ref}
                                value={_.find(approverOptions, (c) => c.value === value)}
                                name={name}
                                options={approverOptions}
                                formatOptionLabel={formatOptionLabel}
                                onChange={(selectedOption: any): any => {
                                    return onChange(selectedOption.label)
                                }}
                                theme={boxSelectTheme}
                                components={{ DropdownIndicator: () => <MdArrowDropDown fontSize={30} color={Colors.lightGray} />, IndicatorSeparator: () => null }}
                            />
                        )} name={"approver"} rules={{ required: true }} />
                        <ErrorMessage>{errors.approver?.message}</ErrorMessage>
                        <SubmitButton type="submit">Create new</SubmitButton>

                    </Form>
                </FormWrapper>
            </Modal>

            <Container>
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
                    <TabButton status="new" onClick={() => setInvoiceStatus("new")} active={invoiceStatus === "new"} >New<NumberOfInvoice>({statusLenghts.numberNew})</NumberOfInvoice></TabButton>
                    <TabButton status="recorded" onClick={() => setInvoiceStatus("recorded")} active={invoiceStatus === "recorded"} >Recorded<NumberOfInvoice>({statusLenghts.numberRecorded})</NumberOfInvoice></TabButton>
                    <TabButton status="approved" onClick={() => setInvoiceStatus("approved")} active={invoiceStatus === "approved"} >Approved<NumberOfInvoice>({statusLenghts.numberApproved})</NumberOfInvoice></TabButton>
                    <TabButton status="paid" onClick={() => setInvoiceStatus("paid")} active={invoiceStatus === "paid"} >Paid<NumberOfInvoice>({statusLenghts.numberPaid})</NumberOfInvoice></TabButton>
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
                                    const dataToPass = _.set(row.values, 'options', { approverOptions, supplierOptions });
                                    history.push("/details", dataToPass)
                                }}>
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

