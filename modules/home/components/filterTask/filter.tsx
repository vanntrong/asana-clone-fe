import { LikeIcon } from "@/components/icons/like";
import { Button } from "@nextui-org/button";
import React from "react";

export interface FilterProps {
  className?: string;
  title: string;
  icon: React.ReactNode;
  onClick?: () => void;
}

const Filter = ({ title, icon, ...props }: FilterProps) => {
  return (
    <Button
      startContent={icon}
      size="sm"
      variant="bordered"
      radius="lg"
      className="h-fit py-1 px-3"
      {...props}
    >
      {title}
    </Button>
  );
};

export default Filter;
