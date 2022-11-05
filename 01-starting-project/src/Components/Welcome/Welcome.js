import React, { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { authActions } from "../../store/auth-slice";
import { emailActions } from "../../store/email-slice";
import { useParams } from "react-router-dom";

import ShowEmails from "../Emails/ShowEmail";
import classes from "./Welcome.module.css";
import SentEmails from "../Emails/SentEmail";
//import SentEmails from "../Emails/SentEmail";

const Welcome = () => {

  const params = useParams();
  const history = useHistory();
  const dispatch = useDispatch();

  const unreadCount = useSelector((state) => state.email.unread)

  
  const composeHandler = () => {
    console.log("Clicked");
    history.replace("/composeMail");
  };

  const logoutHandler = () => {
    dispatch(authActions.logout());
    dispatch(emailActions.remove());
    history.replace('/')
    
  }
  return (
    <Fragment>
      <header className={classes.header}>
        <h1> MailBox.com</h1>
        <button onClick={logoutHandler}>Logout</button>
      </header>
      <div className={classes.div}>
        <div>
          <button onClick={composeHandler}>Compose Mail</button>
          <li className={classes.list}>
            <Link to={"/welcome/inbox"}>
            <p>Inbox ({unreadCount} unread Emails)</p>
            </Link>
            <Link to={"/welcome/sent"}>
            <p>Sent</p>
            </Link>
            <p>Deleted</p>
          </li>
        </div>
        <div>
        <table className={classes.mail}>
          <th>From</th>
            

          <th className={classes.subject}>Subject</th>

        </table>
        {params.id === 'inbox' && <ShowEmails />}
        {params.id === 'sent' && <SentEmails />}
        
        
        </div>

        
      </div>
    </Fragment>
  );
};

export default Welcome;
