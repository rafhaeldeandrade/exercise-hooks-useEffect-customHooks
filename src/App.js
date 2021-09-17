import React, { useContext } from 'react';
import Posts from './components/Posts';
import Selector from './components/Selector';
import RedditContext from './context/RedditContext';


const App = () => {
  const { isFetching, posts } = useContext(RedditContext);

  return (
    <>
      {console.log(posts)}
      <Selector />
      
      {isFetching && <h2>Loading...</h2>}
      {!isFetching && posts.items && <Posts /> }
    </>
  );
}

export default App;
