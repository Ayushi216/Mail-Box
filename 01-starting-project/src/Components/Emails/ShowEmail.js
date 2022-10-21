import React from "react";
import { useSelector } from "react-redux";
import AllEmails from "./AllEmails";

const ShowEmails = (props) => {
  const showEmails = useSelector((state) => state.email.emails);
  return (
    <ul>
      {showEmails.map((item) => (
        <AllEmails
        
          item={{
           
            id: item.id,
            from: item.from,
            subject: item.subject,
            
          }}
          
        />
      ))}
    </ul>
  );
};

export default ShowEmails;
