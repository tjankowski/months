import React, { useState, useContext } from "react";
import styled from "styled-components";
import NewGoalForm from "../components/NewGoalForm";
import { Colors, shadow } from "../components/CommonStyles";
import Goal from "../components/Goal";
import { StoreContext } from "../store";

const Header = styled.h1`
  font-size: 3rem;
  margin: 1em 0 4rem;
`;

const Container = styled.main`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 1rem;
`;

const List = styled.ul`
  grid-column-end: span 6;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 1rem;
  align-items: start;
`;

const ListItem = styled.li`
  background: ${({ selected }) => (selected ? Colors.pink : Colors.white)};
  box-shadow: ${shadow()};
  padding: 2rem;
  grid-column-end: span 3;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 0.5em;
  cursor: pointer;
`;

const GoalDetails = styled.div`
  display: flex;
  justify-content: space-between;
`;

const GoalName = styled.span`
  font-size: 1em;
  margin-bottom: 1em;
`;

function Goals() {
  const { state, actions } = useContext(StoreContext);
  const [selected, setSelected] = useState(null);
  const { goals, steps } = state;
  const progress = selected ? {
    steps: steps.filter((item) => item.goal === selected.id)
  } : null;
  return (
    <>
      <Header>Goals</Header>
      <Container>
        <List>
          {goals.map((goal, index) => (
            <ListItem
              key={goal.id}
              selected={goal.id === (selected && selected.id)}
              onClick={() => setSelected(goal)}
            >
              <GoalName>{goal.name}</GoalName>
              <GoalDetails>
                <span>{goal.start.format("ll")}</span>
                <span>{goal.end ? goal.end.format("ll") : null}</span>
              </GoalDetails>
            </ListItem>
          ))}
        </List>
        {selected != null && <Goal goal={selected} progress={progress} />}
      </Container>
      <NewGoalForm onSubmit={() => actions.loadGoals()} />
    </>
  );
}

export default Goals;
