import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	value: [],
};

export const likedTweetsSlice = createSlice({
	name: 'likedTweets',
	initialState,
	reducers: {
		addLikedTweet: (state, action) => {
			state.value.push(action.payload);
		},
		removeLikedTweet: (state, action) => {
			state.value = state.value.filter(tweet => tweet.date !== action.payload.date);
		},
	},
});

export const { addLikedTweet, removeLikedTweet } = likedTweetsSlice.actions;
export default likedTweetsSlice.reducer;
