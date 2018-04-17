//
// Object Destructuring
//

const person = {
    name : 'Abhilash R',
    age : 25,
    location : {
        city : 'Coimbatore',
        state : 'Tamil Nadu',
        temp : 34
    }
};

const {name: firstName = 'Anonymous', age} = person;

console.log(`${name} is ${age} years old`);

const {temp: temperature, city, state} = person.location;

if(temperature && city && state)
    console.log(`It is ${temperature} in ${city}, ${state}`);

//
// Array Destructuring
//
const numArray = [1, 2, 3, 4, 5];
const [a, b, c, d, e] = numArray;
console.log(`${a} ${b} ${c}...`);
const [,,f] = numArray;
console.log(`${f}`);
const [g, h = 3, i] = [1, , 4];
console.log(`${g} ${h} ${i}`);