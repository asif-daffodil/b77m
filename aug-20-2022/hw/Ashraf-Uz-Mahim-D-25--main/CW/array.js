// ---array-------------------------

var myCountry = [
  "London",
  "America",
  "Soudi Arob",
  "Uganda",
  "Bangladesh",
  "Srilanka",
];
console.log(myCountry[4]);

// ---array hard----------------------

var nameS = [["hellow", "motherfather"], ["hi", "kemon", "aso"], ["ki koro"]];
console.log(nameS[1][0], nameS[2][0]);

// ---array with for loop-------------

var sonu = ["Ashraf", "Mahim", "Rasel", "Bipu", null];

console.log(sonu.length);

for (let i = 0; i < sonu.length; i++) {
  console.log(sonu[i]);
}

// ---REMOVE OR ADD ARRAY---

var nameUs = ["Ashraf", "Tanha", "Jannat", "Bipu"];
nameUs.push("Mahim");
nameUs.pop();
nameUs.pop();
nameUs.shift();
nameUs.unshift("Ashka");
console.log(nameUs);
