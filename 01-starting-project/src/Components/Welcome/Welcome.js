import React, { Fragment } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { authActions } from "../../store/auth-slice";
import ShowEmails from "../Emails/ShowEmail";
import classes from "./Welcome.module.css";

const Welcome = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  
  const composeHandler = () => {
    console.log("Clicked");
    history.replace("/composeMail");
  };

  const logoutHandler = () => {
    dispatch(authActions.logout());
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
            <p>Inbox</p>
            <p>Unread</p>
            <p>Deleted</p>
          </li>
        </div>
        <div>
        <table className={classes.mail}>
          <th>From</th>
            

          <th className={classes.subject}>Subject</th>

        </table>
        <ShowEmails />
        </div>

        
      </div>
    </Fragment>
  );
};

export default Welcome;
