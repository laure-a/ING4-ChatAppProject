
import './App.css';
import Header from './components/Header/Header.js';
import Footer from './components/Footer/Footer.js';
/** @jsx jsx */
import { jsx } from '@emotion/core';
import Main from './components/Main/Main.js';


const styles = {
  root: {
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#565E71',
    marginTop: '0px',
    //padding: '100px',
    
  }
}


export default ({}) => {

  return (
    <app className="App" css={styles.root}>
       <div><Header/></div>
         <Main/> 
      <div> <Footer/> </div>
    </app>
  )
}
