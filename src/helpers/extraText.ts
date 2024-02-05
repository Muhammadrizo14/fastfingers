export let ExtraText:string[] = [
  "apple", "ball", "cat", "dog", "eat", "fish", "green", "happy", "ice", "jump",
  "kite", "laugh", "moon", "nice", "orange", "play", "quiet", "red", "sun", "tall",
  "umbrella", "violet", "water", "yellow", "zoo", "baby", "cloud", "dance", "egg",
  "flower", "grass", "hat", "insect", "jelly", "kangaroo", "lion", "mountain", "nest",
  "ocean", "pencil", "queen", "robot", "star", "train", "umbrella", "volcano", "wagon",
  "xylophone", "yoga", "zebra", "carrot", "duck", "elephant", "frog", "guitar", "horse",
  "island", "jigsaw", "lighthouse", "magnet", "noodle", "puzzle", "quilt", "rainbow",
  "sandwich", "telescope", "umbrella", "vegetable", "waffle", "x-ray", "yogurt", "zigzag",
  "ant", "bee", "cup", "desk", "elephant", "fox", "giraffe", "hat", "igloo", "juice",
  "kangaroo", "lemon", "monkey", "notebook", "owl", "penguin", "question", "rain", "sunglasses",
  "tree", "umbrella", "violin", "watermelon", "xylophone", "yawn", "zookeeper",
  "airport", "banana", "castle", "dragon", "elephant", "feather", "garden", "honey", "island",
  "jungle", "kite", "lemonade", "mango", "nest", "octopus", "puzzle", "quilt", "raincoat",
  "snail", "treasure", "umbrella", "vase", "whale", "x-ray", "yo-yo", "zipline", "anchor",
  "bicycle", "cactus", "dolphin", "elephant", "firefly", "giraffe", "hammock", "ice cream", "jacket",
  "lighthouse", "marshmallow", "napkin", "ostrich", "pajamas", "quiver", "raccoon", "seashell", "tiger",
  "umbrella", "vanilla", "wagon", "xylophone", "yogurt", "zipper", "accordion", "balloon", "caterpillar",
  "dinosaur", "elevator", "firetruck", "giraffe", "hamburger", "iceberg", "jungle", "kangaroo", "lighthouse",
  "muffin", "nectar", "overalls", "penguin", "quilt", "rainbow", "saxophone", "teapot", "umbrella",
  "volcano", "waffle", "xylophone", "yo-yo", "zoo", "alligator", "banjo", "crown", "drum", "eagle",
  "fountain", "giraffe", "hummingbird", "igloo", "jellybean", "kangaroo", "lighthouse", "mermaid", "nest",
  "ostrich", "puzzle", "quilt", "rainbow", "snowflake", "telescope", "umbrella", "volcano", "wagon",
  "xylophone", "yo-yo", "zebra", "apricot", "bumblebee", "caterpillar", "dolphin", "elephant", "frog",
  "giraffe", "hummingbird", "icicle", "jellyfish", "kiwi", "lighthouse", "moonlight", "nectar", "ostrich",
  "puzzle", "quilt", "raindrop", "sunglasses", "tulip", "umbrella", "volcano", "wagon", "xylophone",
  "yo-yo", "zigzag"
]




export const  getMultipleRandom = (num:number)=> {
  const shuffled = [...ExtraText].sort(() => 0.5 - Math.random());

  return shuffled.slice(0, num);
}