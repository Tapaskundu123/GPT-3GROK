import { createSlice } from '@reduxjs/toolkit'

const HomeSlice = createSlice({
  name: 'Home',

  initialState: {

    displayQuestion:'',
    isHouseActive: false,
  },

  reducers: {
    questionFromSidebar(state, action) {
        state.displayQuestion=action.payload;
    },
    
    GoToNewChat(state,action) {
      state.isHouseActive= action.payload;
    },
  },
})

export const { questionFromSidebar , GoToNewChat } = HomeSlice.actions
export default HomeSlice.reducer