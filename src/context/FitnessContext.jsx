import React, { createContext, useState } from "react";

export const FitnessContext = createContext();

export const FitnessProvider = ({ children }) => {
  const [user, setUser] = useState({ name: "Isene", goal: "Stay fit" });

  return (
    <FitnessContext.Provider value={{ user, setUser }}>
      {children}
    </FitnessContext.Provider>
  );
};
