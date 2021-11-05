import React, { useState } from 'react'
import styled from 'styled-components'
import { MdOutlineArrowBackIosNew, MdOutlineRefresh } from 'react-icons/md'
import { useLocation } from 'react-router'
import { InvoiceData, selectApproverOptions, ApproverOptions } from './Invoices'
import { ApproverImage, BackButton, Company, CompanyBillingAmount, CompanyInfo, CompanyInitial, CompanyName, Container, Date, DateWrapper, DetailsHeader, DetailsSection, HeaderButton, HeaderButtonsWrapper, HeadingIconWrapper, PageHeader, PageHeading, PageHeadingWrapper, SectionHeading, SelectOptionText, StatusIndicator, Sub } from './InvoicesStyles.style'
import { CgCloseO, CgFileDocument } from 'react-icons/cg'
import { AiOutlineFileSync, AiOutlineSave } from 'react-icons/ai'
import Select from 'react-select'
import _ from "lodash";



interface Props {
    history: any;

}

const InvoiceDetails = (props: Props) => {
    const location = useLocation();
    const invoiceData: any = location.state;
    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const stringDate = invoiceData.due_date.split("/");
    const month = months[stringDate[1] - 1];
    const [selectedApprover, setSelectedApprover] = useState<ApproverOptions>();



    const formatOptionLabel = (props: ApproverOptions) => (

        <SelectOptionText>{props.label}</SelectOptionText>

    )

    // console.log(props.history)
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
                <DetailsSection>
                    <DateWrapper>
                        <SectionHeading>
                            Due date
                        </SectionHeading>
                        <Date>
                            {stringDate[0]} {month} {stringDate[2]}
                        </Date>
                    </DateWrapper>
                </DetailsSection>
                <DetailsSection>
                    <Company>
                        <ApproverImage src={selectedApprover ? selectedApprover?.customAbbreviation : invoiceData.approver.imgUrl} />
                        <CompanyInfo>
                            <SectionHeading>
                                Approver
                            </SectionHeading>
                            <Select options={selectApproverOptions} formatOptionLabel={formatOptionLabel} defaultValue={_.find(selectApproverOptions, { label: invoiceData.approver.name })}
                                onChange={(selected) => {
                                    console.log(selected);
                                    selected && setSelectedApprover(selected)
                                }} />
                        </CompanyInfo>
                    </Company>
                </DetailsSection>
            </DetailsHeader>

        </Container>
    )
}

export default InvoiceDetails
