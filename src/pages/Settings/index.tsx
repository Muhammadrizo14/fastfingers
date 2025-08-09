import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { setWordSet, wordSets, getCurrentWordSet, getCustomWords, saveCustomWords } from "../../helpers/word-sets";
import './style.css';

/**
 * Компонент настроек приложения
 * Позволяет пользователю выбрать набор слов, настроить пользовательские слова и изменить тему
 */



const Index = () => {
  // Состояние для текущего набора слов
  const [currentWordSet, setCurrentWordSet] = useState(getCurrentWordSet());
  // Состояние для текущей темы (темная/светлая)
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');
  // Состояние для пользовательских слов, преобразованных в строку с разделителями-запятыми
  const [customWords, setCustomWords] = useState(getCustomWords().join(', '));
  // Хук для навигации
  const navigate = useNavigate();

  // Применяем тему при монтировании компонента или при её изменении
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  /**
   * Обработчик изменения набора слов
   * @param setName - имя выбранного набора слов
   */
  const handleWordSetChange = (setName: string) => {
    setWordSet(setName);
    setCurrentWordSet(setName);
  }

  /**
   * Обработчик изменения пользовательских слов в текстовом поле
   * @param e - событие изменения
   */
  const handleCustomWordsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCustomWords(e.target.value);
  }

  /**
   * Сохраняет пользовательские слова в локальное хранилище
   */
  const saveCustomWordsToStorage = () => {
    // Преобразуем строку в массив, удаляем пробелы и пустые элементы
    const wordsArray = customWords
      .split(',')
      .map(word => word.trim())
      .filter(word => word.length > 0);
    
    // Сохраняем массив слов в локальное хранилище
    saveCustomWords(wordsArray);

    // Если выбран пользовательский набор, обновляем его
    if (currentWordSet === 'custom') {
      setWordSet('custom');
    }
  }

  /**
   * Переключает тему между темной и светлой
   */
  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  }

  /**
   * Возвращает пользователя на главную страницу
   */
  const goBack = () => {
    navigate("/");
  }

  return (
    <div className="settings-container">
      <h1>Настройки</h1>
      
      <div className="settings-section word-sets">
        <h3>Наборы слов</h3>
        <div className="word-set-options">
          {Object.keys(wordSets).map((setName) => (
            <div key={setName} className="word-set-option">
              <input
                type="radio"
                id={setName}
                name="wordSet"
                value={setName}
                checked={currentWordSet === setName}
                onChange={() => handleWordSetChange(setName)}
              />
              <label htmlFor={setName}>
                {setName === 'common' ? 'Общие' : 
                 setName === 'programming' ? 'Программирование' : 
                 setName === 'science' ? 'Наука' : 
                 setName === 'custom' ? 'Пользовательские' : 
                 setName.charAt(0).toUpperCase() + setName.slice(1)}
              </label>
            </div>
          ))}
        </div>
      </div>

      <div className="settings-section custom-words">
        <h3>Пользовательские слова</h3>
        <div className="custom-words-container">
          <textarea
            value={customWords}
            onChange={handleCustomWordsChange}
            placeholder="Введите пользовательские слова через запятую (например, яблоко, банан, вишня)"
            rows={5}
            className="custom-words-input"
          />
          <button 
            className="save-custom-words-button" 
            onClick={saveCustomWordsToStorage}
          >
            Сохранить пользовательские слова
          </button>
          <p className="custom-words-help">
            Эти слова будут использоваться, когда в разделе "Наборы слов" выше выбрано "Пользовательские".
          </p>
        </div>
      </div>

      <div className="settings-section theme-toggle">
        <h3>Тема</h3>
        <div className="theme-toggle-switch">
          <span>Темная</span>
          <label className="switch">
            <input
              type="checkbox"
              checked={theme === 'light'}
              onChange={toggleTheme}
            />
            <span className="slider round"></span>
          </label>
          <span>Светлая</span>
        </div>
      </div>

      <button className="back-button" onClick={goBack}>
        Вернуться к печати
      </button>
    </div>
  );
};

export default Index;