import React from 'react';
import Counter from './components/Counter';
import { useFetch } from './components/useFetch';
function App() {
  const {data,loading} = useFetch('https://jsonplaceholder.typicode.com/posts');
  if (!data) {
    return <div>{loading}</div>;
  }
  return (
    <div className="App">
      <Counter></Counter>
      <h1>Hooks Demo - Fetching Data</h1>
      {data.map(post => (
        <div key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.body}</p>
        </div>
      ))}
    </div>
  );
}

export default App;