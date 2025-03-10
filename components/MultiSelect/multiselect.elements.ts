import tw from "tailwind-styled-components";


export const MultiSelectContainer = tw.div`relative w-full`;
export const MainView = tw.button`w-full flex justify-between items-center px-4 py-2 border rounded-md border-gray-400 bg-white shadow-sm focus:outline-none cursor-pointer`;
export const MainLabel = tw.span`text-md`;
export const MenuContainer = tw.div`absolute mt-1 w-full bg-white border rounded-md border-gray-400 shadow-md z-10 py-3`;
export const RowLabel = tw.label`flex items-center gap-2 px-4 py-2 hover:bg-gray-100 cursor-pointer`;
export const CheckBox = tw.input`form-checkbox h-4 w-4`;