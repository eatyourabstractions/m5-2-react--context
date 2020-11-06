import React from "react";

import usePersistedState from '../hooks/use-persistedData.hook';
import useWhileAwayCookies from '../hooks/use-whileAway.hook';
import {items} from './data'
export const GameContext = React.createContext(null);

const calculateCookiesPerSecond = (purchasedItems) => {
    return Object.keys(purchasedItems).reduce((acc, itemId) => {
      const numOwned = purchasedItems[itemId];
      const item = items.find((item) => item.id === itemId);
      
      const value = item.value;
  
      return acc + value * numOwned;
    }, 0);
  };

export const GameProvider = ({ children }) => {
    const [numCookies, setNumCookies] = usePersistedState(1000, "numCookies");
    const [purchasedItems, setPurchasedItems] = usePersistedState(
        {
            cursor: 0,
            grandma: 0,
            farm: 0,
          },
        "purchasedItems"
      );
    
    useWhileAwayCookies(setNumCookies, purchasedItems, calculateCookiesPerSecond)
      
    return <GameContext.Provider value={{
        numCookies,
        setNumCookies,
        purchasedItems,
        setPurchasedItems,
        cookiesPerSecond: calculateCookiesPerSecond(purchasedItems),
      }}>{children}</GameContext.Provider>;
  };