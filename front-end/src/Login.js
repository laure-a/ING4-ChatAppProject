
/** @jsxImportSource @emotion/react */
import { useContext, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import crypto from 'crypto'
import qs from 'qs'
import axios from 'axios'
// Layout
import Button from '@mui/material/Button';
import { useTheme } from '@mui/styles';
import { Link } from '@mui/material';
// Local
import Context from './Context'
import {
  useNavigate
} from "react-router-dom";
import { useThemeProps } from '@mui/system';

const base64URLEncode = (str) => {
  return str.toString('base64')
  .replace(/\+/g, '-')
  .replace(/\//g, '_')
    .replace(/=/g, '');
  }

  const sha256 = (buffer) => {
    return crypto
    .createHash('sha256')
    .update(buffer)
    .digest()
  }

  const useStyles = (theme) => ({
    root: {
      flex: '1 1 auto',
      flexDirection: "column",
      backgroundImage: `url(${process.env.PUBLIC_URL + '/ruche.png'})`,
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      //background: theme.palette.background.default,
      display: 'flex',
      //justifyContent: 'center',
      alignItems: 'center',
      '& > div': {
        margin: `${theme.spacing(1)}`,
        marginLeft: 'auto',
        marginRight: 'auto',
      },
      backgroundColor: "#dddbdb",
      '& fieldset': {
        border: 'none',
        '& label': {
          marginBottom: theme.spacing(.5),
          display: 'block',
        },
      },
    },
    h2: {
      marginTop: "4vh",
      marginBottom: 0,
    },
    h1: {
      fontFamily: "'Courier New', Courier, monospace",
      marginTop: "1vh",
      color: "#E2B412",
    }
  })

  const Redirect = ({
    config,
    codeVerifier,
  }) => {
    const styles = useStyles(useTheme())
    const redirect = (e) => {
      e.stopPropagation()
      const code_challenge = base64URLEncode(sha256(codeVerifier))
      const url = [
        `${config.authorization_endpoint}?`,
        `client_id=${config.client_id}&`,
        `scope=${config.scope}&`,
        `response_type=code&`,
        `redirect_uri=${config.redirect_uri}&`,
        `code_challenge=${code_challenge}&`,
        `code_challenge_method=S256`,
      ].join('')
      window.location = url
    }
    return (
      <div css={styles.root}>
      <h2 css={styles.h2}> Looking for a web app to chat with your friends ? </h2>
      <h1 css={styles.h1}> BeeTalky is the place to bee. </h1>
      <Button
      sx={{
        width: 80,
        height: 40,
        color: "white",
        backgroundColor: "black",
        borderColor: "white",
        "&:hover": {
          borderColor: "#730202",
          background: "#730202"}
        }}
        variant="outlined"
        onClick={redirect} >Login</Button>
        </div>
      )
    }

    const Tokens = ({
      oauth
    }) => {
      const {setOauth} = useContext(Context)
      const styles = useStyles(useTheme())
      const {id_token} = oauth
      const id_payload = id_token.split('.')[1]
      const {email} = JSON.parse(atob(id_payload))
      const logout = (e) => {
        e.stopPropagation()
        setOauth(null)
      }
      return (
        <div css={styles.root}>
        Welcome {email} <Link onClick={logout} color="secondary">logout</Link>
        </div>
      )
    }

    const LoadToken = ({
      code,
      codeVerifier,
      config,
      removeCookie,
      setOauth
    }) => {
      const {oauth, currentUser, setCurrentUser} = useContext(Context)
      const styles = useStyles(useTheme())
      const navigate = useNavigate();
      useEffect( () => {
        const fetch = async () => {
          try {
            const {data} = await axios.post(
              config.token_endpoint
              , qs.stringify ({
                grant_type: 'authorization_code',
                client_id: `${config.client_id}`,
                code_verifier: `${codeVerifier}`,
                redirect_uri: `${config.redirect_uri}`,
                code: `${code}`,
              }))
              removeCookie('code_verifier')
              setOauth(data)
              try {
                const {data: users} = await axios.get(`http://localhost:3001/users`, {
                  headers: {
                    'Authorization': `Bearer ${data.access_token}`
                  }
                })
                let found = false
                for (let i=0; i<users.length; i++){
                  if(users[i].username === data.email){
                    found=true
                    setCurrentUser(users[i])
                  }
                }
                if(!found)
                {
                  const newUser = await axios.post(`http://localhost:3001/users`,
                    { username : data.email,
                      language: "english",
                      fontsize: 18,
                      dayMode: true,
                      avatChoice: 0,
                      uploadAvat: 0,
                    },
                    { headers: {
                      'Authorization': `Bearer ${data.access_token}`
                    }
                  })
                  setCurrentUser(newUser.data)
                }
              } catch (e) {
                console.error(e)
              }
              navigate('/')
            }catch (err) {
              console.error(err)
            }
          }
          fetch()
        })
        return (

          <span>
          <div css={styles.root}>Loading tokens</div>
          </span>

        )
      }

      export default function Login({
        onUser
      }) {
        const styles = useStyles(useTheme());
        // const location = useLocation();
        const [cookies, setCookie, removeCookie] = useCookies([]);
        const {oauth, setOauth} = useContext(Context)
        const config = {
          authorization_endpoint: 'http://localhost:5556/dex/auth',
          token_endpoint: 'http://localhost:5556/dex/token',
          client_id: 'webtech-frontend',
          redirect_uri: 'http://localhost:3000',
          scope: 'openid%20email%20offline_access',
        }
        const params = new URLSearchParams(window.location.search)
        const code = params.get('code')
        // is there a code query parameters in the url
        if(!code){ // no: we are not being redirected from an oauth server
          if(!oauth){
            const codeVerifier = base64URLEncode(crypto.randomBytes(32))
            console.log('set code_verifier', codeVerifier)
            setCookie('code_verifier', codeVerifier)
            return (
              <Redirect codeVerifier={codeVerifier} config={config} css={styles.root} />
            )
          }else{ // yes: user is already logged in, great, is is working
            console.log("thyvia mon bb")
            return (
              <Tokens oauth={oauth} css={styles.root} />
            )
          }
        }else{ // yes: we are coming from an oauth server
          return (
            <LoadToken
            code={code}
            codeVerifier={cookies.code_verifier}
            config={config}
            setOauth={setOauth}
            removeCookie={removeCookie} />
          )
        }
      }
