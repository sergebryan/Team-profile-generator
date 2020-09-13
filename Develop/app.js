const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```

var employees = [];

console.log("Enter details of manager:");
inquirer
    .prompt([
        {
            name: 'name',
            message: 'Enter name?',
        },
        {
            name: 'id',
            message: 'Enter id?',
        },
        {
            name: 'email',
            message: 'Enter email?',
        },
        {
            name: 'officenumber',
            message: 'Enter office number?',
        },
    ])
    .then(answers => {
        employees.push(new Manager(answers.name, answers.id, answers.email, answers.officenumber));

        inquirer
            .prompt([
                {
                    name: 'n',
                    message: 'How many team members are there?',
                }
            ])
            .then(answers => {
                getTeamMembers(answers.n);
            });
    });

function getTeamMembers(n) {
    if (n == 0) {
        output(employees);
        return;
    }
    console.log("Enter details of team member:");
    inquirer
        .prompt([
            {
                type: 'rawlist',
                name: 'role',
                message: 'Role?',
                choices: ['Intern', 'Engineer'],
            },
        ])
        .then(answers => {
            if (answers.role == "Intern") {
                inquirer
                    .prompt([
                        {
                            name: 'name',
                            message: 'Enter name?',
                        },
                        {
                            name: 'id',
                            message: 'Enter id?',
                        },
                        {
                            name: 'email',
                            message: 'Enter email?',
                        },
                        {
                            name: 'school',
                            message: 'Enter school?',
                        },
                    ])
                    .then(answers => {
                        employees.push(new Intern(answers.name, answers.id, answers.email, answers.school));
                        getTeamMembers(n - 1);
                    });
            }
            else {
                inquirer
                    .prompt([
                        {
                            name: 'name',
                            message: 'Enter name?',
                        },
                        {
                            name: 'id',
                            message: 'Enter id?',
                        },
                        {
                            name: 'email',
                            message: 'Enter email?',
                        },
                        {
                            name: 'github',
                            message: 'Enter github?',
                        },
                    ])
                    .then(answers => {
                        employees.push(new Engineer(answers.name, answers.id, answers.email, answers.github));
                        getTeamMembers(n - 1);
                    });
            }
        });
}

function output(employees) {
    const html = render(employees);
    if (!fs.existsSync("./output")) {
        fs.mkdir("./output", function (err) {
            if (err) {
                console.log(err);
            }
        });
    }
    var outputPath = './output/team.html';
    fs.writeFileSync(outputPath, html);
}