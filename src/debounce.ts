// export function debounce(fn: Function, wait: number, immediate: boolean) {
//   let timeout: number | undefined;

//   return function () {
//     let context = this;
//     let args = arguments;
//     if (timeout) {
//       clearTimeout(timeout);
//     }

//     if(immediate){

//     }
//   };
// }
console.time("cost");
const action = debounce(() => {
  console.log("action");
  console.timeEnd("cost");
}, 1000);
const array = [1, 2, 3];
for (let index = 0; index < array.length; index++) {
  //   const element = array[index];
  action();
}

export function debounce(fn: Function, wait: number) {
  let id: number;
  return function () {
    id && clearTimeout(id);
    id = setTimeout(fn, wait);
  };
}
