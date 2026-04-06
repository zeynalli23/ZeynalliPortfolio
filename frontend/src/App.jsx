import React, { useState, useEffect } from 'react';
import Hero from './components/All';
import Loading from './components/Loading';
import './App.css';

function App() {
  const [loading, setLoading] = useState(true);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    const showTimer = setTimeout(() => setExiting(true), 2500);
    const hideTimer = setTimeout(() => setLoading(false), 3800);
    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  return (
    <div className="App">
      {loading && <Loading exiting={exiting} />}
      <Hero />
    </div>
  );
}

export default App;
