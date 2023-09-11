import Sidebar from "@/components/sidebar";
import ProjectHeader from "@/modules/home/components/projectHeader";
import ProjectSort from "@/modules/home/components/projectSort";
import { Divider } from "@nextui-org/divider";
import Board from "@/modules/home/components/board";
import AddBoard from "@/modules/home/components/addBoard";

const HomePage = () => {
  return (
    <section className="flex">
      <Sidebar />
      <div className="pt-2 lg:pt-4 w-full flex flex-col h-[calc(100vh-48px)]">
        <ProjectHeader />
        <Divider className="my-2" />
        <ProjectSort />
        <Divider className="my-2" />
        <div className="px-4 min-h-0 flex gap-x-4">
          <Board />
          <AddBoard />
        </div>
      </div>
    </section>
  );
};

export default HomePage;
