import React, { createContext, useContext } from "react";

type ProviderPropsT<ContextT> = {
  children: React.ReactNode;
  value: ContextT;
};

type ProviderT<ContextT> = React.FC<React.PropsWithChildren>;
type UseCreatorT<ContextT> = (props: any) => ContextT;
type UseStoreT<ContextT> = () => ContextT;
type ReturnT<ContextT> = [ProviderT<ContextT>, UseStoreT<ContextT>];

export const createContextHook = <ContextT,>(
  useCreator: UseCreatorT<ContextT>
): ReturnT<ContextT> => {
  const Context = createContext<ContextT | undefined>(undefined);

  const Provider: ProviderT<ContextT> = (props) => {
    const store = useCreator(props);
    return <Context.Provider children={props.children} value={store} />;
  };

  const useStore = () => {
    return useContext(Context);
  };

  return [Provider as ProviderT<ContextT>, useStore as UseStoreT<ContextT>];
};
