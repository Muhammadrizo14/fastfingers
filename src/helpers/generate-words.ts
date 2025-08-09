import { getWordsFromCurrentSet, initWordSet } from './word-sets';

// Инициализируем набор слов из localStorage
initWordSet();

/**
 * Генерирует случайный набор символов для печати
 * @param num - количество слов для генерации
 * @returns массив символов для печати
 */
export const getMultipleRandom = (num: number): string[] => {
  // Проверка на корректность входных данных
  if (num <= 0) {
    console.warn('Количество слов должно быть положительным числом. Возвращаем пустой массив.');
    return [];
  }

  const text: string[] = [];
  const currentWords = getWordsFromCurrentSet();

  // Проверка на наличие слов в текущем наборе
  if (currentWords.length === 0) {
    console.warn('Текущий набор слов пуст. Возвращаем пустой массив.');
    return [];
  }

  // Генерируем случайные слова
  for (let i = 0; i < num; i++) {
    // Получаем случайное слово из текущего набора
    const randomIndex = Math.floor(Math.random() * currentWords.length);
    const word = currentWords[randomIndex];

    // Добавляем каждый символ слова в массив
    if (word) {
      for (let j = 0; j < word.length; j++) {
        text.push(word[j]);
      }
      
      // Добавляем пробел после слова (кроме последнего слова)
      if (i < num - 1) {
        text.push(' ');
      }
    }
  }

  return text;
};