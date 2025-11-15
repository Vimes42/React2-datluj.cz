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
  const [words, setWords] = useState<string[]>(['jahoda', 'jablko', 'hruška']);
  const [mistakes, setMistakes] = useState<number>(0);
  
  const handleFinish = () => {
        const oldArray = [...words];
        //const workingArray = oldArray.splice(1)
        const newArray = [...oldArray.splice(1), generateWord(6)]
        if (newArray) { setWords(newArray)} //unmount komponenty Wordbox, vygenerování nového slova
      }
  
  const handleMistakes = () => {
      setMistakes(x => x + 1);
    }

  return (
    <div className="stage">
      <div className="stage__mistakes">Chyb: {mistakes}</div>
      <div className="stage__words">
        {words.map((word, index) =>  <Wordbox word={word} key={word} onFinish={handleFinish} active={index === 0} onMistake={handleMistakes}/> )}
      </div>
    </div>
  );
};

export default Stage;

/* import { useState } from 'react';
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
  const [words, setWords] = useState<string | null[]>(['jahoda', 'jablko', 'hruška']);
  const [mistakes, setMistakes] = useState<number>(0)
  
  const handleFinish = () => {
        const oldArray = [...words];
        const newArray: (string | null)[] = [...oldArray.splice(1), generateWord(6)]
        if (newArray) { setWords(newArray)} //unmount komponenty Wordbox, vygenerování nového slova
      }
  
  const handleMistakes = () => {
    setMistakes(x => x + 1)
  }

  return (
    <div className="stage">
      <div className="stage__mistakes">Chyb: {mistakes}</div>
      <div className="stage__words">
        {words.map((word, index) =>  <Wordbox word={word} key={index} onFinish={handleFinish} active={index === 0} onMistake={handleMistakes} /> )}
      </div>
    </div>
  );
};

export default Stage;
 */