import React, { useState, useEffect } from 'react';
import './style.css';

interface IWordboxProp {
  word: string;
  onFinish: () => void;
}

const Wordbox : React.FC<IWordboxProp> = ({ word, onFinish }) => {
  const [lettersLeft, setLettersLeft] = useState<string>(word);  
  
  useEffect(
    () => {
      const handleKeyUp = (e: KeyboardEvent) => {
          setLettersLeft(
            x => {
              if ( x.length !== 1 ){
                return e.key === x[0] ? x.slice(1) : x;
              } onFinish(); 
                
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

