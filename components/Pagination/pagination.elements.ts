import tw from "tailwind-styled-components";

export const PaginationContainer = tw.div`mt-4 flex items-center space-x-2`;
export const Button = tw.button<{ isactive?: boolean }>`
  size-8 border rounded cursor-pointer
  flex justify-center items-center 
  disabled:opacity-50 disabled:cursor-not-allowed
  ${props => props.isactive && "bg-indigo-500 border-indigo-500 text-white"}
`;