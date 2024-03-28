import * as React from 'react';
import { createContextHook } from '../utilities/createContextHook';
import { togglePrimitiveItemInArray } from '../utilities/array';

type SelectedTagsT = { list: string[]; toggle: (tagName: string) => void };

type SearchContextT = {
  value: string;
  genre: string;
  instrument: string;
  minimumBPM: string;
  maximumBPM: string;
  selectedTags: SelectedTagsT;
  setGenre: React.Dispatch<React.SetStateAction<string>>;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  setInstrument: React.Dispatch<React.SetStateAction<string>>;
  setMinimumBPM: React.Dispatch<React.SetStateAction<string>>;
  setMaximumBPM: React.Dispatch<React.SetStateAction<string>>;
};

const useSelectedTags = () => {
  const [selectedTags, setSelectedTags] = React.useState<string[]>([]);

  const toggleSelectedTag = (tagName: string) => {
    const toggleInput = { target: selectedTags, item: tagName };
    const newSelectedTags = togglePrimitiveItemInArray(toggleInput);
    setSelectedTags(newSelectedTags);
  };

  const list = selectedTags;
  const toggle = toggleSelectedTag;

  return { list, toggle };
};

const contextCreator = (): SearchContextT => {
  const [value, setValue] = React.useState('');
  const [genre, setGenre] = React.useState('');
  const [instrument, setInstrument] = React.useState('');
  const [minimumBPM, setMinimumBPM] = React.useState('0');
  const [maximumBPM, setMaximumBPM] = React.useState('200');
  const selectedTags = useSelectedTags();

  return {
    genre,
    setGenre,
    instrument,
    setInstrument,
    value,
    setValue,
    minimumBPM,
    setMinimumBPM,
    maximumBPM,
    setMaximumBPM,
    selectedTags,
  };
};

export const [SearchProvider, useSearch] =
  createContextHook<SearchContextT>(contextCreator);
