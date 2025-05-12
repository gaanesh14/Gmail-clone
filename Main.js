import React, { useState } from 'react';
import {Grid} from '@mui/material'
import Topbar from './Topbar';
import Leftside from './Leftside';
import Middle from './Middle';
import Rightside from './Rightside';
import Footer from './Footer';


function Main() {

  const [subCollect, setSubCollect] = useState('');
  const [search,setSearch] = useState('')

  return (
    <div className='main'>
        <Grid container>
            
            <Grid item xs={12}>
               <Topbar setSearch={setSearch} />
            </Grid>
            <Grid item xs={2}>
              <Leftside  setSubCollect = {setSubCollect}/>
            </Grid>
            <Grid item xs={9}>
              <Middle search={search} subCollect={subCollect}/>
            </Grid>
            <Grid item xs={1}>
              <Rightside/>
            </Grid>
            <Grid item xs={12}>
              <Footer/>
            </Grid>
            
        </Grid>
       
    </div>
     
  );
}

export default Main;
