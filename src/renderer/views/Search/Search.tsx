import * as React from 'react';
import {
  Tabs,
  Flex,
  Box,
  Text,
  Heading,
  Button,
  TextField,
} from '@radix-ui/themes';
import { useSearch } from '../../contexts/search';
import {
  BPMSelector,
  BPMSlider,
  GenreSelect,
  InstrumentSelect,
} from './Fiilters';
import { ViewContainer } from '../../components/ViewContainer';
import { MagnifyingGlassIcon } from '@radix-ui/react-icons';

export const Search = () => {
  const search = useSearch();

  return (
    <ViewContainer>
      <Flex direction="column" gap="3">
        <Flex gap="3">
          <SearchInput />
          <GenreSelect />
          <InstrumentSelect />
          <BPMSelector />
          <Button>Search</Button>
        </Flex>
      </Flex>
    </ViewContainer>
  );
};

const SearchInput = () => {
  return (
    <Flex>
      <TextField.Root>
        <TextField.Slot>
          <MagnifyingGlassIcon height="16" width="16" />
        </TextField.Slot>
      </TextField.Root>
    </Flex>
  );
};
