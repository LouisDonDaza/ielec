import React, {useState, useEffect} from 'react';
import {Table, Container, Button} from  'react-bootstrap';
const Home = (props) => {
    const [promptList, changePromptList]=useState(["Who would win in Smash bros?", "Who is the best player of all time (football)?",  "Which application is your numero uno?"]);
    /*
    useEffect(async ()=>{
        changePromptList(await window.contract.getAllPrompt())
        "Who is the better bob?", "Which application is your favorite?",
    }, []);*/
    return (
        <Container >
            <Table style={{margin:"5vh"}} striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>List of Polls</th>
                        <th>Go to Poll</th>
                    </tr>
                </thead>
                <tbody>
                    {promptList.map((el, index)=>{
                        return (
                            <tr key={index}>
                            <td>{index+1}</td>
                            <td>{el}</td>
                            <td><Button className="primary--bg" onClick={()=> {props.changeCandidates(el)}}>Go to Polls</Button></td>
                        </tr>
                        );  
                    })
                }
                </tbody>
            </Table>
        </Container>
    );
};


export default Home;