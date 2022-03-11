import {
  createContext,
  FunctionComponent,
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

export const HideMenuProvider: FunctionComponent = ({ children }) => {
  const [hide, setHide] = useState(false);
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
