import * as React from 'react';

import {
  Button,
  Pane,
  Badge,
  Tablist,
  Tab,
  Paragraph,
  Text,
  majorScale,
  TextInputField,
  SearchInput,
} from 'evergreen-ui';

import { Flex, TextField } from '@radix-ui/themes';
import { MagnifyingGlassIcon } from '@radix-ui/react-icons';

import { TAGS } from '../../consts/TAGS';
import { useSearch } from '../../contexts/search';
import { BPMSelector, GenreSelect } from './Fiilters';

export const Home = () => {
  return (
    <Pane width="100%" userSelect="none">
      <Flex gap="5">
        <SearchInput placeholder="Filter traits..." />
        <BPMSelector />
      </Flex>
      <TagSelectorArea />
    </Pane>
  );
};

const TAG_TYPES = ['GENRE', 'INSTRUMENT', 'KEY', 'SCALE'];

const TagSelectorArea = (props) => {
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [tabs] = React.useState(TAG_TYPES);

  return (
    <Pane height={120}>
      <Tablist>
        {tabs.map((tab, index) => (
          <Tab
            aria-controls={`${tab}Panel`}
            isSelected={index === selectedIndex}
            key={tab}
            onSelect={() => setSelectedIndex(index)}
          >
            {tab}
          </Tab>
        ))}
      </Tablist>
      <Pane padding={12}>
        {tabs.map((tabName, index) => (
          <TagListPane
            key={tabName}
            tabName={tabName}
            isActive={index === selectedIndex}
          />
        ))}
      </Pane>
    </Pane>
  );
};

const TagListPane = (props) => {
  const displayValue = props.isActive ? 'block' : 'none';

  return (
    <Pane
      aria-labelledby={props.tabName}
      aria-hidden={!props.isActive}
      display={displayValue}
      key={props.tabName}
      role="tabpanel"
    >
      <TagList tabName={props.tabName} />
    </Pane>
  );
};

const TagList = (props) => {
  const { selectedTags } = useSearch();
  const tags = TAGS[props.tabName];

  return tags.map((tagName: string) => (
    <TagListTag
      isActive={selectedTags.list.includes(tagName)}
      toggleSelected={() => selectedTags.toggle(tagName)}
      tagName={tagName}
      key={tagName}
    />
  ));
};

const TagListTag = (props) => {
  const color = props.isActive ? 'blue' : 'neutral';

  return (
    <Badge
      color={color}
      marginRight={8}
      marginBottom={8}
      onClick={props.toggleSelected}
    >
      {props.tagName}
    </Badge>
  );
};
