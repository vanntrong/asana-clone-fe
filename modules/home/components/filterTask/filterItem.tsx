import { Button } from "@nextui-org/button";
import React from "react";

export interface FilterItemProps {
  className?: string;
  title: string;
  icon: React.ReactNode;
  onClick?: () => void;
  key: string;
  value: any;
  isActive?: boolean;
  converter?: (value: string) => any;
}

const FilterItem = ({
  title,
  icon,
  key,
  value,
  isActive,
  ...props
}: FilterItemProps) => {
  return (
    <Button
      startContent={icon}
      size="sm"
      variant="bordered"
      radius="lg"
      className="h-fit py-1 px-3"
      color={isActive ? "primary" : "default"}
      {...props}
    >
      {title}
    </Button>
  );
};

export default FilterItem;
