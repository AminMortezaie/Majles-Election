let express = require("express");
let bodyParser = require("body-parser");
let morgan = require("morgan");
let pg = require("pg");
const PORT = 3000;

let pool = pg.Pool({
  user: "postgres",
  host: "localhost",
  port: 5432,
  password: "Amin4416",
  database: "Election"
});

let app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(function(request, response, next) {
  response.header("Access-Control-Allow-Origin", "YOUR-DOMAIN.TLD"); // update to match the domain you will make the request from
  response.header(
    "Access-Control-Allow-Methods",
    "GET,PUT,POST,DELETE,OPTIONS"
  );
  response.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.get("/api/show-candida", function(request, response) {
  pool.connect((err, db, done) => {
    done();
    if (err) {
      return response.status(400).send(err);
    } else {
      db.query("select * from candida order by candida_id", (err, table) => {
        if (err) {
          return response.status(400).send(err);
        } else {
          return response.status(200).send(table.rows);
        }
      });
    }
  });
});
app.get("/api/show-region", function(request, response) {
  pool.connect((err, db, done) => {
    done();
    if (err) {
      return response.status(400).send(err);
    } else {
      db.query("select * from region", (err, table) => {
        if (err) {
          return response.status(400).send(err);
        } else {
          return response.status(200).send(table.rows);
        }
      });
    }
  });
});
app.get("/api/show-people", function(request, response) {
  pool.connect((err, db, done) => {
    done();
    if (err) {
      return response.status(400).send(err);
    } else {
      db.query("select * from people order by national_id", (err, table) => {
        if (err) {
          return response.status(400).send(err);
        } else {
          return response.status(200).send(table.rows);
        }
      });
    }
  });
});
app.get("/api/show-madrak", function(request, response) {
  pool.connect((err, db, done) => {
    done();
    if (err) {
      return response.status(400).send(err);
    } else {
      db.query("select * from madrak order by madrak_number", (err, table) => {
        if (err) {
          return response.status(400).send(err);
        } else {
          return response.status(200).send(table.rows);
        }
      });
    }
  });
});
app.get("/api/show-gerayesh", function(request, response) {
  pool.connect((err, db, done) => {
    done();
    if (err) {
      return response.status(400).send(err);
    } else {
      db.query("select * from gerayesh_hezbi order by gerayesh_number", (err, table) => {
        if (err) {
          return response.status(400).send(err);
        } else {
          return response.status(200).send(table.rows);
        }
      });
    }
  });
});



app.post("/api/query1", function(request, response) {
  var region_number = request.body.region_number;
  
  pool.connect((err, db, done) => {
    if (err) {
      return response.status(400).send(err);
    } else {
      db.query(
        "select madrak_tahsili,count(*),region_number from candida join madrak_candida on candida.candida_id = madrak_candida.candida_id join madrak on madrak_candida.madrak_number= madrak.madrak_number group by madrak_tahsili,region_number having region_number =$1",
          [ region ],
        (err, table) => {
          if (err) {
            return response.status(400).send(err);
          } else {
            console.log("query done!");
            db.end();
            response.status(201).send(table.rows);
          }
        }
      );
    }
  });
});

app.post("/api/new-candida", function(request, response) {
  var candida_id = request.body.candida_id;
  var name = request.body.name;
  var family = request.body.family;
  var phone_number = request.body.phoneNumber;
  var email = request.body.email;
  var region_number = request.body.regionNumber;
  var shora_negahban_number = request.body.shoraNegahbanNumber;
  // var age = request.body.age;
  let values = [
    candida_id,
    name,
    family,
    phone_number,
    email,
    region_number,
    shora_negahban_number,
    // age
  ];
  pool.connect((err, db, done) => {
    if (err) {
      return response.status(400).send(err);
    } else {
      db.query(
        "insert into candida values($1,$2,$3,$4,$5,$6,$7)"
        ,values
        ,(err, table) => {
          if (err) {
            return response.status(403).send(err);
          } else {
            console.log("Data inserted!");
            db.end();
            response.status(201).send({ message: "data inserted!" });
          }
        }
      );
    }
  });
});

app.post("/api/new-region", function(request, response) {
  var region_number = request.body.region_number;
  var population = request.body.population;
  var region_name = request.body.region_name;
  let values = [region_number, population, region_name];
  pool.connect((err, db, done) => {
    if (err) {
      return response.status(400).send(err);
    } else {
      db.query("insert into region values($1,$2,$3)", values, (err, table) => {
        if (err) {
          return response.status(400).send(err);
        } else {
          console.log("region inserted!");
          db.end();
          response.status(201).send({ message: "region inserted!" });
        }
      });
    }
  });
});


app.post("/api/new-people", function(request, response) {
  var national_id = request.body.national_id;
  var region_number = request.body.region_number;
  var age = request.body.age;
  var name = request.body.name;
  var family = request.body.family;
  let values = [national_id, region_number, age, name, family];
  pool.connect((err, db) => {
    if (err) {
      return response.status(400).send(err);
    } else {
      db.query(
        "insert into region values($1,$2,$3,$4,$5)",
        values,
        (err, table) => {
          if (err) {
            return response.status(400).send(err);
          } else {
            console.log("region inserted!");
            db.end();
            response.status(201).send({ message: "region inserted!" });
          }
        }
      );
    }
  });
});
app.post("/api/new-madrak", function(request, response) {
  var madrak_number = request.body.madrak_number;
  var madrak_tahsili = request.body.madrak_tahsili;
  var gerayesh = request.body.gerayesh;

  let values = [madrak_number, madrak_tahsili, gerayesh];
  pool.connect((err, db) => {
    if (err) {
      return response.status(400).send(err);
    } else {
      db.query("insert into madrak values($1,$2,$3)", values, (err, table) => {
        if (err) {
          return response.status(400).send(err);
        } else {
          console.log("madrak inserted!");
          db.end();
          response.status(201).send({ message: "madrak inserted!" });
        }
      });
    }
  });
});
app.post("/api/new-gerayesh", function(request, response) {
  var gerayesh_number = request.body.gerayesh_number;
  var name = request.body.name;
  var gerayesh_duration = request.body.gerayesh_duration;
  var hezb_kind = request.body.hezb_kind;
  var positon = request.body.positon;
  let values = [gerayesh_number, name,hezb_kind, gerayesh_duration, positon];
  console.log(values)
  pool.connect((err, db) => {
    if (err) {
      return response.status(400).send(err);
    } else {
      db.query(
        "insert into gerayesh_hezbi values($1,$2,$3,$4,$5)",
        values,
        (err, table) => {
          if (err) {
            return response.status(400).send(err);
          } else {
            console.log("gereyesh inserted!");
            db.end();
            response.status(201).send({ message: "gerayesh inserted!" });
          }
        }
      );
    }
  });
});

app.delete("/api/remove-candida/:id", function(request, response) {
  var candida_id = request.params.id;
  pool.connect((err, db, done) => {
    if (err) {
      return response.status(400).send(err);
    } else {
      db.query(
        "delete from candida where candida.candida_id = $1",
        [Number(candida_id)],
        (err, table) => {
          if (err) {
            return response.status(400).send(err);
          } else {
            console.log("candida data removed!");
            db.end();
            response.status(201).send({ message: "candida data removed!" });
          }
        }
      );
    }
  });
});
app.delete("/api/remove-region/:id", function(request, response) {
  var region_number = request.params.id;
  pool.connect((err, db, done) => {
    if (err) {
      return response.status(400).send(err);
    } else {
      db.query(
        "delete from region where region.region_number = $1",
        [Number(region_number)],
        (err, table) => {
          if (err) {
            return response.status(400).send(err);
          } else {
            console.log("region data removed!");
            db.end();
            response.status(201).send({ message: "candida data removed!" });
          }
        }
      );
    }
  });
});
app.delete("/api/remove-people/:id", function(request, response) {
  var national_id = request.params.id;
  pool.connect((err, db, done) => {
    if (err) {
      return response.status(400).send(err);
    } else {
      db.query(
        "delete from region where people.national_id = $1",
        [Number(national_id)],
        (err, table) => {
          if (err) {
            return response.status(400).send(err);
          } else {
            console.log("people Data removed!");
            db.end();
            response.status(201).send({ message: "people data removed!" });
          }
        }
      );
    }
  });
});
app.delete("/api/remove-madrak/:id", function(request, response) {
  var madrak_number = request.params.id;
  pool.connect((err, db, done) => {
    if (err) {
      return response.status(400).send(err);
    } else {
      db.query(
        "delete from madrak where madrak.madrak_number = $1",
        [Number(madrak_number)],
        (err, table) => {
          if (err) {
            return response.status(400).send(err);
          } else {
            console.log("madrak Data removed!");
            db.end();
            response.status(201).send({ message: "madrak data removed!" });
          }
        }
      );
    }
  });
});
app.delete("/api/remove-gerayesh/:id", function(request, response) {
  var gerayesh_number = request.params.id;
  pool.connect((err, db, done) => {
    if (err) {
      return response.status(400).send(err);
    } else {
      db.query(
        "delete from gerayesh_hezbi where gerayesh_hezbi.gerayesh_number = $1",
        [Number(gerayesh_number)],
        (err, table) => {
          if (err) {
            return response.status(400).send(err);
          } else {
            console.log("gerayesh Data removed!");
            db.end();
            response.status(201).send({ message: "gerayesh data removed!" });
          }
        }
      );
    }
  });
});

app.listen(PORT, () => console.log("listening on PORT " + PORT));
