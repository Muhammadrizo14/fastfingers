import React, {ChangeEvent, useEffect, useRef, useState} from 'react';
import Keyboard from "../../Components/Keyboard";
import {getMultipleRandom} from "../../helpers/generate-words";
import './index.scss'
import CalculateWpm from "../../helpers/calculateWpm";
import StopwWatch from "../../Components/StopwWatch";


const IndexHtml = () => {
  const [userType, setUserType] = useState<string>('')
  const [words, setWords] = useState<string[]>([])
  const input = useRef<HTMLInputElement>(null)
  const [isPlaying, setIsPlaying] = useState<boolean>(false)
  const [playedTime, setPlayedTime] = useState<number>(0)
  const [isFocused, setIsFocused] = useState(false)


  const getAllWords = () => {
    if (input.current) {
      input.current.focus()
    }
    setWords(getMultipleRandom(Number(localStorage.getItem('count'))))

  }


  useEffect(() => {
    if (userType.length !== 0 && words.length === userType.length) {
      setIsPlaying(false)
      done()
    }
    if (userType.length === 1) {
      setIsPlaying(true)
    }
  }, [userType])

  const done = () => {


    let counter = words.length

    for (let i = 0; i < words.length; i++) {
      if (words[i] !== userType[i]) {
        counter--
      }
    }

    CalculateWpm(counter, playedTime)
    getAllWords()
    setUserType('')


  }

  const checkLetter = (word: string, i: number) => {
    if (i === userType.length) return ` current-letter `

    if (userType.length < i) return ''

    if (i === userType.length - 1) {
        if (word === userType[i]) {
          return `succeed current-letter  gone`
        }
      else return `fail current-letter  gone`
    }
    if (word === userType[i]) return `succeed`
    else return ` fail `
  }

  useEffect(() => {
    if (input.current) {
      input.current.focus()
    }
    getAllWords()
  }, []);

  const restart=() =>{
    setUserType('')
    getAllWords()
    setIsPlaying(false)
  }

  return (
    <div className='text__container'>
      <StopwWatch start={isPlaying} setPlayedTime={setPlayedTime}/>
      <div className='text__wrap' onClick={()=> input.current && input.current.focus()}>
        {words.map((word, i) => (
          //${!isFocused ? '' : 'not-focused'}
          <div key={i} className={`letter-wrap `}>
            {
              word !== ' ' ? (
                <p className={`letter ${checkLetter(word, i)}`}>
                  {word}
                </p>
              ) : (
                <p className={`empty ${checkLetter(word, i)}`}>{userType[i]}</p>
              )
            }
          </div>
        ))}


        {/*{isFocused && (*/}
        {/*  <div className='not-focused-info'>*/}
        {/*    <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24"><path d="M4 0l16 12.279-6.951 1.17 4.325 8.817-3.596 1.734-4.35-8.879-5.428 4.702z"/></svg>*/}
        {/*    <p>Click here to press any key to focus</p>*/}
        {/*  </div>*/}
        {/*)}*/}
        <input
          ref={input}
          value={userType}
          className='inputTyping'
          type="text"
          onBlur={()=> setIsFocused(true)}
          onFocus={()=> setIsFocused(false)}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setUserType(e.target.value)}
        />
      </div>
      <button onClick={()=> restart()} className='restart'>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 0c3.31 0 6.291 1.353 8.459 3.522l2.48-2.48 1.061 7.341-7.437-.966 2.489-2.489c-1.808-1.807-4.299-2.928-7.052-2.928-5.514 0-10 4.486-10 10s4.486 10 10 10c3.872 0 7.229-2.216 8.89-5.443l1.717 1.046c-2.012 3.803-6.005 6.397-10.607 6.397-6.627 0-12-5.373-12-12s5.373-12 12-12z"/></svg>
      </button>
      <Keyboard/>
    </div>
  );
};

export default IndexHtml;