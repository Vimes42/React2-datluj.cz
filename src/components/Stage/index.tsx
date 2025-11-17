import { useState } from 'react';
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
  const [words, setWords] = useState<(string | null)[]>(['jahoda', 'jablko', 'hruška']);
  const [mistakes, setMistakes] = useState<number>(0);
  const [correctWords, setCorrectWords] = useState<number>(0);
  
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

  return (
    <div className="stage">
      <div className="stage__words">
        {words.map((word, index) =>  <Wordbox word={word} key={word} onFinish={handleFinish} active={index === 0} onMistake={handleMistakes} onCorrect={handleCorrect} /> )}
      </div>
      <div className="stage__stats-row">
        <div className="stage__correctWord">Dokončených slov: {correctWords}</div>
        <div className="stage__mistakes">Počet chyb: {mistakes}</div>
      </div>
    </div>
  );
};

export default Stage;