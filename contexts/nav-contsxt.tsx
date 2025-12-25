import {
  createContext,
  useContext,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";
import type { ChildrenType } from "types/type";

type Ctx = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

const NavContext = createContext<Ctx | null>(null);

const NavProvider = ({ children }: ChildrenType) => {
  const [open, setOpen] = useState(false);
  return (
    <NavContext.Provider value={{ open, setOpen }}>
      {children}
    </NavContext.Provider>
  );
};

const useNavContext = () => {
  const ctx = useContext(NavContext);
  if (!ctx) throw new Error("useNavContext must be used within NavProvider");
  return ctx;
};

export { NavProvider, useNavContext };
