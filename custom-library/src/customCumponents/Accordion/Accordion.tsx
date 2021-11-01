import React, { useState } from 'react'
import { AccordionWrapper } from './Accordion.styled'
import { AccordionItem } from './AccordionItem'
import { AccordionProps } from './AccordionProps'


const Accordion: React.FC<AccordionProps> = ({ accordionData }) => {
    const [clicked, setClicked] = useState("0")

    const handleToggle = (index: any) => {
        if (clicked === index) {
            return setClicked("0")
        }
        setClicked(index)
    };
    return (
        <AccordionWrapper>
            {accordionData && accordionData.map(({ title, content }, index: any) => (
                <AccordionItem key={index} title={title} content={content} onToggle={() => handleToggle(index)} active={clicked === index} />
            ))}
        </AccordionWrapper>
    )
}

export default Accordion
