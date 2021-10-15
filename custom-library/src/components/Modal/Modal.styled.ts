import { rgba, stripUnit } from "polished";
import styled from "styled-components";


export const ModalWrapper = styled.div`
    position: absolute;
    min-height: 100vh;
    width: 100%;
    background-color: ${rgba(0, 0, 0, 0.4)};
    z-index: 9000;

`

export const ModalContainer = styled.div`

    background-color: white;
    color: black;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    padding: 10px;
    display: flex;
    flex-direction: column;
    width: 250px;
    height: 250px;
    border-radius: 5px;

    

`
export const ModalHeader = styled.div`

    display: flex;
    width: 100%;
    justify-content: flex-end;


`
export const ModalCloseButton = styled.span`
    cursor: pointer;
`
export const ModalBody = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

`