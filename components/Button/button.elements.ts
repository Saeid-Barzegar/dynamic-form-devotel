import tw from 'tailwind-styled-components';

export const ButtonElement = tw.button<{ $disabled?: boolean; }>`
  text-white px-12 py-4 rounded-md 
  ${props => props.disabled
    ? "cursor-not-allowed bg-gray-400"
    : "cursor-pointer bg-indigo-500 hover:bg-indigo-600"}
`;