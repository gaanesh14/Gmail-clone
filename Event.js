import * as React from 'react';
import Box from '@mui/material/Box';
//import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import calender from '../../images/calender.png';
import { Button } from '@mui/material';
import { addDoc,collection,doc, getDocs, } from 'firebase/firestore';
import { database,auth } from './Firebase';


const style = {
  position: 'absolute',
  top: '55%',
  left: '90%',
  transform: 'translate(-50%, -50%)',
  width: '15vw',
  minHeight:'40vw',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function Event() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [event,setEvent] = React.useState('');
  const [date, setDate] = React.useState('');
  const [eventData, setEventData] = React.useState([]);

  const addEvent = async () => {
    const userDoc = doc(database,'Users',`${auth.currentUser?.email}`)
    const messageDoc = collection(userDoc,'event')
    try{
        await addDoc(messageDoc,{
            event : event,
            date: date
        })
        }catch(err){
      console.log(err);
    }
  }

  const showEvent = async()=> {
    const userDoc = doc(database,'Users',`${auth.currentUser?.email}`)
    const messageDoc = collection(userDoc,'event')
    try{
       const data = await getDocs(messageDoc)
       const filteredData = data.docs.map((doc) => ({
            ...doc.data(),
            id : doc.id 
       }))
       setEventData(filteredData)
      
    }catch(err){
      console.log(err);
    }
  }

   //console.log(noedata);
   
  return (
    <div>
       <img onClick={handleOpen} src={calender} alt='' style={{width:'1.8vw',height:'1.8vw',margin:'16px'}}/><br/>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography sx={{paddingTop:'0vw',color:'blue',fontSize:'1vw'}}> 
            Event  </Typography> 
          <input onChange={(e) => setEvent(e.target.value)} type='text' placeholder='enter a event' style={{outline:'none',padding:'0.2vw',width:'12vw'}}/>
          <input onChange={(e) => setDate(e.target.value)} type='date' placeholder='enter a date' style={{outline:'none',padding:'0.2vw',width:'12vw'}}/><br/>
          <Button variant='contained' onClick={addEvent}sx={{fontSize:'1vw',height:'2vw',width:'4vw',marginTop:'1vw'}}> Add </Button>
          <Button variant='contained' onClick={showEvent} sx={{fontSize:'1vw',height:'2vw',width:'4vw',marginTop:'1vw',marginLeft:'1vw'}}> Show </Button>
          <br/>
           {eventData.map((data) => (
         
            <li style={{marginTop:'0.8vw'}}key={data.id}> {data.event} <span> - {data.date} </span></li>
            
           ))}
         
          
        </Box>
      </Modal>
    </div>
  );
}
