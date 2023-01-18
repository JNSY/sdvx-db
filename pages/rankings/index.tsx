import PucNumberRankTable from "../home/molecules/pucNumberRankTable";
import BottomAppBar from "../home/organisms/bottomAppBar";
import TopAppBar from "../home/organisms/topAppBar";

const Rankings = () => {
  return (
    <>
      <TopAppBar />
      <body>
        <div className="pt-20 p-4"></div>
        <div className="flex max-w-7xl justify-center">
          <PucNumberRankTable />
        </div>
      </body>
      <BottomAppBar />
    </>
  );
};

export default Rankings;
