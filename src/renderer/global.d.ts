type AnyObjectT = {
  [key: string]: any;
};

type AnyObjectOrT<ObjectT> =
  | ObjectT
  | {
      [key: string]: any;
    };

type AnyObjectOrNullT = AnyObjectT | null;
type AnyObjectOrNullOrT<ObjectT> = AnyObjectOrT<ObjectT> | null;

type AnyFunctionT = (...args: any[]) => any;

type PartialFolderT = {
  name: string;
  localPath: string;
};

type DBSettingsT = {
  language: string;
  darkMode: boolean;
};

type DBFolderT = {
  id: string;
  name: string;
  originalIndexDate: number;
  updatedIndexDate: number;
  assetCount: number;
  audioFileCount: number;
  midiFileCount: number;
  isIndexingComplete: boolean;
  isAwaitingIndexing: boolean;
  isIndexing: boolean;
  localPath: string;
  albumArtworkPath: string;
  shouldIndexRecurisvely: boolean;
};

type DBCollectionT = {
  id: string;
  name: string;
  description: string;
  assetIds: string[];
  createdDate: number;
  updatedDate: number;
  artworkUrl: string;
};

type DBAssetT = {
  id: string;
  name: string;
  size: number;
  lengthSeconds: number;
  path: string;
  type: 'audio' | 'midi';
  subType: 'mp3' | 'wav';
  indexedDate: number;
  tags: string[];
  isFavorited: true;
  indexedFolderId: string;
};
