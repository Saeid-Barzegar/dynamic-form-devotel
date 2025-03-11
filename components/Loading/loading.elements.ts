import tw from "tailwind-styled-components";

export const LoadingContainer = tw.div`
  fixed inset-0 flex items-center justify-center bg-transparent z-50
`;

export const LoadingSpinner = tw.span`
  relative size-10 rounded-full animate-spin -mt-[10em]
  border-4 border-transparent border-t-indigo-900 border-r-indigo-900
`;