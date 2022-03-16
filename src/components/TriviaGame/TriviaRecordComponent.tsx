import { TextField } from "@material-ui/core";
import { useState } from "react";
import { compare, getRandomInt } from "../../helpers";
import { TriviaItem, Record } from "./TriviaGame";
import { format } from "date-fns";
const names = [
  "Matt Vaughn",
  "Emily Wood",
  "Justin Gist",
  "Eve Rivera",
  "Samira",
  "La Bouche",
  "Ratchet & Clank",
  "Gigi D'Agostino",
  "Cher",
  "Alice Deejay",
];
const TriviaRecordComponent = (props: {
  data: TriviaItem[];
  points: number;
  setShowSave: (value: boolean) => void;
}) => {
  const [displayHighScores, setDisplayHighScores] = useState<
    Record[] | undefined
  >(undefined);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const onChange = (type: string, e: any) => {
    const value = e.target.value;
    if (type === "email") {
      setEmail(value);
    } else {
      setPassword(value);
    }
  };
  const storageName = "TLHighScores";
  const generateHighScores = () => {
    const highScores: Record[] = [];
    for (let i = 0; i < 10; i++) {
      const record: Record = {
        username: names[i],
        points: getRandomInt(6, 20),
        date: new Date(),
      };
      highScores.push(record);
    }
    const sortedHighScores = highScores.sort(compare);
    return sortedHighScores;
  };
  const saveScore = () => {
    localStorage.setItem(storageName, "{}");
    let storage: Record[] = [];
    let highScores = JSON.parse(localStorage.getItem(storageName) ?? "");
    if (!highScores.data) highScores = generateHighScores();
    else if (highScores.data.length === 0) highScores = generateHighScores();
    else highScores = highScores.data;
    let higherScores: Record[] = [];
    const newRecord: Record = {
      username: email,
      points: props.points,
      date: new Date(),
    };
    for (let i = 0; i < highScores.length; i++) {
      let record = highScores[i];
      if (record.points > props.points) continue;
      higherScores = highScores.slice(0, i);
      higherScores.push(newRecord);
      const combinedArray = [
        ...higherScores,
        ...highScores.slice(i, highScores.length - 1),
      ];
      storage = combinedArray;
      break;
    }
    setDisplayHighScores(storage);
    localStorage.setItem(storageName, JSON.stringify({ data: storage }));
  };
  return displayHighScores != undefined ? (
    <div className="triviaContent">
      <div
        className="triviaHeader"
        style={{ marginTop: 8, justifyContent: "center" }}
      >
        <div className="headlineThree">High Scores</div>
      </div>
      <div className="triviaBody" style={{ alignItems: "initial" }}>
        {displayHighScores.length > 0 ? (
          displayHighScores.map((record: Record, i: number) => {
            return (
              <div
                className={
                  "recordItem" +
                  (email === record.username && props.points === record.points
                    ? " active"
                    : "")
                }
                style={{
                  color:
                    i < 3
                      ? "var(--theme-success)"
                      : i < 7
                      ? "var(--theme-warning)"
                      : "var(--theme-error)",
                }}
              >
                <div className="subtext">{record.username}</div>
                <div className="subtext">{record.points}</div>
                <div className="subtext" style={{ textAlign: "right" }}>
                  {format(record.date, "MM/dd/yyy")}
                </div>
              </div>
            );
          })
        ) : (
          <div
            className="headlineThree errorText"
            style={{ textAlign: "center" }}
          >
            Your score was too low to record!
          </div>
        )}
        <div
          className="button primary"
          onClick={() => props.setShowSave(false)}
        >
          Play Again
        </div>
      </div>
    </div>
  ) : (
    <div className="triviaContent">
      <div
        className="triviaHeader"
        style={{
          marginTop: 8,
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <div className="headlineThree">Record your score of </div>
        <span
          className="headlineTwo"
          style={{ color: "var(--theme-success", fontWeight: 700 }}
        >
          {props.points}
        </span>
      </div>
      <div className="triviaBody">
        <TextField
          value={email}
          label={"Enter your Email"}
          placeholder={"Email"}
          onChange={(e: any) => onChange("email", e)}
        />
        <TextField
          value={password}
          label={"Enter your Password"}
          placeholder={"Password"}
          onChange={(e: any) => onChange("password", e)}
        />
        {email != "" && password != "" && (
          <div className="button primary" onClick={() => saveScore()}>
            Save Score
          </div>
        )}
      </div>
    </div>
  );
};
export default TriviaRecordComponent;
