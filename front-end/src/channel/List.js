
/** @jsxImportSource @emotion/react */
import {Fragment,forwardRef, useImperativeHandle, useLayoutEffect, useRef, useContext, useEffect, useState} from 'react'
import Context from '../Context'
import axios from 'axios';
// Layout
import { useTheme } from '@mui/styles';
// Markdown
import { unified } from 'unified'
import markdown from 'remark-parse'
import remark2rehype from 'remark-rehype'
import html from 'rehype-stringify'
import PersonAddAltRoundedIcon from '@mui/icons-material/PersonAddAltRounded';
import {IconButton} from '@mui/material';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {Button} from '@mui/material';
// Time
import dayjs from 'dayjs'
import calendar from 'dayjs/plugin/calendar'
import updateLocale from 'dayjs/plugin/updateLocale'
dayjs.extend(calendar)
dayjs.extend(updateLocale)
dayjs.updateLocale('en', {
  calendar: {
    sameElse: 'DD/MM/YYYY hh:mm A'
  }
})

const useStyles = (theme) => ({
  root: {
    position: 'relative',
    flex: '1 1 auto',
    overflow: 'auto',
    '& ul': {
      'margin': 0,
      'padding': 0,
      'textIndent': 0,
      'listStyleType': 0,
    },
  },
  message: {
    padding: '.2rem .5rem',
    ':hover': {
      backgroundColor: 'rgba(255,255,255,.05)',
    },
  },
  fabWrapper: {
    position: 'absolute',
    right: 0,
    top: 0,
    width: '50px',
  },
  fab: {
    position: 'fixed !important',
    top: 0,
    width: '50px',
  },
  nameDiv: {
    display: "flex",
    alignItems: "center",
  },
})

export default forwardRef(({
  channel,
  messages,
  onScrollDown,
}, ref) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [usersList, setUsersList] = useState([]);
  const {oauth} = useContext(Context)
  const styles = useStyles(useTheme());
  useEffect( () => {
    const fetch = async () => {
      try{
        const {data: users} = await axios.get('http://localhost:3001/users', {
          headers: {
            'Authorization': `Bearer ${oauth.access_token}`
          }
        })
        let tempo = []
        for (let i=0; i<users.length; i++){
          if(users[i].username!==oauth.email)
            tempo.push({label: users[i].username})
        }
        setUsersList(tempo)
      }catch(err){
        console.error(err)
      }
    }
    fetch()
  }, [])

  // Expose the `scroll` action
  useImperativeHandle(ref, () => ({
    scroll: scroll
  }));
  const rootEl = useRef(null)
  const scrollEl = useRef(null)
  const scroll = () => {
    scrollEl.current.scrollIntoView()
  }
  // See https://dev.to/n8tb1t/tracking-scroll-position-with-react-hooks-3bbj
  const throttleTimeout = useRef(null) // react-hooks/exhaustive-deps
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  useLayoutEffect( () => {
    const rootNode = rootEl.current // react-hooks/exhaustive-deps
    const handleScroll = () => {
      if (throttleTimeout.current === null) {
        throttleTimeout.current = setTimeout(() => {
          throttleTimeout.current = null
          const {scrollTop, offsetHeight, scrollHeight} = rootNode // react-hooks/exhaustive-deps
          onScrollDown(scrollTop + offsetHeight < scrollHeight)
        }, 200)
      }
    }
    handleScroll()
    rootNode.addEventListener('scroll', handleScroll)
    return () => rootNode.removeEventListener('scroll', handleScroll)
  })
  return (
    <div css={styles.root} ref={rootEl}>
      <div css={styles.nameDiv}>
      <h1>Messages for {channel.name}</h1>
      <IconButton
      css={{marginLeft: 15}}
      onClick={handleClickOpen}>
      <PersonAddAltRoundedIcon/>
      </IconButton>
      <Dialog open={open} onClose={handleClose}>
       <DialogTitle>Invite a user</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Add an existing user to this channel by searching its email
        </DialogContentText>
        <Autocomplete
        disablePortal
        id="combo-box-users"
        options={usersList}
        sx={{ padding: 2, width: 300 }}
        renderInput={(params) => <TextField {...params}
        label="User email"/>}
        // value={value}
        // onChange={(event, newValue) => {
        //   setValue(event.target.newValue);
        //   console.log(value);
        // }}
        inputValue={inputValue}
        onInputChange={(event, inputValue) => {
          setInputValue(inputValue);
          console.log(inputValue);
        }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleClose}>Add</Button>
      </DialogActions>
    </Dialog>
      </div>
      <ul>
        { messages.map( (message, i) => {
            const {value} = unified()
            .use(markdown)
            .use(remark2rehype)
            .use(html)
            .processSync(message.content);
            return (
              <li key={i} css={styles.message}>
                <p>
                  <span>{message.author}</span>
                  {' - '}
                  <span>{dayjs().calendar(message.creation)}</span>
                </p>
                <div dangerouslySetInnerHTML={{__html: value}}>
                </div>
              </li>
            )
        })}
      </ul>
      <div ref={scrollEl} />
    </div>
  )
})
