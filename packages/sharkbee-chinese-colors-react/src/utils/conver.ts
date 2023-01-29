function formatTwo(num: number, dot: number = 0) {
  return (Math.round(num * 100) / 100).toFixed(dot);
}
export {formatTwo};
