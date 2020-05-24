import React from "react";
import styled from "styled-components";

const ColorsContainer = styled.div`
  display: flex;
`;

const Color = styled.div`
  width: 2rem;
  height: 2rem;
  disply: inline-block;
  background: ${(props) => props.color};
`;

export default function Colors({ colors }) {
  return (
    <ColorsContainer>
      {colors.map((color) => (
        <Color key={color} color={color} />
      ))}
    </ColorsContainer>
  );
}
