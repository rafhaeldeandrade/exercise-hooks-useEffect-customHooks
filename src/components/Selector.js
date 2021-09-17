import React, { useContext } from 'react';
import RedditContext from '../context/RedditContext';

const renderOptions = (options) => (
  options.map((option) => (
    <option
      value={option}
      key={option}
    >
      {option}
    </option>
  ))
);

const Selector = () => {
  const {
    selectedSubreddit,
    availableSubreddits,
    setSelectedSubreddit,
    setShouldRefreshSubreddit,
  } = useContext(RedditContext);

  return (
    <span>
      <h1>{`Selected: ${selectedSubreddit}`}</h1>
      <select
        onChange={(e) => setSelectedSubreddit(e.target.value)}
        value={selectedSubreddit}
      >
        {renderOptions(availableSubreddits)}
      </select>
      <button
        type='button'
        onClick={() => setShouldRefreshSubreddit(true)}
      >
        Refresh
      </button>
    </span>
  )
};

export default Selector;