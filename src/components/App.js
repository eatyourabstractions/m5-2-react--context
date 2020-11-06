import React,{useContext} from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import GlobalStyles from "./GlobalStyles";
import Home from "./Home";
import Game from "./Game";

//import {items} from './data';

import useInterval from "../hooks/use-interval.hook";
// import usePersistedState from '../hooks/use-persistedData.hook';

import { GameContext } from "./GameContext";

/** 
const calculateCookiesPerSecond = (purchasedItems) => {
  return Object.keys(purchasedItems).reduce((acc, itemId) => {
    const numOwned = purchasedItems[itemId];
    const item = items.find((item) => item.id === itemId);
    const value = item.value;

    return acc + value * numOwned;
  }, 0);
};
*/

function App(props) {
  const { numCookies, setNumCookies, cookiesPerSecond } = useContext(GameContext);

  useInterval(() => {
    setNumCookies(numCookies + cookiesPerSecond);
  }, 1000);
  /** this is for before the context exercises 
  const [numCookies, setNumCookies] = usePersistedState(1000,'num-cookies')
  const numCookiesObj = {numCookies: numCookies, setNumCookies: setNumCookies};

  const [purchasedItems, setPurchasedItems] = React.useState({
    cursor: 0,
    grandma: 0,
    farm: 0,
  });
  const inventory = {purchasedItems: purchasedItems, setPurchasedItems: setPurchasedItems}


  useInterval(() => {
    const numOfGeneratedCookies = calculateCookiesPerSecond(purchasedItems);

    setNumCookies(numCookies + numOfGeneratedCookies);
  }, 1000);
  */

  return (
    <>
      <GlobalStyles />
      <Router>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/game">
          <Game />
        </Route>
      </Router>
    </>
  );
}

export default App;
