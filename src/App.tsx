import { useState } from 'react';
import { Home } from './pages/Home';
import { Training } from './pages/Training';

function App() {
  const [page, setPage] = useState<'home' | 'training'>('home');

  return (
    <>
      {page === 'home' && <Home onStart={() => setPage('training')} />}
      {page === 'training' && <Training onBack={() => setPage('home')} />}
    </>
  );
}

export default App;
