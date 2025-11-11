import React, { useState, useEffect } from 'react';
import './style.css';

interface IWordboxProp {
  word: string;
  onFinish: () => void;
  active: boolean;
}

const Wordbox : React.FC<IWordboxProp> = ({ word, onFinish, active }) => {
  const [lettersLeft, setLettersLeft] = useState<string>(word); 
  const [mistake, setMistake] = useState<boolean>(false);
  
  useEffect(
    () => {
      const handleKeyUp = (e: KeyboardEvent) => {
          setLettersLeft(
            x => {
              if ( x.length !== 1 ){
                setMistake(() => {
                  if (e.key !== x[0]) 
                    {return true} 
                    return false 
                });
                return e.key === x[0] ? x.slice(1) : x;
              
              } onFinish(); 
            });
      }
       
      if (active) {
            document.addEventListener("keyup", handleKeyUp);

            return () => {
              document.removeEventListener("keyup", handleKeyUp)
            }
      }
      
    }, [lettersLeft, active]
  )


  return (
    <div className={ mistake ? "wordbox wordbox--mistake" : "wordbox"}>{lettersLeft}</div>
  );
};

export default Wordbox;

