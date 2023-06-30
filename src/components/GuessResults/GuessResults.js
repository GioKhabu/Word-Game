import React from 'react';


function GuessResults({ finGuess }) {
  return (
    <div className="guess-results">
      {finGuess.map(({id, val}) => {
        return (
          <p className="guess" key={id}>
            {val.map(({status, letter, id1}) => {
              return (
                <span className={`cell ${status}`} key={id1}>
                  {letter}
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
