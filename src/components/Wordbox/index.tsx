import React, { useState, useEffect } from 'react';
import './style.css';

interface IWordboxProp {
  word: string;
  onFinish: () => void;
  active: boolean;
  onMistake: () => void;
}

const Wordbox : React.FC<IWordboxProp> = ({ word, onFinish, active, onMistake }) => {
  const [lettersLeft, setLettersLeft] = useState<string>(word); 
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
                };

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
     /* useEffect(() => {
      onMistake(mistakeCount)
    }, [mistakeCount]); */

    useEffect(() => {
        if (lettersLeft.length === 0 && word.length > 0) {
            onFinish();
        }
    }, [lettersLeft, word, onFinish]); // Spustí se, když se lettersLeft změní na prázdný řetězec

    

  return (
    <div className={ mistake ? "wordbox wordbox--mistake" : "wordbox"}>{lettersLeft}</div>
  );
};



export default Wordbox;

/* import React, { useState, useEffect } from 'react';
import './style.css';

interface IWordboxProp {
  word: string | null;
  onFinish: () => void;
  active: boolean;
  onMistake: ()=> void;
}

const Wordbox : React.FC<IWordboxProp> = ({ word, onFinish, active, onMistake }) => {
  const [lettersLeft, setLettersLeft] = useState<(string | null)>(word); 
  const [mistake, setMistake] = useState<boolean>(false);
  
  useEffect(
    () => {
      const handleKeyUp = (e: KeyboardEvent) => {
        if (!active) return;

          setLettersLeft(x => {
                const correct = e.key === x![0]; //true, false
                setMistake(!correct); //nastavení zbarvení do červena, pokud není stisknuta správná klávesa
                
                if (!correct) {
                  onMistake(); // spustí počítání chyby, jen když je chyba
                  console.log("onMistake called from", word);
                  return x; //lettersleft zatím zůstává stejné
                }
                const next = x!.slice(1); // odebrání prvního písmena

                if (next.length === 0) {
                  onFinish();
                }

                console.log("keydown handler in", word, "key=", e.key);
                return next;
              });
      }
       
      if (active) {
            document.addEventListener("keyup", handleKeyUp);
            console.log("mount listener for", word);

            return () => {
              document.removeEventListener("keyup", handleKeyUp)
              console.log("unmount listener for", word);
            }
      }
      
    }, [active, word]
  )


  return (
    <div className={ mistake ? "wordbox wordbox--mistake" : "wordbox"}>{lettersLeft}</div>
  );
};

export default Wordbox;

 */