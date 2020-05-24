import React from "react";
import styled from "styled-components";

const ColorsContainer = styled.ul`
  display: flex;
  flex-direction: column;
`;

const Header = styled.h3`
  font-size: 1.5rem;
  margin: 1rem 0 1rem;
`;

const Color = styled.li`
  color: ${(props) => props.color};
`;

export default function GoalsLegend({ goals }) {
  return (
    <>
      <Header>Your goals</Header>
      <ColorsContainer>
        {goals.map((goal) => (
          <Color key={goal.id} color={goal.color}>
            {goal.name}
          </Color>
        ))}
      </ColorsContainer>
    </>
  );
}
