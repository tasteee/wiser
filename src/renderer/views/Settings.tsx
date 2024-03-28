import * as React from "react"
import { TableIcon, TrashIcon } from "@radix-ui/react-icons"
import { Spacer } from "../components/Spacer"
import { useSettings } from "../contexts/settings"
import { ViewContainer } from "../components/ViewContainer"

import { Card, Avatar, Box, Flex, Text, Button, Heading, Badge } from "@radix-ui/themes"

export const Settings = () => {
  return (
    <ViewContainer>
      <Flex>
        <Heading>Settings</Heading>
      </Flex>
      <Spacer size="12px" />
      <Flex direction="column" gap="4">
        <FoldersSection />
      </Flex>
    </ViewContainer>
  )
}

const SettingsSection = (props) => {
  return (
    <Flex direction="column" gap="2" px="4" py="2">
      <Heading size="4">{props.title}</Heading>
      {props.children}
    </Flex>
  )
}

const FoldersSection = () => {
  const settings = useSettings()

  console.log({ settings })
  const foldersList = (
    <Flex direction="column" py="2" gap="3">
      {settings.folders.map((folder) => {
        console.log("LP:", folder.localPath)
        return <FolderListItem key={folder.id} {...folder} />
      })}
    </Flex>
  )

  return (
    <SettingsSection title="Indexed Folders">
      <Text>Add folders for the app to watch and index files from.</Text>
      {settings.folders.length > 0 ? foldersList : null}
      <FolderSelector />
    </SettingsSection>
  )
}

const FolderIndexingStatus = (props) => {
  if (!!props.isIndexingComplete) return <Badge color="green">Index Complete</Badge>
  if (!!props.isIndexing) return <Badge color="blue">Currently Indexing</Badge>
  return <Badge color="orange">Awaiting Indexing</Badge>
}

const FolderListItem = (props) => {
  const settings = useSettings()

  const removeFolder = () => {
    settings.removeFolder(props)
  }

  return (
    <Card>
      <Flex gap="3">
        <Flex align="start" pt="1">
          <TableIcon />
        </Flex>
        <Flex direction="column" width="100%">
          <Heading size="3">{props.name}</Heading>
          <Text>{props.localPath}</Text>
          <Flex gap="2" mt="2">
            <FolderIndexingStatus {...props} />
          </Flex>
        </Flex>
        <Flex align="start">
          {"id" in props && (
            <Button size="2" variant="solid" onClick={removeFolder}>
              {/* <Cross2Icon /> */}
              <TrashIcon />
            </Button>
          )}
        </Flex>
      </Flex>
    </Card>
  )
}

const FolderSelector = () => {
  const settings = useSettings()
  const inputRef = React.useRef()

  const handleFolderSelect = (event: any) => {
    const files = event.target.files
    const firstFile = files[0]
    const filePath: string = firstFile.path
    const cleanedPath = filePath.replace(/\\/g, "/")
    const lastSlashIndex = cleanedPath.lastIndexOf("/")
    const localPath = cleanedPath.substring(0, lastSlashIndex)
    const newLastSlashIndex = localPath.lastIndexOf("/")
    const folderName = localPath.substring(newLastSlashIndex + 1)
    settings.addFolder({ name: folderName, localPath })
  }

  const clickInput = (event) => {
    event.preventDefault()
    inputRef.current.click()
  }

  return (
    <Flex>
      <label htmlFor="folderSelector">
        <Button onClick={clickInput}>Choose Folder</Button>
      </label>
      <input
        ref={inputRef}
        style={{ display: "none" }}
        id="folderSelector"
        type="file"
        directory=""
        webkitdirectory=""
        onChange={handleFolderSelect}
      />
    </Flex>
  )
}
