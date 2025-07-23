var obj = {
    name: "eeshu",
    age: 24,
    address: "Bhagwanpur"
    , college:"BIRTS"
}
console.log(obj)
console.log(obj.name)
console.log(obj['name'])
console.log(obj.age)

Object.freeze(obj)//here we freezed the object in java-script
obj.age= 245
console.log(obj.age+"   age")