import * as React from 'react';
import { Flex } from '@radix-ui/themes';

export const ViewContainer = (props) => {
  return (
    <Flex direction="column" p="6" width="100%">
      {props.children}
    </Flex>
  );
};
