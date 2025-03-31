import { Link } from 'react-router-dom';
import logo from '../assets/receptskalen-logo.png';

const Header = () => {
  return (
    <header className="bg-header shadow-md">
      <div className="max-w-6xl mx-auto px-6 pb-2 flex flex-col items-center justify-center text-center">
        {/*logotyp*/}
        <Link to="/">
          <img src={logo} alt="ReceptSkålen" className="h-28 w-auto" />
        </Link>

        {/*navigering*/}
        <nav className="space-x-6 text-sm pt-4 font-medium">
          <Link to="/" className="text-gray-700 hover:text-black transition">
            Hem
          </Link>
          <Link to="/favoriter" className="text-gray-700 hover:text-black transition">
            Mina favoriter
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;