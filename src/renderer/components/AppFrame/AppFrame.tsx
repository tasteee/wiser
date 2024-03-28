import * as React from 'react'
import { Flex, Text, Button, Heading } from '@radix-ui/themes'
import { SideBar } from './SideBar'
import { TopBar } from './TopBar'

export const AppFrame = (props) => {
  return (
    <Flex gap="2" width="100%" height="100%" id="AppFrame">
      <Flex id="LeftContainer" direction="column" width="240px" height="100%" gap="4">
        <TopBar />
        <SideBar />
      </Flex>
      {props.children}
    </Flex>
  )
}
