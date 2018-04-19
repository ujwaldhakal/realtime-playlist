import mysql from 'mysql'

class mysqlService {
    runQuery (sql, params = [], single = false) {
        const connection = mysql.createConnection({
            host: 'mysql',
            user: 'root',
            password: 'root',
            database: 'song'
        })

        connection.connect()

        return new Promise((resolve, reject) => {
            connection.query(sql, params, (err, results) => {
                if(err) {
                    console.log(err);
                }
                let returnedResult = []

                if (single) {
                    returnedResult = {}
                }



                if (results !== undefined && results.length) {
                    returnedResult = results
                    if (single) {
                        returnedResult = results[0]
                    }
                }

                resolve(returnedResult)
            })
        })
    }

    async findOneByColumn (table, column, value) {
        const sql = 'select * from ' + table + ' where ' + column + ' = ? limit 1'

        return this.runQuery(sql, [value], 1)
    }

    update (table, changes, where) {
        const sql = `update ${table} set ? where ?`
        return this.runQuery(sql, [changes, where])
    }

    insert (table, value) {
        console.log(value);
        const sql = `insert into ${table} (url) values ('${value}')`
        return this.statement(sql)
    }

    delete (table, value) {
        const sql = `DELETE FROM ${table} WHERE id = ${value}`
        return this.statement(sql)
    }

    statement (sql) {
        return this.runQuery(sql)
    }
}


export default mysqlService
