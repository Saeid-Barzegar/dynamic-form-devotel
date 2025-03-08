import tw from "tailwind-styled-components";

export const SelectInputContainer = tw.div`relative`;
export const MainLabel = tw.label`block font-medium text-gray-900 text-lg`;
export const SelectBox = tw.select`
  appearance-none mt-1.5 w-full px-2 py-3 cursor-pointer
  rounded-md border border-solid border-gray-400
  text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent
  bg-white pr-10
`;
export const SelectOption = tw.option`text-gray-700`;