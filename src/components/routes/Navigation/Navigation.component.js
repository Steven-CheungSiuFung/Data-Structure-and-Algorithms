import { Outlet } from "react-router-dom";
import {
  Layout,
  NavigationContainer,
  NavLink,
  NavHome,
} from "./Navigation.styles";

const Navigation = () => {
  return (
    <Layout>
      <NavigationContainer>
        <NavHome to="/">Home</NavHome>
        {/*<NavLink to="/array">Array</NavLink>
        <NavLink to="/hash-table">Hash Table</NavLink>
        <NavLink to="/linked-list">Linked List</NavLink>
        <NavLink to="/stack">Stack</NavLink>
        <NavLink to="/queue">Queue</NavLink>
  <NavLink to="/trees">Trees</NavLink>*/}
        <NavLink to="/2d-array">Maze and path finding (2D array)</NavLink>
        <NavLink to="/sorting">Sorting</NavLink>
        {/*<NavLink to="/graph">Graph</NavLink>
        <NavLink to="/recursion">Recursion</NavLink>
  <NavLink to="/dynamic-programming">Dynamic Programming</NavLink>*/}
      </NavigationContainer>
      <Outlet />
    </Layout>
  );
};

export default Navigation;
