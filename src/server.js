import {
  Coordinates,
  CalculationMethod,
  PrayerTimes,
  SunnahTimes,
  Prayer,
  Qibla,
} from "adhan";

const coordinates = new Coordinates(24.3746, 88.6004);
let params = CalculationMethod.MuslimWorldLeague();

// for (let i = 0; i <= 32; i++) {
//   const date = new Date(2025, 2, 2 + i);
//   console.log(date);

//   const prayerTimes = new PrayerTimes(coordinates, date, params);
//   console.log(prayerTimes.isha.toLocaleTimeString());
// }

params.adjustments = {
  fajr: 0,
  dhuhr: 0,
  asr: 0,
  maghrib: 0,
  isha: 0,
};
const prayerTimes = new PrayerTimes(coordinates, new Date(), params);
console.log("before adjustments");

console.log(prayerTimes);
console.log("after adjustments");

// params.adjustments = {
//   fajr: -10,
//   dhuhr: 0,
//   asr: 0,
//   maghrib: 0,
//   isha: 0,
// };

params.adjustments = {
  fajr: 10,

};

const prayerTimes2 = new PrayerTimes(coordinates, new Date(), params);

console.log(prayerTimes2.fajr.toLocaleTimeString());
