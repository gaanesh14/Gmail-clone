import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import gmail from '../../images/mail.jpeg';
import search from '../../images/search.jpg'
//import { Avatar } from '@mui/material';
//import upload from '../../images/upload.png';
//import { auth } from './Firebase';
import Profile from './Profile';
import {Grid} from '@mui/material'



function Topbar(props) {
  return (
    <Grid>
        <Box sx={{ flexGrow: 1}}>
        <AppBar elevation={0} position="static"  sx={{backgroundColor:"#f9f9f9",minwidth:'5vw',zIndex:'2',top:'0'}}>
        <Toolbar variant="dense">
             <Grid item xs={2}>
                <div style={{display:'flex',alignItems:'center',paddingLeft:'7px',paddingTop:'20px', paddingBottom:'10px'}}>
              <IconButton edge="start"  aria-label="menu" sx={{ mr: '2vw', color:'#3c3c3c'}}>
              <MenuIcon sx={{width:'2vw'}}/>
              </IconButton>
              <img src={gmail} alt='' style={{width:'3vw'}}/>
               <Typography variant="h6"  component="div" sx={{color:'#3c3c3c',marginLeft:'1vw', fontSize:'1.6vw'}}>
                Gmail
               </Typography>
               </div>
               </Grid>
            <Grid item xs={9}>
                <div style={{marginLeft:'60px',borderRadius:'40px',display:'flex', alignItems:'center', width:'55vw',paddingTop:'20px', paddingBottom:'10px'}}>
                <img src={search} alt='' style={{width:'2.5vw', height:'2.5vw' }}/>
                <input onChange={(e) => props.setSearch(e.target.value)} type='text' placeholder='enter a search' style={{width:'45vw',height:'2vw',padding:'8px', background:'#e4effa', border:'none', outline:'none',borderRadius:'40px'}}/>
                </div>
            </Grid> 
            
          <Grid item xs={1}>
          {/* <Avatar
            src={auth.currentUser?.photoURL}
            sx={{
            marginLeft: { xs: '8vw', sm: '12vw', md: '14vw' }, 
            width: { xs: '4vw', sm: '4vw', md: '2.2vw' },         
            height: { xs: '2vh', sm: '2vh', md: '3.3vh' },    
            fontSize: { xs: '1.5vw', sm: '1.2vw' },             
            position: 'fixed',
            right: { xs: 8, md: 22 }                           
            }}
          /> */}
           <Profile/>
          </Grid>

        
   
    
        </Toolbar>
      </AppBar>
    </Box>
    </Grid>
  );
}

export default Topbar;