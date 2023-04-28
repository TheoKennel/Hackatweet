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
		removeTweet: (state, action) => {
			state.value = state.value.filter(tweet => tweet.content !== action.payload.content);
		},
	},
});

export const { addLikedTweet, removeLikedTweet } = likedTweetsSlice.actions;
export default likedTweetsSlice.reducer;
