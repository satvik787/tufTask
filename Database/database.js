require("dotenv").config();
const mysql = require("mysql2/promise");

class DAO{
    #db
    static PER_PAGE = 10;
    constructor() {
        this.#db = mysql.createPool({
            host:process.env.HOST,
            user:process.env.USER,
            password:process.env.PASSWORD,
            database:process.env.DATABASE,
            port:process.env.PORT
        });
    }

    async getSubmission(page){
        page = Math.max(1,page);
        const offset = (page - 1) * DAO.PER_PAGE;
        const [rows] = await this.#db.query(
            `SELECT * FROM submission ORDER BY submittedOn desc LIMIT ?,?`,
            [offset,DAO.PER_PAGE]
        );
        return rows;
    }


    async insertSubmission({userName,code,language,stdin,output,submittedOn}){

        return await this.#db.query(
            `
                INSERT INTO submission (userName,code,language,stdin,output,submittedOn)
                VALUES (?,?,?,?,?,?)
            `,
            [userName, code, language, stdin, output,submittedOn]
        );
    }

    async rowCount(){
        const [rows] = await this.#db.query(
            `SELECT count(id) as count FROM submission`
        )
        return rows;
    }

}
module.exports = DAO;