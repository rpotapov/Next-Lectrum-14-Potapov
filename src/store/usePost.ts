import { prop } from 'ramda';
import { createSelector } from 'reselect';
import { usePostStore } from './postStore';

export const selectPostDetails = (postId) =>
  createSelector(prop('posts'), (posts = {}) => posts.data[postId] || {});

export const usePostDetails = (postId) => {
  const usePostSelector = usePostStore;
  return usePostSelector((state) => selectPostDetails(postId)(state));
};