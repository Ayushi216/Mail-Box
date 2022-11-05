import React, { Fragment, useState } from "react";
import Modal from "../../UI/Modal";
import { useParams } from "react-router-dom";
import classes from "./Sent.module.css";

const Sent = (props) => {
  const {  sentbody, sentsubject, to } = props.email;
  const [reading, setReading] = useState(false);

  const readEmailHandler = () => {
    setReading(true);
    console.log("Clicked");
  };

  const closeEmailHandler = () => {
    setReading(false);
  }

  const params = useParams();
  return (
    <Fragment>
      {params.id === "sent" && (
        <li className={classes.list} key={Math.random()}>
          <button className={classes.from} onClick={readEmailHandler}>
            {to} {sentsubject}
          </button>
        </li>
      )}

      {reading && (
        <Modal>
          <div className={classes.div}>
            <div>
              <span>To: </span>
              <span> {to} </span>
            </div>

            <div className={classes.subject}>
              <span>Subject: </span>
              <span>{sentsubject}</span>
            </div>

            <div className={classes.body}>{sentbody}</div>

            <div className={classes.close}>
              <button onClick={closeEmailHandler}> Close</button>
            </div>
          </div>
        </Modal>
      )}
    </Fragment>
  );
};

export default Sent;
