import tw from 'tailwind-styled-components';

export const NavigationContainer = tw.header`text-gray-600 body-font border-b border-solid bg-white border-slate-200 fixed top-0 left-0 w-full z-50`;
export const Wrapper = tw.div`container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center`;
export const LogoContainer = tw.a`flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0`;
export const Title = tw.span`ml-3 text-xl`;
export const NavBar = tw.nav`md:mr-auto md:ml-4 md:py-1 md:pl-4 md:border-l md:border-gray-400	flex flex-wrap items-center text-base justify-center`;