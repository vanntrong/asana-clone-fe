import { EyeFilledIcon, SortIcon } from "@/components/icons";
import { Button } from "@nextui-org/button";
import { Spacer } from "@nextui-org/spacer";
import FilterTask from "../filterTask";

const ProjectSort = () => {
  return (
    <div className="px-6">
      <div className="flex">
        <FilterTask />
        <Spacer x={2} />
        <Button size="sm" variant="light" startContent={<SortIcon size={14} />}>
          Sort
        </Button>
        <Spacer x={2} />
        <Button
          size="sm"
          variant="light"
          startContent={<EyeFilledIcon size={14} />}
        >
          Hide
        </Button>
      </div>
    </div>
  );
};

export default ProjectSort;
