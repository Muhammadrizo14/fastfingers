import React, { useState, useEffect } from 'react';
import './index.css'

/**
 * Интерфейс пропсов компонента клавиатуры
 */
interface KeyboardProps {
  /** Тема оформления (темная/светлая) */
  theme?: string;
}

/**
 * Компонент виртуальной клавиатуры, который отображает нажатые клавиши
 * @param theme - тема оформления (по умолчанию 'dark')
 */
const Keyboard: React.FC<KeyboardProps> = ({ theme = 'dark' }) => {
  // Раскладка клавиатуры (QWERTY)
  const keyboardRows = [
    ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
    ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
    ['z', 'x', 'c', 'v', 'b', 'n', 'm'],
    [' '] // пробел
  ]

  // Состояние для отслеживания нажатой клавиши
  const [pressedKey, setPressedKey] = useState<string | null>(null);

  /**
   * Обработчик нажатия клавиши
   * @param key - нажатая клавиша
   */
  const handleKeyPress = (key: string) => {
    setPressedKey(key);
    // Подсвечиваем клавишу на 300 мс
    setTimeout(() => {
      setPressedKey(null);
    }, 300);
  };

  // Эффект для добавления обработчика нажатия клавиш
  useEffect(() => {
    /**
     * Обработчик события нажатия клавиши
     * @param event - событие нажатия клавиши
     */
    const handleKeyDown = (event: KeyboardEvent) => {
      handleKeyPress(event.key);
    };

    // Добавляем обработчик события
    window.addEventListener('keydown', handleKeyDown);

    // Удаляем обработчик при размонтировании компонента
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div className={`keyboard ${theme}`}>
      {keyboardRows.map((row, rowIndex) => (
        <div className='row' key={rowIndex}>
          {row.map((key, keyIndex) => (
            <div
              className={`key ${pressedKey === key ? 'active' : ''} ${key === ' ' ? 'space' : ''}`}
              key={keyIndex}
            >
              {key}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Keyboard;