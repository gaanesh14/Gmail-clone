import React from 'react'
import { Button } from '@mui/material'
import img from '../../images/google.png'
import { signInWithPopup } from 'firebase/auth'
import {auth,database,googleProvider} from './Firebase';
import { useNavigate } from 'react-router-dom';
import { setDoc,doc } from 'firebase/firestore';

function Login() {

  const navigate = useNavigate();

  const addUser = async() => {
      const userDocs = doc(database,"Users",`${auth.currentUser?.email}`)

    try{
      await setDoc(userDocs,{
        username : auth.currentUser?.displayName,
        email : auth.currentUser?.email,
        id : auth.currentUser?.uid
      })
    }catch(err) {
      console.log(err);
    }
  }

  const googleSignIn = async() => {
    try{
    await signInWithPopup (auth,googleProvider)
    addUser();
    navigate('/main');
  }
    catch (err) {
      console.log(err);
    }
  }
  //console.log(auth);
  
  return (
    <div style={{position:'absolute',top:'15vw',right:'35vw', }}>
        
        <div style={{border:'1px solid gray',padding:'20px',height:'300px', alignItems:'center', marginLeft:'20px'}}>
        <img src={img} alt='' width='120px' />
        <h1 style={{fontWeight:'300'}}> create google account </h1>
        <h3 style={{fontWeight:'300'}}> signin with your google account</h3>
        <Button onClick={googleSignIn} variant='contained' > Sign in with google</Button>
        </div>
        
    </div>
  )
}

export default Login