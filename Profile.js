import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Avatar } from '@mui/material';
import { auth } from './Firebase';
import { signOut, onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const style = {
  position: 'absolute',
  top: '40%',
  left: '80%',
  transform: 'translate(-50%, -50%)',
  width: '20vw',
  height: '25vw',
  bgcolor: '#e4efea',
  border: 'none',
  outline: 'none',
  boxShadow: 24,
  p: 4,
  borderRadius: '20px',
};

export default function Profile() {
  const [open, setOpen] = React.useState(false);
  const [user, setUser] = React.useState(null);
  const navigate = useNavigate();

  const handleOpen = () => setOpen(true);


  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const logOut = async () => {
    try {
      await signOut(auth);
      navigate('/');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      {user && (
        <Avatar
          onClick={handleOpen}
          src={user.photoURL || ''}
          alt="Profile"
          sx={{
            marginLeft: { xs: '8vw', sm: '12vw', md: '14vw' },
            width: { xs: '4vw', sm: '4vw', md: '3.0vw' },
            height: { xs: '4vh', sm: '4vh', md: '4.3vh' },
            fontSize: { xs: '1.5vw', sm: '1.2vw' },
            position: 'fixed',
            cursor: 'pointer',
            right: { xs: 8, md: 22 },
          }}
        />
      )}
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box sx={style}>
          {user ? (
            <>
              <Typography sx={{ textAlign: 'center', fontSize: '1.2vw' }}>
                {user.email}
              </Typography>
              <Avatar
                src={user.photoURL || 'G'}
                sx={{ margin: '0.5vw auto', width: '4.5vw', height: '4.5vw' }}
              />
              <Typography sx={{ textAlign: 'center', fontSize: '1.4vw', mt: '1vw' }}>
                Hi, {user.displayName}
              </Typography>
              <button
                onClick={logOut}
                style={{
                  cursor: 'pointer',
                  margin: '2vw 8vw',
                  padding: '10px',
                  borderRadius: '20px',
                  fontSize: '1.2vw',
                  border: 'none',
                  outline: 'none',
                  width: '7vw',
                  background: 'red',
                  color: 'white',
                }}
              >
                Sign Out
              </button>
              <Typography sx={{ mt: '3vw', textAlign: 'center', fontSize: '0.8vw' }}>
                Privacy Policy · Terms of Service
              </Typography>
            </>
          ) : (
            <Typography sx={{ textAlign: 'center', fontSize: '1.2vw', mt: '5vw' }}>
              User not signed in
            </Typography>
          )}
        </Box>
      </Modal>
    </div>
  );
}
