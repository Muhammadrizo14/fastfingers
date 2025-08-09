/**
 * Функция для расчета скорости печати в словах в минуту (WPM)
 * @param words - количество правильно набранных слов
 * @param time - время в секундах
 * @returns скорость печати в словах в минуту
 */
const calculateWpm = (words: number, time: number): number => {
  // Проверка на корректность входных данных
  if (time <= 0) {
    console.warn('Время должно быть положительным числом. Используем значение по умолчанию 1 секунда.');
    time = 1;
  }
  
  if (words < 0) {
    console.warn('Количество слов не может быть отрицательным. Используем значение 0.');
    words = 0;
  }
  
  // Преобразуем время из секунд в минуты
  const minutes = time / 60;
  
  // WPM = (слова / минуты) - стандартная формула расчета WPM
  const wpm = Math.round(words / minutes);
  
  return wpm;
}

export default calculateWpm;