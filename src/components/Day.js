import React from "react";
import { Colors, shadow } from "./CommonStyles";
import styled from "styled-components";

const Task = styled.div`
  width: 1rem;
  height: 1rem;
  border: 1px solid
    ${(props) => (props.completed ? "transparent" : props.color)};
  border-radius: ${(props) => (props.completed ? "50%" : "0")};
  margin-left: 0.5rem;
  margin-top: 0.5rem;
  transition: all 0.5s ease;
  cursor: pointer;
  overflow: hidden;
  position: relative;

  @media print {
    margin-left: 0.25rem;
    width: 0.5rem;
    height: 0.5rem;
  }

  &::after {
    border: 1px solid transparent;
    position: absolute;
    transition: all 1s ease;
    content: "";
    border-radius: 50%;
    background: ${(props) => props.color};
    top: -1px;
    left: -1px;
    width: 1rem;
    height: 1rem;
    transform-origin: center;
    transform: ${(props) => (props.completed ? "scale(1.2)" : "scale(.2)")};
    opacity: ${(props) => (props.completed ? "1" : "0")};
  }
`;

const DayNumber = styled.div`
  font-family: "Arvo", serif;
  font-size: 1.5rem;
`;

const Tasks = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  flex-wrap: wrap-reverse;
`;

const DayContainer = styled.div`
  padding: .5rem;
  width: 8rem;
  height: 8rem;
  border-radius: .5rem;
  background: ${(props) => (props.disabled ? Colors.transparent : Colors.white)};;
  color: ${(props) => (props.disabled ? Colors.lightGray : Colors.gray)};
  box-shadow: ${({ disabled }) => shadow(disabled)};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: transform .5s cubic-bezier(0.455, 0.030, 0.515, 0.955);
  grid-column: ${(props) => (props.dayOfWeek % 7) + 1};
  overflow: hidden;

  @media print {
    // A4 21x29.7 cm
    width: 2.5cm;
    height: 2.5cm;
  }

  &:hover {
    // transform: ${(props) => (props.disabled ? null : "scale(1.5)")};
  }
`;

const Day = ({
  dayOfMonth,
  dayOfWeek,
  disabled,
  dailyGoals,
  selected,
  toggleTask,
}) => {
  return (
    <DayContainer disabled={disabled} dayOfWeek={dayOfWeek}>
      <DayNumber>{dayOfMonth}</DayNumber>
      {!disabled && (
        <Tasks>
          {dailyGoals.map((goal, index) => (
            <Task
              key={`${goal.id}`}
              completed={selected.includes(goal.id)}
              color={goal.color}
              onClick={toggleTask(goal.id)}
            ></Task>
          ))}
        </Tasks>
      )}
    </DayContainer>
  );
};

export default Day;
