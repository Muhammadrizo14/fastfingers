import axios from 'axios';
import './App.css';
import { useEffect, useRef, useState } from 'react';
import { log } from 'console';

function App() {
  const [typeInput, setTypeInput] = useState('')
  const [words, setWords] = useState<string[]>([])
  const [counter, setCounter] = useState(0)
  const wordsOnParagraph = useRef<any>([])

  const getAllWords = () => {
    axios
      .get('https://random-word-api.herokuapp.com/word?number=20')
      .then(res => {
        setWords(res.data)
      })
      .catch(err => {
        console.log(err);
      })
  }


  const checkInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTypeInput(e.target.value)
    console.log(wordsOnParagraph.current.length);

    console.log(wordsOnParagraph);


    if (e.target.value.includes(' ')) {
      if (typeInput === wordsOnParagraph.current[counter].innerText) {
        wordsOnParagraph.current[counter].classList.add('passed')
        wordsOnParagraph.current[counter + 1].classList.add('cur')
        wordsOnParagraph.current[counter].classList.remove('cur')

        setCounter(prev => prev + 1)
      } else {
        wordsOnParagraph.current[counter].classList.add('err')
        wordsOnParagraph.current[counter].classList.remove('cur')
        counter === wordsOnParagraph.current.length && console.log(1);

        wordsOnParagraph.current[counter + 1].classList.add('cur')

        setCounter(prev => prev + 1)
      }


      setTypeInput('')
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

      <div className="text">
        {words.map(word => (
          <p ref={el => (wordsOnParagraph.current.push(el), console.log(1))} key={word}>{word}</p>
        ))}
      </div>

      <div className="type">
        <input
          value={typeInput}
          type="text"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => checkInput(e)}
        />
        {/* onClick={() => getAllWords()} */}
        <button className='repeat' >
          <svg clipRule="evenodd" fillRule="evenodd" strokeLinejoin="round" strokeMiterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m11.998 2.001c5.517 0 9.997 4.48 9.997 9.997 0 5.518-4.48 9.998-9.997 9.998-5.518 0-9.998-4.48-9.998-9.998 0-5.517 4.48-9.997 9.998-9.997zm-4.496 6.028-.002-.825c0-.414-.336-.75-.75-.75s-.75.336-.75.75v3.048c0 .414.336.75.75.75h3.022c.414 0 .75-.336.75-.75s-.336-.756-.75-.756h-1.512c.808-1.205 2.182-1.998 3.74-1.998 2.483 0 4.5 2.016 4.5 4.5 0 2.483-2.017 4.5-4.5 4.5-1.956 0-3.623-1.251-4.242-2.997-.106-.299-.389-.499-.707-.499-.518 0-.88.513-.707 1.001.825 2.327 3.048 3.995 5.656 3.995 3.312 0 6-2.689 6-6 0-3.312-2.688-6-6-6-1.79 0-3.399.786-4.498 2.031z" fillRule="nonzero" /></svg>
        </button>
      </div>
    </div>
  );
}

export default App;
