import * as React from 'react';
import {
  Select,
  Text,
  Heading,
  Flex,
  Box,
  Button,
  Slider,
  TextField,
} from '@radix-ui/themes';
import { useSearch } from '../../contexts/search';

export const AssetTypeTabs = () => {
  const search = useSearch();

  return (
    <Select.Root defaultValue="apple">
      <Select.Trigger style={{ width: '120px' }} />
      <Select.Content>
        <Select.Group>
          <Select.Label>Fruits</Select.Label>
          <Select.Item value="orange">Orange</Select.Item>
          <Select.Item value="apple">Apple</Select.Item>
          <Select.Item value="grape" disabled>
            Grape
          </Select.Item>
        </Select.Group>
        <Select.Separator />
        <Select.Group>
          <Select.Label>Vegetables</Select.Label>
          <Select.Item value="carrot">Carrot</Select.Item>
          <Select.Item value="potato">Potato</Select.Item>
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
};

export const BPMSlider = () => {
  const search = useSearch();

  const setBPMRange = (range: number[]) => {
    search.setMinimumBPM(range[0]);
    search.setMaximumBPM(range[1]);
  };

  return (
    <Flex flexGrow="1" align="center" gap="3">
      <Text>BPM</Text>
      <Slider
        onValueChange={setBPMRange}
        variant="soft"
        defaultValue={[0, 200]}
        value={[search.minimumBPM, search.maximumBPM]}
      />
      <Text wrap="nowrap">
        {search.minimumBPM}-{search.maximumBPM}
      </Text>
    </Flex>
  );
};

export const InstrumentSelect = () => {
  const search = useSearch();

  return (
    <Select.Root onValueChange={search.setInstrument}>
      <Select.Trigger placeholder="Instrument" style={{ width: '120px' }} />
      <Select.Content>
        <Select.Group>
          <Select.Label>Fruits</Select.Label>
          <Select.Item value="orange">Orange</Select.Item>
          <Select.Item value="apple">Apple</Select.Item>
          <Select.Item value="grape" disabled>
            Grape
          </Select.Item>
        </Select.Group>
        <Select.Separator />
        <Select.Group>
          <Select.Label>Vegetables</Select.Label>
          <Select.Item value="carrot">Carrot</Select.Item>
          <Select.Item value="potato">Potato</Select.Item>
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
};

export const FooSelect = () => {
  const search = useSearch();

  return (
    <Select.Root defaultValue="apple">
      <Select.Trigger />
      <Select.Content>
        <Select.Group>
          <Select.Label>Fruits</Select.Label>
          <Select.Item value="orange">Orange</Select.Item>
          <Select.Item value="apple">Apple</Select.Item>
          <Select.Item value="grape" disabled>
            Grape
          </Select.Item>
        </Select.Group>
        <Select.Separator />
        <Select.Group>
          <Select.Label>Vegetables</Select.Label>
          <Select.Item value="carrot">Carrot</Select.Item>
          <Select.Item value="potato">Potato</Select.Item>
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
};

export const GenreSelect = () => {
  const search = useSearch();

  return (
    <Select.Root onValueChange={search.setGenre}>
      <Select.Trigger placeholder="Genre" style={{ width: '120px' }} />
      <Select.Content>
        <Select.Group>
          <Select.Label>Fruits</Select.Label>
          <Select.Item value="orange">Orange</Select.Item>
          <Select.Item value="apple">Apple</Select.Item>
          <Select.Item value="grape" disabled>
            Grape
          </Select.Item>
        </Select.Group>
        <Select.Separator />
        <Select.Group>
          <Select.Label>Vegetables</Select.Label>
          <Select.Item value="carrot">Carrot</Select.Item>
          <Select.Item value="potato">Potato</Select.Item>
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
};

export const BPMSelector = () => {
  const search = useSearch();

  return (
    <Flex maxWidth="240px">
      <TextField.Root
        value={search.minimumBPM}
        onChange={(e) => search.setMinimumBPM(e.target.value)}
        mr="12px"
      >
        <TextField.Slot>
          <Text>Min BPM</Text>
        </TextField.Slot>
      </TextField.Root>
      <TextField.Root
        value={search.maximumBPM}
        onChange={(e) => search.setMaximumBPM(e.target.value)}
      >
        <TextField.Slot>
          <Text>Max BPM</Text>
        </TextField.Slot>
      </TextField.Root>
    </Flex>
  );
};
