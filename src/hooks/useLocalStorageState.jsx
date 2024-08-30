import React, { useEffect, useState } from "react";

function useLocalStorageState(initValue, key) {
  const [value, setValue] = useState(() => {
    const storedValue = JSON.parse(localStorage.getItem(key));
    return storedValue ? storedValue : initValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value, key]);

  return [value, setValue];
}

export default useLocalStorageState;
