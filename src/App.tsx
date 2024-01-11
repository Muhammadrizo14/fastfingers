import axios from 'axios';
import './App.css';
import { useEffect, useRef, useState } from 'react';

function App() {
  const [typeInput, setTypeInput] = useState('')
  const [words, setWords] = useState<string[]>([])
  const [counter, setCounter] = useState(0)
  const [modal, setModal] = useState(true)
  const [wpm, setWpm] = useState(0)

  // time
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const timerRef = useRef<number | any>();

  const startStop = () => {
    console.log(time);

    if (isRunning) {
      clearInterval(timerRef.current);
    } else {
      timerRef.current = setInterval(() => {
        setTime((prevTime) => prevTime + 10); // Update every 10 milliseconds
      }, 10);
    }
    setIsRunning(!isRunning);
  };

  const reset = () => {
    clearInterval(timerRef.current);
    setTime(0);
    setIsRunning(false);
  };

  const formatTime = (milliseconds: any) => {
    const minutes = Math.floor((milliseconds % (60 * 60 * 1000)) / (60 * 1000));
    const seconds = Math.floor((milliseconds % (60 * 1000)) / 1000);
    const ms = milliseconds % 1000;

    const pad = (value: any) => (value < 10 ? `0${value}` : value);

    return `${pad(minutes)}:${pad(seconds)}.${pad(ms)}`;
  };


  const getAllWords = () => {
    axios
      .get('https://random-word-api.herokuapp.com/word?number=3&length=3')
      .then(res => {
        setWords(res.data)
      })
      .catch(err => {
        console.log(err);
      })
  }


  const checkInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTypeInput(e.target.value)
    startStop()

    if (e.target.value.includes(' ')) {
      if (typeInput === document.querySelector(`.word${counter}`)?.innerHTML) {
        document.querySelector(`.word${counter}`)?.classList.add('passed')
        document.querySelector(`.word${counter + 1}`)?.classList.add('cur')
        document.querySelector(`.word${counter}`)?.classList.remove('cur')

        setCounter(prev => prev + 1)
      } else {
        document.querySelector(`.word${counter}`)?.classList.add('err')
        document.querySelector(`.word${counter}`)?.classList.remove('cur')

        document.querySelector(`.word${counter + 1}`)?.classList.add('cur')

        setCounter(prev => prev + 1)
      }


      setTypeInput('')

      if (counter + 1 === words.length) {
        startStop()

        const minutes = time / (1000 * 60);


        console.log(Math.floor(time / 60000));


        console.log(`Wpm ${(words.length / minutes).toFixed(2)}`);


        setWpm(words.length / minutes)
        console.log(`stop`);
      }
    }
  }



  useEffect(() => {
    getAllWords()
  }, [])


  return (
    <div>
      <h1 className='title'>
        10FastFingers
      </h1>


      {modal && (
        <div className='popup'>
          <div className='popupContent'>
            <h1>WPM</h1>
            <h3>{wpm.toFixed(2)}</h3>
          </div>
        </div>
      )}


      <div className="text">
        {words.map((word, index) => (
          // <p ref={el => (wordsOnParagraph.current.push(el), console.log(1))} key={word}>{word}</p>
          <p className={`word${index.toString()} wordtype`} key={word}>{word}</p>
        ))}
      </div>

      <div className="type">
        <div className='timer'>
          <p>{formatTime(time)}</p>
        </div>
        <input
          value={typeInput}
          type="text"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => checkInput(e)}
        />
        {/* <button className='repeat' onClick={() => getAllWords()} >
          <svg clipRule="evenodd" fillRule="evenodd" strokeLinejoin="round" strokeMiterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m11.998 2.001c5.517 0 9.997 4.48 9.997 9.997 0 5.518-4.48 9.998-9.997 9.998-5.518 0-9.998-4.48-9.998-9.998 0-5.517 4.48-9.997 9.998-9.997zm-4.496 6.028-.002-.825c0-.414-.336-.75-.75-.75s-.75.336-.75.75v3.048c0 .414.336.75.75.75h3.022c.414 0 .75-.336.75-.75s-.336-.756-.75-.756h-1.512c.808-1.205 2.182-1.998 3.74-1.998 2.483 0 4.5 2.016 4.5 4.5 0 2.483-2.017 4.5-4.5 4.5-1.956 0-3.623-1.251-4.242-2.997-.106-.299-.389-.499-.707-.499-.518 0-.88.513-.707 1.001.825 2.327 3.048 3.995 5.656 3.995 3.312 0 6-2.689 6-6 0-3.312-2.688-6-6-6-1.79 0-3.399.786-4.498 2.031z" fillRule="nonzero" /></svg>
        </button> */}
      </div>
    </div>
  );
}

export default App;
