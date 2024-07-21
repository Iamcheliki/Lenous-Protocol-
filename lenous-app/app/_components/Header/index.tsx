import Image from 'next/image';
import Link from 'next/link';
import NavBar from './NavBar';
import TokenPricesNav from './TokenPricesNav';

const Header = () => {
  return (
    <>
      <NavBar />
      <TokenPricesNav />
    </>
  );
};
export default Header;
