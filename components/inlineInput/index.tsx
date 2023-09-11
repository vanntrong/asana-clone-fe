"use client";

import { Input, InputProps, TextAreaProps, Textarea } from "@nextui-org/react";
import React, { FC, useMemo } from "react";

type ComponentProps = InputProps & TextAreaProps;

interface InlineInputProps extends ComponentProps {
  Title: string | React.ReactNode | undefined;
  Variant?: "input" | "textarea";
}

const componentMap = {
  input: Input,
  textarea: Textarea,
};

const InlineInput: FC<InlineInputProps> = ({
  Title,
  Variant = "input",
  ...props
}) => {
  const [isFocused, setIsFocused] = React.useState(false);

  const showInput = () => {
    setIsFocused(true);
  };

  const hideInput = () => {
    setIsFocused(false);
  };

  const Component = useMemo(() => componentMap[Variant], [Variant]);

  return (
    <>
      {isFocused ? (
        <Component
          {...props}
          onBlur={hideInput}
          autoFocus
          variant="underlined"
        />
      ) : (
        <div onFocus={showInput} onClick={showInput} className="cursor-text">
          {Title}
        </div>
      )}
    </>
  );
};

export default InlineInput;
