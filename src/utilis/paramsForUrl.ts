// export const paramsForUrl = (obj) => {
//     const arr = Object.entries(obj);
//     const arr1 = arr.filter((elem) => {
//         return elem[1] !== "";
//     });
//     let str = "";
//     arr1.forEach((elem, index) => {
//         if (index === 0) {
//             str += `?${elem[0]}=${elem[1]}`;
//         } else {
//             str += `&${elem[0]}=${elem[1]}`;
//         }
//     });
//     return str;

// };