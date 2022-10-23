import React, { Fragment, useRef, useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useHistory } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { emailActions } from "../../store/email-slice";

import { convertToRaw, EditorState } from "draft-js";

import classes from './Compose.module.css'

const EditorComponent = () => {
const [editorState, setEditorState] = useState(() => EditorState.createEmpty());

    const emailInputRef=useRef();
    const subjectInputRef=useRef();
    
    const history = useHistory();

    const dispatch = useDispatch();

    const homeHandler = () => {
        history.replace('./welcome/inbox')
    }

    async function emailSubmitHandler (event) {
        event.preventDefault();

        const email = emailInputRef.current.value;
        const enteredSubject = subjectInputRef.current.value;
        const body = convertToRaw(editorState.getCurrentContent()).blocks[0].text;
        let recieverEmail = email.replace(".", "").replace("@", "");
        let senderEmail = localStorage.getItem('email');

        const objSent = {
          to: email,
          subject: enteredSubject,
          body: body,
          
         }

       const obj = {
        from: senderEmail,
        subject: enteredSubject,
        body: body,
        read: false,
       }

        fetch(
            `https://mail-box-7af32-default-rtdb.firebaseio.com/${recieverEmail}.json`,
            {
              method: "POST",
              body: JSON.stringify({
                ...obj,
              }),
              headers: {
                "Content-type": "application/json",
              },
            }
          ).then(async (res) => {
            const data = await res.json();
            dispatch(
              emailActions.sentEmail({
                id: data.name,
                from: obj.from,
                subject: obj.subject,
                body: obj.body,
                read: obj.read,
                
              })
            )
          })


          fetch(
            `https://mail-box-7af32-default-rtdb.firebaseio.com/sent/${senderEmail}.json`,
            {
              method: "POST",
              body: JSON.stringify({
                ...objSent,
              }),
              headers: {
                "Content-type": "application/json",
              },
            }
          ).then(async (res) => {
            const data = await res.json();
            dispatch(
              emailActions.sentBox({
                id: data.name,
                to: objSent.from,
                subject: objSent.subject,
                body: objSent.body,
               
                
              })
            )
          })

        alert("Sent successfully")  
    }

  return (
    <Fragment>
        <button onClick={homeHandler}>Go to home page</button>
      <form className={classes.form} onSubmit={emailSubmitHandler}>
        <div>
          <label htmlFor="email">To</label>
          <input type="email" id="email" required ref={emailInputRef} />
        </div>
        <div>
          <label htmlFor="subject">Subject</label>
          <input type="text" id="subject" required ref={subjectInputRef} />
        </div>

        <div>
        
          <Editor editorState={editorState} onEditorStateChange={setEditorState}
            toolbarClassName="toolbarClassName"
            wrapperClassName="wrapperClassName"
            editorClassName="editorClassName"
            wrapperStyle={{ width: 800, border: "1px solid black" }}
           
             />
        </div>
        <button>Send</button>
      </form>
    </Fragment>
  );
};

export default EditorComponent;
