import React from "react";
import classes from './AllEmails.module.css'
//import { emailActions } from "../../store/email-slice";

const AllEmails = (props) => {
    const { from, subject, id } = props.item;

    return (
        <li className={classes.list} key={Math.random()}>
          <button className={classes.from}>{from} {subject}</button>
         
          
        </li>
      );

}

export default AllEmails;
