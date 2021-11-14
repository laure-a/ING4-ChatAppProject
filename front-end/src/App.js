
/** @jsxImportSource @emotion/react */
import {useState} from 'react'
import './App.css';
// Local
import Footer from './Footer'
import Header from './Header'
import Main from './Main'
import Login from './Login'
i//mport MyProvider from './MyProvider'

const styles = {
  root: {
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#565E71',
    padding: '50px',
  },
}

export default function App() {
  const [user, setUser] = useState(null)
  const [drawerMobileVisible, setDrawerMobileVisible] = useState(false)
  const drawerToggleListener = () => {
    setDrawerMobileVisible(!drawerMobileVisible)
  }
  return (
   // <MyProvider> //2 lignes à remettre pour wrap notre app dans le context
    <div className="App" css={styles.root}>
      <Header drawerToggleListener={drawerToggleListener}/>
      {
        user ? <Main drawerMobileVisible={drawerMobileVisible} /> : <Login onUser={setUser} />
      }
      <Footer />
    </div>
   // </MyProvider>
  );
}
