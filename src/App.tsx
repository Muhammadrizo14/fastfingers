import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import Keyboard from "./components/Keyboard";
import { getMultipleRandom } from "./helpers/generate-words";
import './App.scss'
import calculateWpm from "./helpers/calculateWpm";
import StopWatch from "./components/StopWatch";
import { useNavigate } from "react-router-dom";

/**
 * Интерфейс для данных результатов печати
 */
type IData = {
  /** Скорость печати в словах в минуту */
  wpm: number,
  /** Точность печати в процентах */
  acc: number,
  /** Время печати в секундах */
  time: number,
  /** Количество слов в тексте */
  wordsLength: number,
  /** Количество неправильных и правильных символов */
  errorsCount: number,
  correctCount: number,
}

/**
 * Главный компонент приложения для тренировки печати
 */
const App = () => {
  // Текст, введенный пользователем
  const [userType, setUserType] = useState<string>('')
  // Массив символов для печати
  const [words, setWords] = useState<string[]>([])
  // Ссылка на поле ввода
  const input = useRef<HTMLInputElement>(null)
  // Флаг, указывающий, идет ли сейчас печать
  const [isPlaying, setIsPlaying] = useState<boolean>(false)
  // Время, прошедшее с начала печати
  const [playedTime, setPlayedTime] = useState<number>(0)
  // Флаг, указывающий, находится ли поле ввода в фокусе
  const [isFocused, setIsFocused] = useState(false)
  // Флаг, указывающий, показывать ли результаты
  const [results, setResult] = useState(false)
  // Данные результатов печати
  const [data, setData] = useState<IData>()
  // Количество ошибок
  const [errorsCount, setErrorsCount] = useState<number>(0)
  // Тема приложения (темная/светлая)
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark')
  // Хук для навигации
  const navigate = useNavigate()

  /**
   * Получает все слова для печати
   */
  const getAllWords = () => {
    const count = Number(localStorage.getItem('count')) || 50;
    if (count <= 0) {
      setWords([]);
      return;
    }
    setWords(getMultipleRandom(count));
  }

  // Эффект для отслеживания завершения печати
  useEffect(() => {
    if (userType.length !== 0 && words.length > 0 && userType.length === words.length) {
      setIsPlaying(false);
      done();
    }
    if (userType.length === 1) {
      setIsPlaying(true);
    }
  }, [userType, words.length]);

  /**
   * Вычисляет и отображает результаты печати
   */
  const done = () => {
    let correctChars = 0;
    let totalChars = 0;

    for (let i = 0; i < Math.min(userType.length, words.length); i++) {
      if (words[i] !== ' ') {
        totalChars++;
        if (words[i] === userType[i]) {
          correctChars++;
        }
      }
    }

    const correctWords = Math.round(correctChars / 5);
    const accuracy = totalChars > 0 ? Math.round(((correctChars / totalChars) * 100) * 100) / 100 : 0;

    const results: IData = {
      wpm: calculateWpm(correctWords, playedTime > 0 ? playedTime : 1),
      acc: accuracy,
      errorsCount: totalChars - correctChars,
      correctCount: correctChars,
      time: playedTime,
      wordsLength: words.length
    };

    setData(results);
    setResult(true);
  }

  /**
   * Определяет класс для символа в зависимости от его состояния
   * @param word - символ из текста
   * @param i - индекс символа
   * @returns строка с классами для стилизации символа
   */
  const checkLetter = (word: string, i: number) => {
    // Если это текущий символ для ввода
    if (i === userType.length) return 'current-letter';

    // Если символ еще не был введен
    if (userType.length <= i) return '';

    // Если это последний введенный символ
    if (i === userType.length - 1) {
      if (word === userType[i]) {
        return 'succeed current-letter gone';
      } else {
        return 'fail current-letter gone';
      }
    }

    // Для ранее введенных символов
    if (word === userType[i]) return 'succeed';
    else return 'fail';
  }

  /**
   * Обрабатывает изменение ввода пользователя
   * @param e - событие изменения ввода
   */
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setUserType(newValue);

    // Подсчет ошибок путем сравнения каждого символа (исключая пробелы)
    let newErrors = 0;
    for (let i = 0; i < Math.min(newValue.length, words.length); i++) {
      if (words[i] !== ' ' && words[i] !== newValue[i]) {
        newErrors++;
      }
    }
    setErrorsCount(newErrors);
  }

  // Загрузка слов при монтировании компонента
  useEffect(() => {
    getAllWords();
  }, []);

  // Установка фокуса на поле ввода
  useEffect(() => {
    if (input.current && !results) {
      input.current.focus();
    }
  }, [results, words]);

  // Применение темы при монтировании компонента
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  /**
   * Перезапускает игру
   */
  const restart = () => {
    setErrorsCount(0);
    setUserType('');
    setIsPlaying(false);
    setPlayedTime(0);
    setResult(false);
    setData(undefined);
    getAllWords();
  }

  // Индекс первого отображаемого символа
  const [startIndex, setStartIndex] = useState(0);

  // Эффект для автоматической прокрутки текста при печати
  useEffect(() => {
    // Примерно 50 символов на строку (настройте под ваш шрифт/размер)
    const charsPerLine = 50;
    const linesVisible = 3;
    const charsTyped = userType.length;

    if (charsTyped > (startIndex + charsPerLine)) {
      setStartIndex(prev => prev + charsPerLine); // сдвиг на одну строку
    }
  }, [userType]);

  // Видимые символы (3 строки)
  const visibleWords = words.slice(startIndex, startIndex + 150);

  // Эффект для прокрутки поля ввода в видимую область
  useEffect(() => {
    if (input.current) {
      input.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  }, [userType]);

  return (
    <div className='text__container'>
      <div className={`${results ? 'hidden' : 'block'}`}>
        <StopWatch start={isPlaying} setPlayedTime={setPlayedTime} />
        <form className='game__wrap'>
          <div className='text__wrap' onClick={() => input.current && input.current.focus()}>
            {visibleWords.length > 0 ? (
              visibleWords.map((word, i) => (
                <div key={startIndex + i} className={`letter-wrap ${!isFocused ? '' : 'not-focused'}`}>
                  {word !== ' ' ? (
                    <p className={`letter ${checkLetter(word, startIndex + i)}`}>{word}</p>
                  ) : (
                    <p className={`empty ${checkLetter(word, startIndex + i)}`}>{userType[startIndex + i]}</p>
                  )}
                </div>
              ))
            ) : (
              <p className="no-words">Нет слов для печати. Пожалуйста, добавьте слова в настройках.</p>
            )}

            {isFocused && (
              <div className='not-focused-info'>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path d="M4 0l16 12.279-6.951 1.17 4.325 8.817-3.596 1.734-4.35-8.879-5.428 4.702z" />
                </svg>
                <p>Нажмите здесь, чтобы нажать любую клавишу для фокусировки</p>
              </div>
            )}
            <input
              ref={input}
              value={userType}
              className='inputTyping'
              type="text"
              onBlur={() => setIsFocused(true)}
              onFocus={() => setIsFocused(false)}
              onChange={handleInputChange}
            />
          </div>
        </form>
      </div>

      {results && data && (
        <div className='results'>
          <ul>
            <li>
              СВМ: <span>{data.wpm}</span>
            </li>
            <li>
              Точность: <span>{data.acc}%</span>
            </li>
            <li>
              Время: <span>{data.time}с</span>
            </li>
            <li>
              Ошибки: <span>{data.errorsCount}</span>
            </li>
          </ul>
        </div>
      )}

      <button onClick={restart} className='restart'>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
          <path
            d="M12 0c3.31 0 6.291 1.353 8.459 3.522l2.48-2.48 1.061 7.341-7.437-.966 2.489-2.489c-1.808-1.807-4.299-2.928-7.052-2.928-5.514 0-10 4.486-10 10s4.486 10 10 10c3.872 0 7.229-2.216 8.89-5.443l1.717 1.046c-2.012 3.803-6.005 6.397-10.607 6.397-6.627 0-12-5.373-12-12s5.373-12 12-12z" />
        </svg>
      </button>

      <button className='settingBtn' onClick={() => navigate('/settings')}>
        <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd">
          <path
            d="M12 8.666c-1.838 0-3.333 1.496-3.333 3.334s1.495 3.333 3.333 3.333 3.333-1.495 3.333-3.333-1.495-3.334-3.333-3.334m0 7.667c-2.39 0-4.333-1.943-4.333-4.333s1.943-4.334 4.333-4.334 4.333 1.944 4.333 4.334c0 2.39-1.943 4.333-4.333 4.333m-1.193 6.667h2.386c.379-1.104.668-2.451 2.107-3.05 1.496-.617 2.666.196 3.635.672l1.686-1.688c-.508-1.047-1.266-2.199-.669-3.641.567-1.369 1.739-1.663 3.048-2.099v-2.388c-1.235-.421-2.471-.708-3.047-2.098-.572-1.38.057-2.395.669-3.643l-1.687-1.686c-1.117.547-2.221 1.257-3.642.668-1.374-.571-1.656-1.734-2.1-3.047h-2.386c-.424 1.231-.704 2.468-2.099 3.046-.365.153-.718.226-1.077.226-.843 0-1.539-.392-2.566-.893l-1.687 1.686c.574 1.175 1.251 2.237.669 3.643-.571 1.375-1.734 1.654-3.047 2.098v2.388c1.226.418 2.468.705 3.047 2.098.581 1.403-.075 2.432-.669 3.643l1.687 1.687c1.45-.725 2.355-1.204 3.642-.669 1.378.572 1.655 1.738 2.1 3.047m3.094 1h-3.803c-.681-1.918-.785-2.713-1.773-3.123-1.005-.419-1.731.132-3.466.952l-2.689-2.689c.873-1.837 1.367-2.465.953-3.465-.412-.991-1.192-1.087-3.123-1.773v-3.804c1.906-.678 2.712-.782 3.123-1.773.411-.991-.071-1.613-.953-3.466l2.689-2.688c1.741.828 2.466 1.365 3.465.953.992-.412 1.082-1.185 1.775-3.124h3.802c.682 1.918.788 2.714 1.774 3.123 1.001.416 1.709-.119 3.467-.952l2.687 2.688c-.878 1.847-1.361 2.477-.952 3.465.411.992 1.192 1.087 3.123 1.774v3.805c-1.906.677-2.713.782-3.124 1.773-.403.975.044 1.561.954 3.464l-2.688 2.689c-1.728-.82-2.467-1.37-3.456-.955-.988.41-1.08 1.146-1.785 3.126"/>
        </svg>
      </button>

      {!results && <Keyboard theme={theme} />}
    </div>
  );
}

export default App;