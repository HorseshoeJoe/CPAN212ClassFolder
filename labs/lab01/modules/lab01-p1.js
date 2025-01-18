const _ = require('lodash') //Import Lodash

//Create the list(array) of holidays
const holidays = [
    { name: "Family Day", date: "February 17, 2025"},
    { name: "Good Friday", date: "April 18, 2025"},
    { name: "Victoria Day", date: "May 19, 2025"},
    { name: "Canada Day", date: "July 1, 2025"},
    { name: "Civic Day", date: "August 4, 2025"},
    { name: "Labour Day", date: "September 1, 2025"},
    { name: "Thanksgiving", date: "October 13, 2025"},
    { name: "Christmas", date: "December 25, 2025"},
    { name: "New Years", date: "January 1, 2026"},
];

//Iterate over said array and print the number of days until each holiday from today
console.log("Days until each public holiday:");
const today = new Date(); //Today's date
holidays.forEach(holiday => { //forEach parameter performs specified action for each element in array
    const holidayDate = new Date(holiday.date); //Converts holidate date into Date object
    const timeDiff = holidayDate - today; //Calculates time difference between today and the holiday in milliseconds
    const daysUntil = Math.ceil(timeDiff / (1000 * 60 * 60 * 24)); //Converts to days cuz it is in milliseconds
    console.log (`${holiday.name} is in ${daysUntil} days.`)
})

//Use the Lodash library to output the name and date of a random holiday
const randomHoliday = _.sample(holidays); //Get a random holiday
console.log("\nRandom Holiday:");
console.log(`${randomHoliday.name} - ${randomHoliday.date}`);

//Use Lodash library to output indexes of “Christmas” and “Canada Day” holidays
const christmasIndex = _.findIndex(holidays, { name: "Christmas" });
const canadaDayIndex = _.findIndex(holidays, { name: "Canada Day" });

console.log("\nIndexes:");
console.log(`Christmas is at index: ${christmasIndex}`);
console.log(`Canaday Day is at index: ${canadaDayIndex}`);