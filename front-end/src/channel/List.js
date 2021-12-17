
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
import Stack from '@mui/material/Stack';
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
  const [openAddUser, setOpenAddUser] = useState(false);
  const [inputValueUser, setInputValueUser] = useState([]);
  const [usersListDb, setUsersListDb] = useState([]);
  const [usersDisplay, setUsersDisplay] = useState([]);
  const {oauth, channels, setChannels} = useContext(Context)
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
        let already = false
        for (let i=0; i<users.length; i++){
          if(users[i].username!==oauth.email)
          tempo.push({label: users[i].username})}
        setUsersListDb(tempo)
      }catch(err){
        console.error(err)
      }
    }
    fetch()
  }, [])

  const onSubmitUser = async () => {
    const tempo = inputValueUser.map(username => {
     return username.label
   } )
   const newList= channel.usersList.concat(tempo)
    const {data: channelCurrent} = await axios.put(
      `http://localhost:3001/channels/${channel.id}`
    , {
      name: channel.name,
      owner: channel.owner,
      usersList: newList
    },{
    headers: {
      'Authorization': `Bearer ${oauth.access_token}`
    }})
    updateChannels(channelCurrent)
    setInputValueUser([])
    handleCloseUser()
  }

  const updateChannels = (channelCurrent) => {
    channel.usersList = channelCurrent.usersList
    const newChannels = channels.map(current  => {
      if(channelCurrent.id === current.id)
        return channelCurrent
      else
        return current
    })
    setChannels(newChannels)
  }

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

  const handleClickOpenIcon = () => {
    console.log(channel.usersList)
    console.log(usersListDb)
    const usersTempo = usersListDb.filter(username =>
      !channel.usersList.some(userL => userL === username.label))
    setUsersDisplay(usersTempo)
    setOpenAddUser(true);
  };
  const handleCloseUser = () => {
    setInputValueUser([])
    setOpenAddUser(false);
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
      onClick={handleClickOpenIcon}>
      <PersonAddAltRoundedIcon/>
      </IconButton>
      <Dialog open={openAddUser} onClose={handleCloseUser}>
       <DialogTitle>Invite users</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Add existing users to this channel
        </DialogContentText>
        <Stack spacing={3} sx={{ width: 350 }}>
        <Autocomplete
        multiple
        disablePortal
        id="combo-box-users"
        options={usersDisplay}
        sx={{ padding: 2, width: 300 }}
        renderInput={(params) => <TextField {...params}
        variant="standard"
        label="User emails"/>}
        value={inputValueUser}
        onChange={(event, inputValueUser) => {
          setInputValueUser(inputValueUser);
        }}
        />
         </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseUser}>Cancel</Button>
        <Button onClick={onSubmitUser}>Add</Button>
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
