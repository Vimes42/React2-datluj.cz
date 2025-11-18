import React, { useState, useEffect } from 'react';
import './style.css';

interface IWordboxProp {
  word: string | null;
  onFinish: () => void;
  active: boolean;
  onMistake: () => void;
  onCorrect: ()=> void;
}

const Wordbox : React.FC<IWordboxProp> = ({ word, onFinish, active, onMistake, onCorrect }) => {
  const [lettersLeft, setLettersLeft] = useState<string>(word === null ? '' : word); 
  const [mistake, setMistake] = useState<boolean>(false);
  

  useEffect(
    () => {
      if (!active) return
      
      const handleKeyUp = (e: KeyboardEvent) => {
          if (e.key.length !== 1) return;

          if (lettersLeft.length === 0) return;

          const isError = e.key !== lettersLeft[0];

          setMistake(isError);

           if (isError) {
              onMistake();
              return;
            }

          setLettersLeft(lettersLeft.slice(1));
            };
  
          document.addEventListener("keyup", handleKeyUp);

          return () => { document.removeEventListener("keyup", handleKeyUp) }
      }, [active, lettersLeft, onMistake]
  )
   

    useEffect(() => {
        if (lettersLeft.length === 0 && word !== null && word.length > 0) {
            onCorrect();
            onFinish();
        }
    }, [lettersLeft, word, onFinish, onCorrect]); 

    

  return (
    <div className={ mistake ? "wordbox wordbox--mistake" : "wordbox"}>{lettersLeft}</div>
  );
};



export default Wordbox;
