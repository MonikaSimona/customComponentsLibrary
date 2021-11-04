import React, { useState } from 'react'
import styled from 'styled-components'
import { MdOutlineArrowBackIosNew } from 'react-icons/md'
import { useLocation } from 'react-router'
import { InvoiceData } from './Invoices'
import { BackButton, Company, CompanyBillingAmount, CompanyInfo, CompanyInitial, CompanyName, Container, DetailsHeader, DetailsSection, HeaderButton, HeaderButtonsWrapper, HeadingIconWrapper, PageHeader, PageHeading, PageHeadingWrapper, StatusIndicator, Sub } from './InvoicesStyles.style'
import { CgCloseO, CgFileDocument } from 'react-icons/cg'
import { AiOutlineFileSync, AiOutlineSave } from 'react-icons/ai'



interface Props {
    history: any;

}

const InvoiceDetails = (props: Props) => {
    const location = useLocation();
    const invoiceData: any = location.state;
    console.log(invoiceData)
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
                <DetailsSection>
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
                </DetailsSection>
                <DetailsSection></DetailsSection>
                <DetailsSection></DetailsSection>
            </DetailsHeader>
        </Container>
    )
}

export default InvoiceDetails
