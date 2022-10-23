import { createSlice } from "@reduxjs/toolkit";

const emailSlice = createSlice({
  name: "email",
  initialState: {
    emails: [],
    sentEmails: [],
    unread: 0,
    email:
      localStorage.getItem("email")?.replace(".", "")?.replace("@", "") || ""
  },
  reducers: {
    sentEmail(state, action) {
      const newEmail = action.payload;

      state.emails.push({
        id: newEmail.id,
        from: newEmail.from,
        subject: newEmail.subject,
        body: newEmail.body,
        read: newEmail.read,
      });
      state.unread = state.unread + 1;
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

    unreadEmails(state) {
      if(state.unread>0){
        state.unread = state.unread - 1;
      }
      
    },

    removeEmail(state, action) {
      const id = action.payload;
      const existingEmail = state.emails.find((item) => item.id === id);
      if (existingEmail) {
        state.emails = state.emails.filter((item) => item.id !== id);
        
      }
    },

    setEmail(state, action) {
      
      state.email = action.payload;
     
    },

    remove(state) {
      state.email = "";
    }
  },
});

export const emailActions = emailSlice.actions;
export default emailSlice;
