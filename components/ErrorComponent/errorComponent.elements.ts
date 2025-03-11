import tw from "tailwind-styled-components";

export const ErrorContainer = tw.div`
  flex flex-col items-center justify-center w-full h-screen px-4
`;

export const MessageTitle = tw.h2`
  font-semibold text-[18pt] mt-10 md:text-[24pt] lg:text-[28pt] text-center
`;

export const MessageDescription = tw.p`
  mt-4 text-[14pt] md:text-[18pt] lg:text-[22pt] text-center
`;