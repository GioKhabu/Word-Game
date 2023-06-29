import React from 'react';


function GuessResults({ finGuess }) {
  return (
    <div className="guess-results">
      {finGuess.map((item, index) => {
        return (
          <p className="guess" key={item.id}>
            {item.val.map((lett, index) => {
              return (
                <span className={`cell ${lett.status}`} key={lett.id1}>
                  {lett.letter}
                </span>
              );
            })}
          </p>
        );
      })}
    </div>
  );
}

export default GuessResults;
