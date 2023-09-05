import Sidebar from "@/components/sidebar";
import ProjectHeader from "@/modules/home/components/projectHeader";
import ProjectSort from "../../components/projectSort";
import { Divider } from "@nextui-org/divider";
import Board from "../../components/board";

const HomePage = () => {
  return (
    <section className="flex">
      <Sidebar />
      <div className="pt-2 lg:pt-4 w-full">
        <ProjectHeader />
        <Divider className="my-2" />
        <ProjectSort />
        <Divider className="my-2" />
        <div className="px-4">
          <Board />
        </div>
      </div>
    </section>
  );
};

export default HomePage;
