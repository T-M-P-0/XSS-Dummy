const express = require('express');
const rethinkDB = require('rethinkdb');

const databaseName = "XSSDemoDatabase";
const app = express();
const port = 41005;

async function initializeDatabase(){
    console.log('Initializing database..');

    let connection = null;
    
      await rethinkDB.connect({ host: 'localhost', port: 28015 })
      .then(conn =>{
          connection = conn;
          console.log('Database connection established.');
      })
      .catch((error) =>{
          console.error('An error occurred: ' + error);
      });

      createDatabase(connection, databaseName)
      .then(() =>{
          createTables(connection, databaseName, ["Users", "Entries"]);
        })
      .catch((error) =>{
          console.error('The following error occurred ' + error);
      });

      console.log('Database initialization complete..');
}

/**
 * This function attempts to create a database if no database using the specified name is in existence yet.
 * @param {*} connection The object with which to access the database.
 * @param {*} callback The callback that is called in case of an error.
 */
function createDatabase(connection, databaseName) {
    return rethinkDB.dbList()
    .contains(databaseName)
    .run(connection)
    .then((exists) =>{
        if (exists){
            console.log('Database was not created because it already exists.');
        }
        else{
            rethinkDB.dbCreate(databaseName)
            .run(connection)
            .then(() =>{
                console.log('Database was successfully created.');
            })
            .catch((error) =>{
                console.error('The following error occurred: ' + error);
            });
        }
    })
    .catch((error) =>{
        console.error('The following error occurred: ', error);
    });
}

/**
 * Creates tables in the specified database. The names of these tables can be specified via the @tableNames parameter.
 * @param {*} connection An object with which to access the database. 
 * @param {*} databaseName The name of the database in which to create the tables.
 * @param {*} tableNames An array containing the names of the tables.
 */
function createTables(connection, databaseName, tableNames){
    tableNames.forEach(async element => {
        await createTable(connection, databaseName, element);
    });
}

/**
 * Creates a table with the specified name in the specified database.
 * @param {*} connection An object with which to access the database. 
 * @param {*} databaseName The name of the database.
 * @param {*} tableName The name of the table to create.
 */
function createTable(connection, databaseName, tableName){
    rethinkDB.
    db(databaseName)
    .tableList()
    .contains(tableName)
    .run(connection)
    .then((exists) =>{
        if (exists){
            console.log('Table ' + tableName + ' already exists and therefore was not created.');
        }
        else{
            rethinkDB.db(databaseName).tableCreate(tableName).run(connection)
            .then(() =>{
                console.log('Table ' + tableName + ' was created successfully.');
            })
            .catch((error) =>{
                console.error('The following error occurred: ' + error);
            });
        }
    });
}

app.post("/user/add", function(request, response){
    console.log('Adding user.');
    let bodyData = request.body;

    console.log(bodyData);
});

app.post("/postentry", function (request, response) {
    console.log('Incoming entry');
    let bodyData = request.body;

    console.log(bodyData);
});

initializeDatabase();
app.listen(port, () =>{
    console.log('Started listening on port ' + port);
});