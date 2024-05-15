/* eslint-disable react/prop-types */
import React, { useState } from "react";
import "./styles.css";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import PersonIcon from "@mui/icons-material/Person";
import { Avatar } from "@mui/material";
import TypingText from "./typingText";

const ChatMessage = ({
  user,
  listQuestions,
  answer,
  handlerFindAnswer,
  handlerPushNewQuestion,
  scrollToBottom
}) => {
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const [isAddQuestions, setIsAddQuestion] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  console.log(answer)
  const handleTypingComplete = () => {
    setIsTypingComplete(true);
  };
  const handleButtionAnswer = (id) => {
    if (isClicked) return;
    setIsClicked(true);
    handlerFindAnswer(id);
  };
  const pushQuestion = () => {
    handlerPushNewQuestion();
    setIsAddQuestion(true);
  };

  return (
    <div className={user ? "message-wrapper user" : "message-wrapper"} >
      <section className="message-inner-container">
        <div className={user ? "message-avatar-container user" : "message-avatar-container"}>
          {user ? (
            <Avatar sx={{ width: 30, height: 30 }} className="message-avatar user">
              <PersonIcon sx={{ fontSize: "1.15rem" }} className="message-avatar-icon" />
            </Avatar>
          ) : (
            <Avatar sx={{ width: 30, height: 30 }} className="message-avatar">
              <SmartToyIcon sx={{ fontSize: "1.15rem" }} className="message-avatar-icon" />
            </Avatar>
          )}
        </div>
        <div className={user ? "message-content-container user" : "message-content-container"}>
          {user ? (
            listQuestions?.map((question, i) => {
              
              return (
                <button
                  id={i}
                  className={isClicked ? "buttonQuestionDisable" : "buttonQuestion"}
                  onClick={() => handleButtionAnswer(question.id)}
                  disabled={isClicked}
                  key={i}
                >
                 {i+1}. {question?.question}
                </button>
              );
            })
          ) : (
            <TypingText
              text={answer}
              speed={50}
              scrollToBottom={scrollToBottom}
              onComplete={handleTypingComplete}
              pushQuestion={pushQuestion}
              boolFinish={isAddQuestions}
            />
          )}
        </div>
      </section>
    </div>
  );
};

export default ChatMessage;
