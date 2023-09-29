"use client";

import { Input, InputProps, TextAreaProps, Textarea } from "@nextui-org/react";
import React, { FC, useMemo } from "react";

type ComponentProps = InputProps & TextAreaProps;

interface InlineInputProps extends ComponentProps {
  Title: string | React.ReactNode | undefined;
  Variant?: "input" | "textarea";
  onConfirm?: () => void;
}

const componentMap = {
  input: Input,
  textarea: Textarea,
};

const InlineInput = React.forwardRef<HTMLInputElement, InlineInputProps>(
  ({ Title, Variant = "input", onConfirm, onBlur, ...props }, ref) => {
    const [isFocused, setIsFocused] = React.useState(false);

    const showInput = () => {
      setIsFocused(true);
    };

    const hideInput = () => {
      setIsFocused(false);
      onConfirm?.();
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        hideInput();
      }
    };

    const Component = useMemo(() => componentMap[Variant], [Variant]);

    return (
      <>
        {isFocused ? (
          <Component
            ref={ref}
            onBlur={(e) => {
              hideInput();
              onBlur?.(e);
            }}
            autoFocus
            variant="underlined"
            onKeyDown={handleKeyDown}
            {...props}
          />
        ) : (
          <div onFocus={showInput} onClick={showInput} className="cursor-text">
            {Title}
          </div>
        )}
      </>
    );
  }
);

InlineInput.displayName = "InlineInput";

export default InlineInput;
