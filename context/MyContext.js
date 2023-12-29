import { createContext, useState, useContext } from "react";

const MyContext = createContext({
  value: null,
  setValue: () => {},
});

export const useContextUser = () => useContext(MyContext).value;

export const MyProvider = ({ children }) => {
  const [value, setValue] = useState(null);
  console.log("myprovider", value);

  return (
    <MyContext.Provider value={{ value, setValue }}>
      {children}
    </MyContext.Provider>
  );
};

export default MyContext;
