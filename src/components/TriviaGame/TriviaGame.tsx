import { TextField } from "@material-ui/core";
import { useCallback, useEffect, useMemo, useState } from "react";
import { shuffle } from "../../helpers";
import Icon from "../Icon";
import TriviaContent from "./TriviaContent";
import "./TriviaGame.scss";
import TriviaGameOverComponent from "./TriviaGameOverComponent";
import TriviaRecordComponent from "./TriviaRecordComponent";
export enum AnswerNotifierStates {
  Correct,
  Incorrect,
}
export interface TriviaItem {
  category: string;
  correct_answer: string;
  difficulty: string;
  incorrect_answers: string[];
  question: string;
  type: string;
}

export interface Record {
  username: string;
  points: number;
  date: Date;
}

const TriviaGame = () => {
  const [answerMap, setAnswerMap] = useState<Map<number, string>>(
    new Map<number, string>()
  );
  const [answerNotifierState, setAnswerNotifierState] = useState<
    AnswerNotifierStates | undefined
  >(undefined);
  const [currentQuestionNumber, setCurrentQuestionNumber] =
    useState<number>(-1);
  const [currentQuestion, setCurrentQuestion] = useState<
    TriviaItem | undefined
  >(undefined);
  const [showSave, setShowSave] = useState<boolean>(false);
  const [points, setPoints] = useState<number>(0);
  const [data, setData] = useState<TriviaItem[]>([]);
  const getData = useCallback(async () => {
    fetch("https://opentdb.com/api.php?amount=10")
      .then((response) => response.json())
      .then((data) => {
        if (data.results) {
          setData(data.results);
          setCurrentQuestion(data.results[0]);
          setCurrentQuestionNumber(0);
        }
      });
  }, []);
  useEffect(() => {
    getData();
  }, [getData]);
  useEffect(() => {
    if (!showSave) {
      getData();
      setAnswerNotifierState(undefined);
      setCurrentQuestionNumber(0);
      setPoints(0);
      setCurrentQuestion(undefined);
      setAnswerMap(new Map<number, string>());
    }
  }, [showSave]);
  useMemo(() => {
    setCurrentQuestion(data[currentQuestionNumber]);
    setAnswerNotifierState(undefined);
  }, [currentQuestionNumber]);
  const updateMap = (value: string) => {
    if (currentQuestion && currentQuestion.correct_answer === value) {
      setAnswerNotifierState(AnswerNotifierStates.Correct);
      switch (currentQuestion.difficulty) {
        case "easy":
          setPoints(points + 1);
          break;
        case "medium":
          setPoints(points + 2);
          break;
        case "hard":
          setPoints(points + 3);
          break;
      }
    } else {
      setAnswerNotifierState(AnswerNotifierStates.Incorrect);
    }
    setAnswerMap(answerMap.set(currentQuestionNumber, value));
  };

  return (
    <div className="triviaComponent">
      <div className="headlineTwo">TrustLayer Trivia Game</div>
      {showSave ? (
        <TriviaRecordComponent
          data={data}
          points={points}
          setShowSave={setShowSave}
        />
      ) : (
        <>
          {currentQuestionNumber === 10 && (
            <TriviaGameOverComponent
              points={points}
              setShowSave={setShowSave}
            />
          )}
          {currentQuestion && (
            <TriviaContent
              answerMap={answerMap}
              updateMap={updateMap}
              item={currentQuestion}
              currentQuestion={currentQuestionNumber}
              numOfQuestions={data.length}
              setCurrentQuestionNumber={setCurrentQuestionNumber}
              points={points}
              answerNotifierState={answerNotifierState}
            />
          )}
        </>
      )}
    </div>
  );
};
export default TriviaGame;
