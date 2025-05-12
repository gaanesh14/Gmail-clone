import React from 'react'
//import pen from '../../images/pen.png';
import inbox from '../../images/inbox.jpg';
import starred from '../../images/stared.png';
import snooze from '../../images/snoozed.png';
import sent from '../../images/sent.png';
import draft from '../../images/draft.png';
import Message from './Message';

function Leftside(props) {

    const draftMeassage = () => {
        alert('no messages in draft')
    }
  return (
    
    <div style={{minHeight:'88vh',backgroundColor:'#f9f9f9',width:'16vw',fontSize:'1.4vw',cursor:'pointer',paddingTop:'1vw'}}>
        <Message/>
        <div style={{display:'flex',alignItems:'center',margin:' 15px 7px'}}>
            <img src={inbox} alt='' style={{width:'1vw',marginLeft:' 15px'}}/>
            <span onClick={() => props.setSubCollect('inbox')}style={{marginLeft:'1.6vw',fontWeight: '500', fontSize:'1vw'}}> Inbox </span>
        </div>
        <div style={{display:'flex',alignItems:'center',margin:' 15px 7px'}}>
            <img src={starred} alt='' style={{width:'1vw',marginLeft:' 15px '}}/>
            <span onClick = {() => props.setSubCollect('Stared')} style={{marginLeft:'1.6vw',fontWeight: '500',fontSize:'1vw'}}> Starred </span>
        </div>
        <div style={{display:'flex',alignItems:'center', margin:' 15px 7px'}}>
            <img src={snooze} alt='' style={{width:'1vw',marginLeft:' 15px '}}/>
            <span onClick = {() => props.setSubCollect('Snoozed')}style={{marginLeft:'1.6vw',fontWeight: '500',fontSize:'1vw'}}> Snoozed </span>
        </div>
        <div style={{display:'flex',alignItems:'center', margin:' 15px 7px'}}>
            <img src={sent} alt='' style={{width:'1vw',marginLeft:' 15px '}}/>
            <span onClick = {() => props.setSubCollect('send')}style={{marginLeft:'1.6vw',fontWeight: '500',fontSize:'1vw'}}> Sent </span>
        </div>
        <div style={{display:'flex',alignItems:'center', margin:' 15px 7px'}}>
            <img  src={draft} alt='' style={{width:'1.8vw',marginLeft:' 10px'}}/>
            <span onClick={draftMeassage} style={{marginLeft:'1.6vw',fontWeight: '500',fontSize:'1vw'}}> Draft </span>
        </div>
    </div>
    
  )
}

export default Leftside