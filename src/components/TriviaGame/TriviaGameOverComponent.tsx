const TriviaGameOverComponent = (props: {
  points: number;
  setShowSave: (value: boolean) => void;
}) => {
  return (
    <div className="triviaContent">
      <div className="triviaHeader" style={{ justifyContent: "center" }}>
        <div className="headlineThree">Game Over</div>
      </div>
      <div className="triviaBody">
        <div className="headlineFive" style={{ textAlign: "center" }}>
          Congratulations on completing the game! Here is your score!
        </div>
        <div className="headlineOne ">{props.points}</div>
        <div className="headlineFour">Want to save your score?</div>
        <div className="button primary" onClick={() => props.setShowSave(true)}>
          Save Score
        </div>
      </div>
    </div>
  );
};
export default TriviaGameOverComponent;
