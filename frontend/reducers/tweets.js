import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	value: [],
};

export const tweetsSlice = createSlice({
	name: 'tweets',
	initialState,
	reducers: {
		addTweet: (state, action) => {
			state.value.push(action.payload);
      state.value.sort((a,b)=> a.date === b.date ? 0 : a.date ? -1 : 1);
		},
		removeTweet: (state, action) => {
			//state.value = state.value.filter(tweet => task.name !== action.payload.name);
		},
	},
});

export const { addTweet, removeTweet } = tweetsSlice.actions;
export default tweetsSlice.reducer;
