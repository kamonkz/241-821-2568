//console.log("Hello World");
//console.log("This is a test JavaScript file");

/*
console.log("Logging some information to the console,");
console.log("Another log entry,");
*/
// String, Number, Boolean, Object, Array

// String
/*let fname = "John"; // String
console.log("Name", fname);
const PI = 3.14; // Number
// Number
let age = 29 // Number
let height = 5.9; // Number

fname = "Alice";
console.log("Name", fname);

fname = "Boblee";
PI = 3.14159;
console.log("Name",fname);
console.log("Age:",age);
console.log("Height",height);


 /**
  + = บวก
  - = ลบ
  * = คูณ
  / = หาร
  % = หารเอาเศษ
  */

/*
  let number1 = '10';
let number2 = '3';

let result = number1 + number2;
console.log("ผลบวก  =", result);
*/


/**
== เท่ากับ
!= ไม่เท่ากับ
> มากกว่า
< น้อยกว่า
>= มากกว่าหรือเท่ากับ
<= น้อยกว่าหรือเท่ากับ
 */

/**let number1 = 10;
let number2 = 20;
let condition = number1 <= number2; // Boolean ค่าความจริง true หรือ false
console.log("condition =", condition);

let number1 = 5;
let number2 = 5;


// if = else condition
if(number1 > number2) {
   console.log('this is if');
} else if(number1 < number2) {
   console.log('this is else if');
} else {
   console.log('this is else ');
}

*/
/**
 Grade
    >=80 เป็นเกรด A
    >=70 เป็นเกรด B
    >=60 เป็นเกรด C
    >=50 เป็นเกรด D
    <50  เป็นเกรด F
 */
    /**
     let score = 50;
if(score >=80) {
   console.log('Grade A ');
} else if(score >=70) {
   console.log('Grade B ');
} else if(score >=60) {
   console.log('Grade C ');
} else if(score >=50) {
    console.log('Grade D ');
} else if(score <50) {
    console.log('Grade F ');
}
    */

/**
 * && และ
 * !! หรือ
 * ! not หรือ ไม่
 * 
 */
/**
let number1 = 5
let number2 = 10

let condition = (number1 > 0) && (number2 > 0); // true && true = true
console.log("condition:", condition);

let age = 25
let gender = 'female'
if(age >=18 && gender =='female') {
    console.log("คุณสามารถเข้าร่วมกิจกรรมได้");
}
    */
/**
let number1 = 5

if (!(number1 % 2 == 0)) {
    console.log("เป็นเลขคู่");
}
else {
    console.log("เป็นเลขคี่");
}
    */


/**
while
for
 */

let conter = 0;
while(conter <=4) { // true
    //couter = couter + 1;
    conter +=1
    console.log("while:", conter);
}

 for (let i = 0; i <= 4; i = i + 1) {
    console.log("for", i);
 }