import logoLight from "../../../images/logo-light.svg";
import logoDark from "../../../images/logo-dark.svg";
import { useTheme } from "../../providers/ThemeProvider";

const Logo = () => {
  const { theme } = useTheme();

  if (theme === "dark") {
    return (
      <img src={logoDark} className="mt-2 md:mt-3 lg:mt-3 w-30" alt="youtube" />
    );
  }

  if (theme === "light") {
    return (
      <img
        src={logoLight}
        className="mt-2 md:mt-3 lg:mt-3 w-30"
        alt="youtube"
      />
    );
  }
};

export default Logo;
