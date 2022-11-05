import React from "react";
import { useSelector } from "react-redux";
import Sent from "./Sent";

const SentEmails = (props) => {


  const sentemail = useSelector((state) => state.email.sentEmails);

  return (
    <ul>
      {sentemail.map((email) => (
        <Sent
          email={{
            id: email.id,
            sentbody: email.body,
            to: email.to,
            sentsubject: email.subject,

          }}
        />
      ))}
    </ul>
  );
};

export default SentEmails;
