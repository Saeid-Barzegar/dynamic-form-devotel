import React from "react";
import { TbAlertOctagonFilled } from "react-icons/tb";
import { ErrorComponentPropTypes } from "./errorComponent.types";
import { ErrorContainer, MessageDescription, MessageTitle } from "./errorComponent.elements";

const ErrorComponent: React.FC<ErrorComponentPropTypes> = ({
  message = "Please contact support team.",
}) => {
  return (
    <ErrorContainer>
      <TbAlertOctagonFilled className="text-indigo-500 mt-[-10vh] text-[80pt] md:text-[120pt] lg:text-[140pt]" />
      <MessageTitle>
        Oops, something went wrong!
      </MessageTitle>
      <MessageDescription>
        {message}
      </MessageDescription>
    </ErrorContainer>
  );
};

export default ErrorComponent;
