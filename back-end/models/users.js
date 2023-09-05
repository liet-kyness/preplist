"use strict";

const db = require("../db");
const bcrypt = require("bcrypt");
const { sqlForPartialUpdate } = require("../helpers/sql");
const { NotFoundError, BadRequestError, UnauthorizedError } = require("../expressError");

const { BCRYPT_WORK_FACTOR } = require("../config");

class User {
    static async authenticate(username, password) {
        const result = await db.query(
            `SELECT username,
                    password,
                    first_name AS "firstName",
                    last_name AS "lastName"
            FROM users
            WHERE username = $1`, [username],
        );
        const user = result.rows[0];
        if (user) {
            const isValid = await bcrypt.compare(password, user.password);
            if (isValid === true) {
                delete user.password;
                return user;
            }
        }
        throw new UnauthorizedError("Invalid username/password");
    }

    static async register({ username, password, firstName, lastName }) {
        const duplicateCheck = await db.query(
            `SELECT username
            FROM users
            WHERE username = $1`, [username],
        );
        if (duplicateCheck.rows[0]) {
            throw new BadRequestError(`Username already exists: ${username}`);
        }
        const hashedPassword = await bcrypt.hash(password, BCRYPT_WORK_FACTOR);
        const result = await db.query(
            `INSERT INTO users (username, password, first_name, last_name)
            VALUES ($1, $2, $3, $4)
            RETURNING username, first_name AS "firstName", last_name AS "lastName"`,
            [username, hashedPassword, firstName, lastName],
        );

        const user = result.rows[0];

        return user;
    }


    static async findAll() {
        const result = await db.query(
            `SELECT username,
                    first_name AS "firstName",
                    last_name AS "lastName"
             FROM users
             ORDER BY username`,
        );
        return result.rows;
    }

    static async update(username, data) {
        if (data.password) {
            data.password = await bcrypt.hash(data.password, BCRYPT_WORK_FACTOR);
        }

        const { setCols, values } = sqlForPartialUpdate(
            data,
            {
                firstName: "first_name",
                lastName: "last_name",
            });
        const usernameVarIdx = "$" + (values.length + 1);
        const querySql = `UPDATE users
                          SET ${setCols}
                          WHERE username = ${usernameVarIdx}
                          RETURNING username,
                                    first_name AS "firstName",
                                    last_name AS "lastName"`;
        const result = await db.query(querySql, [...values, username]);
        const user = result.rows[0];

        if (!user) throw new NotFoundError(`User not found: ${username}`);
        delete user.password;
        return user;
    }

    static async get(username) {
        const userRes = await db.query(
            `SELECT username,
                    first_name AS "firstName",
                    last_name AS "lastName"
                FROM users
                WHERE username = $1`,
                [username]
        );
    }
}

module.exports = User;