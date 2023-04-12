import { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
      <hr />
      <Outlet />
    </div>
  );
}

export default App;
