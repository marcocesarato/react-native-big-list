const fs = require("fs");
const glob = require("glob");
const prettier = require("prettier");

function clean(str) {
  return prettier.format(str.replace(/\*\/(\r?\n)+/g, "*/\n"), {
    parser: "babel",
  });
}

console.log("Cleaning distribution...");

glob(process.cwd() + "/dist/**/*.{js,jsx,ts,tsx}", {}, (error, files) => {
  if (error) console.log(error);
  files.forEach((file) => {
    const contents = fs.readFileSync(file).toString();
    fs.writeFile(file, clean(contents), (e) => {
      if (e) console.log(e);
    });
  });
});
