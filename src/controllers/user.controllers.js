import axios from "axios";
import { Coordinates, CalculationMethod, PrayerTimes } from "adhan";

const fetchGeoLocation = async (latitude, longitude) => {
  try {
    const res = await axios.get(
      `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${process.env.OPENCAGE_API_KEY}`,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );

    const locationData = res.data.results[0];
    return {
      city:
        locationData.components.city ||
        locationData.components.town ||
        locationData.components.village,
      country: locationData.components.country,
    };
  } catch (error) {
    console.error("Error fetching location:", error);
    return null;
  }
};

const fetchCalendarData = async (latitude, longitude) => {
  try {
    const coordinates = new Coordinates(latitude, longitude);
    const params = CalculationMethod.MuslimWorldLeague();
    params.adjustments = {
      fajr: 0,
      dhuhr: 0,
      asr: 0,
      maghrib: 0,
      isha: 0,
    };
    const date = new Date();
    const prayerTimes = new PrayerTimes(coordinates, date, params);

    params.adjustments = {
      fajr: -1,
      maghrib: 2,
      isha: 0,
      dhuhr: 0,
      asr: 0,
    };
    const prayerTimes2 = new PrayerTimes(coordinates, date, params);

    return {
      date: date.toLocaleDateString({ format: "dd-MM-yyyy" }),
      sehri: prayerTimes2.fajr.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      fajr: prayerTimes.fajr.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      dhuhr: prayerTimes.dhuhr.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      asr: prayerTimes.asr.toLocaleTimeString([], {
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
      isha: prayerTimes.isha.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
  } catch (error) {
    console.error("Error fetching calendar data:", error);
    return null;
  }
};

const userController = async (req, res) => {
  const { latitude, longitude } = req.body;

  if (!latitude || !longitude) {
    return res.status(400).json({ message: "Missing latitude or longitude" });
  }
  console.log(latitude, longitude);

  try {
    console.log("Fetching data for:", latitude, longitude);

    const { city, country } = await fetchGeoLocation(latitude, longitude);
    const { date, sehri, fajr, dhuhr, asr, iftar, maghrib, isha } =
      await fetchCalendarData(latitude, longitude);

    const response = {
      city,
      country,
      date,
      sehri,
      fajr,
      dhuhr,
      asr,
      iftar,
      maghrib,
      isha,
    };

    res.status(200).send(response);
    console.log("data successfully sent");
  } catch (error) {
    console.error("Error in userController:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export default userController;
