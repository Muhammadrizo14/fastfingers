interface IWpm {
  words: number, // correct words count
  time: number, // time in seconds
}


const CalculateWpm = (words: number, time: number) => {
  const minutes = time / 60

  const wpm = ((words / minutes) / 5).toFixed()

  return wpm
}

export default CalculateWpm;