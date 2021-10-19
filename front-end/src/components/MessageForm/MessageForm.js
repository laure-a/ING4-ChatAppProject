import React from "react";
import "./MessageForm.css";
import image from "./img.png";

const MessageForm = ({
    addMessage
  }) => {
    const onSubmit = (e) => {
      e.preventDefault()
      const data = new FormData(e.target)
      addMessage({
        content: data.get('content'),
        author: 'laure&thomas',
        creation: Date.now(),
      })
      e.target.elements.content.value = ''
    } 
    return (
      <form className="Form"  onSubmit={onSubmit}>
        <input type="input" name="content" className="Content" />
        
        <button><img src={image} width="20px" height="20px"/></button>
      </form>
    )
  }

  export default MessageForm

 /* <input type="submit" name="Send" className="Send" />*/