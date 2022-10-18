const moment = require("moment/moment");
const db = require("../config/db");
const { generateToken } = require("../helper/jwt");

class CrudController {
  static async register(req, res, next) {
    try {
      const { email, password } = req.body;
      const addData = await db.query(
        `INSERT INTO users (email,"password")
        VALUES('${email}','${password}')`
      );
      res.status(200).json({ message: "register sukses" });
    } catch (error) {
      next(error);
    }
  }
  static async loginaja(req, res, next) {
    try {
      const { email, password } = req.body;
      const findEmail = await db.query(
        `SELECT * FROM users WHERE users.email = '${email}' LIMIT 1`
      );
      console.log(findEmail);

      if (findEmail.rowCount > 0) {
        const findEmailUser = findEmail.rows[0];
        if (password == findEmailUser.password) {
          const payload = {
            id: findEmailUser.id,
            email: findEmailUser.email,
            password: findEmailUser.password,
          };
          const token = generateToken(payload);
          res.status(200).json({ token });
        } else {
          res.status(400).json({ message: "Invalid Password" });
        }
      } else {
        res.status(404).json(`message: User with email ${email} not found`);
      }
    } catch (err) {
      res.status(502).send(err);
    }
  }
  static async reflectionCreate(req, res) {
    try {
      const { success, low_point, take_away } = req.body;
      const user = req.user;
      const created_date = new Date();
      console.log(created_date);
      const modified_date = new Date();
      await db.query(
        `INSERT INTO reflection (success,low_point,take_away,owner_id,created_date,modified_date)
          VALUES('${success}','${low_point}', '${take_away}','${user.id}','${created_date}','${modified_date}')`
      );
      const getData = await db.query(`
      SELECT * FROM reflection WHERE reflection.owner_id = '${user.id}'
      `);
      const reflection = getData.rows[getData.rows.length - 1];
      if (reflection) {
        const created_date_format = new Date(reflection.created_date);
        const modified_date_format = new Date(reflection.modified_date);
        const data = {
          id: reflection.id,
          success: reflection.success,
          low_point: reflection.low_point,
          take_away: reflection.take_away,
          created_date: created_date_format,
          modified_date: modified_date_format,
        };
        res.status(201).json({ data });
      }
      // console.log(addData);
    } catch (error) {
      console.log(error);
    }
  }
  static async reflectionData(req, res) {
    try {
      const user = req.user;
      const getData = await db.query(
        `SELECT * FROM reflection WHERE reflection.owner_id = '${user.id}'`
      );
      if (getData.rowCount > 0) {
        res.status(201).json(getData.rows);
      } else {
        res.status(201).json({ message: "no data" });
      }
    } catch (error) {
      console.log(error);
    }
  }
  static async reflectionId(req, res) {
    try {
      const id = req.params.id;
      const user = req.user;
      const getData = await db.query(
        `SELECT * FROM reflection WHERE reflection.id = '${id}' AND reflection.owner_id = '${user.id}'`
      );
      if (getData.rowCount > 0) {
        res.status(201).json(getData.rows[0]);
      } else {
        res.status(201).json({ message: "no data" });
      }
    } catch (error) {
      console.error(error);
    }
  }
  static async reflectionUpdate(req, res) {
    try {
      const id = req.params.id;
      const { success, low_point, take_away } = req.body;
      const user = req.user;
      const getData = await db.query(
        `UPDATE reflection SET success = '${success}', low_point = '${low_point}', take_away = '${take_away}'  WHERE reflection.id = '${id}' AND reflection.owner_id = '${user.id}'`
      );
      if (getData.rowCount > 0) {
        res.status(201).json({ message: "update success" });
      } else {
        res.status(201).json({ message: "no data" });
      }
    } catch (error) {
      console.error(error);
    }
  }
  static async reflectionDelete(req, res) {
    try {
      const id = req.params.id;
      const user = req.user;
      const getData = await db.query(
        `DELETE FROM reflection  WHERE reflection.id = '${id}' AND reflection.owner_id = '${user.id}'`
      );
      console.log(getData);
      if (getData.rowCount > 0) {
        res.status(201).json({ message: "Delete success" });
      } else {
        res.status(201).json({ message: "no data" });
      }
    } catch (error) {
      console.error(error);
    }
  }
}

module.exports = CrudController;
