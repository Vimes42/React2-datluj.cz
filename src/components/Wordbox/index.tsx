import React, { useState, useEffect } from 'react';
import './style.css';

interface IWordboxProp {
  word: string;
}

const Wordbox : React.FC<IWordboxProp> = ({ word }) => {
  const [lettersLeft, setLettersLeft] = useState<string>(word);  
  
  useEffect(
    () => {
      const handleKeyUp = (e: KeyboardEvent) => {
          setLettersLeft(
            prev => {
              return e.key === prev[0] ? prev.slice(1) : prev;
            });
      }

      document.addEventListener("keyup", handleKeyUp);

      return () => {
        document.removeEventListener("keyup", handleKeyUp)
      }
    }, [lettersLeft]
  )


  return (
    <div className="wordbox">{lettersLeft}</div>
  );
};

export default Wordbox;

