import { Button } from "@nextui-org/button";
import { Spacer } from "@nextui-org/spacer";
import React from "react";

const ProjectSort = () => {
  return (
    <div className="px-6">
      <div className="flex">
        <Button size="sm" variant="light">
          Filter
        </Button>
        <Spacer x={2} />
        <Button size="sm" variant="light">
          Sort
        </Button>
        <Spacer x={2} />
        <Button size="sm" variant="light">
          Hide
        </Button>
      </div>
    </div>
  );
};

export default ProjectSort;
