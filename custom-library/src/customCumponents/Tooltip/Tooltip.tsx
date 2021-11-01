import React, { useState } from 'react'
import { TooltipWrapper, TooltipElement } from './Tooltip.styled'
import { TooltipProps } from './TooltipProps'



const Tooltip: React.FC<TooltipProps> = ({ children, message, bgColor, textColor, position }) => {

    const [showTooltip, setShowTooltip] = useState(false)
    return (
        <TooltipWrapper onMouseOver={() => setShowTooltip(true)} onMouseOut={() => setShowTooltip(false)}>
            {showTooltip && (
                <TooltipElement message={message} bgColor={bgColor} textColor={textColor} position={position}>
                    {message}
                </TooltipElement>)}

            {children}
        </TooltipWrapper>
    )
}

export default Tooltip



