import LaunchesMongo from "./launches.mongo.js";
import planetsMongo from "./planets.mongo.js";
export const launches = new Map();
let defaultFlightNumber = 100;
const launch = {
  mission: "Kepler Exploration X",
  rocket: "Explorer IS1",
  launchDate: new Date("December 27, 2030"),
  target: "Kepler-296 A f",

  flightNumber: 100,
  customer: ["ZTM", "NASA"],
  upcoming: true,
  success: true,
};

savelaunch(launch);

export async function scheduleNewLaunch(launch) {
  let latesttflightnumber = (await latestgetflightnumber()) + 1;

  let newlaunch = Object.assign(launch, {
    flightNumber:latesttflightnumber,
    upcoming: true,
    success: true,
    customer: ["n&s", "pk"]
  });

  savelaunch(newlaunch)
}

async function latestgetflightnumber() {
  let latestflightNumberr = await LaunchesMongo.findOne().sort("-flightNumber");
  if (!latestflightNumberr) {
    return defaultFlightNumber;
  }

  return latestflightNumberr.flightNumber;
}

async function savelaunch(launch) {
  const planet = await planetsMongo.findOne({
    keplerName: launch.target,
  });

  if (!planet) {
    throw new Error("target not found");
  }

  await LaunchesMongo.findOneAndUpdate(
    {
      flightNumber: launch.flightNumber,
    },
    launch,
    { upsert: true }
  );
}
