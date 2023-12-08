import "./style.scss";
import SingleQuest from "../SingleQuest";

function QuestNFT({ quests }) {
  return (
    <section className="QuestNFT container">
      <h2>Quest NFTs</h2>
      <div className="QuestNFT__label">Complete each quest to claim</div>
      <div className="QuestNFT__list">
        {quests.map((item) => {
          return <SingleQuest params={item} />;
        })}
      </div>
    </section>
  );
}

export default QuestNFT;
