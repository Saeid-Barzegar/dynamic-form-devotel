import tw from "tailwind-styled-components";

export const CheckBoxContainer = tw.div`flex flex-col space-y-2 mt-4`;
export const CheckBoxItem = tw.label`flex items-center space-x-2 cursor-pointer`;
export const CheckBoxElement = tw.input`w-5 h-5 cursor-pointer accent-indigo-500`;
export const CheckBoxLabel = tw.span`text-gray-800`;