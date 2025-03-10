import tw from "tailwind-styled-components";

export const MainContainer = tw.div`mt-4`;

export const MainLabel = tw.span`block mb-4`;

export const RadioContainer = tw.div`flex items-center space-x-2 mb-2 pl-2`;

export const RadioElement = tw.input`
  w-5 h-5 cursor-pointer appearance-none border border-gray-400 rounded-full
  checked:border-indigo-500 checked:bg-indigo-500 checked:ring-1 checked:ring-indigo-300
  transition-all duration-200
`;

export const RadioLabel = tw.label`cursor-pointer`;