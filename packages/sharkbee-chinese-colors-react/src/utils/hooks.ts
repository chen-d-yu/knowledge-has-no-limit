import {useEffect, useRef} from 'react';

function usePrevious<T = any>(value: T) {
  const ref = useRef<T>();

  const setRefVal = (value: T) => {
    ref.current = value;
  };

  useEffect(() => {
    ref.current = value;
  });
  return {
    previous: ref.current,
    setRefVal,
  };
}
export {usePrevious};
