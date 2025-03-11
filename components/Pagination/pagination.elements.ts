import tw from "tailwind-styled-components";

export const PaginationContainer = tw.div`mt-4 flex items-center space-x-2`;
export const Button = tw.button<{ isActive?: boolean }>`
  size-8 border rounded cursor-pointer
  flex justify-center items-center 
  disabled:opacity-50 disabled:cursor-not-allowed
  ${props => props.isActive && "bg-indigo-500 border-indigo-500 text-white"}
`;

export const DarkModeButton = tw.button`
  fixed sm:right-8 sm:top-10 md:right-8 md:top-5
  border border-solid border-indigo-500 rounded-full p-1
  text-xl text-indigo-500 cursor-pointer hover:bg-indigo-500 hover:text-white
`;