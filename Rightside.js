import React from 'react'
//import calender from '../../images/calender.png';
//import tasks from '../../images/task.png';
//import user from '../../images/user.png';
//import keep from '../../images/keep.png'
import Notes from './Notes';
import Event from './Event';
import Contact from './Contact';


function Rightside() {
  return (
    <div style={{minHeight:'90vh',backgroundColor:'#f9f9f9',minWidth:'1vw'}}>
    <div style={{position:'fixed',right:'0',margin:'1vw',fontSize:'1.4vw',cursor:'pointer'}}>
        {/* <img src={calender} alt='' style={{width:'1.5vw',height:'1.5vw',margin:'16px'}}/><br/> */}
        {/* <img src={keep} alt='' style={{width:'1.5vw',height:'1.5vw',margin:'16px'}}/><br/> */}
        {/* <img src={tasks} alt='' style={{width:'1.8vw',height:'1.8vw',margin:'16px'}}/><br/> */}
        
        <Event/>
        <Notes/>
        <Contact/>
        {/* <img src={user} alt='' style={{width:'1.5vw',height:'1.5vw',margin:'16px'}}/> */}
    </div>
    </div>
  )
}

export default Rightside