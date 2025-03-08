import tw from 'tailwind-styled-components';

export const InputLabel = tw.label`

`;

export const InputElement = tw.input`
  w-full p-3 text-sm text-gray-700 placeholder-gray-400 bg-white rounded-md
  focus:outline-none focus:border-indigo-500 focus:border-indigo-500
  focus-visible:ring-2 focus-visible:ring-indigo-300 focus-visible:border-indigo-300
  border border-solid border-gray-400 rounded-sm
  mt-2
`;

export const InputContainer = tw.div`
  flex flex-col w-full relative
`;
