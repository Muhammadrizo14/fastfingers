import './App.css';
import {useEffect, useLayoutEffect, useRef, useState} from 'react';
import React from 'react';
import Popup from './Components/popup';
import {getMultipleRandom} from "./helpers/extraText";
import {useSelector} from "react-redux";
import {Link} from "react-router-dom";
import {formatTime} from "./helpers/util";
import Keyboard from './Components/Keyboard'

function App() {
  const [typeInput, setTypeInput] = useState('')
  const [words, setWords] = useState<any[]>([])
  const [counter, setCounter] = useState(1)
  const [modal, setModal] = useState(false)
  const [capslock, setCapslock] = useState(false)
  const [settingsModal, setSettingsModal] = useState(false)
  const [wpm, setWpm] = useState(0)
  const [passedWords, setPassedWords] = useState(0)
  // time
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const timerRef = useRef<number | any>();
  const input = useRef<any>()
  const [numberOfWords, setNumberOfWords] = useState<number>(9)
  const wordsState = useSelector((state: any) => state.words.value);


  const start = () => {
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
    setIsRunning(false);
    setCounter(0)
  };


  const tryAgain = () => {
    setTime(0);
    setWords([])
    setModal(false)
    getAllWords()
    setCounter(1)
    setPassedWords(0)
    input.current.focus()
  }


  const updateItem = async (itemId: number, status: string) => {
    const updatedItems = words.map(item => {
      if (item.id === itemId) {
        if (words.length !== itemId) {
          words[itemId].status = 'cur'
        }
        return {...item, status}
      } else {
        return item
      }
    });

    setWords(updatedItems);
  };


  const changeWord = (e: any) => {
    setNumberOfWords(e.target.value)
    localStorage.setItem('count', e.target.value.toString())
  }


  const customWords = () => {
    let id = 0;
    let newWords = wordsState.map((word: string) => {
      id++

      return word === wordsState[0] ? {id, word, status: 'cur'} : {id, word, status: ''};
    });
    setWords(newWords)
  }

  const getAllWords = () => {
    if (!wordsState.length) {
      const data = getMultipleRandom(Number(localStorage.getItem('count')))

      let id = 0;
      let newWords = data.map((word: string) => {
        id++

        return word === data[0] ? {id, word, status: 'cur'} : {id, word, status: ''};
      });
      setWords(newWords)
    } else {
      customWords()
    }

  }

  const handleKeyDown = (event: KeyboardEvent) => {
    const capsLockState = event.getModifierState('CapsLock');
    setCapslock(capsLockState);
  };

  useLayoutEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const validateString = (input: string): void => {
    words[counter - 1].status = 'cur'
    for (let i = 0; i < input.length; i++) {
      if ((words[counter - 1].word[i] !== input[i])) {
        words[counter - 1].status = 'err'
      }
    }
  }

  const checkInput = (e: any) => {
    setTypeInput(e.target.value)
    !isRunning && start()
    validateString(e.target.value)

    if (e.target.value.includes(' ')) {
      if (typeInput === words[counter - 1].word) {
        updateItem(counter, 'passed')
          .then(() => {
            setPassedWords(prev => prev + 1)
            setCounter(prev => prev + 1)
          })
      } else {
        updateItem(counter, 'err')
          .then(() => {
            setCounter(prev => prev + 1)
          })
      }
      setTypeInput('')

      if (counter === words.length) {
        reset()
        setModal(true)
      }
    }
  }


  useEffect(() => {
    console.log(passedWords)
    const min = time / 60000;
    console.log(((passedWords / 5) / min))
    setWpm((passedWords / min))
  }, [passedWords]);


  useEffect(() => {
    input.current.focus()
    getAllWords()
    if (!localStorage.getItem('count')) {
      localStorage.setItem('count', '3')
    } else {
      setNumberOfWords(Number(localStorage.getItem('count')))
    }
  }, [])


  return (
    <div>
      <h1 className='title'>
        10FastFingers {capslock && <p>CapsLock on</p>}
      </h1>


      <button className='settingBtn' onClick={() => setSettingsModal(true)}>
        <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd">
          <path
            d="M12 8.666c-1.838 0-3.333 1.496-3.333 3.334s1.495 3.333 3.333 3.333 3.333-1.495 3.333-3.333-1.495-3.334-3.333-3.334m0 7.667c-2.39 0-4.333-1.943-4.333-4.333s1.943-4.334 4.333-4.334 4.333 1.944 4.333 4.334c0 2.39-1.943 4.333-4.333 4.333m-1.193 6.667h2.386c.379-1.104.668-2.451 2.107-3.05 1.496-.617 2.666.196 3.635.672l1.686-1.688c-.508-1.047-1.266-2.199-.669-3.641.567-1.369 1.739-1.663 3.048-2.099v-2.388c-1.235-.421-2.471-.708-3.047-2.098-.572-1.38.057-2.395.669-3.643l-1.687-1.686c-1.117.547-2.221 1.257-3.642.668-1.374-.571-1.656-1.734-2.1-3.047h-2.386c-.424 1.231-.704 2.468-2.099 3.046-.365.153-.718.226-1.077.226-.843 0-1.539-.392-2.566-.893l-1.687 1.686c.574 1.175 1.251 2.237.669 3.643-.571 1.375-1.734 1.654-3.047 2.098v2.388c1.226.418 2.468.705 3.047 2.098.581 1.403-.075 2.432-.669 3.643l1.687 1.687c1.45-.725 2.355-1.204 3.642-.669 1.378.572 1.655 1.738 2.1 3.047m3.094 1h-3.803c-.681-1.918-.785-2.713-1.773-3.123-1.005-.419-1.731.132-3.466.952l-2.689-2.689c.873-1.837 1.367-2.465.953-3.465-.412-.991-1.192-1.087-3.123-1.773v-3.804c1.906-.678 2.712-.782 3.123-1.773.411-.991-.071-1.613-.953-3.466l2.689-2.688c1.741.828 2.466 1.365 3.465.953.992-.412 1.082-1.185 1.775-3.124h3.802c.682 1.918.788 2.714 1.774 3.123 1.001.416 1.709-.119 3.467-.952l2.687 2.688c-.878 1.847-1.361 2.477-.952 3.465.411.992 1.192 1.087 3.123 1.774v3.805c-1.906.677-2.713.782-3.124 1.773-.403.975.044 1.561.954 3.464l-2.688 2.689c-1.728-.82-2.467-1.37-3.456-.955-.988.41-1.08 1.146-1.785 3.126"/>
        </svg>
      </button>

      <div className="text">
        {words.map(word => (
          <p
            className={`${word.status === 'cur' && 'cur'} ${word.status === 'err' && 'err'} ${word.status === 'passed' && 'passed'}`}
            key={word.id}>{word.word}</p>
        ))}
      </div>


      <div className="type">
        <div className='timer'>
          <p>{formatTime(time)}</p>
        </div>
        <input
          value={typeInput}
          type="text"
          ref={input}
          onChange={(e: any) => checkInput(e)}
        />
      </div>


      <div className='keyboard__wrap'>
        <Keyboard/>
      </div>

      <p className='createdby'>created by <a href="https://github.com/Muhammadrizo14">@ubuntuous</a></p>

      {settingsModal && (
        <Popup>
          <>
            <h1>Settings</h1>

            <input
              type="number"
              value={numberOfWords}
              min={1}
              onChange={(e: any) => changeWord(e)}
              placeholder='Length of words'
            />

            <br/>

            <Link to={'/custom'}>custom</Link>

            <button className='close' onClick={() => {
              setSettingsModal(false);
              getAllWords()
            }}>
              <svg clipRule="evenodd" fillRule="evenodd" strokeLinejoin="round" strokeMiterlimit="2" viewBox="0 0 24 24"
                   xmlns="http://www.w3.org/2000/svg">
                <path
                  d="m12 10.93 5.719-5.72c.146-.146.339-.219.531-.219.404 0 .75.324.75.749 0 .193-.073.385-.219.532l-5.72 5.719 5.719 5.719c.147.147.22.339.22.531 0 .427-.349.75-.75.75-.192 0-.385-.073-.531-.219l-5.719-5.719-5.719 5.719c-.146.146-.339.219-.531.219-.401 0-.75-.323-.75-.75 0-.192.073-.384.22-.531l5.719-5.719-5.72-5.719c-.146-.147-.219-.339-.219-.532 0-.425.346-.749.75-.749.192 0 .385.073.531.219z"/>
              </svg>
            </button>
          </>
        </Popup>
      )}

      {modal && (
        <Popup>
          <>
            <h3>WPM: {wpm.toFixed()}</h3>
            <h3>Mistakes: {words.length - passedWords}</h3>
            <h3>Correct: {passedWords}</h3>
            <h3>Time: {formatTime(time)}</h3>
            <button className='tryagain' onClick={() => tryAgain()}>Try Again!</button>
            <button className='close' onClick={() => setModal(false)}>
              <svg clipRule="evenodd" fillRule="evenodd" strokeLinejoin="round" strokeMiterlimit="2" viewBox="0 0 24 24"
                   xmlns="http://www.w3.org/2000/svg">
                <path
                  d="m12 10.93 5.719-5.72c.146-.146.339-.219.531-.219.404 0 .75.324.75.749 0 .193-.073.385-.219.532l-5.72 5.719 5.719 5.719c.147.147.22.339.22.531 0 .427-.349.75-.75.75-.192 0-.385-.073-.531-.219l-5.719-5.719-5.719 5.719c-.146.146-.339.219-.531.219-.401 0-.75-.323-.75-.75 0-.192.073-.384.22-.531l5.719-5.719-5.72-5.719c-.146-.147-.219-.339-.219-.532 0-.425.346-.749.75-.749.192 0 .385.073.531.219z"/>
              </svg>
            </button>
          </>
        </Popup>
      )}
    </div>

  );
}

export default App;
