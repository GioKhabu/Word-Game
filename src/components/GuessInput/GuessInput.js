import React from 'react';
import { NUM_OF_GUESSES_ALLOWED as limit } from '../../constants';

function GuessInput({ submitGuess, guessNum, banner }) {
  const [guess, setGuess] = React.useState('');

  return (
    <form
      className="guess-input-wrapper"
      onSubmit={(event) => {
        event.preventDefault();
        submitGuess(guess);
        setGuess('');
      }}
    >
      <label htmlFor="guess-input">Enter guess:</label>
      <input
        required
        id="guess-input"
        type="text"
        value={guess}
        minLength={5}
        maxLength={5}
        pattern="[a-zA-Z]{5}"
        title="5 letter word"
        disabled={guessNum >= limit || banner.showBanner ? true : false}
        onChange={(event) => {
          const typedGuess = event.target.value.toUpperCase();
          setGuess(typedGuess);
        }}
      ></input>
    </form>
  );
}

export default GuessInput;
