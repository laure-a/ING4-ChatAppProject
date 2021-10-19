import React from "react";
import "./MessageForm.css";

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
        <input type="submit" value="Send" className="Send" />
      </form>
    )
  }

  export default MessageForm