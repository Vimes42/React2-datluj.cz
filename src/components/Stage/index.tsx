import { useState, useEffect } from 'react';
import Wordbox from '../Wordbox';
import wordList from '../../word-list';
import './style.css';




const generateWord = (size: number): string | null => {
  const sizeIndex = size === undefined
    ? Math.floor(Math.random() * wordList.length)
    : size - 3;
  
  if (sizeIndex < 0 || sizeIndex >= wordList.length) {
    return null;
  }
  
  const words = wordList[sizeIndex];
  const wordIndex = Math.floor(Math.random() * words.length);
  return words[wordIndex];
};

const Stage = () => {
  const [status, setStatus] = useState<string>("countdown");
  const [timeToStart, setTimeToStart] = useState<number>(3);
  const [timeLeft, setTimeLeft] = useState<number>(60);
  
  const [words, setWords] = useState<(string | null)[]>(['jahoda', 'jablko', 'hruška']);
  const [mistakes, setMistakes] = useState<number>(0);
  const [correctWords, setCorrectWords] = useState<number>(0);
  
  useEffect(() => {
    if ( status === "countdown" && timeToStart > 0 ){
      const timerToStart = setTimeout(() => setTimeToStart(prev => prev - 1), 1000);
      return () => clearTimeout(timerToStart);

    } else if ( status === "countdown" && timeToStart === 0 ){
      setStatus("playing");

    } else if (status === "playing" && timeLeft > 0){ 

      const gameTimer = setTimeout(() => setTimeLeft(prev => prev - 1), 1000);
      return () => clearTimeout(gameTimer);

    } else if (status === "playing" && timeLeft === 0){
      setStatus("finished");
    }
    
  }, 
  [status, timeToStart, timeLeft]);


  const handleFinish = () => {
        const oldArray = [...words];
        const newArray: (string | null)[] = [...oldArray.slice(1), generateWord(6)]
        setWords(newArray) //unmount komponenty Wordbox, vygenerování nového slova
      }
  
  const handleMistakes = () => {
      setMistakes(x => x + 1);
    }

  const handleCorrect = () => {
    setCorrectWords(x => x + 1);
  }

  const handleRestart = () => {
  setMistakes(0);
  setCorrectWords(0);
  
  setTimeToStart(3);
  setTimeLeft(60);
  
  setWords(['jahoda', 'jablko', 'hruška']); 
  
  setStatus("countdown");
};
  

  return (
  <div className="stage">
    <div className="stage__header">
  <div className={`stage__timer ${timeLeft <= 10 ? 'timer--low' : ''}`}>
    {timeLeft}s
  </div>

  <div className="stage__score">
    <div className="score-badge score-badge--correct">
      <span className="score-badge__label">Slova</span>
      <span className="score-badge__value">{correctWords}</span>
    </div>
    
    <div className="score-badge score-badge--mistakes">
      <span className="score-badge__label">Chyby</span>
      <span className="score-badge__value">{mistakes}</span>
    </div>
  </div>
</div>

    <div className={`stage__content ${status !== 'playing' ? 'stage--blur' : ''}`}>
      <div className="stage__words">
        {words.map((word, index) => (
          <Wordbox key={word} word={word} active={index === 0} status={status} 
            onFinish={handleFinish} onMistake={handleMistakes} onCorrect={handleCorrect} />
        ))}
      </div>
    </div>

    {status === 'countdown' && (
      <div className="stage__overlay stage__overlay--countdown">
        <div key={timeToStart} className="countdown-number">
          {timeToStart > 0 ? timeToStart : 'START!'}
        </div>
      </div>
    )}

    {status === 'finished' && (
      <div className="stage__overlay stage__overlay--finished">
        <h2>Konec hry! 🏁</h2>
        <div className="results">
          <p>Napsal jsi <strong>{correctWords}</strong> slov</p>
          <p>Udělal jsi <strong>{mistakes}</strong> chyb</p>
        </div>
        <button className="btn_start" onClick={handleRestart}>Zkusit znovu</button>
      </div>
    )}
  </div>
);
};

export default Stage;