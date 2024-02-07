import React, { useState, useEffect } from 'react';
import './index.css'


const Keyboard = () => {
  const keyboardRows = [
    ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
    ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
    ['z', 'x', 'c', 'v', 'b', 'n', 'm'],
  ];

  const [pressedKey, setPressedKey] = useState(null);

  const handleKeyPress = (key:any) => {
    setPressedKey(key);
    setTimeout(() => {
      setPressedKey(null);
    }, 300); // Highlight for 2 seconds
  };

  useEffect(() => {
    const handleKeyDown = (event: any) => {
      handleKeyPress(event.key);
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div className='keyboard'>
      {keyboardRows.map((row, rowIndex) => (
        <div className='row' key={rowIndex}>
          {row.map((key, keyIndex) => (
            <div
              className={`key ${pressedKey === key ? 'active' : ''}`}
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
