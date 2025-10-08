import { faker } from "@faker-js/faker";

const generate = (num) => {
  const result = [];
  for (let i = 0; i <= num; i++) {
    result.push({
      id: i,
      title: faker.person.fullName(),
      description: faker.lorem.sentence(),
    });
  }
  return result;
};
const generateSection = (num, sections) => {
  const result = [];
  for (let i = 0; i <= sections; i++) {
    const section = [];
    for (let y = 0; y <= num / sections; y++) {
      section.push({
        id: (i + 1) * y,
        title: faker.person.fullName(),
        description: faker.lorem.sentence(),
      });
    }
    result.push(section);
  }
  return result;
};
const data = generate(10000);
const sections = generateSection(10000, 500);

const text = JSON.stringify({ data, sections });

navigator.clipboard.writeText(text).then(
  function () {
    console.log("Async: Copying to clipboard was successful!");
  },
  function (err) {
    console.error("Async: Could not copy text: ", err);
  },
);
