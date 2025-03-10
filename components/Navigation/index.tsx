import Link from 'next/link';
import { FC } from 'react';
import { NAVIGATION_ITEMS } from '@/constants/navigation';
import { BiSolidShieldPlus } from "react-icons/bi";
import { NavigationItemType, NavigationPropTypes } from './navigation.types';



const Navigation: FC<NavigationPropTypes> = ({ }) => {
  return (
    <header className="text-gray-600 body-font border-b border-solid bg-white border-slate-200 fixed top-0 left-0 w-full z-50">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <a href='/' className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
          <BiSolidShieldPlus className="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full" />
          <span className="ml-3 text-xl">Smart Insurance</span>
        </a>
        <nav className="md:mr-auto md:ml-4 md:py-1 md:pl-4 md:border-l md:border-gray-400	flex flex-wrap items-center text-base justify-center">
          {NAVIGATION_ITEMS.map((item: NavigationItemType) => (
            <Link
              key={item.id}
              href={item.path}
              className="mr-5 hover:text-gray-900"
            >{item.label}</Link>
          ))}
        </nav>
      </div>
    </header>
  )
}

export default Navigation;
