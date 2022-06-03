import React, { useState, useEffect } from 'react';
import {Container, Row, Col, Button, Spinner} from "react-bootstrap";
import LoadingCircles from "../assets/loadingcircles.svg";

const PollingStation = props => {
    const [candidate1URL, changeCandidate1Url]=useState(LoadingCircles)
    const [candidate2URL, changeCandidate2Url]=useState(LoadingCircles)
    const [showresults, changeResultsDisplay]=useState(false)
    const [buttonStatus, changeButtonStatus] = useState(false);
    const [candidate1Votes, changeVote1]=useState('---')
    const [candidate2Votes, changeVote2]=useState('---')
    const [prompt, changePrompt] = useState("--");
    const [voted, changeVotedStatus] = useState(false);
    useEffect(() => {
        const getInfo = async () => {
          // vote count stuff
          let voteCount = await window.contract.getVotes({
            prompt: localStorage.getItem("prompt"),
          });
          changeVote1(voteCount[0]);
          changeVote2(voteCount[1]);
    
          // image stuff
    
          changeCandidate1Url(
            await window.contract.getUrl({
              name: localStorage.getItem("Candidate1"),
            })
          );
          changeCandidate2Url(
            await window.contract.getUrl({
              name: localStorage.getItem("Candidate2"),
            })
          );
    
          changePrompt(localStorage.getItem("prompt"));
    
          // vote checking stuff
    
          let didUserVote = await window.contract.didParticipate({
            prompt: localStorage.getItem("prompt"),
            user: window.accountId,
          });
    
          changeResultsDisplay(didUserVote);
          changeButtonStatus(didUserVote);
        };
    
        getInfo();
      }, []);
      const addVote=async(index)=>{
          changeVotedStatus(true);
          let tempIndex = index + 1
          let votedCandid = "Candidate" + tempIndex;
          await window.contract.addVote({
              prompt: localStorage.getItem("prompt"),
              index:index
          })
          await window.contract.recordUser({
            prompt: localStorage.getItem("prompt"),
            user:window.accountId
          })
          changeResultsDisplay(true);
          await window.contract.setVotesTally({
              user: window.accountId,
              prompt: localStorage.getItem("prompt"),
              vote: localStorage.getItem(votedCandid)
          })
      }
    /*
    useEffect(()=>{
        const getInfo= async()=>{
            let voteCount = await window.contract.getVotes({
                prompt:localStorage.getItem("prompt")
            })

        }
        changeVote1(voteCount[0])
        changeVote2(voteCount[1])
        //image stuff
        changeCandidate1Url(
            await window.contract.getUrl({name:localStorage.getItem("Candidate1")})
        )
        changeCandidate2Url(
            await window.contract.getUrl({name:localStorage.getItem("Candidate2")})
        )
        let didUserVote = await window.contract.didParticipate({
            prompt:localStorage.getItem("prompt"),
            user:window.accountId
        });
        changeResultsDisplay(didUserVote)
        getInfo();
    }, []);
    */
    return (
        
        <Container>
            <Row>
                <Col className='justify-content-center d-flex'>
                <Container>
                    <Row style={{marginTop:"5vh", backgroundColor:'#EDB66E', borderRadius: '2rem'}}>
                        <div style={{display:'flex', justifyContent:'center', padding:'3vw'}}>
                            <img style={{height: '35vh', width:'auto'}} src={candidate1URL}></img>

                        </div>
                    </Row>
                    
                    {showresults? <Row className='justify-content-center d-flex' style={{marginTop:"5vh"}}>
                        <div 
                        style={{display:'flex',
                        justifyContent:'center',
                        fontSize:'8vw', 
                        padding:'10px', 
                        backgroundColor:'#EDB66E'}}>{candidate1Votes}</div>
                        </Row>:null}
                    <Row className="justify-content-center d-flex">
                    {voted && !showresults ? <Spinner animation="border" />: null}
                    {window.accountId==="" && !voted? null : <Button className="primary--bg"disabled={showresults} onClick={()=>addVote(0)}>
                            Vote
                        </Button>}
                        
                    </Row>
                </Container>
                </Col>
                <Col className='justify-content-center d-flex align-items-center'>
                    <div 
                    style={{display:'flex', 
                    justifyContent:'center', 
                    backgroundColor:'#EDB66E',
                    height:'20vh',
                    alignItems:'center',
                    padding:"2vw",
                    textAlign:'center'}}>
                        {localStorage.getItem("prompt")}
                    </div>
                </Col>
                <Col className='justify-content-center d-flex'>
                <Container>
                    <Row style={{marginTop:"5vh", backgroundColor:'#EDB66E', borderRadius: '2rem'}}>
                        <div style={{display:'flex', justifyContent:'center', padding:'3vw', borderRadius: '2.5rem'}}>
                            <img style={{height: '35vh', width:'auto'}} src={candidate2URL}></img>

                        </div>
                    </Row>
                    
                    {showresults? <Row className='justify-content-center d-flex' style={{marginTop:"5vh"}}>
                        <div 
                        style={{display:'flex',
                        justifyContent:'center',
                        fontSize:'8vw', 
                        padding:'10px', 
                        backgroundColor:'#EDB66E'}}>{candidate2Votes}</div>
                        </Row>:null}
                    <Row className="justify-content-center d-flex">
                    {voted && !showresults ? <Spinner animation="border" />: null}
                    {window.accountId==="" && !voted? null : <Button className="primary--bg" disabled={showresults} onClick={()=>addVote(1)}>
                            Vote
                        </Button>}
                        
                    </Row>
                </Container>
                </Col>
            </Row>
        </Container>
    );
};

export default PollingStation;