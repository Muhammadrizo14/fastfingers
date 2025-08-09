import React, { useState, useEffect, useRef } from 'react';

/**
 * Интерфейс компонента секундомера
 */
interface IStopWatchProps {
  /** Флаг, указывающий, запущен ли секундомер */
  start: boolean;
  /** Функция для обновления времени в родительском компоненте */
  setPlayedTime: (time: number) => void;
}

/**
 * Компонент секундомера для отслеживания времени печати
 * @param start - флаг, указывающий, запущен ли секундомер
 * @param setPlayedTime - функция для обновления времени в родительском компоненте
 */
const StopWatch: React.FC<IStopWatchProps> = ({ start, setPlayedTime }) => {
  // Состояние для хранения текущего времени
  const [time, setTime] = useState(0);
  // Ссылка для хранения идентификатора интервала
  const timeout = useRef<NodeJS.Timeout | null>(null);
  // Ссылка для хранения последнего значения времени (для избежания проблем с асинхронным обновлением состояния)
  const timeRef = useRef(0);

  useEffect(() => {
    // Если секундомер остановлен
    if (!start) {
      if (timeout.current) {
        // Очищаем интервал
        clearInterval(timeout.current);
        timeout.current = null;
        // Обновляем время в родительском компоненте
        setPlayedTime(timeRef.current);
        // Сбрасываем время
        setTime(0);
        timeRef.current = 0;
      }
      return;
    }

    // Запускаем интервал для обновления времени каждую секунду
    timeout.current = setInterval(() => {
      setTime(prevTime => {
        const newTime = prevTime + 1;
        // Обновляем ссылку на текущее время
        timeRef.current = newTime;
        // Обновляем время в родительском компоненте
        setPlayedTime(newTime);
        return newTime;
      });
    }, 1000);

    // Очищаем интервал при размонтировании компонента
    return () => {
      if (timeout.current) clearInterval(timeout.current);
    };
  }, [start, setPlayedTime]);

  return (
    <div>
      {/* Показываем время всегда, даже когда оно равно 0 */}
      <p style={{color: `var(--text-color)`}}>{time}</p>
    </div>
  );
};

export default React.memo(StopWatch);