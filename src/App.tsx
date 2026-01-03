import { useState } from 'react';
import Stage from './components/Stage';
import { LandingPage } from "./components/LandingPage";



const App: React.FC = () => {
  const [start, setStart] = useState<boolean>(false)

  const handleClick = () => {
    setStart(true);
  }

  return (
    <div className="container">
      <h1>Datluj!</h1>
      { start ? <Stage /> : <LandingPage handleClick={handleClick} />}
    </div>
  );
};

export default App;