import React, { useEffect, useState } from 'react'
import { MdOutlineArrowBackIosNew, MdOutlineRefresh } from 'react-icons/md'
import { BiStoreAlt } from 'react-icons/bi'
import { CgCloseO, CgFileDocument } from 'react-icons/cg'
import { AiOutlineFileSync, AiOutlineSave } from 'react-icons/ai'
import Select from 'react-select'
import _ from "lodash";
import { BackButton, Container, HeaderButton, HeaderButtonsWrapper, HeadingIconWrapper, PageHeader, PageHeading, PageHeadingWrapper, SelectOptionInitial, SelectOptionText, SelectOptionWrapper, StatusIndicator } from './Style/InvoicesStyles.style'
import { ApproverImage, BigButton, Company, CompanyBillingAmount, CompanyInfo, CompanyInitial, CompanyName, InvoiceDate, DateWrapper, DetailsHeader, DetailsSection, FormRow, InvoiceDocumentPanel, InvoiceInfo, InvoiceInfoContainer, InvoiceInfoPanel, SectionHeading, Sub, SupplierInfo, Title, VerticalDivider } from './Style/InvoiceDetailsStyles.style'
import { Options } from './Props'
import { Form, Input, InputSufix, InputWrapper, Label } from './Style/InvoiceFormStyles.style'
import { Controller, useForm } from 'react-hook-form'
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import { formatSupplierOptionLabel } from './Invoices'
import { Col, Row } from '../customCumponents/Layout/Grid.styled'
import { useLocation } from 'react-router'


interface Props {
    history: any;

}

const InvoiceDetails = (props: Props) => {
    const location = useLocation();
    const invoiceData: any = location.state;
    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const stringDate = invoiceData.due_date.split("/");
    const month = months[stringDate[1] - 1];
    const [selectedApprover, setSelectedApprover] = useState<Options>();
    const approverOptions: Options[] = invoiceData.options.approverOptions;
    const supplierOptions: Options[] = invoiceData.options.supplierOptions;

    const defInvoiceDate = invoiceData.invoice_date.split("/")[2] + "-" + invoiceData.invoice_date.split("/")[1] + "-" + invoiceData.invoice_date.split("/")[0]
    const defDueDate = invoiceData.due_date.split("/")[2] + "-" + invoiceData.due_date.split("/")[1] + "-" + invoiceData.due_date.split("/")[0]

    const formatOptionLabel = (props: Options) => (

        <SelectOptionText>{props.label}</SelectOptionText>

    )
    useEffect(() => {
        // console.log(invoiceData)
    }, [])
    const schema = yup.object().shape({
        invoice_date: yup.string().required("Must provide invoice date"),
        supplier: yup.string().required("Must choose supplier"),
        due_date: yup.string().required("Must provide due date"),
        invoice_number: yup.string().required("Must provide invoice number"),
        total: yup.number().typeError("Total should be number").required("Must total amount"),
        approver: yup.string().required("Must choose approver")
    })
    const { register, handleSubmit, control, reset, formState: { errors }, setValue, } = useForm({
        resolver: yupResolver(schema),
    });


    return (
        <Container>
            <BackButton onClick={() => { props.history.goBack() }}><MdOutlineArrowBackIosNew /> Back </BackButton>
            <PageHeader>
                <PageHeadingWrapper>
                    <HeadingIconWrapper>
                        <CgFileDocument />
                    </HeadingIconWrapper>
                    <PageHeading>
                        Invoice
                    </PageHeading>
                    <StatusIndicator status={invoiceData.status} >{invoiceData.status}</StatusIndicator>
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
                    <HeaderButton isRecord>
                        <AiOutlineSave className="icon" />
                        Record invoice
                    </HeaderButton>
                    <HeaderButton isRecord isApprove> <AiOutlineSave className="icon" />
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
                                {invoiceData.total} $  <Sub>
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
                            <Select options={approverOptions} formatOptionLabel={formatOptionLabel} defaultValue={_.find(approverOptions, { label: invoiceData.approver.name })}
                                onChange={(selected) => {
                                    console.log(selected);
                                    selected && setSelectedApprover(selected)
                                }} />
                        </CompanyInfo>
                    </Company>
                </DetailsSection>
            </DetailsHeader>
            <InvoiceInfoContainer>
                <InvoiceDocumentPanel>
                </InvoiceDocumentPanel>
                <InvoiceInfoPanel>
                    <Form>
                        <Title>
                            Supplier information
                        </Title>
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
                                        <Input type="text" {...register("amount_tax")} />
                                        <InputSufix>$</InputSufix>
                                    </InputWrapper>
                                </Col>
                                <Col md={4}>
                                    <Label>Amount excluding tax</Label>
                                    <InputWrapper>
                                        <Input type="text" {...register("amount_no_tax")} />
                                        <InputSufix>$</InputSufix>
                                    </InputWrapper>
                                </Col>
                                <Col md={4}>
                                    <Label>Invoice number</Label>
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
                                        />
                                    )} name={"supplier"} rules={{ required: true }} />
                                </Col>
                            </FormRow>
                            <FormRow>
                                <Col md={4}>
                                    <Label>Converted amount incl.tax</Label>
                                    <InputWrapper>
                                        <Input type="text" {...register("conv_amount_tax")} />
                                        <InputSufix>€</InputSufix>
                                    </InputWrapper>
                                </Col>
                                <Col md={4}>
                                    <Label>Converted amount excl.tax</Label>
                                    <InputWrapper>
                                        <Input type="text" {...register("conv_amount_no_tax")} />
                                        <InputSufix>€</InputSufix>
                                    </InputWrapper>
                                </Col>
                                <Col md={4}></Col>

                            </FormRow>
                        </InvoiceInfo>
                    </Form>
                </InvoiceInfoPanel>
            </InvoiceInfoContainer>
        </Container>
    )
}

export default InvoiceDetails
