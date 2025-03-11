"use client";

import React from "react";
import { LoadingPropTypes } from "./loading.types";
import { LoadingContainer, LoadingSpinner } from "./loading.elements";

const Loading: React.FC<LoadingPropTypes> = ({ isLoading = false }) => {
  return isLoading && (
    <LoadingContainer>
      <LoadingSpinner />
    </LoadingContainer>
  );
};

export default Loading;
