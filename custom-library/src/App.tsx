import logo from './logo.svg';
import './App.scss';
import Tooltip from './components/Tooltip/Tooltip';
import { useEffect, useState } from 'react';
import Modal from './components/Modal/Modal';
import useModal from './components/Modal/useModal';
import { IoMdClose } from "react-icons/io"
import styled from 'styled-components';
import Accordion from './components/Accordion/Accordion';
import { AccordionItemData, AccordionProps } from './components/Accordion/AccordionProps';
import { Pagination } from './components/Pagination/Pagination';
import usePagination from './components/Pagination/usePagination';
import { Carousel } from './components/Carousel/Carousel';
import { Col, Row } from './components/Layout/Grid.styled'

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
  const [pageData, setPageData] = useState<any>(null);
  const [paginationInfo, setPaginationInfo] = useState({ data: [], numberOfElements: 0, numberOfPages: 0 })
  const { clickedPageNumber, statePageNumber, start } = usePagination();

  useEffect(() => {
    fetch(`http://jsonplaceholder.typicode.com/comments`)
      .then(res => res.json())
      .then(data => setPageData(data.slice(0, 10)))
  }, [])

  useEffect(() => {

    fetch(`http://jsonplaceholder.typicode.com/comments`)
      .then(res => res.json())
      .then(data => setPaginationInfo({ data, numberOfElements: data.length, numberOfPages: data.length / 10 }))

    getPageData();

  }, [statePageNumber])
  const { visible, toggle } = useModal();

  const getPageData = () => { // makes data into slices of then elements each , for pagination
    const startIndex = statePageNumber * 10 - 10;
    const endIndex = startIndex + 10;
    setPageData(paginationInfo.data.slice(startIndex, endIndex))

  }
  const accordionData: AccordionItemData[] = [
    {
      title: "Title 1",
      content: "Lorem ipsum dolor  amet, consectetur adipiscing elit. Sed mi quam, vehicula suscipit sem ac, ultricies laoreet purus. Fusce imperdiet consectetur erat id tincidunt. Etiam non fermentum odio, sed vestibulum metus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed mi quam, vehicula suscipit sem ac, ultricies laoreet purus. Fusce imperdiet consectetur erat id tincidunt. Etiam non fermentum odio, sed vestibulum metus."
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

  const carouselDataImages = [
    "https://images.unsplash.com/photo-1634663476205-812f96a5705b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1631&q=80",


    "https://images.unsplash.com/photo-1634638591750-cf2f8662944e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=697&q=80",


    "https://images.unsplash.com/photo-1634578943775-82fe928d9e83?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=687&q=80",


    "https://images.unsplash.com/photo-1634491464263-60e06f561bab?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=687&q=80",

  ]
  const carouselDataOther = [
    <div className="slide">
      <h3>Slide 1 title</h3>
      <p>Slide 1 content text Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptate, odit!</p>
    </div>,
    <div className="slide">
      <h3>Slide 2 title</h3>
      <p>Slide 2 content text Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptate, odit!</p>
    </div>,
    <div className="slide">
      <h3>Slide 3 title</h3>
      <p>Slide 3 content text Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptate, odit!</p>
    </div>,
    <div className="slide">
      <h3>Slide 4 title</h3>
      <p>Slide 4 content text Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptate, odit!</p>
    </div>,
  ]

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

      <h1>Accordion example:</h1>
      <Accordion accordionData={accordionData}></Accordion>

      <hr />
      <h1>Paggination example:</h1>

      <Pagination currentPage={statePageNumber} clickedPageNumber={clickedPageNumber} maxNumberOfPages={50} numberOfPagesOnDisplay={10} start={start} >
        <div className="pageContainer">
          {pageData && pageData.map((page: any, index: number) => (
            <div key={index} className="post">

              <h1>
                {page.email} id: <span>{page.id}</span>
              </h1>
              {/* <p>{page.body}</p> */}
            </div>
          ))}
        </div>

      </Pagination>
      <hr />

      <h1>Carousel example:</h1>
      <h2>(with images)</h2>
      <div className="slider">
        <Carousel slidesData={carouselDataImages} arrows={true} typeOfSlides="images" indicators={true} />
      </div>

      <hr />
      <h1>Carousel example:</h1>
      <h2>(with other content)</h2>

      <div className="slider">
        <Carousel slidesData={carouselDataOther} arrows={true} typeOfSlides="other" indicators={true} />
      </div>

      <hr />
      <h1>Using Grid example:</h1>

      <Row m={12}>
        <Col md={12} > <div className="exampleCol">1</div> </Col>
        <Col md={1} m={10}><div className="exampleCol">2</div></Col>
        <Col md={3} m={10}><div className="exampleCol">2</div></Col>

      </Row>

      <hr />

    </div>
  );
}

export default App;
