
/** @jsxImportSource @emotion/react */
import {forwardRef, useImperativeHandle, useLayoutEffect, useRef, useEffect, useContext, useState} from 'react'
import axios from 'axios';
// Layout
import { useTheme } from '@mui/styles';
import {Button, IconButton} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import {red} from '@mui/material/colors';
// Markdown
import { unified } from 'unified'
import markdown from 'remark-parse'
import remark2rehype from 'remark-rehype'
import html from 'rehype-stringify'
// Time
import Context from "../Context";
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
  addButton: {
    color: red[800],
  },
})


export default forwardRef(({
  channel,
  deleteMessage,
  messages,
  onScrollDown,
}, ref) => {
  const styles = useStyles(useTheme())
  const { oauth } = useContext(Context);
  const [open, setOpen] = useState(false);
  // Expose the `scroll` action
  useImperativeHandle(ref, () => ({
    scroll: scroll
  }));

  const onSubmit = async (channelId,creation) => {
     await axios.delete(
      `http://localhost:3001/channels/${channel.id}/messages`
    , {
      params: {
        channelId: `${channelId}`,
        messageCreation: `${creation}`,
      }
    },{
    headers: {
      'Authorization': `Bearer ${oauth.access_token}`
    }})
    deleteMessage(creation)
    handleClose()

  }
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  
  const rootEl = useRef(null)
  const scrollEl = useRef(null)
  const scroll = () => {
    scrollEl.current.scrollIntoView()
  }
  // See https://dev.to/n8tb1t/tracking-scroll-position-with-react-hooks-3bbj
  const throttleTimeout = useRef(null) // react-hooks/exhaustive-deps
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
      <h1>Messages for {channel.name}</h1>
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
                  {'     '}
                  {message.author === oauth.email && (
                    <span>
                      <IconButton 
                       onClick={handleClickOpen}
                       css={styles.addButton}>
                      <DeleteIcon/>
                    </IconButton> 
                   </span>
                  )}
                          <Dialog open={open} onClose={handleClose}>
       <DialogTitle>Are you sure that you want to delete this message ?</DialogTitle>
       <DialogActions>
           <Button onClick={handleClose}>Cancel</Button>
           <Button onClick={()=>onSubmit(channel.id, message.creation)}>Yes</Button>
       </DialogActions>
         </Dialog>
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
