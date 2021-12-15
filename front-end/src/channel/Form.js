
/** @jsxImportSource @emotion/react */
import { useState } from 'react'
import axios from 'axios';
// Layout
import { Button, TextField } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { useTheme, withStyles } from '@mui/styles';
import { amber, red, grey } from '@mui/material/colors';
import Context from '../Context'
import { useContext } from 'react';


const useStyles = (theme) => {
  // See https://github.com/mui-org/material-ui/blob/next/packages/material-ui/src/OutlinedInput/OutlinedInput.js
  //const borderColor = theme.palette.mode === 'light' ? 'rgba(0, 0, 0, 0.23)' : 'rgba(255, 255, 255, 0.23)';
  return {
    form: {
      borderTop: "2px solid #c1bdbd",
      padding: '.5rem',
      display: 'flex',
      alignItems: "center",

      //backgroundColor: "#b5b3b3",
    },
    content: {
      flex: '1 1 auto',
      '&.MuiTextField-root': {
        marginRight: theme.spacing(1),
      },
    },
    send: {
      backgroundColor: "#FFC800",
    },
  }
}

const ColoredTextField = withStyles((theme) => ({
  root: {
    "& label": {
      color: grey[400],
    },
    "& label.Mui-focused": {
      color: red[800],
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: grey[400],
      },
       '& .MuiInputBase-input': {
        color: grey[900],
      },
      "&.Mui-focused fieldset": {
        borderColor: red[800],
      },
      "&:hover fieldset":{
        borderColor: red[800],
      },
    },
  },
}))(TextField)

export default function Form({
  addMessage,
  channel,
}) {
  const [content, setContent] = useState('')
  const {oauth} = useContext(Context)
  const styles = useStyles(useTheme())
  const onSubmit = async () => {
    const {data: message} = await axios.post(
      `http://localhost:3001/channels/${channel.id}/messages`
    , {
      content: content,
      author: `${oauth.email}`,
    })
    addMessage(message)
    setContent('')
  }
  const handleChange = (e) => {
    setContent(e.target.value)
  }
  return (
    <form css={styles.form} onSubmit={onSubmit} noValidate>
      <ColoredTextField
        id="outlined-multiline-flexible"
        label="Message"
        multiline
        maxRows={4}
        value={content}
        onChange={handleChange}
        variant="outlined"
        css={styles.content}
        />
      <div>
        <Button
          sx={{
            "&:hover": {
              color:"white",
              background: red[900]}
          }}
          variant="contained"
          css={styles.send}
          endIcon={<SendIcon />}
          onClick={onSubmit}
        >
          Send
        </Button>
      </div>
    </form>
  )
}
