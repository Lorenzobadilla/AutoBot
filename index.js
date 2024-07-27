const { spawn } = require("child_process");
const path = require('path');
const chalk = require('chalk');

const SCRIPT_FILE = "auto.js";
const SCRIPT_PATH = path.join(__dirname, SCRIPT_FILE);


function start() {
    const main = spawn("node", [SCRIPT_PATH], {
        cwd: __dirname,
        stdio: "inherit",
        shell: true
    });

    main.on("close", (exitCode) => {
        if (exitCode === 0) {
            console.log(chalk.green("Main process exited with code 0"));
        } else if (exitCode === 1) {
            console.log(chalk.green("Main process exited with code 1. Restarting..."));
            start();
        }  else {
            console.error(`Main process exited with code ${exitCode}`);
        }
    });
}

start();