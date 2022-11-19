import styled from "styled-components";
import { Link } from "react-router-dom";

export const Layout = styled.div`
  display: flex;
`;

export const NavigationContainer = styled.div`
  height: 100%;
  width: 200px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
`;

export const NavLink = styled(Link)`
  text-decoration: none;
  color: black;
`;
