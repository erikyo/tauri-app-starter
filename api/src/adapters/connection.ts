import { MySQLPromisePool } from "@fastify/mysql";
import { PoolConnection } from "mysql2/promise";

export class MySqlConnection {
  static mysql: MySQLPromisePool;
  private static connection: PoolConnection;

  static async connect() {
    try {
      this.connection = await (this.mysql as MySQLPromisePool).getConnection();
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  static query(sql: string): void | Promise<any> {
    if (this.connection) {
      if (!this.connect()) {
        return console.log("Unable to connect to MySQL database");
      }
    }
    return this.connection.query(sql);
  }

  static release() {
    if (this.connection) {
      this.connection.release();
    }
  }
}
