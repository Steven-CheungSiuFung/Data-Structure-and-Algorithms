import styled from "styled-components";
import { Link } from "react-router-dom";

export const Layout = styled.div`
  display: flex;
`;

export const NavigationContainer = styled.div`
  height: 100vh;
  width: 250px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 2rem 1rem 2rem 3rem;
  border-right: 1px solid black;
`;

export const NavLink = styled(Link)`
  text-decoration: none;
  color: black;
`;
