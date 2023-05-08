import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	value: [],
};

export const tweetsSlice = createSlice({
	name: 'tweets',
	initialState,
	reducers: {
    importTweets: (state, action) => {
      state.value = action.payload;
    },
    addTweet: (state, action) => {
      state.value.push(action.payload);
    },
		removeTweet: (state, action) => {
			state.value = state.value.filter(tweet => tweet.id !== action.payload);
		},
	},
});

export const { addTweet, importTweets, removeTweet } = tweetsSlice.actions;
export default tweetsSlice.reducer;
