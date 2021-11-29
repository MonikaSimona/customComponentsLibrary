import React, { useEffect, useState } from 'react'
import { MdArrowDropDown, MdOutlineArrowBackIosNew, MdOutlineRefresh } from 'react-icons/md'
import { BiStoreAlt } from 'react-icons/bi'
import { CgCloseO, CgFileDocument } from 'react-icons/cg'
import { AiOutlineFileSync, AiOutlineSave } from 'react-icons/ai'
import Select from 'react-select'
import _ from "lodash";
import { BackButton, Colors, Container, HeaderButton, HeaderButtonsWrapper, HeadingIconWrapper, PageHeader, PageHeading, PageHeadingWrapper, SelectOptionInitial, SelectOptionText, SelectOptionWrapper, StatusIndicator } from './Style/InvoicesStyles.style'
import { ApproverImage, BigButton, Company, CompanyBillingAmount, CompanyInfo, CompanyInitial, CompanyName, InvoiceDate, DateWrapper, DetailsHeader, DetailsSection, FormRow, InvoiceDocumentPanel, InvoiceInfo, InvoiceInfoContainer, InvoiceInfoPanel, SectionHeading, Sub, SupplierInfo, Title, VerticalDivider, LinkButton } from './Style/InvoiceDetailsStyles.style'
import { InvoiceData, Options } from './Props'
import { ErrorMessage, Form, FormHeading, FormWrapper, Input, InputSufix, InputWrapper, Label, SubmitButton } from './Style/InvoiceFormStyles.style'
import { Controller, useForm } from 'react-hook-form'
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import { formatSupplierOptionLabel, boxSelectTheme, selectStyles } from './Invoices'
import { Col, Row } from '../customCumponents/Layout/Grid.styled'
import { useHistory, useLocation } from 'react-router'
import axios from 'axios'
import useModal from '../customCumponents/Modal/useModal'
import Modal from '../customCumponents/Modal/Modal'
import { IoMdClose } from 'react-icons/io'
import { v4 as uuid } from "uuid"


interface Props {

}

export const currencyOptions = [{
    value: "usd",
    label: "$ United States Dollar"
},
{
    value: "eur",
    label: "€ Euro"
}]

const InvoiceDetails = (props: Props) => {
    const history = useHistory();
    const location = useLocation();
    const invoiceData: any = location.state;
    const totalAmount = invoiceData.total.toLocaleString();
    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const inoviceId = invoiceData.id;
    const stringDate = invoiceData.due_date.split("/");
    const month = months[stringDate[1] - 1];
    const [selectedApprover, setSelectedApprover] = useState<Options>();
    const approverOptions: Options[] = invoiceData.options.approverOptions;
    const supplierOptions: Options[] = invoiceData.options.supplierOptions;

    const defInvoiceDate = invoiceData.invoice_date.split("/")[2] + "-" + invoiceData.invoice_date.split("/")[1] + "-" + invoiceData.invoice_date.split("/")[0]
    const defDueDate = invoiceData.due_date.split("/")[2] + "-" + invoiceData.due_date.split("/")[1] + "-" + invoiceData.due_date.split("/")[0]

    const [statusState, setStatusState] = useState("")

    const { toggle, visible } = useModal()


    const currency = invoiceData.currency === "usd" ? "$" : "€";
    const currencyInvert = invoiceData.currency === "usd" ? "€" : "$";


    const convertCurrency = (currencyToConv: number) => {
        if (currency === "$") {
            return currencyToConv * 0.7579;
        } else {
            return currencyToConv * 1.3194;
        }
    }



    const editInvoice = (dataToEdit: any, id: string) => {
        axios.patch(`http://localhost:3000/posts/${id}`, dataToEdit, {
            headers: {
                "Content-Type": "application/json",
            }
        }
        ).then((response) => {
            console.log(response)
        })
            .catch((err) => console.log(err))
    }


    const formatOptionLabel = (props: Options) => (
        <SelectOptionText>{props.label}</SelectOptionText>
    )

    useEffect(() => {
        console.log(statusState)
        if (statusState) {
            editInvoice({ status: statusState }, invoiceData.id)

        }
    }, [statusState])

    const schema = yup.object().shape({
        company_name: yup.string(),
        invoice_date: yup.string(),
        supplier: yup.string(),
        due_date: yup.string(),
        invoice_number: yup.string(),
        total: yup.string(),
        approver: yup.string()
    })
    const { register, handleSubmit, control, reset, formState: { errors }, setValue, watch } = useForm({
        resolver: yupResolver(schema),
    });
    const onSubmit = (data: InvoiceData) => {
        let editedDataObject: any = {};
        _.forOwn(data, (value, key) => value && _.set(editedDataObject, key, value))
        console.log(selectedApprover)
        if (selectedApprover) {
            const approverObject = { name: selectedApprover.label, imgUrl: selectedApprover.customAbbreviation }
            _.set(editedDataObject, "approver", approverObject)
        }
        _.set(editedDataObject, "total", _.toNumber(data.total))


        console.log("NEW", editedDataObject);

        editInvoice(editedDataObject, inoviceId)

        history.push("/", "refresh");

    }
    const onNewSupplierSubmit = (data: any) => {
        console.log("DATA Supplier", data.company_name)
        const newSupplier = { id: uuid, name: data.company_name }
        axios.post("http://localhost:3000/suppliers", newSupplier,
            {
                headers: {
                    "Content-Type": "application/json",
                }
            }
        ).then((response) => {
        })
            .catch((err) => console.log(err))

        reset();
        console.log("ERRORS Supplier", errors)
        console.log("WATCH Supplier", watch)
        supplierOptions.push(
            {
                label: data.company_name,
                value: data.company_name.split(" ")[0].toLowerCase(), customAbbreviation: data.company_name.split("")[0].toUpperCase()
            })
    }


    return (
        <>
            <Modal visible={visible} toggle={toggle} closeButtonElement={<IoMdClose />}>
                <FormWrapper>
                    <Form onSubmit={handleSubmit(onNewSupplierSubmit)} id="id">
                        <FormHeading>
                            Add new supplier
                        </FormHeading>
                        <Label>
                            Company name
                        </Label>
                        <InputWrapper>
                            <Input {...register("company_name")} type="text" />
                        </InputWrapper>
                        <ErrorMessage>{errors.company_name?.message}</ErrorMessage>

                        <SubmitButton type="submit">Add supplier</SubmitButton>

                    </Form>
                </FormWrapper>
            </Modal>


            <Container>

                <BackButton onClick={() => { history.goBack() }}><MdOutlineArrowBackIosNew /> Back </BackButton>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <PageHeader>
                        <PageHeadingWrapper>
                            <HeadingIconWrapper>
                                <CgFileDocument />
                            </HeadingIconWrapper>
                            <PageHeading>
                                Invoice
                            </PageHeading>
                            <StatusIndicator status={statusState ? statusState : invoiceData.status} >{statusState ? statusState : invoiceData.status}</StatusIndicator>
                        </PageHeadingWrapper>
                        <HeaderButtonsWrapper>
                            <HeaderButton>
                                <AiOutlineFileSync className="icon icon-gray" />
                                Ask for a credit note
                            </HeaderButton>
                            <HeaderButton isReject>
                                <CgCloseO className="icon" />
                                Reject the invoice
                            </HeaderButton>
                            <HeaderButton type="button" isRecord onClick={() => setStatusState("recorded")} disabled={invoiceData.status === "recorded" || invoiceData.status === "approved"}>
                                <AiOutlineSave className="icon" />
                                Record invoice
                            </HeaderButton>
                            <HeaderButton type="button" isRecord isApprove onClick={() => setStatusState("approved")} disabled={invoiceData.status === "approved"} > <AiOutlineSave className="icon" />
                                Record and Approve
                            </HeaderButton>
                        </HeaderButtonsWrapper>
                    </PageHeader>
                    <DetailsHeader>
                        <DetailsSection first>
                            <Company>
                                <CompanyInitial>
                                    {invoiceData.supplier.charAt(0)}
                                </CompanyInitial>
                                <CompanyInfo>
                                    <CompanyName>
                                        {invoiceData.supplier}
                                    </CompanyName>
                                    <CompanyBillingAmount>
                                        {invoiceData.total.toLocaleString()} {currency}  <Sub>
                                            Tax inclusive
                                        </Sub>
                                    </CompanyBillingAmount>
                                </CompanyInfo>
                            </Company>
                            <HeaderButton>
                                <MdOutlineRefresh className="icon icon-gray" /> Invoice History
                            </HeaderButton>
                        </DetailsSection>
                        <VerticalDivider />
                        <DetailsSection>
                            <DateWrapper>
                                <SectionHeading>
                                    Due date
                                </SectionHeading>
                                <InvoiceDate>
                                    {stringDate[0]} {month} {stringDate[2]}
                                </InvoiceDate>
                            </DateWrapper>
                        </DetailsSection>
                        <VerticalDivider />
                        <DetailsSection>
                            <Company>
                                <ApproverImage src={selectedApprover ? selectedApprover?.customAbbreviation : invoiceData.approver.imgUrl} />
                                <CompanyInfo>
                                    <SectionHeading>
                                        Approver
                                    </SectionHeading>
                                    <Controller control={control} render={({ field: { onChange, value, name, ref } }) => (
                                        <Select
                                            key={`approver${value && value.label}`}
                                            ref={ref}
                                            name={name}
                                            options={approverOptions}
                                            formatOptionLabel={formatOptionLabel}
                                            defaultValue={_.find(approverOptions, { label: invoiceData.approver.name })}
                                            onChange={(selected) => {
                                                selected && setSelectedApprover(selected)
                                            }}
                                            components={{ DropdownIndicator: () => <MdArrowDropDown fontSize={30} color={Colors.lightGray} />, IndicatorSeparator: () => null }}
                                            styles={selectStyles}
                                            theme={boxSelectTheme}

                                        />
                                    )} name={"approver"} />

                                </CompanyInfo>
                            </Company>
                        </DetailsSection>
                    </DetailsHeader>
                    <InvoiceInfoContainer>
                        <InvoiceDocumentPanel>
                        </InvoiceDocumentPanel>
                        <InvoiceInfoPanel>
                            <PageHeader>
                                <Title>
                                    Supplier information
                                </Title>
                                <LinkButton type="button" onClick={toggle}>+ Add a new supplier</LinkButton>

                            </PageHeader>
                            <SupplierInfo>
                                <FormRow  >
                                    <Col md={6} >
                                        <Label>Company name</Label>
                                        <Controller control={control} render={({ field: { onChange, value, name, ref } }) => (
                                            <Select
                                                key={`supplier${value && value.label}`}
                                                ref={ref}
                                                value={_.find(supplierOptions, (c) => c.value === value)}
                                                defaultValue={_.find(supplierOptions, { label: invoiceData.supplier })}
                                                name={name}
                                                options={supplierOptions}
                                                formatOptionLabel={formatSupplierOptionLabel}
                                                onChange={(selectedOption: any): any => {
                                                    return onChange(selectedOption.label)
                                                }}
                                                components={{ DropdownIndicator: () => <MdArrowDropDown fontSize={30} color={Colors.lightGray} />, IndicatorSeparator: () => null }}
                                                theme={boxSelectTheme}
                                            />
                                        )} name={"supplier"} rules={{ required: true }} />
                                    </Col>
                                    <Col md={6}   >
                                        <BigButton onClick={(e) => { e.preventDefault() }}> <BiStoreAlt /> Supplier record </BigButton>
                                    </Col>
                                </FormRow>
                                <FormRow >
                                    <Col md={7} pLGy={15}>
                                        <Label>IBAN</Label>

                                        <InputWrapper>
                                            <Input type="text" {...register("iban")} />
                                        </InputWrapper>
                                    </Col>
                                    <Col md={5}>
                                        <Label>SWIFT/BIC</Label>

                                        <InputWrapper>
                                            <Input type="text" {...register("swift/bic")} />
                                        </InputWrapper>

                                    </Col>
                                </FormRow>

                            </SupplierInfo>
                            <InvoiceInfo>
                                <Title>
                                    Invoice information
                                </Title>
                                <FormRow>
                                    <Col md={4}>
                                        <Label>Billing date</Label>
                                        <InputWrapper>
                                            <Input type="date" {...register("invoice_date")} defaultValue={defInvoiceDate} />
                                        </InputWrapper>
                                    </Col>
                                    <Col md={4}>
                                        <Label>Due date</Label>
                                        <InputWrapper>
                                            <Input type="date" {...register("due_date")} defaultValue={defDueDate} />
                                        </InputWrapper>
                                    </Col>
                                    <Col md={4}>
                                        <Label>Invoice number</Label>
                                        <InputWrapper>
                                            <Input type="text" {...register("invoice_number")} defaultValue={invoiceData.invoice_number} />
                                        </InputWrapper>
                                    </Col>
                                </FormRow>
                                <FormRow>
                                    <Col md={4}>
                                        <Label>Amount incl.tax</Label>
                                        <InputWrapper>
                                            <Input type="text" {...register("total")} defaultValue={invoiceData.total} />
                                            <InputSufix>{currency}</InputSufix>
                                        </InputWrapper>
                                    </Col>
                                    <Col md={4}>
                                        <Label>Amount excluding tax</Label>
                                        <InputWrapper>
                                            <Input type="text" {...register("amount_no_tax")} defaultValue={invoiceData.total} disabled />
                                            <InputSufix>{currency}</InputSufix>
                                        </InputWrapper>
                                    </Col>
                                    <Col md={4}>
                                        <Label>Currency</Label>
                                        <Controller control={control} render={({ field: { onChange, value, name, ref } }) => (
                                            <Select
                                                key={`currency${value && value.label}`}
                                                ref={ref}
                                                value={_.find(currencyOptions, (c) => c.value === value)}
                                                defaultValue={currencyOptions[currency === "$" ? 0 : 1]}

                                                name={name}
                                                options={currencyOptions}
                                                onChange={(selectedOption: any): any => {
                                                    return onChange(selectedOption.value)
                                                }}
                                                components={{ DropdownIndicator: () => <MdArrowDropDown fontSize={30} color={Colors.lightGray} />, IndicatorSeparator: () => null }}

                                                theme={boxSelectTheme}
                                            />
                                        )} name={"currency"} rules={{ required: true, }} />
                                    </Col>
                                </FormRow>
                                <FormRow>
                                    <Col md={4}>
                                        <Label>Converted amount incl.tax</Label>
                                        <InputWrapper>
                                            <Input type="text" {...register("conv_amount_tax")} defaultValue={convertCurrency(invoiceData.total).toLocaleString()} disabled />
                                            <InputSufix>{currencyInvert}</InputSufix>
                                        </InputWrapper>
                                    </Col>
                                    <Col md={4}>
                                        <Label>Converted amount excl.tax</Label>
                                        <InputWrapper>
                                            <Input type="text" {...register("conv_amount_no_tax")} defaultValue={convertCurrency(invoiceData.total).toLocaleString()} disabled />
                                            <InputSufix>{currencyInvert}</InputSufix>
                                        </InputWrapper>
                                    </Col>

                                    <Col md={4}>
                                        <SubmitButton edit type="submit">Edit invoice</SubmitButton>
                                    </Col>

                                </FormRow>
                            </InvoiceInfo>
                        </InvoiceInfoPanel>
                    </InvoiceInfoContainer>
                </Form>
            </Container>
        </>
    )
}

export default InvoiceDetails
