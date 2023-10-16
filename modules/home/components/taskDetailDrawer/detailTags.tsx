"use client";

import useGetTags from "@/modules/tags/services/useGetTags";
import { Button } from "@nextui-org/button";
import { Chip, Select, SelectItem, SelectedItems } from "@nextui-org/react";
import { FC, useCallback, useState } from "react";
import ModalAddTag from "../modalAddTag";

interface DetailTagsProps {
  value?: string[];
  onChange?: (value: string[]) => void;
  projectId?: string;
}

const DetailTags: FC<DetailTagsProps> = ({ value, onChange, projectId }) => {
  const [isOpen, setOpen] = useState(false);
  const { data } = useGetTags(projectId || "", {
    enabled: !!projectId,
  });

  const renderValue = useCallback(
    (items: SelectedItems<object>) => {
      return (
        <div className="w-full flex gap-1 flex-wrap items-center">
          {items.map((item) => {
            const itemFounded = data?.data?.find((tag) => tag.id === item.key);
            return (
              <Chip
                key={item.key}
                style={{
                  backgroundColor: itemFounded?.color,
                }}
                size="sm"
                radius="sm"
              >
                {item.textValue}
              </Chip>
            );
          })}
        </div>
      );
    },
    [data?.data]
  );
  return (
    <>
      <div className="flex items-center gap-x-2">
        <Select
          size="sm"
          radius="sm"
          selectionMode="multiple"
          label={null}
          labelPlacement="outside"
          placeholder="Select tags"
          renderValue={renderValue}
          selectedKeys={new Set(value || [])}
          onChange={(e) => onChange?.(e.target.value.split(","))}
        >
          {(data?.data || []).map((tag) => (
            <SelectItem key={tag.id} value={tag.id} textValue={tag.name}>
              {tag.name}
            </SelectItem>
          ))}
        </Select>
        <Button
          size="sm"
          radius="sm"
          color="primary"
          onClick={() => setOpen(true)}
        >
          New Tag
        </Button>
      </div>
      <ModalAddTag
        projectId={projectId || ""}
        isOpen={isOpen}
        onOpenChange={setOpen}
      />
    </>
  );
};

export default DetailTags;
