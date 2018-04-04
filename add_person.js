const settings = require("./settings"); // settings.json

const knex = require('knex')({
  client: 'pg',
  connection: {
    user     : settings.user,
    password : settings.password,
    database : settings.database,
    host     : settings.hostname,
    port     : settings.port,
    ssl      : settings.ssl
  }
});

let args = process.argv.slice(2);

let firstName = args[0];
let lastName = args[1];
let birth = args[2];

if (args.length === 3) {

  knex("famous_people").insert({ first_name: firstName, last_name: lastName, birthdate: birth })
    .returning("*")
    .asCallback(function(err, rows) {
      if (err) {
        console.log(err);
      }
    console.log("Insertion Successfull!");

    knex.destroy();
  });
}

else {

  console.log("Error.  This script requires 3 arguments, the famous person's first_name, then last_name, then birthday.");
}