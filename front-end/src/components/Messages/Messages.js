import React from "react";
import { DateTime } from "luxon"


import "./Messages.css";

const Messages = ({channelname, messages}) => {
     
    return (
        <messages className="Messages">
        <h1>Messages for {channelname}</h1>
        <ul>
          { messages.map( (message, i) => (
            <li key={i} className="Message">
              <p>
                <span>{message.author}</span>
                {' '}
                <span>{(new DateTime(message.creation).toLocaleString(DateTime.DATETIME_MED)).toString()}</span>
              </p>
              <div>
                {
                  message.content
                  .split(/(\n +\n)/)
                  .filter( el => el.trim() )
                  .map( el => <p>{el}</p>)
                }
              </div>
            </li>
          ))}
        </ul> 
       </messages>
    )
}

  export default Messages