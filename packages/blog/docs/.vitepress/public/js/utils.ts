const debounce = (fn: Function, delay: number, thisArg?: any) => {
  let timer: NodeJS.Timeout | null = null;
  return function (...args: any[]) {
    clearTimeout(timer as NodeJS.Timeout);
    timer = setTimeout(() => {
      fn.apply(thisArg, args);
    }, delay);
  };
};

export { debounce };
