import React, { useState } from 'react'
import { ModalBody, ModalCloseButton, ModalContainer, ModalHeader, ModalWrapper } from './Modal.styled'
import { ModalProps } from './ModalProps'


const Modal: React.FC<ModalProps> = ({ children, visible, toggle, closeButtonElement }) => {

    return (
        <>
            {visible ? (
                <ModalWrapper>
                    <ModalContainer>
                        <ModalHeader >
                            <ModalCloseButton onClick={toggle}>
                                {closeButtonElement}
                            </ModalCloseButton>
                        </ModalHeader>
                        <ModalBody>
                            {children}
                        </ModalBody>
                    </ModalContainer>
                </ModalWrapper>
            ) : null}
        </>
    )
}

export default Modal
