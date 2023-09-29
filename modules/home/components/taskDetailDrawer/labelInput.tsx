import clsx from "clsx";
import React from "react";

interface LabelInputProps {
  children: React.ReactNode;
  label: string;
  vertical?: boolean;
}

const LabelInput = ({ children, label, vertical = false }: LabelInputProps) => {
  return (
    <div
      className={clsx("flex", {
        "flex-col gap-y-2": vertical,
        "flex-row items-center": !vertical,
      })}
    >
      <label className="text-xs dark:text-gray-300 w-32 block">{label}</label>
      <div className="flex-1">{children}</div>
    </div>
  );
};

export default LabelInput;
