
/** @jsxImportSource @emotion/react */
import {useContext, useEffect} from 'react';
import axios from 'axios';
// Layout
import {Link} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import {Button} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
// Local
import Context from './Context'
import {useNavigate} from 'react-router-dom'

const styles = {
  root: {
    '& a': {
      //padding: '0.2rem 0rem',
      //whiteSpace: 'nowrap',
    }
  },
  channel_button: {
  //  paddingLeft: "10px",
  }
}

export default function Channels() {
  const {
    oauth,
    channels, setChannels
  } = useContext(Context)
  const naviate = useNavigate();
  useEffect( () => {
    const fetch = async () => {
      try{
        const {data: channels} = await axios.get('http://localhost:3001/channels', {
          headers: {
            'Authorization': `Bearer ${oauth.access_token}`
          }
        })
        setChannels(channels)
      }catch(err){
        console.error(err)
      }
    }
    fetch()
  }, [oauth, setChannels])
  return (
    <ul css={styles.root}>
      <li css={styles.channel}>
      <Link to="/channels" component={RouterLink}>
      <Button startIcon={<HomeIcon />} variant="contained"
      sx={{
        paddingLeft: 2,
        flexDirection: "line",
        display: "flex",
        justifyContent: "left",
        width: 199,
        height: 40,
        color: "black",
        borderRadius: 0,
        backgroundColor: "#ffae00",
        "&:hover": {
          background: "#e09808"}
      }}
      > Welcome
      </Button>
      </Link>
      <h3 css={{color: "black", paddingLeft: "15px"}}> Channels </h3>
      </li>
      { channels.map( (channel, i) => (
        <li key={i} css={styles.channel_button}>
          <Button
          sx={{
            paddingLeft: 2,
            flexDirection: "line",
            display: "flex",
            justifyContent: "left",
            width: 199,
            height: 40,
            color: "black",
            borderRadius: 0,
            backgroundColor: "#ffae00",
            "&:hover": {
              background: "#e09808"}
          }}
            href={`/channels/${channel.id}`}
            onClick={ (e) => {
              e.preventDefault()
              naviate(`/channels/${channel.id}`)
            }}
          >
            {channel.name}
          </Button>
        </li>
      ))}
    </ul>
  );
}
