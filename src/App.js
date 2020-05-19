import React from "react";
import styled from "styled-components";
import Calendar from "./containers/Calendar";
import Goals from "./containers/Goals";
import Navigation from "./components/Navigation";
import { Switch, Route } from "react-router-dom";
import { StoreProvider } from "./store";

function User() {
  return <span>User</span>;
}

const Container = styled.div`
  max-width: 1280px;
  margin: 0 auto;
`;

export default function App() {
  return (
    <StoreProvider>
      <Navigation />
      <Container>
        <Switch>
          {/* If the current URL is /about, this route is rendered
              while the rest are ignored */}
          <Route path="/user">
            <User />
          </Route>

          {/* Note how these two routes are ordered. The more specific
              path="/contact/:id" comes before path="/contact" so that
              route will render when viewing an individual contact */}
          <Route path="/goals">
            <Goals />
          </Route>

          {/* If none of the previous routes render anything,
              this route acts as a fallback.
  
              Important: A route with path="/" will *always* match
              the URL because all URLs begin with a /. So that's
              why we put this one last of all */}
          <Route path="/">
            <Calendar />
          </Route>
        </Switch>
      </Container>
    </StoreProvider>
  );
}
