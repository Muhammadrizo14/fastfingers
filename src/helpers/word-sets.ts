// Common English words
export const commonWords: string[] = [
  "and", "in", "not", "on", "I", "that", "that one", "to be", "with", "but", "all", "this", "how", "she", "by", "but",
  "they", "to", "at", "you", "from", "we", "for", "you (plural)", "so", "also", "from", "say", "this one", "which",
  "can", "person", "about", "one", "still", "would", "such", "only", "oneself", "one's own", "which", "when", "already",
  "for", "here", "who", "yes", "speak", "year", "know", "my", "before", "or", "if", "time", "hand", "no", "most", "neither",
  "become", "big", "even", "other", "our", "one's own", "under", "where", "matter", "there is", "self", "once", "in order to",
  "two", "there", "than", "eye", "life", "first", "day", "here", "in", "nothing", "then", "very", "with", "want", "whether",
  "at", "head", "must", "without", "see", "go", "now", "also", "stand", "friend", "house", "now", "possible", "after", "word",
  "here", "think", "place", "ask", "through", "face", "then", "after all", "good", "each", "new", "live", "must", "look",
  "why", "because", "side", "just", "leg", "sit", "understand", "have", "final", "do", "suddenly", "over", "take", "nobody", "make"
];

// Programming terms in English
export const programmingWords: string[] = [
  "code", "function", "variable", "class", "object", "method", "array", "string", "integer", "boolean", "loop", "condition",
  "return", "import", "export", "module", "component", "props", "state", "hook", "asynchronous", "await", "promise",
  "callback", "event", "listener", "render", "compilation", "debugging", "error", "exception", "try", "catch", "finally",
  "null", "undefined", "interface", "type", "generic", "algorithm", "data", "structure", "stack", "queue", "tree", "graph",
  "recursion", "iteration", "scope", "closure", "prototype", "inheritance", "polymorphism", "encapsulation", "abstraction",
  "pattern", "design", "architecture", "framework", "library", "dependency", "package", "npm", "git", "commit", "branch",
  "merge", "pull", "push", "request", "check", "test", "unit", "integration", "deployment", "server", "client", "api", "rest",
  "graphql", "database", "query", "schema", "model", "view", "controller", "middleware", "authentication", "authorization",
  "security", "performance", "optimization", "responsive", "mobile", "desktop", "browser", "dom", "virtual", "shadow",
  "webpack", "babel", "typescript", "javascript", "react", "vue", "angular", "node", "express", "mongodb", "sql", "nosql"
];

// Scientific terms in English
export const scienceWords: string[] = [
  "science", "theory", "hypothesis", "experiment", "observation", "data", "analysis", "research", "method", "evidence",
  "conclusion", "result", "variable", "control", "sample", "population", "statistics", "probability", "correlation",
  "causation", "physics", "chemistry", "biology", "astronomy", "geology", "ecology", "evolution", "genetics", "molecule",
  "atom", "element", "compound", "reaction", "energy", "force", "motion", "gravity", "quantum", "relativity", "particle",
  "wave", "light", "sound", "heat", "temperature", "pressure", "volume", "mass", "weight", "density", "speed", "acceleration",
  "momentum", "friction", "electricity", "magnetism", "circuit", "current", "voltage", "resistance", "cell", "tissue",
  "organ", "system", "organism", "species", "ecosystem", "biome", "climate", "weather", "atmosphere", "hydrosphere",
  "lithosphere", "plate", "tectonics", "earthquake", "volcano", "mineral", "rock", "fossil", "star", "planet", "galaxy",
  "universe", "solar", "lunar", "space", "radiation", "spectrum", "wavelength", "frequency", "nucleus", "electron", "proton",
  "neutron", "isotope", "ion", "acid", "base", "solution", "solvent", "solute", "concentration", "enzyme", "protein",
  "carbohydrate", "lipid", "nucleic", "acid", "dna", "rna", "chromosome", "gene", "allele", "phenotype", "genotype"
];

// Пользовательские слова по умолчанию (пустой массив)
const defaultCustomWords: string[] = [];

/**
 * Получает пользовательские слова из localStorage или использует значение по умолчанию
 * @returns массив пользовательских слов
 */
export const getCustomWords = (): string[] => {
  const savedCustomWords = localStorage.getItem('customWords');
  return savedCustomWords ? JSON.parse(savedCustomWords) : defaultCustomWords;
};

/**
 * Сохраняет пользовательские слова в localStorage
 * @param words - массив слов для сохранения
 */
export const saveCustomWords = (words: string[]): void => {
  localStorage.setItem('customWords', JSON.stringify(words));
};

/**
 * Объект, содержащий все наборы слов
 */
export const wordSets: { [key: string]: string[] } = {
  common: commonWords,
  programming: programmingWords,
  science: scienceWords,
  custom: getCustomWords()
};

// Текущий выбранный набор слов
let currentWordSet = 'common';

/**
 * Устанавливает текущий набор слов и сохраняет его в localStorage
 * @param setName - имя набора слов
 */
export const setWordSet = (setName: string) => {
  if (wordSets[setName]) {
    currentWordSet = setName;
    
    // Обновляем пользовательские слова, если выбран пользовательский набор
    if (setName === 'custom') {
      wordSets.custom = getCustomWords();
    }
    
    // Сохраняем выбранный набор в localStorage
    localStorage.setItem('wordSet', setName);
    
    // Устанавливаем количество слов для практики (не более 100)
    const wordsLength = Math.min(wordSets[setName].length, 100);
    localStorage.setItem('count', String(wordsLength));
  }
};

/**
 * Возвращает имя текущего набора слов
 * @returns имя текущего набора слов
 */
export const getCurrentWordSet = () => {
  return currentWordSet;
};

/**
 * Возвращает слова из текущего набора
 * @returns массив слов из текущего набора
 */
export const getWordsFromCurrentSet = () => {
  localStorage.setItem('count', String(15));
  return wordSets[currentWordSet];
};

/**
 * Инициализирует набор слов из localStorage при загрузке приложения
 */
export const initWordSet = () => {
  localStorage.setItem('count', String(15));

  const savedWordSet = localStorage.getItem('wordSet');
  if (savedWordSet && wordSets[savedWordSet]) {
    currentWordSet = savedWordSet;
    
    // Обновляем пользовательские слова, если выбран пользовательский набор
    if (currentWordSet === 'custom') {
      wordSets.custom = getCustomWords();
    }
  }
};