import {
  createContext,
  FunctionComponent,
  ReactNode,
  useContext,
  useMemo,
  useState
} from "react";

type HideMenuContextType = {
  hide: boolean;
  toggle: () => void;
};

const HideMenuContext = createContext<HideMenuContextType>({
  hide: false,
  toggle: () => {
    // don't do anything
  }
});

export const useHideMenu = () => {
  return useContext(HideMenuContext);
};

export const HideMenuProvider: FunctionComponent<{
  initialValue?: boolean;
  children?: ReactNode | ReactNode[];
}> = ({ children, initialValue }) => {
  const [hide, setHide] = useState(!!initialValue);
  const value = useMemo(
    () => ({
      hide,
      toggle: () => {
        setHide(!hide);
      }
    }),
    [hide]
  );
  return (
    <HideMenuContext.Provider value={value}>
      {children}
    </HideMenuContext.Provider>
  );
};
