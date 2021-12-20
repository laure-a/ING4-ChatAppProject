/** @jsxImportSource @emotion/react */
import { useContext, useState } from 'react';
// Layout
import { useTheme } from '@mui/styles';
import { useCookies } from 'react-cookie'
import { IconButton, Link, Button } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Context from './Context';
import Gravatar from 'react-gravatar'
import LogoutIcon from '@mui/icons-material/Logout';
import { red, grey, amber } from '@mui/material/colors';
import SettingsIcon from '@mui/icons-material/Settings';
import Tooltip from '@mui/material/Tooltip';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { styled } from '@mui/material/styles';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import axios from 'axios';
import { useDropzone } from 'react-dropzone';

const useStyles = (theme) => ({
  header: {
    height: 75,
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(1),
    backgroundColor: 'white',
    flexShrink: 0,
    minWidth: "600px",
    borderBottom: "1px solid #c1bdbd"
  },
  headerLogIn: {
    backgroundColor: 'red',
  },
  headerLogOut: {
    backgroundColor: 'blue',
  },
  menu: {
    color: "black",
    //backgroundColor: "blue",
    [theme.breakpoints.up('sm')]: {
      display: 'none !important',
    },
  },
  logo: {
    marginRight: "2vw",
    alignItems: "center",
    fontFamily: "Courier",
    //backgroundColor: "red",
    color: "black",
    flexGrow: "1",
    display: "block"
  },
  logoIcon: {
    marginLeft: "2vw",
    width: 80,
    height: 80
  },
  user: {
    display: "inline-flex",
    alignItems: "center",
    //backgroundColor: "green",
    marginRight: "1vw",
    fontSize: 18,
    fontWeight: 500,
    color: grey[700]
  },
  logout: {
    color: red[900],

  }
})

const IOSSwitch = styled((props) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: 42,
  height: 26,
  padding: 0,
  '& .MuiSwitch-switchBase': {
    padding: 0,
    margin: 2,
    transitionDuration: '300ms',
    '&.Mui-checked': {
      transform: 'translateX(16px)',
      color: '#fff',
      '& + .MuiSwitch-track': {
        //backgroundColor: theme.palette.mode === 'dark' ? '#2ECA45' : '#65C466',
        backgroundColor: amber[500],
        opacity: 1,
        border: 0,
      },
      '&.Mui-disabled + .MuiSwitch-track': {
        opacity: 0.5,
      },
    },
    '&.Mui-focusVisible .MuiSwitch-thumb': {
      color: '#33cf4d',
      border: '6px solid #fff',
    },
    '&.Mui-disabled .MuiSwitch-thumb': {
      color:
        theme.palette.mode === 'light'
          ? theme.palette.grey[100]
          : theme.palette.grey[600],
    },
    '&.Mui-disabled + .MuiSwitch-track': {
      opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
    },
  },
  '& .MuiSwitch-thumb': {
    boxSizing: 'border-box',
    width: 22,
    height: 22,
  },
  '& .MuiSwitch-track': {
    borderRadius: 26 / 2,
    backgroundColor: theme.palette.mode === 'light' ? '#E9E9EA' : '#39393D',
    opacity: 1,
    transition: theme.transitions.create(['background-color'], {
      duration: 500,
    }),
  },
}));


export default function Header({
  drawerToggleListener
}) {
  const [openSettings, setOpenSettings] = useState(false);
  const [openSelection, setOpenSelection] = useState(false);
  const [avatChoice, setAvatChoice]= useState()
  const [files, setFiles] = useState([])
  const styles = useStyles(useTheme())
  const {
    oauth, setOauth,
    drawerVisible, setDrawerVisible,
    currentUser, setCurrentUser,
  } = useContext(Context)
  const [cookies, setCookie, removeCookie] = useCookies([])
  const drawerToggle = (e) => {
    setDrawerVisible(!drawerVisible)
  }

function valuetext(value) {
  return `${value}°C`;
}
  const onClickLogout = (e) => {
    e.stopPropagation()
    setOauth(null)
    removeCookie('currentUser')
  }
  const onClickSettings = () => {
    setOpenSettings(true);
  };
  const closeSettings = () => {
    setOpenSettings(false);
  };

  const handleCloseSelection = () => {
        setOpenSelection(false);
      };

 

     function isUser() {
       if(currentUser)
       {
       return currentUser.avatChoice 
        
       }
       else
       {
         return 0
       }
     
     }

     function isUserAvatar() {
      if(currentUser)
      {
      return currentUser.uploadAvat
       
      }
      else
      {
        return 0
      }
    
    }

     
  let choice=isUser();
  let uplAvat=isUserAvatar();
  let finalUpl
  const onSubmitAvatar = async (c, u) => {
    if (u===0)
    {
      finalUpl=0
    }
    else
    {
      finalUpl= await convertBase64(files[0])
    }
    const { data: nUser } = await axios.put(
      `http://localhost:3001/users/${currentUser.id}`
      , {
        id: currentUser.id,
        email: currentUser.email,
        avatChoice: c,
        uploadAvat: finalUpl
      }, {
      headers: {
        'Authorization': `Bearer ${oauth.access_token}`
      },
    })
    console.log(nUser)
    setCurrentUser(nUser)
    
  }

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

    const { getRootProps, getInputProps } = useDropzone({
    multiple: false,
    accept: "image/*",
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      )
    },
  })
    const images = files.map((file) => (
    <div key={file.name}>
      <div>
        <img src={file.preview} style={{ width: 300 }, {height: 200}}  alt="preview" />
      </div>
    </div>
  ))

  

  console.log(currentUser)
  return (
    <header css={styles.header}>
    <IconButton
    color="inherit"
    aria-label="open drawer"
    onClick={drawerToggle}
    css={styles.menu}
    >
    <MenuIcon />
    </IconButton>
    <img css={styles.logoIcon} src="/logo_clear.png" alt="LogoClear"/>
    <h1 css={styles.logo}> BeeTalky </h1>
    {
      (currentUser && oauth) ?
      <span css={styles.user}>
      <div>
      {oauth.email}
      </div>
       {(currentUser.avatChoice === 0 && currentUser.uploadAvat===0) ? (
              <Gravatar //gravatar image with default parameters override
                email={oauth.email}
                size={50}
                rating="pg"
                default="monsterid"
                className="CustomAvatar-image"
                style={{ margin: '10px', borderRadius: '25px' }}
                protocol="https://"
              />
            ) : (currentUser.avatChoice === 1 && currentUser.uploadAvat===0) ? (
              <img src="https://img.icons8.com/officel/40/000000/avatar.png" />
            ) : (currentUser.avatChoice === 2 && currentUser.uploadAvat===0) ? (
              <img src="https://img.icons8.com/external-flat-icons-pause-08/64/000000/external-avatar-farm-and-garden-flat-icons-pause-08.png" />
            ) : (currentUser.avatChoice === 3 && currentUser.uploadAvat===0) ? (
              <img src="https://img.icons8.com/color/48/000000/spyro.png" />
            ) : (currentUser.avatChoice === 4 && currentUser.uploadAvat===0) ? (
              <img src="https://img.icons8.com/external-photo3ideastudio-lineal-color-photo3ideastudio/64/000000/external-ninja-japan-photo3ideastudio-lineal-color-photo3ideastudio.png" />
            ) : (
              <img src={currentUser.uploadAvat} style={{ width: 200}, {height: 100}} />
            )
            } 

<Button
              onClick={() => {
                setOpenSelection(true);
                setFiles([]);
              }}  >
              Choose Avatar
            </Button>
            <Dialog open={openSelection} onClose={handleCloseSelection} fullWidth={true} maxWidth='850px'>
              <DialogTitle>Choose an avatar among the selection</DialogTitle>
              <DialogActions>
                <Button onClick={handleCloseSelection}>Cancel</Button>
                <Button
                  onClick={() => {
                    choice=0;
                    uplAvat=0;
                    onSubmitAvatar(0,0);
                    setOpenSelection(false);
                  }}
                >Default Gravatar</Button>
                <Gravatar //gravatar image with default parameters override
                  email={oauth.email}
                  size={50}
                  rating="pg"
                  default="monsterid"
                  className="CustomAvatar-image"
                  style={{ margin: '10px', borderRadius: '25px' }}
                  protocol="https://"
                />
                <Button
                  onClick={() => {
                    choice=1;
                    uplAvat=0;
                    onSubmitAvatar(1,0);
                    setOpenSelection(false);
                  }}
                >Avatar 1</Button>
                <img src="https://img.icons8.com/officel/40/000000/avatar.png" />
                <Button
                  onClick={() => {
                    choice=2;
                    uplAvat=0;
                    onSubmitAvatar(2,0);
                    setOpenSelection(false);
                  }}
                >Avatar 2</Button>
                <img src="https://img.icons8.com/external-flat-icons-pause-08/64/000000/external-avatar-farm-and-garden-flat-icons-pause-08.png" />
                <Button
                  onClick={() => {
                    choice=3;
                    uplAvat=0;
                    onSubmitAvatar(3,0);
                    setOpenSelection(false);
                  }}
                >Avatar 3</Button>
                <img src="https://img.icons8.com/color/48/000000/spyro.png" />
                <Button
                  onClick={() => {
                    choice=4;
                    uplAvat=0;
                    onSubmitAvatar(4,0);
                    setOpenSelection(false);
                  }}
                >Avatar 4</Button>
                <img src="https://img.icons8.com/external-photo3ideastudio-lineal-color-photo3ideastudio/64/000000/external-ninja-japan-photo3ideastudio-lineal-color-photo3ideastudio.png" />
                      <div {...getRootProps()}>
                        <input {...getInputProps()} />
                        <Button>Upload file</Button>
                        <div>{images}</div>
                        </div>
                        {files.length ?
                      <Button
                      onClick={()=>{
                        choice=0;
                        uplAvat=1;
                        onSubmitAvatar(0,1);
                        setOpenSelection(false);
                      }}
                      > Save</Button>
                      :
                      <span>
                      </span>
                    } 


              </DialogActions>
            </Dialog>
      
      <Tooltip title="Settings">
      <IconButton
      onClick={onClickSettings}
      size="large"
      sx={{"&:hover": {background: grey[200]}}}>
      <SettingsIcon fontSize="inherit"/>
      </IconButton>
      </Tooltip>
      <Dialog open={openSettings} onClose={closeSettings}>
       <DialogTitle>Account settings</DialogTitle>
       <DialogContent css={{flexDirection: "column", display: "flex"}}>
       <FormControlLabel
        control={<IOSSwitch sx={{ m: 1 }} defaultUnchecked />}
        label="Night mode"
      />
      <FormControl component="fieldset">
      <FormLabel css={{paddingTop: 20, paddingBottom: 5}} component="legend">Language</FormLabel>
      <RadioGroup
        aria-label="language"
        defaultValue="English"
        name="radio-buttons-group">
        <FormControlLabel value="english" control={<Radio />} label="English" />
        <FormControlLabel value="french" control={<Radio />} label="Français" />
        <FormControlLabel value="chinese" control={<Radio />} label="中文" />
      </RadioGroup>
    </FormControl>
    <Box sx={{ width: 300 }}>
      <FormLabel css={{paddingTop: 20, paddingBottom: 5}} component="legend">Font size</FormLabel>
     <Slider
       aria-label="Fontsize"
       defaultValue={18}
       getAriaValueText={valuetext}
       valueLabelDisplay="auto"
       step={2}
       marks
       min={10}
       max={30}
     />
   </Box>
       </DialogContent>
       <DialogActions>
         <Button sx={{
           borderColor:red[800],
           color:red[800],
           "&:hover": {borderColor: grey[200], background: grey[200] }}}
          variant="outlined"
          onClick={closeSettings}>Cancel changes</Button>
       </DialogActions>
     </Dialog>
      <Tooltip title="Logout">
      <IconButton onClick={onClickLogout}
      size="large"
      css={styles.logout}
      sx={{"&:hover": {background: grey[200]}}}>
      <LogoutIcon fontSize="inherit"/>
      </IconButton>
      </Tooltip>
      {console.log(currentUser)}
      </span>
      
      :
      <span css={styles.user}> new user</span>
    }
    </header>
  );
}

// /** @jsxImportSource @emotion/react */
// import { useContext, useState } from 'react';
// import { useCookies } from 'react-cookie'
// // Layout
// import { useTheme } from '@mui/styles';
// import { Button, IconButton, Link } from '@mui/material';
// import MenuIcon from '@mui/icons-material/Menu';
// import Context from './Context';
// import Gravatar from 'react-gravatar'
// import LogoutIcon from '@mui/icons-material/Logout';
// import { red, grey } from '@mui/material/colors';
// import Dialog from '@mui/material/Dialog';
// import DialogActions from '@mui/material/DialogActions';
// import DialogTitle from '@mui/material/DialogTitle';
// import axios from 'axios';
// import { useDropzone } from 'react-dropzone';
// import CheckIcon from '@mui/icons-material/Check';
// const useStyles = (theme) => ({
//   header: {
//     height: 75,
//     display: "flex",
//     alignItems: "center",
//     padding: theme.spacing(1),
//     backgroundColor: 'white',
//     flexShrink: 0,
//     minWidth: "600px",
//     borderBottom: "1px solid #c1bdbd"
//   },
//   headerLogIn: {
//     backgroundColor: 'red',
//   },
//   headerLogOut: {
//     backgroundColor: 'blue',
//   },
//   menu: {
//     color: "black",
//     //backgroundColor: "blue",
//     [theme.breakpoints.up('sm')]: {
//       display: 'none !important',
//     },
//   },
//   logo: {
//     marginRight: "2vw",
//     alignItems: "center",
//     fontFamily: "Courier",
//     //backgroundColor: "red",
//     color: "black",
//     flexGrow: "1",
//     display: "block"
//   },
//   logoIcon: {
//     marginLeft: "2vw",
//     width: 80,
//     height: 80
//   },
//   user: {
//     display: "inline-flex",
//     alignItems: "center",
//     //backgroundColor: "green",
//     marginRight: "1vw",
//     fontSize: 18,
//     fontWeight: 500,
//     color: grey[700]
//   },
//   logout: {
//     color: red[900],

//   }
// })

// export default function Header({
//   drawerToggleListener
// }) {
//   const styles = useStyles(useTheme())
 
//   const [openSelection, setOpenSelection] = useState(false);
//   const [files, setFiles] = useState([])
//   const {
//     oauth, setOauth,
//     drawerVisible, setDrawerVisible,
//     currentUser, setCurrentUser
//   } = useContext(Context)
//   const [cookies, setCookie, removeCookie] = useCookies([])
//   const drawerToggle = (e) => {
//     setDrawerVisible(!drawerVisible)
//   }
//   const onClickLogout = (e) => {
//     e.stopPropagation()
//     setOauth(null)
//     removeCookie('currentUser')
//   }
//   const handleCloseSelection = () => {
//     setOpenSelection(false);
//   };

//   let choice
//   let uplAvat
//   let finalUpl
//   const onSubmitAvatar = async () => {
//     if (uplAvat===0)
//     {
//       finalUpl=0
//     }
//     else
//     {
//       finalUpl= await convertBase64(files[0])
//     }
//     const { data: nUser } = await axios.put(
//       `http://localhost:3001/users/${currentUser.id}`
//       , {
//         id: currentUser.id,
//         email: currentUser.email,
//         // avatChoice: choice,
//         // uploadAvat: finalUpl
//       }, {
//       headers: {
//         'Authorization': `Bearer ${oauth.access_token}`
//       },
//     })
//     setCurrentUser(nUser)
    
//   }

//   const { getRootProps, getInputProps } = useDropzone({
//     multiple: false,
//     accept: "image/*",
//     onDrop: (acceptedFiles) => {
//       setFiles(
//         acceptedFiles.map((file) =>
//           Object.assign(file, {
//             preview: URL.createObjectURL(file),
//           })
//         )
//       )
//     },
//   })

//   const images = files.map((file) => (
//     <div key={file.name}>
//       <div>
//         <img src={file.preview} style={{ width: "50px" }} alt="preview" />
//       </div>
//     </div>
//   ))

//   const convertBase64 = (file) => {
//     return new Promise((resolve, reject) => {
//       const fileReader = new FileReader();
//       fileReader.readAsDataURL(file);

//       fileReader.onload = () => {
//         resolve(fileReader.result);
//       };

//       fileReader.onerror = (error) => {
//         reject(error);
//       };
//     });
//   };

//     return (

//     <header css={styles.header}>
//       <IconButton
//         color="inherit"
//         aria-label="open drawer"
//         onClick={drawerToggle}
//         css={styles.menu}
//       >
//         <MenuIcon />
//       </IconButton>
//       <img css={styles.logoIcon} src="/logo_clear.png" alt="LogoClear" />
//       <h1 css={styles.logo}> BeeTalky </h1>
//       {

 
//         oauth ?
//           <span css={styles.user}>
//             <div>
//               {oauth.email}
//             </div>
//             {/* {(currentUser.avatChoice === 0 && currentUser.uploadAvat===0) ? (
//               <Gravatar //gravatar image with default parameters override
//                 email={oauth.email}
//                 size={50}
//                 rating="pg"
//                 default="monsterid"
//                 className="CustomAvatar-image"
//                 style={{ margin: '10px', borderRadius: '25px' }}
//                 protocol="https://"
//               />
//             ) : (currentUser.avatChoice === 1 && currentUser.uploadAvat===0) ? (
//               <img src="https://img.icons8.com/officel/40/000000/avatar.png" />
//             ) : (currentUser.avatChoice === 2 && currentUser.uploadAvat===0) ? (
//               <img src="https://img.icons8.com/external-flat-icons-pause-08/64/000000/external-avatar-farm-and-garden-flat-icons-pause-08.png" />
//             ) : (currentUser.avatChoice === 3 && currentUser.uploadAvat===0) ? (
//               <img src="https://img.icons8.com/color/48/000000/spyro.png" />
//             ) : (currentUser.avatChoice === 4 && currentUser.uploadAvat===0) ? (
//               <img src="https://img.icons8.com/external-photo3ideastudio-lineal-color-photo3ideastudio/64/000000/external-ninja-japan-photo3ideastudio-lineal-color-photo3ideastudio.png" />
//             ) : (
//               <img src={currentUser.uploadAvat} style={{ width: "50px" }} />
//             )
//             } */}
     

//             <Button
//               onClick={() => {
//                 setOpenSelection(true);
//                 setFiles([]);
//               }}  >
//               Choose Avatar
//             </Button>
//             <Dialog open={openSelection} onClose={handleCloseSelection} fullWidth={true} maxWidth='md'>
//               <DialogTitle>Choose an avatar among the selection</DialogTitle>
//               <DialogActions>
//                 <Button onClick={handleCloseSelection}>Cancel</Button>
//                 <Button
//                   onClick={() => {
//                     choice=0;
//                     uplAvat=0;
//                     onSubmitAvatar();
//                     setOpenSelection(false);
//                   }}
//                 >Default Gravatar</Button>
//                 <Gravatar //gravatar image with default parameters override
//                   email={oauth.email}
//                   size={50}
//                   rating="pg"
//                   default="monsterid"
//                   className="CustomAvatar-image"
//                   style={{ margin: '10px', borderRadius: '25px' }}
//                   protocol="https://"
//                 />
//                 <Button
//                   onClick={() => {
//                     choice=1;
//                     uplAvat=0;
//                     onSubmitAvatar();
//                     setOpenSelection(false);
//                   }}
//                 >Avatar 1</Button>
//                 <img src="https://img.icons8.com/officel/40/000000/avatar.png" />
//                 <Button
//                   onClick={() => {
//                     choice=2;
//                     uplAvat=0;
//                     onSubmitAvatar();
//                     setOpenSelection(false);
//                   }}
//                 >Avatar 2</Button>
//                 <img src="https://img.icons8.com/external-flat-icons-pause-08/64/000000/external-avatar-farm-and-garden-flat-icons-pause-08.png" />
//                 <Button
//                   onClick={() => {
//                     choice=3;
//                     uplAvat=0;
//                     onSubmitAvatar();
//                     setOpenSelection(false);
//                   }}
//                 >Avatar 3</Button>
//                 <img src="https://img.icons8.com/color/48/000000/spyro.png" />
//                 <Button
//                   onClick={() => {
//                     choice=4;
//                     uplAvat=0;
//                     onSubmitAvatar();
                    
//                     setOpenSelection(false);
//                   }}
//                 >Avatar 4</Button>
//                 <img src="https://img.icons8.com/external-photo3ideastudio-lineal-color-photo3ideastudio/64/000000/external-ninja-japan-photo3ideastudio-lineal-color-photo3ideastudio.png" />
//                       <div {...getRootProps()}>
//                         <input {...getInputProps()} />
//                         <Button>Upload file</Button>
//                         <div>{images}</div>
//                         </div>
//                         {files.length ?
//                       <Button
//                       onClick={()=>{
//                         choice=0;
//                         uplAvat=1;
//                         onSubmitAvatar();
//                         setOpenSelection(false);
//                       }}
//                       > Save</Button>
//                       :
//                       <span>
//                       </span>
//                     } 


//               </DialogActions>
//             </Dialog>
//             <IconButton onClick={onClickLogout}
//               size="large"
//               css={styles.logout}
//               sx={{ "&:hover": { background: grey[200] } }}>
//               <LogoutIcon fontSize="inherit" />
//             </IconButton>
//           </span>

//           :
//           <span css={styles.user}> new user</span>
//       }
//     </header>
//   );
// }
