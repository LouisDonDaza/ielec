import 'regenerator-runtime/runtime'
import React from 'react'
import { login, logout } from './utils'
import './global.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container, Navbar, Nav, NavDropdown} from 'react-bootstrap';
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";

// components
import Home from './Components/Home';
import NewPoll from './Components/NewPoll';
import PollingStation from './Components/PollingStation';
import VoteCheck from './Components/VoteCheck';
import Landing from './Components/Landing';
//images
import BlockLogo from "./assets/blocklogo.png";
import getConfig from './config'
const { networkId } = getConfig(process.env.NODE_ENV || 'development')

export default function App() {
  const changeCandidatesFunction = async (prompt) => {
    let namePair = await window.contract.getCandidatePair({prompt:prompt})
    localStorage.setItem("Candidate1", namePair[0]);
    localStorage.setItem("Candidate2", namePair[1]);
    localStorage.setItem("prompt", prompt);
    window.location.replace(window.location.href+"PollingStation")
  }
  return (<Router>
    <Navbar className="primary--bg" collapseOnSelect expand="lg" bg="dark" variant="dark">
  <Container>
  <Navbar.Brand href="/"><img src={BlockLogo} style={{height:'2rem', width:'auto'}}></img></Navbar.Brand>
  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
  <Navbar.Collapse id="responsive-navbar-nav">
    <Nav className="mx-auto">
    </Nav>
    <Nav>
      {window.accountId==='loid.testnet'? <Nav.Link href='/NewPoll'>New Poll</Nav.Link>: null}
      <Nav.Link href='/votecheck'>Vote Check</Nav.Link>
      <Nav.Link onClick={window.accountId===''?login:logout}>
        {window.accountId===""? "Login": window.accountId}
      </Nav.Link>
    </Nav>
  </Navbar.Collapse>
  </Container>
</Navbar>
<Routes>
  <Route exact path ='/'element={window.accountId===""?<Landing/>: <Home changeCandidates={changeCandidatesFunction}/>}>
  </Route>
  <Route  exact path="/PollingStation" element={<PollingStation/>}>
    
  </Route>
  <Route  exact path="/NewPoll" element={<NewPoll/>}> </Route>
  <Route  exact path="/votecheck" element={<VoteCheck/>}></Route>
  <Route  exact path="/landing" element={<Landing/>}></Route>
 
</Routes>
  </Router>);
}