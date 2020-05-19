import React from "react";
import styled from "styled-components";
import { ReactComponent as IconCalendar } from "../icons/calendar.svg";
import { ReactComponent as IconStar } from "../icons/star.svg";
import { ReactComponent as IconUser } from "../icons/profile.svg";
import { NavLink } from "react-router-dom";

const Navigation = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  // width: 2rem;
  background: #ffffff;
  display: flex;
  flex-direction: column;
  box-shadow: 2px 2px 32px 0 #dddddd;

  @media print {
    display: none;
  }
`;

const NavigationItem = styled(NavLink)`
  padding: 0.5rem;
  color: #444444;

  &:hover {
    color: red;
  }

  & > svg {
    width: 2.5rem;
    height: 2.5rem;
    padding: 0.5rem;
  }
`;

export default function NavigationComponent() {
  return (
    <Navigation>
      <NavigationItem to="/user" activeClassName="hurray">
        <IconUser />
      </NavigationItem>
      <NavigationItem to="/calendar" activeClassName="hurray">
        <IconCalendar />
      </NavigationItem>
      <NavigationItem to="/goals" activeClassName="hurray">
        <IconStar />
      </NavigationItem>
    </Navigation>
  );
}
