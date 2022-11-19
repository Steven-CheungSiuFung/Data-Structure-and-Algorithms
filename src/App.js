import { Route, Routes } from "react-router-dom";

import Navigation from "./components/routes/Navigation/Navigation.component";
import Home from "./components/routes/Home/Home.component";
import Array from "./components/routes/Array/Array.component";
import HashTable from "./components/routes/HashTable/HashTable.component";
import LinkedList from "./components/routes/LinkedList/LinkedList.component";
import Stack from "./components/routes/Stack/Stack.component";
import Queue from "./components/routes/Queue/Queue.component";
import BinarySearchTree from "./components/routes/BinarySearchTree/BinarySearchTree.component";
import Graph from "./components/routes/Graph/Graph.component";
import DynamicProgramming from "./components/routes/DynamicProgramming/DynamicProgramming.component";
import TwoDArray from "./components/routes/2d-array/2d-array.component";
import Sorting from "./components/routes/Sorting/Sorting.component";
import Recursion from "./components/routes/Recursion/Recursion.component";

import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path="array" element={<Array />} />
        <Route path="hash-table" element={<HashTable />} />
        <Route path="linked-list" element={<LinkedList />} />
        <Route path="stack" element={<Stack />} />
        <Route path="queue" element={<Queue />} />
        <Route path="trees" element={<BinarySearchTree />} />
        <Route path="2d-array" element={<TwoDArray />} />
        <Route path="graph" element={<Graph />} />
        <Route path="sorting" element={<Sorting />} />
        <Route path="recursion" element={<Recursion />} />
        <Route path="dynamic-programming" element={<DynamicProgramming />} />
      </Route>
    </Routes>
  );
}

export default App;
