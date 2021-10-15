import logo from './logo.svg';
import './App.css';
import Tooltip from './components/Tooltip/Tooltip';
import { useState } from 'react';
import Modal from './components/Modal/Modal';
import useModal from './components/Modal/useModal';
import { IoMdClose } from "react-icons/io"
import styled from 'styled-components';
import Accordion from './components/Accordion/Accordion';
import { AccordionItemData, AccordionProps } from './components/Accordion/AccordionProps';

const Button = styled.button`

background-color: bisque;
color: navy;
border: none;
padding: 10px;
border-radius: 5px;
cursor: pointer;
font-weight: bold;
`


function App() {
  const { visible, toggle } = useModal();
  const data: AccordionItemData[] = [
    {
      title: "Title 1",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed mi quam, vehicula suscipit sem ac, ultricies laoreet purus. Fusce imperdiet consectetur erat id tincidunt. Etiam non fermentum odio, sed vestibulum metus."
    },
    {
      title: "Title 2",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed mi quam, vehicula suscipit sem ac, ultricies laoreet purus. Fusce imperdiet consectetur erat id tincidunt. Etiam non fermentum odio, sed vestibulum metus."
    },
    {
      title: "Title 3",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed mi quam, vehicula suscipit sem ac, ultricies laoreet purus. Fusce imperdiet consectetur erat id tincidunt. Etiam non fermentum odio, sed vestibulum metus."
    },
  ];
  return (
    <div className="App">
      <h1>Tooltip examples - hover over to show:</h1>
      <Tooltip message="tooltip text" bgColor="bisque" textColor="black" position="bottom left">
        <h2>-Tooltip: bgColor - bisque, textColor - black,  position - "bottom left"</h2>
      </Tooltip>
      <Tooltip message="tooltip text" bgColor="pink" textColor="navy" position="top center">
        <h2>-Tooltip: bgColor - pink, textColor - navy,  position - "top center"</h2>
      </Tooltip>

      <hr />
      <h1>Modal example:</h1>

      <Button onClick={toggle}>Open modal</Button>
      <Modal visible={visible} toggle={toggle} closeButtonElement={<IoMdClose />}>
        <form>
          <label htmlFor="name">First Name:</label>
          <input type="text" />
          <br />
          <br />
          <label htmlFor="surname">Last Name:</label>
          <input type="text" />
          <br />
          <br />
          <button type="submit" >Submit</button>
        </form>
      </Modal>

      <hr />

      <h1>Accordion Example:</h1>
      <Accordion accordionData={data}></Accordion>
    </div>
  );
}

export default App;
