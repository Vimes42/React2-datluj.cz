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
      const handleKeyUp = (e: KeyboardEvent) => {
          setLettersLeft(
            x => {
              const isError = e.key !== x[0] && x.length > 0;

              setMistake(() => {
                  if (e.key !== x[0]) 
                      {return true} 
                      return false 
              });

              if(isError) {
                  setTimeout(() => {
                    onMistake(); 
                  }, 0);
                } 
                return e.key === x[0] ? x.slice(1) : x;
              
              } 
            );
      };

      if (active) {
            document.addEventListener("keyup", handleKeyUp);

            return () => {
              document.removeEventListener("keyup", handleKeyUp)
            }
      }
      
    }, [active]
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
