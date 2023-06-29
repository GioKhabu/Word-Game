import React from 'react';

import { sample, range } from '../../utils';
import { WORDS } from '../../data';
import { NUM_OF_GUESSES_ALLOWED as limit } from '../../constants';
import { checkGuess } from '../../game-helpers';

import GuessInput from '../GuessInput';
import GuessResults from '../GuessResults';
import Keys from '../Keys';

// Pick a random word on every pageload.
let answer = sample(WORDS);
// To make debugging easier, we'll log the solution in the console.
console.info({ answer });

function Game() {
  const rows = range(0, limit, 1).map((item) => {
    return { val: [], id: crypto.randomUUID() };
  });
  const squares = range(0, 5, 1).map((item) => {
    return { letter: '', status: '', id1: crypto.randomUUID() };
  });

  const combined = [...rows];
  for (let i = 0; i < combined.length; i++) {
    combined[i].val = [...squares];
  }

  const [finGuess, setFinGuess] = React.useState(combined);
  const [guessNum, setGuessNum] = React.useState(0);
  const [guess, setGuess] = React.useState('');
  const [banner, setBanner] = React.useState({ showBanner: false, status: false });
  const [keys, setKeys] = React.useState([]);

  function refresh() {
    setFinGuess(combined);
    setGuessNum(0);
    setGuess('');
    setBanner({ showBanner: false, status: false });
    setKeys([]);
    answer = sample(WORDS);
    console.info({ answer });
  }

  function submitGuess() {
    if (guess === '' || guessNum >= limit) {
      return;
    }
    const newGuesses = [...finGuess];
    const checkedAnswer = checkGuess(guess, answer).map((item) => {
      return { ...item, id1: crypto.randomUUID() };
    });
    newGuesses[guessNum].val = [...checkedAnswer];
    setFinGuess(newGuesses);
    setGuessNum(guessNum + 1);
    setGuess('');
  }

  React.useEffect(() => {
    const checkAnswers = finGuess[guessNum === 0 ? 0 : guessNum - 1].val.every((item) => {
      return item.status === 'correct';
    });
    if (checkAnswers) {
      const newBanner = { showBanner: true, status: true };
      setBanner(newBanner);
    }
    if (guessNum >= 6 && !checkAnswers) {
      const newBanner = { showBanner: true, status: false };
      setBanner(newBanner);
    }
  }, [guessNum, finGuess]);

  return (
    <>
      <GuessResults finGuess={finGuess} />
      <GuessInput
        guessNum={guessNum}
        guess={guess}
        setGuess={setGuess}
        submitGuess={submitGuess}
        banner={banner}
      />
      <Keys keys={keys} setKeys={setKeys} finGuess={finGuess} guessNum={guessNum} />
      {banner.showBanner && banner.status && (
        <div className="happy banner">
          <p>
            <strong>Congratulations!</strong> Got it in <strong>{`${guessNum} guesses`}</strong>.
          </p>
          <button className="refresh" onClick={refresh}>
            Refresh
          </button>
        </div>
      )}
      {banner.showBanner && !banner.status && (
        <div className="sad banner">
          <p>
            Sorry, the correct answer is <strong>{answer}</strong>.
          </p>
          <button className="refresh" onClick={refresh}>
            Refresh
          </button>
        </div>
      )}
    </>
  );
}

export default Game;
