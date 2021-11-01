import React from 'react'
import styled from 'styled-components'
import { MdOutlineArrowBackIosNew } from 'react-icons/md'

const BackButton = styled.span`

color: gray;
cursor: pointer;
font-size: 1.3em;
display: flex;
align-items: center;
&:hover{
    color: #00aeff;
}

`

interface Props {
    history: any;

}

const InvoiceDetails = (props: Props) => {
    console.log(props.history)
    return (
        <div>
            <BackButton onClick={() => { props.history.goBack() }}><MdOutlineArrowBackIosNew /> Back </BackButton>
            details
        </div>
    )
}

export default InvoiceDetails
