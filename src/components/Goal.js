import React from "react";
import styled from "styled-components";
import { Colors } from "./CommonStyles";

const GoalName = styled.span`
  font-size: 1.25em;
  font-weight: bold;
  margin-bottom: 1em;
`;

const Details = styled.div`
  font-size: 1em;
  display: flex;
  flex-direction: column;
`;

const Row = styled.div`
  margin-bottom: 1rem;
`;

const Value = styled.span`
  color: ${Colors.pink};
`;

export default function Goal({ goal, progress }) {
  return (
    <Details>
      <GoalName>{goal.name}</GoalName>
      <Row>{goal.end ? ` - ${goal.end.format("ll")}` : null}</Row>
      <Row>
        <Value>{progress.steps.length}</Value> steps completed
      </Row>
      <Row>
        Last step made on {" "}
        <Value>
          {progress.steps[progress.steps.length - 1].date.format("ll")}
        </Value>
      </Row>
      <Row>
        Created at <Value>{goal.start.format("ll")}</Value>
      </Row>
      <Row>
        Ends on{" "}
        <Value>
          {goal.end ? `${goal.end.format("ll")}` : "(set end date)"}
        </Value>
      </Row>
      <Row>
      Current streak
      </Row>
      <Row>
      Longest streak
      </Row>
      <Row>
      Time Progress
      </Row>
      <Row>
      Success ratio - steps / to all possible steps
      </Row>
    </Details>
  );
}
