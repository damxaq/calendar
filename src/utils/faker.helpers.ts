import { Event } from "../models/event";
import { nanoid } from "nanoid";
import { addDays } from "./date.helpers";
var faker = require("faker");

export const initFakeEvents = () => {
  const fakeEvents = Array<Event>();
  const EVENTS_NUMBER = 20;

  for (let i = 0; i < EVENTS_NUMBER; i++) {
    const randomDays = faker.datatype.number({
      min: -10,
      max: 20,
    });
    const randomDate = addDays(new Date(), randomDays).toLocaleDateString();
    let randomHour = faker.datatype.number({
      min: 0,
      max: 23,
    });
    let randomMinute = faker.datatype.number({
      min: 0,
      max: 59,
    });
    if (randomHour < 10) randomHour = "0" + randomHour;
    if (randomMinute < 10) randomMinute = "0" + randomMinute;
    const randomTime = `${randomHour}:${randomMinute}`;

    const randomEvent = {
      title: faker.random.words(),
      description: faker.lorem.sentence(),
      time: randomTime,
      date: randomDate,
      id: nanoid(),
    };

    fakeEvents.push(randomEvent);
  }

  return fakeEvents;
};
