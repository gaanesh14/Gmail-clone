import {  ListItem, Paper } from '@mui/material'
import React, { useCallback,useEffect, useState } from 'react'
import star from '../../images/stared.png';
import deletee from "../../images/delete.jpeg";
import refresh from '../../images/refresh.png';
import snooze from '../../images/snoozed.png';
import yellow from '../../images/yellow.jpeg'
import { getDocs,doc,collection, deleteDoc, setDoc } from 'firebase/firestore';
import { database,auth } from './Firebase';


function Middle(props) {

       const [mail, setMail] = useState([])
       const [show, setShow] = useState(false)

       const deleteMail = async (data) => {
        const userDoc = doc(database, 'Users', `${auth.currentUser?.email}`);
        const inboxMessageDoc = doc(userDoc, 'inbox', `${data.id}`);
        const snoozeDoc = doc(userDoc, 'Snoozed', `${data.id}`);
        const staredDoc = doc(userDoc, 'Stared', `${data.id}`);
        
    
        try {
            await deleteDoc(staredDoc)
            await deleteDoc(snoozeDoc)
            await deleteDoc(inboxMessageDoc);
            console.log('Delete success');
            
            // Update the mail list by calling getMail again to reflect the change
            getMail();
        } catch (err) {
            console.log('Error deleting mail:', err);
        }
    };

    const Stared = async(data) => {
      const userDoc = doc(database, 'Users', `${auth.currentUser?.email}`);
      const messageDoc = doc(userDoc, 'Stared', `${data.id}`);
      try{
        await setDoc(messageDoc,{
          email:data.email,
          sender:data.sender,
          Stared : true
        })
      }catch(err){
        console.log(err);
      }
    }
    
    const Snoozed = async(data) => {
      const userDoc = doc(database, 'Users', `${auth.currentUser?.email}`);
      const messageDoc = doc(userDoc, 'Snoozed', `${data.id}`);
      const snoozeDoc = doc(userDoc, 'inbox', `${data.id}`);
      try{
        await deleteDoc(snoozeDoc);
        await setDoc(messageDoc,{
          email:data.email,
          sender:data.sender
        })
      }catch(err){
        console.log(err);
      }
    }
    

    const getMail = useCallback(async() => {
        const userDocs = doc(database,'Users',`${auth.currentUser?.email}`)
        const messageDocs = collection(userDocs,`${props.subCollect ? props.subCollect : 'inbox'}`)
        try{
           const data =  await getDocs(messageDocs);
           const filteredData = data.docs.map((doc) => ({
            ...doc.data(),
            id:doc.id
           }))
            setMail(filteredData)
        }catch(err){
            console.log(err);
        }
    },[props.subCollect])

    useEffect(() => {
      getMail()
    },[getMail])

  return (
    <div style={{marginLeft:'0',width:'75vw'}}>
        <img src={refresh} alt='' style={{ width:'1.2vw', height:'1.2vw', marginLeft:'2.5vw', marginTop:'1.2vw',cursor:'pointer'}}/>
          { props.search ? mail.filter((data) => data.sender === props.search).map((data) => (
            
            <Paper onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)} key={data.email} elevation={0} 
            style={{borderTop:'1px solid #efefef',backgroundColor:'#f8fcff',cursor:'pointer'}}>
              <ListItem>
                {data.Stared ? <img src={yellow} alt='' style={{width:'1.2vw',height:'1.2vw'}}/>
                : <img onClick={() => Stared(data)} src={star} alt='' style={{width:'1.2vw',height:'1.2vw'}}/>}
               <span  style={{marginLeft:'1.2vw',fontWeight:'400',fontSize:'1vw'}} > 
                {data.sender}<span style={{marginLeft:'12vw',fontWeight:'300',fontSize:'1vw'}}>{data.email}</span></span>
                { show && <img onClick={() => Snoozed(data)} src={snooze} alt='' style={{width:'1.2vw',height:'1.2vw',marginLeft:'1vw',cursor:'pointer'}}/>}
               {show && <img onClick={() => deleteMail(data)} src={deletee} alt='' style={{width:'1.2vw',height:'1.2vw',marginLeft:'1vw',cursor:'pointer'}}/>}
              </ListItem>
            </Paper>
          )
        )
          : mail.map((data) => (
            
            <Paper onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)} key={data.email} elevation={0} 
            style={{borderTop:'1px solid #efefef',backgroundColor:'#f8fcff',cursor:'pointer'}}>
              <ListItem>
              {data.Stared ? <img src={yellow} alt='' style={{width:'1.2vw',height:'1.2vw'}}/>
                : <img onClick={() => Stared(data)} src={star} alt='' style={{width:'1.2vw',height:'1.2vw'}}/>}
               <span  style={{marginLeft:'1.2vw',fontWeight:'400',fontSize:'1vw'}} > 
                {data.sender}<span style={{marginLeft:'12vw',fontWeight:'300',fontSize:'1vw'}}>{data.email}</span></span>
                 { show && <img onClick={() => Snoozed(data)} src={snooze} alt='' style={{width:'1.2vw',height:'1.2vw',marginLeft:'1vw',cursor:'pointer'}}/>}
                { show && <img  onClick={() => deleteMail(data)} src={deletee} alt=''  style={{width:'1.2vw',height:'1.2vw',marginLeft:'1vw',cursor:'pointer'}}/>}
              </ListItem>
            </Paper>
          )

        )
    }
{/*         
         <Paper elevation={0} style={{borderTop:'1px solid #efefef',backgroundColor:'#f8fcff',cursor:'pointer'}}>
         <ListItem>
               <img src={star} alt='' style={{width:'1.2vw',height:'1.2vw'}}/>
               <span style={{marginLeft:'1.2vw',fontWeight:'400',fontSize:'1vw'}}>scsvdbd<span style={{marginLeft:'12vw',fontWeight:'300',fontSize:'1vw'}}>sdvbdbdngn</span></span>
            </ListItem>
        </Paper> */}
        
      
        <h6 style={{fontWeight:'400',marginLeft:'28vw'}}>Terms-privacy-program policies</h6>
        
        
        
    </div>
  )
}

export default Middle