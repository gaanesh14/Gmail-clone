import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import pen from '../../images/pen.png';
import { TextField } from '@mui/material';
import { doc,addDoc, collection } from 'firebase/firestore';
import { auth, database } from './Firebase';

const style = {
  position: 'absolute',
  top: '55%',
  left: '75%',
  minHeight:'38vw',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  borderRadius:'10px',
  boxShadow: 24,
  p: 4,
};

export default function Message() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  
  const [mailId, setMailId] = React.useState('')
  const [message, setMessage] = React.useState('')

  const send = async() => {
    const userDoc = doc(database,'Users',`${auth.currentUser?.email}`)
    const messageRef = collection(userDoc,'send')
    try{
        await addDoc(messageRef,{
            email:message,
        })
    }catch(err){
        console.log(err);
    }
  }


  const inbox = async() => {
    const userDoc = doc(database,'Users',`${mailId}`)
    const messageRef = collection(userDoc,'inbox')
    try{
        await addDoc(messageRef,{
            email:message,
            sender:auth.currentUser?.displayName
        })
        send()
    }catch(err){
        console.log(err);
    }
  }

  return (
    <div>
      <div onClick={handleOpen} style={{display:'flex',alignItems:'center',backgroundColor:'#BEE0FF',borderRadius:'15px',width:'12vw',marginLeft:'1vw'}}>
            <img src={pen} alt='' style={{width:'1vw',marginLeft:' 15px'}}/>
            <h4 style={{marginLeft:'1.6vw',fontWeight: '500',fontSize:'1vw'}}> Compose </h4>
        </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography style={{background:'#e5effa',position:'absolute',top:'0',left:'0',width:'38vw',padding:'0.5vw'}}>
            Message
          </Typography>
          <TextField
            onChange={(e) => setMailId(e.target.value)} variant='standard' label='To' sx={{width:'35vw',marginTop:'1vw'}}>
          </TextField><br/>
          <TextField 
            variant='standard' label='Subject' sx={{width:'35vw'}}>
          </TextField><br/>
          <TextField
            onChange={(e) => setMessage(e.target.value)}multiline rows={12} sx={{width:'35vw' ,"& fieldset": {border:'none'}}}>
          </TextField><br/>
          <Button onClick={inbox} variant='contained' sx={{width:'4vw',height:'2vw',
            fontSize:'1vw',borderRadius:'2vw',marginTop:'3vw'}}> Send </Button>
        </Box>
      </Modal>
    </div>
  );
}
