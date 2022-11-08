import FindNemo from "./components/FindNemo/FindNemo.component";
import Array from "./components/Array/Array.component";
import HashTable from "./components/HashTable/HashTable.component";
import LinkedList from "./components/LinkedList/LinkedList.component";
import Stack from "./components/Stack/Stack.component";
import Queue from "./components/Queue/Queue.component";
import BinarySearchTree from "./components/Trees/BinarySearchTree/BinarySearchTree.component";
import Graph from "./components/Graph/Graph.component";
import DynamicProgramming from "./components/DynamicProgramming/DynamicProgramming.component";
import TwoDArray from "./components/2d-array/2d-array.component";

import "./App.css";

function App() {
  return (
    <div className="App">
      <h1>Data Structures and Algorithms</h1>
      <p>--------------------------------------------</p>
      <FindNemo />
      <p>--------------------------------------------</p>
      <Array />
      <p>--------------------------------------------</p>
      <HashTable />
      <p>--------------------------------------------</p>
      <LinkedList />
      <p>--------------------------------------------</p>
      <Stack />
      <p>--------------------------------------------</p>
      <Queue />
      <p>--------------------------------------------</p>
      <BinarySearchTree />
      <p>--------------------------------------------</p>
      <TwoDArray />
      <p>--------------------------------------------</p>
      <Graph />
      <p>--------------------------------------------</p>
      <DynamicProgramming />
      <p>--------------------------------------------</p>
    </div>
  );
}

export default App;
