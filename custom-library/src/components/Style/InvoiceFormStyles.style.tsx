import styled from "styled-components";

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
    font-size: 15px;
    margin: 5px 0;

`
export const InputWrapper = styled.div`
    display: flex;
    width: 100%;
    height: 32px;

`
export const InputSufix = styled.span`
    display: flex;
    padding: 10px;
    align-items: center;
    justify-content: center;
    background-color: #c8ccd4;

`
export const Input = styled.input`
    width: 100%;
    border:1px solid #c8ccd4;
    padding: 5px;
    &::placeholder{
    color:#c8ccd4 ;
    }
    &:focus-visible{
        outline:1px solid black !important;
    }
  
`
export const DateInput = styled.input.attrs({
    type: "date",
})`
    width: 100%;
    border:1px solid #c8ccd4;
    padding: 5px;
    &::placeholder{
    color:#c8ccd4 ;
    }
    &:focus-visible{
        outline:1px solid black !important;
    }

    &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button {
    -webkit-appearance: none;
  }
   
 
`
export const SubmitButton = styled.button`
    width: 20%;
    border: 1px solid #c8ccd4;
    padding: 10px 15px;
    color:black;
    background-color: white;
    font-size: 16px;
    font-weight: 500;
    transition: 0.3s;
    margin:20px auto 10px auto;
    &:hover{
        background-color: #c8ccd4;
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
