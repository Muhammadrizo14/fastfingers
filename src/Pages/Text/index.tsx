import React, {useEffect, useRef, useState} from 'react';
import Keyboard from "../../Components/Keyboard";
import {getMultipleRandom} from "../../helpers/extraText";
import {useSelector} from "react-redux";
import './index.css'

const IndexHtml = () => {
  const wordsState = useSelector((state: any) => state.words.value);
  const [words, setWords] = useState<any[]>([])
  const input = useRef<any>()
  const [changingInput, setChangingInput] = useState<string>('')
  const [end, setEnd] = useState<boolean>(false)

  const customWords = () => {
    let id = 0;
    let newWords = wordsState.map((word: string) => {
      id++

      return word === wordsState[0] ? {id, word, status: 'cur'} : {id, word, status: ''};
    });
    setWords(newWords)
  }
  const getAllWords = () => {
    setEnd(false)
    if (!wordsState.length) {
      let data = getMultipleRandom(Number(localStorage.getItem('count')))

      data = data.join(' ').split('')


      let id = 0;
      let end = false;
      let newWords = data.map((word: string) => {
        id++


        if (word === ' ') {
          return {id, word: 'space', status: ''}
        }

        if (!end) {
          if (word === data[0]) {
            return {id, word, status: 'curletter'}
          }
        }
        end = true

        return {id, word, status: ''}
      });
      setWords(newWords)
    } else {
      customWords()
    }
  }

  const updateItem = async (itemId: number, status: string) => {
    if (words[itemId]) {
      const updatedItems = words.map(item => {
        if (item.id === itemId) {
          if (words.length !== itemId) {
            words[itemId].status = 'curletter'
          }
          return {...item, status}
        } else {
          return item
        }
      });
      setWords(updatedItems);

    }

  };

  const Typing = (e: any) => {
    let {value} = e.target
    let count = value.length - 1
    setChangingInput(value)



    if (count + 1 === words.length) {
      setEnd(true)
      // end code here
      setWords([])
      setChangingInput('')
      getAllWords()
    }
    if (!end) {
      if (words?.[count]?.word === 'space') {
          updateItem(count + 1, 'succeed')
      } else if (words[count].word === value.charAt(value.length - 1)) {
          updateItem(count + 1, 'succeed')
      } else {
        updateItem(count+1, 'fail')
      }
    }


  }

  useEffect(() => {
    input.current.focus()
    getAllWords()
  }, []);

  return (
    <div className='text__container'>
      <div className='text__wrap'>
        {words.map((word) => (
          <div key={word.id}>
            {
              word.word !== 'space' ? (
                <p className={`letter ${word.status}`}>
                  {word.word}
                </p>
              ) : (
                <p>&nbsp;</p>
              )
            }
          </div>
        ))}
        <input
          ref={input}
          value={changingInput}
          className='inputTyping'
          type="text"
          onChange={(e: any) => Typing(e)}
        />
      </div>
      <Keyboard/>
    </div>
  );
};

export default IndexHtml;