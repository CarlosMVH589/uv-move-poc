import ibmdb from "ibm_db";

const connectionString = [
  `DATABASE=${process.env.DB2_DATABASE ?? "UVMOVE"}`,
  `HOSTNAME=${process.env.DB2_HOSTNAME ?? "localhost"}`,
  `PORT=${process.env.DB2_PORT ?? "50000"}`,
  `PROTOCOL=${process.env.DB2_PROTOCOL ?? "TCPIP"}`,
  `UID=${process.env.DB2_UID ?? "db2inst1"}`,
  `PWD=${process.env.DB2_PWD ?? ""}`,
].join(";");

function openConnection() {
  if (!process.env.DB2_PWD) {
    return Promise.reject(new Error("Falta DB2_PWD en backend/.env"));
  }

  return new Promise((resolve, reject) => {
    ibmdb.open(connectionString, (error, connection) => {
      if (error) reject(error);
      else resolve(connection);
    });
  });
}

export async function query(sql, params = []) {
  const connection = await openConnection();

  try {
    return await new Promise((resolve, reject) => {
      connection.query(sql, params, (error, data) => {
        if (error) reject(error);
        else resolve(data);
      });
    });
  } finally {
    connection.closeSync();
  }
}