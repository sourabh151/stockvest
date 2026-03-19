export const debounce = (cb: Function, t: number = 1000) => {
  let time = 0;
  return () => {
    if (time === 0 || (time + t) < new Date().getTime()) {
      cb();
      time = new Date().getTime()
    }
  }
}
