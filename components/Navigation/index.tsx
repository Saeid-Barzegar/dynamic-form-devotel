"use client"

import { FC } from 'react';
import Link from 'next/link';
import { usePathname } from "next/navigation";
import { NAVIGATION_ITEMS } from '@/constants/navigation';
import { BiSolidShieldPlus } from "react-icons/bi";
import { NavigationItemType, NavigationPropTypes } from './navigation.types';
import { LogoContainer, NavBar, NavigationContainer, Title, Wrapper } from './navigation.elements';

const Navigation: FC<NavigationPropTypes> = ({ title }) => {
  const pathname = usePathname();
  return (
    <NavigationContainer>
      <Wrapper>
        <LogoContainer href='/'>
          <BiSolidShieldPlus className="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full" />
          <Title>{title}</Title>
        </LogoContainer>
        <NavBar>
          {NAVIGATION_ITEMS.map((item: NavigationItemType) => (
            <Link
              key={item.id}
              href={item.path}
              className={`mr-5 hover:text-indigo-500 ${pathname === item.path && "text-indigo-500"}`}
            >{item.label}</Link>
          ))}
        </NavBar>
      </Wrapper>
    </NavigationContainer>
  )
}

export default Navigation;
