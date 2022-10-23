import React, { Fragment, useState } from "react";
import { useDispatch  } from "react-redux";

import classes from "./AllEmails.module.css";
import { emailActions } from "../../store/email-slice";
import Modal from "../../UI/Modal";
import { useParams } from "react-router-dom";


const AllEmails = (props) => {
  const { from, subject, id, body, read } = props.item;

  const [status, setStatus] = useState(false);
  const [reading, setReading] = useState(false);
  const dispatch = useDispatch();
  let email = localStorage.getItem("email").replace(".", "").replace("@", "");

  const params = useParams();

  const readEmailHandler = () => {
    setStatus(true);
    setReading(true);
    dispatch(emailActions.unreadEmails());

    fetch (`https://mail-box-7af32-default-rtdb.firebaseio.com/${email}/${id}.json`, {
      method:'PATCH',
      headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ 
      
      
      read: 'true' ,})
    })
  };

  const closeEmailHandler = () => {
    setReading(false);
  }

  const deleteEmailHandler = () => {
    fetch(
      `https://mail-box-7af32-default-rtdb.firebaseio.com/${email}/${id}.json`,
      {
        method: "DELETE",
      }
    );

    dispatch(emailActions.removeEmail(id));
  };
  

  return (
    <Fragment>
      
      {params.id === 'inbox' && 
      <li className={classes.list} key={Math.random()}>
      {!status && !read && (<span className={classes.dot}></span>)}
        <button className={classes.from} onClick={readEmailHandler}>
          {from} {subject}
        </button>

        <button className={classes.delete}onClick={deleteEmailHandler}> Delete </button>
      
      </li>}
      {reading && (
        <Modal>
          <div className={classes.div}>
          <div>
          <span>From: </span>
          <span> {from} </span>
          </div>

          <div className={classes.subject}>
            <span>Subject: </span>
            <span>{subject}</span>
          </div>

          <div className={classes.body}>
            {body}
          </div>
         

          <div className={classes.close}>
            
            <button onClick={closeEmailHandler}> Close</button>
          </div>

          </div>
        </Modal>
      )}

{params.id === 'sent' && 
      <li className={classes.list} key={Math.random()}>
        <button className={classes.from} onClick={readEmailHandler}>
          {from} 
        </button>

        <button className={classes.delete}onClick={deleteEmailHandler}> Delete </button>
      
      </li>}
      {reading && (
        <Modal>
          <div className={classes.div}>
          <div>
          <span>From: </span>
          <span> {from} </span>
          </div>

          <div className={classes.subject}>
            <span>Subject: </span>
            <span>{subject}</span>
          </div>

          <div className={classes.body}>
            {body}
          </div>
         

          <div className={classes.close}>
            
            <button onClick={closeEmailHandler}> Close</button>
          </div>

          </div>
        </Modal>
      )}
      

    </Fragment>
  );
};

export default AllEmails;
