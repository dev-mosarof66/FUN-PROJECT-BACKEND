import { Coordinates, CalculationMethod, PrayerTimes } from "adhan";

const dateByAddingDays = (date, days) => {
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate() + days;
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  return new Date(year, month, day, hours, minutes, seconds);
};

const fetchCalendarData = (latitude, longitude) => {
  try {
    let fullCalendarData = [];
    let day = 30;

    for (let i = 0; i < day; i++) {
      const date = new Date(2025, 2, 2 + i);
      const coordinates = new Coordinates(latitude, longitude);
      const params = CalculationMethod.MuslimWorldLeague();
      params.adjustments = {
        fajr: 0,
        dhuhr: 0,
        asr: 0,
        maghrib: 0,
        isha: 0,
      };

      const prayerTimes = new PrayerTimes(coordinates, date, params);

      // lets adjust the sehri and iftar time
      params.adjustments = {
        fajr: -1,
        maghrib: 2,
        isha: 0,
        dhuhr: 0,
        asr: 0,
      };
      const prayerTimes2 = new PrayerTimes(coordinates, date, params);

      const data = {
        date: date.toLocaleDateString([], { day: "2-digit", month: "2-digit"}),
        sehri: prayerTimes2.fajr.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        fajr: prayerTimes.fajr.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        iftar: prayerTimes.maghrib.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        maghrib: prayerTimes2.maghrib.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      fullCalendarData.push(data);
    }
    return fullCalendarData;
  } catch (error) {
    console.error("Error fetching calendar data:", error);
    return null;
  }
};

const calendarController = (req, res) => {
  const { latitude, longitude } = req.body;
  if (!latitude || !longitude) {
    return res.status(400).json({ message: "Missing latitude or longitude" });
  }

  const fullCalendarData = fetchCalendarData(latitude, longitude);
  console.log(fullCalendarData);

  res.status(200).json(fullCalendarData);
};

export default calendarController;
