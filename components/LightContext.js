import React, {useState, createContext} from 'react';

export const LightContext = createContext();

export const LightComponent = ({ children }) => {
  let [light, setLight] = useState(true);

  return (
    <LightContext.Provider value={{light, setLight}}>
      {children}
    </LightContext.Provider>
  )
}