import React from "react";
import { useSelector } from "react-redux";
import AllEmails from "./AllEmails";

const ShowEmails = (props) => {
  const showEmails = useSelector((state) => state.email.recievedEmails);
  return (
    <ul>
      {showEmails.map((item) => (
        <AllEmails
          item={{
            id: item.id,
            body: item.body,
            from: item.from,
            subject: item.subject,
            read: item.read,
          }}
        />
      ))}
    </ul>
  );
};

export default ShowEmails;
