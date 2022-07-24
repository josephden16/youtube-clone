import {
  createContext,
  FC,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

import { Theme } from "../../typings";

interface ThemeProviderProps {
  children: ReactNode;
}

interface ThemeContextInterface {
  theme: Theme;
  updateThemeContext: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextInterface>({
  theme: "light",
  updateThemeContext: () => undefined,
});

const ThemeProvider: FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState<Theme | null>(null);

  useEffect(() => {
    // On page load or when changing themes, best to add inline in `head` to avoid FOUC
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  useEffect(() => {
    if (
      localStorage.theme === "dark" ||
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  }, []);

  if (theme)
    return (
      <ThemeContext.Provider value={{ theme, updateThemeContext: setTheme }}>
        {children}
      </ThemeContext.Provider>
    );

  return null;
};

export const useTheme = (): ThemeContextInterface => {
  const value = useContext(ThemeContext);
  return value;
};

export default ThemeProvider;
