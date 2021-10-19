import Channel from "../Channel/Channel.js";
import Channels from "../Channels/Channels.js";
import React from "react";
import "./Main.css";

const Main = ({}) => {
    
    return (
      <main className="Main">
          <Channels/>
          <Channel/>
      </main>
    )
  }  
  export default Main