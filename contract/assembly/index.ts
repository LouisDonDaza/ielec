
import { logging, PersistentMap } from 'near-sdk-as'

const CandidateURL=new PersistentMap<string, string>("CandidateURL");
const CandidatePair = new PersistentMap<string, string[]>("Canidate Pair");
const PromptArray = new PersistentMap<string, string[]>("array of prompts");
const VoteArray = new PersistentMap<string, i32[]>("store votes");
const userParticipation = new PersistentMap<string, string[]>("user Participation Record");
const VotesTally = new PersistentMap<string, string[][]>("yes");

// VIEW METHODS
// Does not change state of the blockchain
// Does not incur a fee
//Pulls and reads information from blockchain

// Exported functions will be part of the public interface for your smart contract.
// Feel free to extract behavior to non-exported functions!

export function getUrl(name:string):string {
  if(CandidateURL.contains(name)){
    return CandidateURL.getSome(name)
  }else{
    logging.log(`can't find that user`)
    return ''
  }
}
export function getVotesTally(user: string):string[][]{
  if(VotesTally.contains(user)){
    return VotesTally.getSome(user);
  }else{
    logging.log(`can't find that user`)
    return [];
  }
}
export function didParticipate(prompt:string, user:string):bool{
  if(userParticipation.contains(prompt)){
    let getArray=userParticipation.getSome(prompt);
    return getArray.includes(user);
  }else{
    logging.log('prompt not found');
    return false
  }
}
export function getAllPrompt():string[] {
  if(PromptArray.contains('AllArrays')){
    return PromptArray.getSome("AllArrays");
  }else{
    logging.log('no prompts found');
    return [];
  }
}

export function getVotes(prompt:string):i32[] {
  if(VoteArray.contains(prompt)){
    return VoteArray.getSome(prompt);
  }else{
    logging.log('prompt not found for this vote');
    return[0,0];
  }
}
export function getCandidatePair(prompt:string):string[]{
  if(CandidatePair.contains(prompt)){
    return CandidatePair.getSome(prompt);
  }else{
    logging.log('record not found')
    return []
  }
}
//Change Methods
//Changes state of blockchain
//costs a transaction fee to do so
//Adds or modifies information to blockchain

export function addUrl(name:string, url:string):void{
  CandidateURL.set(name,url),
  logging.log('added url for ' + name);
}
export function addCandidatePair(prompt:string, name1:string, name2: string):void{
  CandidatePair.set(prompt, [name1, name2])

}
export function addToPromptArray(prompt:string):void{
  logging.log('added to prompt array');
  if(PromptArray.contains("AllArrays")){
    let tempArray = PromptArray.getSome("AllArrays")
    tempArray.push(prompt)
  }else{
    PromptArray.set("AllArrays", [prompt])
  }
}
//
export function addVote(prompt:string, index:i32):void {
  if(VoteArray.contains(prompt)){
    let tempArray = VoteArray.getSome(prompt)
    let tempVal=tempArray[index];
    let newVal = tempVal+1;
    tempArray[index]=newVal;
    VoteArray.set(prompt, tempArray);
  }else{
    let newArray=[0,0];
    newArray[index]=1;
    VoteArray.set(prompt, newArray);
  }
}
export function setVotesTally(user: string, prompt: string, vote: string):void{
  if(VotesTally.contains(user)){
    let tempArray = VotesTally.getSome(user);
    tempArray.push([prompt, vote]);
    VotesTally.set(user, tempArray);
  }else{
    let tempArray = [[prompt,vote]];
    VotesTally.set(user, tempArray);
  }
  
}
export function recordUser(prompt:string, user:string):void{
  if(userParticipation.contains(prompt)){
    let tempArray = userParticipation.getSome(prompt);
    tempArray.push(user);
    userParticipation.set(prompt,tempArray);
  }else{
    userParticipation.set(prompt, [user]);
  }
}