// var blob = await fetch(`https://randomuser.me/api/`)
// var res = await blob.json();
// console.log(res)
//using await whithout async
//it is allowed after nodejs version 14 considered as es module not comoon js

//async js
// jo bhi code async nature ka ho usse side stack mai bhej do
// jo bhi agla code sync nature ka hoo usse chalao,
//  jab bhi sara sync code chal jaaye ya main stack
// khali hua ya nahi ,
// tab check karo async code complete hua ya nahi agar complete hua to
// main stack mai lao aur chala doo
async function apiCalling(params) {
  const response = await fetch("https://randomuser.me/api/");
  const data = await response.json();
  console.log(data);
}
apiCalling();


const apiCalling = async (params) => {
  const response = await fetch("https://randomuser.me/api/");
  const data = await response.json();
  return data;
};

const promise = apiCalling();
promise.then((data) => console.log(data));