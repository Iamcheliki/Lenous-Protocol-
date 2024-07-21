import Image from 'next/image';
import Link from 'next/link';
import RightNav from './RightNav';

const NavBar = () => {
  return (
    <div className="container flex justify-between items-center py-3">
      <div className="headerLeft flex items-center">
        <Image
          src="/images/Platform_Logo.svg"
          width="110"
          height="42"
          alt="lenous"
        />
        <div className="mainMenu ml-8">
          <ul className="flex  text-neutral-light">
            <li className="p-4">
              <Link href="/">Home</Link>
            </li>
            <li className="p-4">
              <Link href="/trade">Trade</Link>
            </li>
            <li className="p-4">
              <Link href="/swap">Swap</Link>
            </li>
            <li className="p-4">
              <Link href="/pools">Pools</Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="headerRight ">
        <RightNav />
      </div>
    </div>
  );
};
export default NavBar;
