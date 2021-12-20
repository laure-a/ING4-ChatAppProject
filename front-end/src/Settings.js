/** @jsxImportSource @emotion/react */
import { useContext, useState } from 'react';
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
import { red, grey, amber } from '@mui/material/colors';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { IconButton, Link, Button } from '@mui/material';
import Context from './Context';
import axios from 'axios';



const ModeSwitch = styled((props) => (
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

export default function Settings({dialogOpen, handleCloseDialog}) {
  const {currentUser, setCurrentUser, oauth} = useContext(Context)
  console.log(currentUser);
  const [dayMode, setDayMode] = useState(currentUser.dayMode)
  const [language, setLanguage] = useState(currentUser.language)
  const [fontsize, setFontsize] = useState(currentUser.fontsize)

  const handleCloseSettings = () => {
    handleCloseDialog(false);
  };
  function valuetext(value) {
    return value;
  }

    const updateCurrentUser = (changeUser) => {
      setCurrentUser(changeUser)
    }

  const changeLanguage = (event) => {
    setLanguage(event.target.value);
  };
  const changeFontsize = (event) => {
    setFontsize(event.target.value);
  };
  const onSave = async () => {
    const {data: changeUser} = await axios.put(
      `http://localhost:3001/users/${currentUser.id}`
    , {
      id: `${currentUser.id}`,
      username: `${currentUser.username}`,
      language: language,
      fontsize: fontsize,
      dayMode: dayMode,
      avatChoice: currentUser.avatChoice,
      uploadAvat: currentUser.uploadAvat
    },{
    headers: {
      'Authorization': `Bearer ${oauth.access_token}`
    }})
    updateCurrentUser(changeUser)
    handleCloseSettings()
  }

  return (
    <Dialog open={dialogOpen} onClose={handleCloseSettings}>
    <DialogTitle>Account settings</DialogTitle>
    <DialogContent css={{flexDirection: "column", display: "flex"}}>
    <FormControlLabel
     control={<ModeSwitch
       sx={{ m: 1 }}/>}
       checked={dayMode}
     onChange={()=>setDayMode(!dayMode)}
     label={dayMode? "Day mode" : "Night mode"}
   />
   <FormControl component="fieldset">
   <FormLabel css={{paddingTop: 20, paddingBottom: 5, color: amber[900]}} component="legend">Language</FormLabel>
   <RadioGroup
     aria-label="language"
     value={language}
     onChange={changeLanguage}
     name="radio-buttons-group">
     <FormControlLabel value="english" control={<Radio />} label="English" />
     <FormControlLabel value="french" control={<Radio />} label="Français" />
     <FormControlLabel value="chinese" control={<Radio />} label="中文" />
   </RadioGroup>
 </FormControl>
 <Box sx={{ width: 300 }}>
   <FormLabel css={{paddingTop: 20, paddingBottom: 5, color: amber[900]}} component="legend">Font size</FormLabel>
  <Slider
    aria-label="Fontsize"
    css={{color: red[800]}}
    value={fontsize}
    onChange={changeFontsize}
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
       onClick={handleCloseSettings}>Cancel</Button>
       <Button sx={{
         borderColor:grey[800],
         color:grey[800],
         "&:hover": {borderColor: grey[200], background: grey[200] }}}
        variant="outlined"
        onClick={onSave}>Save changes</Button>
    </DialogActions>
    </Dialog>
  );
}
