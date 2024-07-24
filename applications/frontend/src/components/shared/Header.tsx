import { Navbar } from 'flowbite-react';
import { Link } from 'react-router-dom';

import logoUrl from '../../assets/images/logo.png';

export const Header = () => {
  return (
    <Navbar fluid rounded>
      <Navbar.Brand as={Link} href="https://calo.app">
        <img src={logoUrl} className="mr-3 h-6 sm:h-9" alt="Calo Logo" />
      </Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse>
      </Navbar.Collapse>
    </Navbar>
  );
};
