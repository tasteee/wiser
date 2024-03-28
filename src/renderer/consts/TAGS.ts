const GENRE_TAGS = [
  "pop",
  "future-pop",
  "future-bass",
  "indie",
  "rock",
  "pop-rock",
  "drum & bass",
  "dubstep",
  "funk",
  "soul",
  "lofi",
  "house",
  "bass house",
];

const INSTRUMENT_TAGS = [
  "guitar",
  "bass guitar",
  "bass",
  "piano",
  "flute",
  "harp",
  "pluck",
  "808",
  "drums",
  "kick",
  "snare",
  "hi-hat",
  "cymbal",
  "toms",
  "viola",
  "violin",
  "strings",
  "horns",
  "trombone",
  "saxaphone",
  "brass",
  "woodwind",
  "lead",
  "pad",
  "atmosphere",
];

const KEY_TAGS = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "A#",
  "B#",
  "C#",
  "D#",
  "F#",
  "G#",
];

const SCALE_TAGS = ["major", "minor"];

export const TAGS = {
  GENRE: GENRE_TAGS.sort(),
  INSTRUMENT: INSTRUMENT_TAGS.sort(),
  KEY: KEY_TAGS.sort(),
  SCALE: SCALE_TAGS.sort(),
};
