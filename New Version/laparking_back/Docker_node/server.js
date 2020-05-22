//sudo apt-get install libaio1

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
      password      : "H9G26XZtH9G26XZt&",
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


app.listen(5000,function (){
  const TNS_ADMIN = process.env.TNS_ADMIN;
  console.log('TNS is '+TNS_ADMIN);
  process.env.TNS_ADMIN="/test/Wallet_LAPARKING";
  console.log('TNS is '+process.env.TNS_ADMIN);


  console.log('server listening on port 5000....');
})

//somechange
