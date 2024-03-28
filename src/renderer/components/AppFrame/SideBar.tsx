import * as React from 'react';
import { Flex, Text, Button, Heading } from '@radix-ui/themes';
import { Link } from '../../components/Link';

export const SideBar = (props) => {
  return (
    <Flex
      id="SideBar"
      direction="column"
      gap="6"
      width="100%"
      minWidth="220px"
      px="4"
      pb="4"
      height="100%"
    >
      <SideBarSection title="">
        <Link styling="sideBarMain" to="/">
          <Text>Search</Text>
        </Link>
        <Link styling="sideBarMain" to="/collections">
          <Text>Collections</Text>
        </Link>
      </SideBarSection>

      {/* <SideBarSection title="Collections">
        <Text>SideBar</Text>
        <Text>SideBar</Text>
        <Text>SideBar</Text>
        <Text>SideBar</Text>
      </SideBarSection> */}

      <div style={{ height: '100%' }}> </div>

      <SideBarSection title="">
        <Link styling="sideBarSub" to="/settings">
          <Text>Settings</Text>
        </Link>
      </SideBarSection>
    </Flex>
  );
};

const SideBarSection = (props) => {
  return (
    <Flex direction="column" gap="2" width="100%">
      <Heading size="3">{props.title}</Heading>
      {props.children}
    </Flex>
  );
};
