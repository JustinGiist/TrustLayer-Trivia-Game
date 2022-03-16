import { CurrencyBdt } from "mdi-material-ui";
import { useEffect, useState } from "react";
import { shuffle } from "../../helpers";
import Icon from "../Icon";
import { AnswerNotifierStates, TriviaItem } from "./TriviaGame";

export interface TriviaContentProps {
  updateMap: (value: string) => void;
  item: TriviaItem;
  currentQuestion: number;
  numOfQuestions: number;
  setCurrentQuestionNumber: (value: number) => void;
  points: number;
  answerNotifierState: AnswerNotifierStates | undefined;
  answerMap: Map<number, string>;
}
export interface ButtonElementProps {
  currentQuestion: number;
  setCurrentQuestionNumber: (value: number) => void;
  numOfQuestions: number;
  canProceed: boolean;
}
const TriviaContent = (props: TriviaContentProps) => {
  const [selectedAnswer, setSelectedAnswer] = useState<string | undefined>(
    undefined
  );
  const [answers, setAnswers] = useState<string[]>([]);
  useEffect(() => {
    const oldAnswer = props.answerMap.get(props.currentQuestion);
    if (oldAnswer != undefined) {
      setSelectedAnswer(oldAnswer);
      const tempAnswers: string[] = shuffle([
        props.item.correct_answer,
        ...props.item.incorrect_answers,
      ]);
      setAnswers(tempAnswers);
    } else {
      setSelectedAnswer(undefined);
      const tempAnswers: string[] = shuffle([
        props.item.correct_answer,
        ...props.item.incorrect_answers,
      ]);
      setAnswers(tempAnswers);
    }
  }, [props.currentQuestion, props.item]);
  useEffect(() => {
    if (selectedAnswer) props.updateMap(selectedAnswer);
  }, [selectedAnswer]);
  return (
    <div className="triviaContent">
      <div className="triviaHeader">
        <div className="left">
          <div className="headlineTwo">Trivia </div>
          <span className="subtextTitle">
            {props.currentQuestion + 1} out of {props.numOfQuestions}
          </span>
        </div>
        <div className="right">
          <div className={"flex-column " + props.item.difficulty}>
            <div className="subtextTitle">Difficulty</div>
            <div className="subtext">{props.item.difficulty}</div>
          </div>
          <div className="flex-column info">
            <div className="subtextTitle">Category</div>
            <div className="subtext">{props.item.category}</div>
          </div>
        </div>
      </div>
      <div className="triviaBody" style={{ alignItems: "flex-start" }}>
        <div
          className="headlineFive"
          dangerouslySetInnerHTML={{ __html: props.item.question }}
        ></div>
        <div style={{ marginTop: 16 }}>
          {answers.map((answer) => {
            return (
              <div className="flex">
                <input
                  disabled={Boolean(selectedAnswer)}
                  type="radio"
                  value={answer}
                  checked={selectedAnswer === answer}
                  onChange={(e: any) => {
                    setSelectedAnswer(e.target.value);
                  }}
                />
                <div
                  className="subtext"
                  dangerouslySetInnerHTML={{ __html: answer }}
                ></div>
              </div>
            );
          })}
        </div>
      </div>
      <div
        className="flex"
        style={{ justifyContent: "space-between", marginTop: 24 }}
      >
        <div className="flex">
          <div className="headlineFive">Points: {props.points}</div>
          {props.answerNotifierState != undefined && (
            <div
              className={
                "notifier" +
                (props.answerNotifierState === AnswerNotifierStates.Correct
                  ? " correct"
                  : " incorrect")
              }
            >
              <Icon
                icon={
                  props.answerNotifierState === AnswerNotifierStates.Correct
                    ? "Check"
                    : "Close"
                }
              />
              {AnswerNotifierStates[props.answerNotifierState]}
            </div>
          )}
        </div>
        <ButtonElement
          currentQuestion={props.currentQuestion}
          setCurrentQuestionNumber={props.setCurrentQuestionNumber}
          numOfQuestions={props.numOfQuestions}
          canProceed={Boolean(selectedAnswer)}
        />
      </div>
    </div>
  );
};
const ButtonElement = (props: ButtonElementProps) => {
  const changeQuestion = (value: number) => {
    props.setCurrentQuestionNumber(props.currentQuestion + value);
  };
  return (
    <div className="buttonContainer">
      {props.currentQuestion !== 0 && (
        <div className="button secondary" onClick={() => changeQuestion(-1)}>
          Back
        </div>
      )}
      {props.currentQuestion !== props.numOfQuestions && props.canProceed && (
        <div className="button primary" onClick={() => changeQuestion(1)}>
          Next
        </div>
      )}
    </div>
  );
};
export default TriviaContent;
