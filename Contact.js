import * as React from 'react';
import Box from '@mui/material/Box';
//import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import users from '../../images/user.png';
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

export default function Contact() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [user,setuser] = React.useState('');
  const [mobile, setMobile] = React.useState('');
  const [userData, setUserData] = React.useState([]);

  const addUser = async () => {
    const userDoc = doc(database,'Users',`${auth.currentUser?.email}`)
    const messageDoc = collection(userDoc,'user')
    try{
        await addDoc(messageDoc,{
            user : user,
            number: mobile
        })
        }catch(err){
      console.log(err);
    }
  }

  const showUser = async()=> {
    const userDoc = doc(database,'Users',`${auth.currentUser?.email}`)
    const messageDoc = collection(userDoc,'user')
    try{
       const data = await getDocs(messageDoc)
       const filteredData = data.docs.map((doc) => ({
            ...doc.data(),
            id : doc.id 
       }))
       setUserData(filteredData)
      
    }catch(err){
      console.log(err);
    }
  }

   //console.log(noedata);
   
  return (
    <div>
       <img onClick={handleOpen} src={users} alt='' style={{width:'1.8vw',height:'1.8vw',margin:'16px'}}/><br/>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography sx={{paddingTop:'0vw',color:'blue',fontSize:'1vw'}}> 
            Contacts  </Typography> 
          <input onChange={(e) => setuser(e.target.value)} type='text' placeholder='enter a user' style={{outline:'none',padding:'0.2vw',width:'12vw'}}/>
          <input onChange={(e) => setMobile(e.target.value)} type='number' placeholder='enter a number' style={{outline:'none',padding:'0.2vw',width:'12vw'}}/><br/>
          <Button variant='contained' onClick={addUser}sx={{fontSize:'1vw',height:'2vw',width:'4vw',marginTop:'1vw'}}> Add </Button>
          <Button variant='contained' onClick={showUser} sx={{fontSize:'1vw',height:'2vw',width:'4vw',marginTop:'1vw',marginLeft:'1vw'}}> Show </Button>
          <br/>
           {userData.map((data) => (
         
            <li style={{marginTop:'0.8vw'}}key={data.id}> {data.user} <span> - {data.number} </span></li>
            
           ))}
         
          
        </Box>
      </Modal>
    </div>
  );
}
