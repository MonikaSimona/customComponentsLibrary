import styled from "styled-components";
import { SubmitButtonProps } from "../Props";
import { Colors } from "./InvoicesStyles.style";

export const FormWrapper = styled.div`
    width: 400px;
    height: auto;
    padding: 10px;
    font-family: "Poppins",sans-serif;
`
export const Form = styled.form`
   width: 100%;
   display: flex;
   flex-direction: column;
   
`

export const FormHeading = styled.h1`
    color: black;
    font-size: 20px;
    font-weight: 600;
`
export const Label = styled.label`
    font-size: 13px;
    margin: 5px 0;
    color: ${Colors.lightGray};

`
export const InputWrapper = styled.div`
    display: flex;
    width: 100%;
    height: 40px;

`
export const InputSufix = styled.span`
    display: flex;
    width: 55.3px;
    height: 40px;
    align-items: center;
    justify-content: center;
    background-color: ${Colors.lightGray};

`
export const Input = styled.input`
    width: 100%;
    border:1px solid ${Colors.lightGray};
    padding: 5px;
    &::placeholder{
    color:${Colors.lightGray} ;
    }
    &:focus-visible{
        outline:1px solid black !important;
    }
  
`
export const DateInput = styled.input.attrs({
    type: "date",
})`
    width: 100%;
    border:1px solid ${Colors.lightGray};
    padding: 5px;
    &::placeholder{
    color:${Colors.lightGray} ;
    }
    &:focus-visible{
        outline:1px solid black !important;
    }

    &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button {
    -webkit-appearance: none;
  }
   
 
`
export const SubmitButton = styled.button<SubmitButtonProps>`
    width: ${({ edit }) => edit ? '100%' : 'auto'};
    padding: 10px 15px;
    border: 1px solid ${Colors.lightGray};
 
    background-color: ${Colors.lightGray};
        color: white;
    font-size: 16px;
    font-weight: 500;
    transition: 0.3s;
    margin:${({ edit }) => !edit && '20px auto 10px auto'};
    &:hover{
        color:black;
    border: 1px solid ${Colors.lightGray};
    background-color: white;
        cursor: pointer;
    }
`

export const ErrorMessage = styled.p`
    color: maroon;
    height: 20px;
    font-size: 14px;
    margin: 0;
    margin-left: 5px;
    
`
