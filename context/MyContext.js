import { createContext, useState, useContext, useEffect } from "react";

const MyContext = createContext({
  value: null,
  setValue: () => {},
});

export const useContextUser = () => useContext(MyContext).value;

export const MyProvider = ({ children }) => {
  const [value, setValue] = useState(null);
  const [testValue, setTestValue] = useState(null);
  console.log("myprovider", value);

  useEffect(() => {
    setTestValue("foo");
  }, []);

  useEffect(() => {
    console.log(testValue);
    console.log(value);
  }, [testValue]);

  return (
    <MyContext.Provider value={{ value, setValue }}>
      {children}
    </MyContext.Provider>
  );
};

export default MyContext;
