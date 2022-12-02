import BottomAppBar from "../home/organisms/bottomAppBar";
import TopAppBar from "../home/organisms/topAppBar";

const HelpPage = () => {
  return (
    <>
      <TopAppBar />
      <body>
        <div className="pt-20 p-4">
          <div>※検索は完全一致検索です</div>
          <div>※直近追加曲のデータが存在しない場合あり</div>
          <div>
            ※β版のため、ソフラン譜面のBPM検索には未対応です。また、同一楽曲は最上位レベルのみ表示する仕様です。今後のアプデで改善予定。
          </div>
        </div>
      </body>
      <BottomAppBar />
    </>
  );
};

export default HelpPage;
