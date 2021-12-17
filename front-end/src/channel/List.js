
/** @jsxImportSource @emotion/react */

import { forwardRef, useImperativeHandle, useLayoutEffect, useRef, useEffect, useContext, useState } from 'react'
import axios from 'axios';
// Layout
import { useTheme } from '@mui/styles';
import { Button, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import UpdateIcon from '@mui/icons-material/Update';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import { red, blue } from '@mui/material/colors';
// Markdown
import { unified } from 'unified'
import markdown from 'remark-parse'
import remark2rehype from 'remark-rehype'
import html from 'rehype-stringify'
import PersonAddAltRoundedIcon from '@mui/icons-material/PersonAddAltRounded';
import Autocomplete from '@mui/material/Autocomplete';
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
  deleteButton: {
    color: red[800],
  },
  updateButton: {
    color: blue[800],
  },
  nameDiv: {
    display: "flex",
    alignItems: "center",
  },
})

export default forwardRef(({
  channel,
  deleteMessage,
  messages,
  onScrollDown,
}, ref) => {
  const [open, setOpen] = useState(false);
  const styles = useStyles(useTheme())
  const { oauth } = useContext(Context);
  const [openDelete, setOpenDelete] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [newMessage, setNewMessage] = useState('')
  // Expose the `scroll` action
  useImperativeHandle(ref, () => ({
    scroll: scroll
  }));

  const onSubmit = async (channelId, creation) => {
    await axios.delete(
      `http://localhost:3001/channels/${channel.id}/messages`
      , {
        params: {
          channelId: `${channelId}`,
          messageCreation: `${creation}`,
        }
      }, {
      headers: {
        'Authorization': `Bearer ${oauth.access_token}`
      }
    })
    deleteMessage(creation)
    handleCloseDelete()

  }
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpenDelete = () => {
    setOpenDelete(true);
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
  };

  const handleClickOpenUpdate = () => {
    setOpenUpdate(true);
  };

  const handleCloseUpdate = () => {
    setOpenUpdate(false);
  };

  const handleChangeUpdate = (e) => {
    setNewMessage(e.target.value)
  }

  const rootEl = useRef(null)
  const scrollEl = useRef(null)
  const scroll = () => {
    scrollEl.current.scrollIntoView()
  }
  // See https://dev.to/n8tb1t/tracking-scroll-position-with-react-hooks-3bbj
  const throttleTimeout = useRef(null) // react-hooks/exhaustive-deps
  useLayoutEffect(() => {
    const rootNode = rootEl.current // react-hooks/exhaustive-deps
    const handleScroll = () => {
      if (throttleTimeout.current === null) {
        throttleTimeout.current = setTimeout(() => {
          throttleTimeout.current = null
          const { scrollTop, offsetHeight, scrollHeight } = rootNode // react-hooks/exhaustive-deps
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
          css={{ marginLeft: 15 }}
          onClick={handleClickOpen}>
          <PersonAddAltRoundedIcon />
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
              options={[{ label: "hey" }, { label: "hey" }]}
              sx={{ padding: 2, width: 300 }}
              renderInput={(params) => <TextField {...params} label="User email" />}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleClose}>Add</Button>
          </DialogActions>
        </Dialog>
      </div>
      <ul>
        {messages.map((message, i) => {
          const { value } = unified()
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
                      onClick={handleClickOpenDelete}
                      css={styles.deleteButton}>
                      <DeleteIcon />
                    </IconButton>
                    <IconButton
                      onClick={handleClickOpenUpdate}
                      css={styles.updateButton}>
                      <UpdateIcon />
                    </IconButton>
                  </span>
                )}
                <Dialog open={openDelete} onClose={handleCloseDelete}>
                  <DialogTitle>Are you sure that you want to delete this message ?</DialogTitle>
                  <DialogActions>
                    <Button onClick={handleCloseDelete}>Cancel</Button>
                    <Button onClick={() => onSubmit(channel.id, message.creation)}>Yes</Button>
                  </DialogActions>
                </Dialog>
                <Dialog open={openUpdate} onClose={handleCloseUpdate} fullWidth={true} maxWidth='md'>
                  <DialogTitle> Enter your new message</DialogTitle>
                  <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="newMessage"
              label="New message:"
              type="text"
              fullWidth={true}
              width='250px'
              value={newMessage}
              onChange={handleChangeUpdate}
              required
            />
          </DialogContent>
                </Dialog>
              </p>
              <div dangerouslySetInnerHTML={{ __html: value }}>
              </div>
            </li>
          )
        })}
      </ul>
      <div ref={scrollEl} />
    </div>
  )
})
