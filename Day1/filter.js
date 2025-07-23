const val = [1, 2, 3, 4, 5];
const newArr=val.filter(function (val) {
    if(val>2) return true;
})
console.log(newArr)
// return new array