function averageThreeNumbers(a, b, c) {
    let sum = a + b + c;
    let avg = sum / 3;
    return avg;
}

function createSentence(num, noun = '') {
    return "On average, a Berkeley student has" + '\xa0' + num + '\xa0' + noun + ".";
}

function getRandomNum(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

let min = 2;
let max = 20;

let x = getRandomNum(min, max);
let y = getRandomNum(min, max);
let z = getRandomNum(min, max);
let avg = Math.floor(averageThreeNumbers(x, y, z));
let sentence = createSentence(avg, noun="koalas");
console.log(sentence); 

