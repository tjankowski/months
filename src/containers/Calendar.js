import React, { useContext } from "react";
import styled from "styled-components";
import moment from "moment";
import iconNext from "../icons/arrow.forward.svg";
import iconPrev from "../icons/arrow.back.svg";
import Day from "../components/Day";
import NewGoalForm from "../components/NewGoalForm";
import { StoreContext } from "../store";

const CenterContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  @media print {
    max-width: 100%;
  }
`;

const Calendar = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 2rem;

  @media print {
    grid-template-columns: repeat(7, 1fr);
    gap: 0.25cm;
  }
`;

const Month = styled.h1`
  grid-column: 1 / span 7;
  font-size: 3rem;
  margin: 3rem 0;
  display: flex;
  justify-content: space-between;
`;

const WeekDay = styled.div`
  font-size: 1.5rem;
  margin: 1rem 0 0.5rem;
`;

const Icon = styled.img`
  width: 2rem;
  height: 2rem;
  cursor: pointer;
  transform: ${(props) => (props.left ? "rotate(180deg)" : null)};

  @media print {
    display: none;
  }
`;

function App() {
  const {
    state,
    actions: { nextMonth, prevMonth, newStep, newGoal },
  } = useContext(StoreContext);
  const { date, steps, goals } = state;

  const firstDayOfWeek = date.weekday();
  const lastDayOfMonth = date.clone().endOf("month");
  const lastDayOfMonthAsWeekday = lastDayOfMonth.weekday();
  const dailySteps = steps.reduce((byDay, step) => {
    byDay[step.date] = [byDay[step.date] || [], step.goal];
    return byDay;
  }, {});

  return (
    <CenterContainer>
      <Calendar>
        <Month>
          <Icon src={iconPrev} onClick={prevMonth} />
          <span>{date.format("MMMM")}</span>
          <span>{date.format("YYYY")}</span>
          <Icon src={iconNext} onClick={nextMonth} />
        </Month>
        {moment.weekdaysShort().map((weekDay, index) => (
          <WeekDay key={weekDay}>{weekDay}</WeekDay>
        ))}
        {[...Array(firstDayOfWeek).keys()].map((dayOfWeek) => {
          const day = date.clone().add(dayOfWeek - firstDayOfWeek, "days");
          return (
            <Day
              key={dayOfWeek}
              dayOfWeek={dayOfWeek}
              dayOfMonth={day.date()}
              disabled
            />
          );
        })}
        {[...Array(date.daysInMonth()).keys()].map((dayOfMonth) => {
          const day = date.clone().add(dayOfMonth, "days");
          const dailyGoals = goals.filter((goal) =>
            day.isBetween(goal.start, goal.end || day, "days", "[]")
          );
          return (
            <Day
              key={day.format()}
              dayOfWeek={day.weekday()}
              dayOfMonth={dayOfMonth + 1}
              dailyGoals={dailyGoals}
              selected={dailySteps[day] || []}
              toggleTask={(goalId) => () => newStep(day, goalId)}
            />
          );
        })}
        {[...Array(6 - lastDayOfMonthAsWeekday).keys()].map((dayOfWeek) => {
          const day = date.clone().add(dayOfWeek, "days");
          return (
            <Day
              key={dayOfWeek}
              dayOfWeek={lastDayOfMonthAsWeekday + dayOfWeek + 1}
              dayOfMonth={day.date()}
              disabled
            />
          );
        })}
      </Calendar>
      <NewGoalForm onSubmit={(value) => newGoal(value, moment())} />
    </CenterContainer>
  );
}

export default App;
