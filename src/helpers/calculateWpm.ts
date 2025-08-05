interface IWpm {
  words: number, // correct words count
  time: number, // time in seconds
}

const CalculateWpm = (words: number, time: number) => {
  const minutes = time / 60
  
  // WPM = (words / minutes) - standard WPM calculation
  const wpm = Math.round((words / minutes))
  
  return wpm
}

export default CalculateWpm;