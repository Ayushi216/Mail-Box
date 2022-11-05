import { createSlice } from "@reduxjs/toolkit";

const emailSlice = createSlice({
  name: "email",
  initialState: {
    recievedEmails: [],
    sentEmails: [],
    unread: 0,
    email:
      localStorage.getItem("email")?.replace(".", "")?.replace("@", "") || ""
  },
  reducers: {
    recievedEmail(state, action) {
      const newEmail = action.payload;

      state.recievedEmails.push({
        id: newEmail.id,
        from: newEmail.from,
        subject: newEmail.subject,
        body: newEmail.body,
        read: newEmail.read,
      });

   
    },

    sentBox(state, action) {
      const sentEmail = action.payload;

      state.sentEmails.push({
        id:sentEmail.id,
        to: sentEmail.to,
        subject: sentEmail.subject,
        body: sentEmail.body,
       
      });



    },
    increaseUnreadEmails(state) {
      state.unread = state.unread + 1 ;
    
    },
    reduceUnreadEmails(state) {
      if(state.unread>0){
        state.unread = state.unread - 1;
      }
      
    },

    removeEmail(state, action) {
      const id = action.payload;
      const existingEmail = state.recievedEmails.find((item) => item.id === id);
      if (existingEmail) {
        state.recievedEmails = state.recievedEmails.filter((item) => item.id !== id);
        
      }
    },

    setEmail(state, action) {
      
      state.email = action.payload;
     
    },

    remove(state) {
      state.email = "";
    },

    resetRecievedEmails(state) {
      state.recievedEmails = [];
      state.unread= 0;
    }
  },
});

export const emailActions = emailSlice.actions;
export default emailSlice;
