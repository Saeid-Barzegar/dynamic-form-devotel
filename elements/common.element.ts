import tw from "tailwind-styled-components";

export const PageContainer = tw.div`
  w-full h-min-svh flex flex-col px-6 pt-36 md:pt-28 pb-18
  justify-start items-center
`;
export const ErrorMessage = tw.p`text-red-500 text-sm mt-1`;