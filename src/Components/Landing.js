import React from 'react';
import { login } from '../utils';
import {Row,Col, Container, Button} from  'react-bootstrap';
import {Link} from "react-router-dom";
import HeroVote from "../assets/HeroVote.jpg";
import SecurityIcon from "../assets/SecurityIcon.png";
import FittingIcon from "../assets/FittingIcon.png";
import FatherIcon from "../assets/FatherIcon.png";
const Landing = (props) => {
    
    return (
        <Container >
            <Row>
                <Col className='justify-content-center d-flex flex-column' style={{padding: '0 3rem 0 1rem'}}>
                    <h1 className='mb-3'>IELEC is a voting technology based platform based on the blockchain</h1>
                    <p className='mb-4'>A secure, decentralized, auditable and open platform for e-voting and vote counting that everybody can trust</p>
                    <Row className="justify-content-start d-flex align-items-center">
                        <Col className="col-sm-3">
                            <Button className="primary--bg" onClick={login}>
                                Create a vote
                            </Button>
                        </Col>
                        <Col className="col-sm-6">
                        <Link to="#about" style={{textDecoration:'none'}}>How it works</Link>
                        </Col>
                        
                    </Row>
                </Col>
                <Col className='justify-content-center d-flex'>
                    <img style={{height: 'auto', width:'100%'}} src={HeroVote}></img>
                </Col>
            </Row>
            <Row className="mt-5">
                <Col className='justify-content-center d-flex flex-column' style={{padding: '0 3rem 0 1rem'}}>
                    <h2 className='mb-3'>Foundation for Security</h2>
                    <p>Blockchain technology is considered more secure than its contemporaries because of lack of a single point of failure. Blockchain operates on a well-distributed network of nodes, hence data at all times is 
                    circulated through not one but multiple nodes, which makes sure that even if one node is hacked or faulty in any way the integrity of the original data will not be compromised.</p>
                    
                </Col>
                <Col className='justify-content-center d-flex'>
                    <img style={{height: 'auto', width:'80%'}} src={SecurityIcon}></img>
                </Col>
            </Row>
            <Row>
                <Col className='justify-content-center d-flex flex-column' style={{padding: '0 3rem 0 1rem'}}>
                    <h2 className='mb-3'>Solutions for Voting Custody</h2>
                    <p >Public ledgers provide information about transactions and include participants to the public. 
                    There is lack of security or authority in such ledgers which is not the case for private or federated ledgers that can also be integrated into a blockchain system. 
                    That’s because the ledger on the network is maintained by all other users on the system. This distributed computational power across the computers to ensure a better outcome.</p>
                    
                </Col>
                <Col className='justify-content-center d-flex'>
                    <img style={{height: 'auto', width:'100%'}} src={FittingIcon}></img>
                </Col>
            </Row>
            <Row>
                <Col className='justify-content-center d-flex flex-column' style={{padding: '0 3rem 0 1rem'}}>
                    <h2 className='mb-3'>For a Worry-Free Future</h2>
                    <p >Decentralised technology gives you the power to store your assets in a network without the oversight and control of a single person organisation or entity. 
                        Through this owner has direct control over their account by the means of a key that is linked to the account which gives the owner a power to transfer his assets to anyone they want.</p>
                    
                </Col>
                <Col className='justify-content-center d-flex'>
                    <img style={{height: 'auto', width:'100%'}} src={FatherIcon}></img>
                </Col>
            </Row>
        </Container>
    );
};


export default Landing;