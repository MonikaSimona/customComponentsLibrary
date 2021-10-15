import React, { useState } from 'react'
import { AccordionWrapper } from './Accordion.styled'
import { AccordionItem } from './AccordionItem'
import { AccordionProps } from './AccordionProps'


const Accordion: React.FC<AccordionProps> = ({ children, accordionData }) => {


    return (
        <AccordionWrapper>
            {accordionData && accordionData.map(({ title, content }) => (
                <AccordionItem title={title} content={content} />
            ))}
        </AccordionWrapper>
    )
}

export default Accordion
