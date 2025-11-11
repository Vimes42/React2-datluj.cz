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
  const [words, setWords] = useState<string[]>(['jahoda']);
  
  const handleFinish = () => {
        const newWord = generateWord(6);
        if (newWord) { setWords([newWord])} //unmount komponenty Wordbox, vygenerování nového slova
      }
  
  

  return (
    <div className="stage">
      <div className="stage__mistakes">Chyb: 0</div>
      <div className="stage__words">
        {words.map((word) => <Wordbox word={word} key={word} onFinish={handleFinish} />)}
      </div>
    </div>
  );
};

export default Stage;
