//sudo apt-get install libaio1
//deploy to https://laparkingnodeserver2-xguycfwvma-uw.a.run.app/

const express = require('express');

const app = express();
const oracledb = require('oracledb');
const cors =require('cors');

app.use(cors());

async function run() {

  let connection;
  let result;

  try {
    connection =  await oracledb.getConnection(  {
      user          : "ADMIN",
      password      : "",
      connectString : "laparking_medium"
    });

    result =  await connection.execute(
      'SELECT * from lastDetail',
      {},
      { outFormat: oracledb.OUT_FORMAT_OBJECT }
 // bind value for :id
    );
    console.log(result.rows[0]);

    return result;

  } catch (err) {
    console.error(err);
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error(err);
      }
    }
  }
}




app.get("/",async (req, res)=>{
  //res.send("Hello");
  const r = await run();
  res.send(JSON.parse(JSON.stringify(r.rows)));
});

const port = process.env.PORT || 5000

app.listen(port,function (){
  console.log('server listening on port 5000....');
})

//somechange
