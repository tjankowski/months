import React from "react";
import styled from "styled-components";
import { Colors, shadow } from "../components/CommonStyles";

const GoalName = styled.span`
  font-size: 1.25em;
  font-weight: bold;
  margin-bottom: 1em;
`;

const Details = styled.div`
  font-size: 1em;
  grid-column-start: 8;
  grid-column-end: span 5;
  padding: 2rem;
  display: flex;
  flex-direction: column;
`;

export default function Goal({ goal, progress }) {
  return (
    <Details>
      <GoalName>{goal.name}</GoalName>
      <div>
        {goal.start.format("ll")}
        {goal.end ? ` - ${goal.end.format("ll")}` : null}
      </div>
      <div>{progress.steps.length} steps completed</div>
      <div>Last step made on {progress.steps[progress.steps.length-1].date.format("ll")}</div>
    </Details>
  );
}
