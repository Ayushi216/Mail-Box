import { createSlice } from "@reduxjs/toolkit";

const emailSlice = createSlice({
  name: "email",
  initialState: {
    emails: [],
  },
  reducers: {
    sentEmail(state, action) {
        const newEmail = action.payload;

        state.emails.push({
            id: newEmail.id,
            from: newEmail.from,
            subject: newEmail.subject,
        })
    }
  }
});

export const emailActions = emailSlice.actions;
export default emailSlice;
