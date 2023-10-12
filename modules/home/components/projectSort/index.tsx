import { EyeFilledIcon, SortIcon } from "@/components/icons";
import { Button } from "@nextui-org/button";
import { Spacer } from "@nextui-org/spacer";
import FilterTask from "../filterTask";
import SortTask from "../sortTask";
import { FilterTaskProvider } from "../../contexts/filterTaskContext";

const ProjectSort = () => {
  return (
    <div className="px-6">
      <div className="flex">
        <FilterTaskProvider>
          <FilterTask />
        </FilterTaskProvider>
        <Spacer x={2} />
        {/* <SortTask /> */}
        <Spacer x={2} />
        {/* <Button
          size="sm"
          variant="light"
          startContent={<EyeFilledIcon size={14} />}
        >
          Hide
        </Button> */}
      </div>
    </div>
  );
};

export default ProjectSort;
