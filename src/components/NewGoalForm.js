import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { ReactComponent as IconAdd } from "../icons/add.svg";
import { ReactComponent as IconNext } from "../icons/arrow.forward.svg";

const Form = styled.div`
  position: fixed;
  width: 4rem;
  height: 4rem;
  bottom: 2rem;
  right: 2rem;
`;

const InputWrapper = styled.div`
  overflow: visible;
  position: absolute;
  border-radius: 50%;
  height: 4rem;
  transition: all 1s ease;
  width: ${(props) => (props.visible ? "20rem" : "0")};
  opacity: ${(props) => (props.visible ? 1 : 1)};
  right: 2rem;
  background: transparent;
`;

const Input = styled.input`
  border-radius: 0;
  position: absolute;
  right: 0;
  width: 100%;
  height: 4rem;
  padding-right: ${(props) => (props.visible ? "3rem" : 0)};
  background: #f40552;
  color: #ffffff;
  border: none;
  transition: all 1s ease;

  &::placeholder {
    color: #ffffff;
    opacity: .5;
  }
`;

const InputBefore = styled.span`
  left: -2rem;
  border-radius: 50%;
  position: absolute;
  width: 4rem;
  height: 4rem;
  background: #f40552;
  color: #ffffff;
  transition: all 1s ease;
`;

const NewGoal = styled.button`
  border-radius: 50%;
  position: absolute;
  display: flex;
  justify-content: center;
  width: 4rem;
  height: 4rem;
  background: #f40552;
  color: #ffffff;
  border: none;
  transition: all 1s ease;
`;

const Icon = styled.div`
  width: 1rem;
  height: 1rem;
  display: ${({isVisible}) => (isVisible ? "block" : "none")};

  & > svg {
    width: 100%;
    height: 100%;
  }

  @media print {
    display: none;
  }
`;

const ENTER = 13;
const ESCAPE = 27;

export default function NewGoalForm({ onSubmit }) {
  const [open, setOpen] = useState(false);
  const inputEl = useRef(null);
  useEffect(() => {
    const input = inputEl.current;
    input.addEventListener("keydown", onDown);
    return () => {
      input.removeEventListener("keydown", onDown);
    };
  });
  const resetForm = () => {
    setOpen(false);
    inputEl.current.value = "";
    inputEl.current.blur();
    inputEl.current.removeEventListener("keydown", onDown);
  }
  const onDown = (event) => {
    switch (event.keyCode) {
      case ENTER:
        submit();
        return;
      case ESCAPE:
        resetForm();
        return;
      default:
        return;
    }
  };
  const openForm = () => {
    inputEl.current.addEventListener("keydown", onDown);
    setTimeout(() => {
      inputEl.current.focus();
    }, 500);
    setOpen(true);
  };
  const submit = () => {
    onSubmit(inputEl.current.value);
    resetForm();
  };
  return (
    <Form>
      <InputWrapper visible={open}>
        <InputBefore visible={open} />
        <Input ref={inputEl} type="text" visible={open} placeholder="What is your goal?" />
      </InputWrapper>

      <NewGoal
        visible={open}
        onClick={() => (open ? submit() : openForm())}
      >
        <Icon isVisible={!open}><IconAdd /></Icon>
        <Icon isVisible={open}><IconNext/></Icon>
      </NewGoal>
    </Form>
  );
}
