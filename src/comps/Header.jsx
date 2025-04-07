import { NavLink } from 'react-router-dom';
import logo from '../assets/receptskalen-logo.png';

const Header = () => {
  return (
    <header className="bg-header shadow-md">
      <div className="max-w-6xl mx-auto px-6 pb-2 flex flex-col items-center justify-center text-center">

        {/*logotyp*/}
        <NavLink to="/">
          <img src={logo} alt="ReceptSkålen" className="h-28 w-auto" />
        </NavLink>

        {/*navigering*/}
        <nav className="space-x-6 text-sm pt-4 font-medium">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "text-black font-semibold underline underline-offset-4"
                : "text-gray-700 hover:text-black transition"
            }
          >
            Hem
          </NavLink>

          <NavLink
            to="/favoriter"
            className={({ isActive }) =>
              isActive
                ? "text-black font-semibold underline underline-offset-4"
                : "text-gray-700 hover:text-black transition"
            }
          >
            Mina favoriter
          </NavLink>
        </nav>
      </div>
    </header>
  );
};

export default Header;
