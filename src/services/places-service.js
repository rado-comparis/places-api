import { weekDays } from "./days.js";
// import pkg from "core-js/actual/array/group-by.js";
// const { groupBy } = pkg;

export const getOpeningHours = function (openingHoursDays) {
    const flattened = flatten(openingHoursDays);

    const groupped = group(flattened);

    const formatted = format(groupped);

    return formatted;
};

export const createPlace = function (place) {
    return {
        id: place.local_entry_id,
            name: place.displayed_what,
    }
}

const group = function (inputArr) {
    let grouppedArr = [];
    let index = -1;
  for(let i=0; i < inputArr.length; i++) {
    const day = inputArr[i];
    if(index == -1 || !equals(grouppedArr[index].hours, day.hours)) {
        grouppedArr.push({ 
            days:[day.day],
            hours:day.hours 
        });
        index++;
    } 
    else {
        grouppedArr[index].days.push(day.day);
    }
  }
  return grouppedArr;
}

const format = function (arr) {
    let lines = [];
   for(let i = 0; i < arr.length; i++) {
     const line = arr[i];
     const days = line.days;
     if(days.length == 1) {
       lines.push({ days : days[0], hours: line.hours });
     } 
     else {
       lines.push({ days:days[0] + "-" + days[days.length-1] , hours: line.hours });
     }
   }
   return lines;
}

const flatten = function (openingHoursDays) {
    let weekDaysHours = [];
    for (const prop in weekDays) {
        if (openingHoursDays[prop.toLowerCase()]) {
            let timeArr = [];
            for(const time of openingHoursDays[prop.toLowerCase()]) {
                timeArr.push(`${time.start} - ${time.end}`);
            }
            weekDaysHours.push({
                "day": prop,
                "hours": timeArr,
            });
        }
        else {
            weekDaysHours.push({
                "day": prop,
                "hours": [ "closed" ]
            })
        }
    }
    return weekDaysHours;
}

// this ignores null or undefined so not ideal
const equals = (a, b) => {
    return JSON.stringify(a) === JSON.stringify(b);
}