import React, { useEffect, useState } from "react";
import ArrayCell from "../../ArrayCell/ArrayCell.component";
import { v4 as uuidv4 } from "uuid";
import { sleep } from "../../../helper/utils";
import { GoPlay } from "react-icons/go";
import { BiReset } from "react-icons/bi";
import {
  SortingContainer,
  ArrayContainer,
  ControlGroup,
  ControlButton,
} from "./Sorting.styles";
import {
  SelectSection,
  SelectGroup,
  Selector,
} from "../../Selector/Selector.styles";

const Speeds = {
  Slow: 100,
  Normal: 50,
  Fast: 20,
  Biuu: 1,
};

const defaultAlgorithms = {
  "Bubble Sort": "Bubble Sort",
  "Quick Sort": "Quick Sort",
  "Merge Sort": "Merge Sort",
};

const Sorting = () => {
  const [arrayState, setArrayState] = useState([]);
  const [sortingTime, setSortingTime] = useState(null);
  const [algo, setAlgo] = useState(defaultAlgorithms["Bubble Sort"]);
  const [speed, setSpeed] = useState(Speeds.Fast);
  const numbers = [
    10, 7, 20, 5, 17, 11, 3, 16, 14, 18, 9, 6, 15, 12, 19, 8, 13, 1, 4, 2,
  ];

  // create item class
  class ArrayItem {
    constructor(val) {
      this.value = val;
      this.id = null;
      this.primary = false;
      this.secondary = false;
      this.current = false;
    }
  }

  const createNewArray = () => {
    const numberArray = numbers.map((val) => {
      const newItem = new ArrayItem(val);
      const newId = uuidv4();
      newItem.id = newId;
      return newItem;
    });
    return numberArray;
  };

  useEffect(() => {
    const newArray = createNewArray();
    setArrayState(newArray);
  }, []);

  /* Bubble Sort */
  const bubbleSort = async (array) => {
    for (let i = 0; i < array.length; i++) {
      for (let j = 0; j < array.length - 1; j++) {
        const current = array[j];
        const next = array[j + 1];
        current.primary = true;
        next.secondary = true;
        setArrayState([...array]);
        await sleep(speed);
        if (array[j].value > array[j + 1].value) {
          let holder = array[j];
          array[j] = array[j + 1];
          array[j + 1] = holder;
          setArrayState([...array]);
          await sleep(speed);
        }
        current.primary = false;
        next.secondary = false;
      }
    }
    return array;
    // O(n^2)
  };

  /* Quick Sort with Recursion */
  const recursion = async (array, left, right) => {
    if (right < left || right === left || left > right) return;

    const rightNode = array[right];
    rightNode.current = true;
    setArrayState([...array]);

    let i = left;
    let j = left;

    while (j !== right) {
      const iNode = array[i];
      const jNode = array[j];
      iNode.primary = true;
      jNode.secondary = true;
      setArrayState([...array]);
      await sleep(speed);
      if (array[j].value < array[right].value) {
        let temp = array[j];
        array[j] = array[i];
        array[i] = temp;
        i++;
      }
      j++;
      iNode.primary = false;
      jNode.secondary = false;
    }

    let temp = array[right];
    array[right] = array[i];
    array[i] = temp;
    setArrayState([...array]);
    await sleep(speed);
    rightNode.current = false;
    setArrayState([...array]);

    await recursion(array, left, i - 1);
    await recursion(array, i + 1, right);
  };

  const quickSort = async (array) => {
    await recursion(array, 0, array.length - 1);
    return array;
    // T: O(nlogn);
    // S: O(logn);
  };

  /* Merge Sort */
  const mergeSort = async (array) => {
    // split function
    const splitIndex = async (array, left, right) => {
      if (left === right) {
        return [left, right];
      } else {
        const middle = Math.floor((left + right) / 2);
        const leftStart = left;
        const leftEnd = middle;
        const rightStart = middle + 1;
        const rightEnd = right;
        return await mergeIndex(
          array,
          await splitIndex(array, leftStart, leftEnd),
          await splitIndex(array, rightStart, rightEnd)
        );
      }
    };

    // merge function
    const mergeIndex = async (array, left, right) => {
      const leftStart = left[0];
      const leftEnd = left[1];
      const rightStart = right[0];
      const rightEnd = right[1];
      let i = leftStart;
      let j = rightStart;
      const newArray = [];
      while (i <= leftEnd || j <= rightEnd) {
        const leftNode = array[i];
        const rightNode = array[j];
        if (i > leftEnd) {
          rightNode.secondary = true;
          newArray.push(array[j]);
          j++;
        } else if (j > rightEnd) {
          leftNode.primary = true;
          newArray.push(array[i]);
          i++;
        } else if (array[i].value < array[j].value) {
          leftNode.primary = true;
          newArray.push(array[i]);
          i++;
        } else if (array[j].value < array[i].value) {
          rightNode.secondary = true;
          newArray.push(array[j]);
          j++;
        }
        setArrayState([...array]);
        await sleep(speed);
        if (leftNode) leftNode.primary = false;
        if (rightNode) rightNode.secondary = false;
      }
      for (let k = 0; k < newArray.length; k++) {
        const currentIndex = leftStart + k;
        array[currentIndex] = newArray[k];
      }
      setArrayState([...array]);
      await sleep(speed);
      return [leftStart, rightEnd];
    };

    await splitIndex(array, 0, array.length - 1);
    setArrayState([...array]);
    // O(NLogN)
  };

  // change sorting algorithms
  const onChangeSelectAlgo = (e) => {
    const selectedAlgo = e.target.value;
    const newAlgo = defaultAlgorithms[selectedAlgo];
    setAlgo(newAlgo);
  };

  // change speed
  const onChangeSelectSpeed = (e) => {
    const selectedSpeed = e.target.value;
    setSpeed(Speeds[selectedSpeed]);
  };

  const sort = async () => {
    switch (algo) {
      case defaultAlgorithms["Bubble Sort"]:
        return await bubbleSort(arrayState);
      case defaultAlgorithms["Quick Sort"]:
        return await quickSort(arrayState);
      case defaultAlgorithms["Merge Sort"]:
        return await mergeSort(arrayState);
      default:
        return;
    }
  };

  const onClickStart = async (e) => {
    const startTime = new Date().getTime();
    const result = await sort();
    const endTime = new Date().getTime();
    const totalTime = endTime - startTime;
    setSortingTime(totalTime);
  };

  const onClickReset = () => {
    const newArray = createNewArray();
    setArrayState(newArray);
  };

  return (
    <SortingContainer>
      <h1>Sorting</h1>
      <SelectSection>
        <SelectGroup>
          <label>Sorting Algorithm: </label>
          <Selector
            id="algo"
            name="algo"
            defaultValue="Bubble Sort"
            onChange={onChangeSelectAlgo}
          >
            <option value="Bubble Sort">Bubble Sort</option>
            <option value="Quick Sort">Quick Sort</option>
            <option value="Merge Sort">Merge Sort</option>
          </Selector>
        </SelectGroup>
        <SelectGroup>
          <label>Sorting Speed: </label>
          <Selector
            id="speed"
            name="speed"
            defaultValue="Fast"
            onChange={onChangeSelectSpeed}
          >
            <option value="Slow">Slow</option>
            <option value="Normal">Normal</option>
            <option value="Fast">Fast</option>
            <option value="Biuu">Biuu</option>
          </Selector>
        </SelectGroup>
      </SelectSection>
      <ArrayContainer>
        {arrayState.map((item) => (
          <ArrayCell key={item.id} item={item} />
        ))}
      </ArrayContainer>
      <p>{sortingTime && `Sorting Time: ${sortingTime / 1000}s`}</p>
      <ControlGroup>
        <ControlButton onClick={onClickStart}>
          {<GoPlay />}Start Sorting
        </ControlButton>
        <ControlButton onClick={onClickReset}>{<BiReset />}Reset</ControlButton>
      </ControlGroup>
    </SortingContainer>
  );
};

export default Sorting;
