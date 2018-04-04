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

function modifyResult(rows) {
  let output = "";

  for (let i = 0; i < rows.length; i++) {

    let firstName = rows[i].first_name;
    let lastName = rows[i].last_name;
    let birthDay = adjustBirthday(rows[i].birthdate);

    output = output + `- ${i+1}: ` + firstName + ` ` + lastName + `, born ` + birthDay + `\n`;
  }

  return output;
}

function adjustBirthday(birthday) {

  let output = birthday;
  output = output.toString();
  output = output.slice(4, 15);

  return output;
}

// client.connect((err) => {
//   if (err) {
//     return console.error("Connection Error", err);
//   }
  //   console.log("Searching ...");
  //   client.query(`SELECT * FROM famous_people WHERE first_name='${args[0]}' OR last_name='${args[0]}'`, (err, result) => {
  //   if (err) {
  //     return console.error("error running query", err);
  //   }
  //   console.log(`Found ${result.rows.length} person(s) by the name ${args[0]}`);
  //   console.log(modifyResult(result));

  //   client.end();
  // });


//});
knex.select().from('famous_people').where({first_name: `${args[0]}`}).orWhere({last_name: `${args[0]}`}).asCallback(function(err, rows) {
  if (err) {
    return console.error(err);
  }

  console.log(`Found ${rows.length} person(s) by the name ${args[0]}`);
  console.log(modifyResult(rows));

  knex.destroy();
});
