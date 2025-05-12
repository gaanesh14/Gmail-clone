import * as React from 'react';
import Box from '@mui/material/Box';
//import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import tasks from '../../images/task.png';
import { Button } from '@mui/material';
import { addDoc,collection,doc, getDocs, } from 'firebase/firestore';
import { database,auth } from './Firebase';


const style = {
  position: 'absolute',
  top: '55%',
  left: '92%',
  transform: 'translate(-50%, -50%)',
  width: '10vw',
  minHeight:'40vw',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function Notes() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [notes,setNotes] = React.useState('');
  const [notedata, setNoteData] = React.useState([])

  const addNote = async () => {
    const userDoc = doc(database,'Users',`${auth.currentUser?.email}`)
    const messageDoc = collection(userDoc,'notes')
    try{
        await addDoc(messageDoc,{
            notes : notes
        })
        }catch(err){
      console.log(err);
    }
  }

  const showNote = async()=> {
    const userDoc = doc(database,'Users',`${auth.currentUser?.email}`)
    const messageDoc = collection(userDoc,'notes')
    try{
       const data = await getDocs(messageDoc)
       const filteredData = data.docs.map((doc) => ({
            ...doc.data(),
            id : doc.id 
       }))
       setNoteData(filteredData)
      
    }catch(err){
      console.log(err);
    }
  }

   //console.log(noedata);
   
  return (
    <div>
       <img onClick={handleOpen} src={tasks} alt='' style={{width:'1.8vw',height:'1.8vw',margin:'16px'}}/><br/>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography sx={{paddingTop:'0vw',color:'blue',fontSize:'1vw'}}> 
            Notes  </Typography> 
          <input onChange={(e) => setNotes(e.target.value)} type='text' placeholder='enter a note' style={{outline:'none',padding:'0.2vw'}}/>
          <Button variant='contained' onClick={addNote}sx={{fontSize:'1vw',height:'2vw',width:'4vw',marginTop:'1vw'}}> Add </Button>
          <Button variant='contained' onClick={showNote} sx={{fontSize:'1vw',height:'2vw',width:'4vw',marginTop:'1vw',marginLeft:'1vw'}}> Show </Button>
          <br/>
           {notedata.map((data) => (
         
            <li style={{marginTop:'0.8vw'}}key={data.id}>{data.notes}</li>
            
           ))}
         
          
        </Box>
      </Modal>
    </div>
  );
}
