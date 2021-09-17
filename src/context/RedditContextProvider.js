import React, { useEffect, useState } from "react";
import { getPostsBySubreddit } from '../services/redditAPI';
import RedditContext from "./RedditContext";

const RedditContextProvider = ({ children }) => {
  const [selectedSubreddit, setSelectedSubreddit] = useState('reactjs');
  const [shouldRefreshSubreddit, setShouldRefreshSubreddit] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [postsBySubreddit, setPostsBySubreddit] = useState({frontend: {}, reactjs: {}});

  const shouldFetchPosts = () => {
    const posts = postsBySubreddit[selectedSubreddit];
    if (!posts.items) return true;
    if (isFetching) return false;
    return shouldRefreshSubreddit;
  }

  const fetchPosts = () => {
    if (!shouldFetchPosts()) return;
    setIsFetching(true);

    getPostsBySubreddit(selectedSubreddit)
      .then(handleSuccessFetch, handleFailedFetch);
  }

  useEffect(() => {
    fetchPosts();
  }, [selectedSubreddit, shouldRefreshSubreddit]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleSuccessFetch = (json) => {
    const lastUpdated = new Date().toUTCString();
    const items = json.data.children.map((child) => child.data);
    setShouldRefreshSubreddit(false);
    setIsFetching(false);
    setPostsBySubreddit({
      ...postsBySubreddit,
      [selectedSubreddit]: {
        items,
        lastUpdated,
      }
    });
  }

  const handleFailedFetch = (error) => {
    setShouldRefreshSubreddit(false);
    setIsFetching(false);
    setPostsBySubreddit({ error: error.message, items: [] })
  }

  const context = {
    setSelectedSubreddit,
    fetchPosts,
    selectedSubreddit,
    isFetching,
    availableSubreddits: Object.keys(postsBySubreddit),
    posts: postsBySubreddit[selectedSubreddit],
    setShouldRefreshSubreddit,
  }

  return (
    <RedditContext.Provider value={ context }>
      { children }
    </RedditContext.Provider>
  );
}

export default RedditContextProvider;
