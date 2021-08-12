import logoLight from '../../../images/logo-dark.svg';
import logoDark from '../../../images/logo-light.svg';


const Logo = ({ theme }) => {
  let classList = document.documentElement.classList;

  if (classList.contains("dark") || theme === "dark") {
    return <img src={logoDark} className="mt-2 md:mt-3 lg:mt-3 w-30" alt="youtube" />
  }

  if (!(classList.contains("dark")) || theme === "light") {
    return <img src={logoLight} className="mt-2 md:mt-3 lg:mt-3 w-30" alt="youtube" />
  }
}


export default Logo;
