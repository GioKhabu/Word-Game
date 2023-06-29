import React from "react";
import { KEYS } from "../../keys";
function Keys({ keys, setKeys, finGuess, guessNum }) {
  React.useEffect(() => {
    const keyBoard = KEYS.map((item) => {
      return { letter: item.toUpperCase(), status: '', id1: crypto.randomUUID() };
    });

    const newKeys = [...keyBoard];
    const newarray = newKeys.map((e) => {
      const matched = finGuess[guessNum > 0 ? guessNum - 1 : guessNum].val.find((item) => {
        return e.letter === item.letter;
      });
      return matched && matched.letter ? { ...matched } : e;
    }
    );
    setKeys(newarray);
  }, [setKeys, finGuess, guessNum]);
  return (
    <div className="key-wrapper">
      {keys.map((item) => {
        return (
          <div key={item.id1} className={`key ${item.status ? item.status : ''}`}>
            {item.letter}
          </div>
        );
      })}
    </div>
  );
}

export default Keys;
