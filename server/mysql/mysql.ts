import mysql = require('mysql');

export default class MySQL {

    private static _instace: MySQL;

    conexion: mysql.Connection;
    isConectado: boolean = false;

    constructor() {
        console.log('Clase inicializada');
        this.conexion = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'diego',
            database: 'cotiweb'
        });

        this.conectarDB();

    }

    /**Singleton
     */
    public static get instance() {
        //Para usar la misma instancia y prevenir multiples conexiones
        return this._instace || (this._instace = new this());
    }

    /**
     * Para evitar inyección SQL en consultas a la base de datos
     * @param valor 
     */
    static escape(valor: any) {
        return this.instance.conexion.escape(valor);
    }


    /**
     * Función genérica para realizar una consulta en la base de datos
     * @param sql 
     * @param callback 
     */
    static consultar(sql: string, callback: Function) {
        this.instance.conexion.query(sql, (err, results: Object[], fields) => {
            if (err) {
                console.log("Error al ejecutar : " + err);
                return callback(err);
            }
            if (results.length === 0) {
                callback(null, null);
            }
            else {
                callback(null, results);
            }
        });
    }

    /**
     * Consulta generica en una tabla
     * @param tabla 
     * @param condiciones 
     * @param callback 
     */
    static consultarTabla(tabla: string, condiciones: any, callback: Function) {
        const query = `SELECT * FROM ${tabla} WHERE ?`;
        this.instance.conexion.query(query, condiciones, (err, results: Object[], fields) => {
            if (err) {
                console.log("Error al consultarTabla : " + err);
                return callback(err);
            }
            if (results.length === 0) {
                callback(null, null);
            }
            else {
                callback(null, results);
            }
        });
    }

    /**
     * Función genérica para insertar un registro en una tabla de la base de datos
     * @param tabla 
     * @param campos 
     * @param callback 
     */
    static insertar(tabla: string, campos: any, callback: Function) {
        const query = `INSERT INTO ${tabla} SET ?`;
        this.instance.conexion.query(query, campos, (err, results, fields) => {
            if (err) {
                console.log("Error al insertar : " + err);
                return callback(err);
            }
            callback(null, results.insertId);
        });
    }

    /**
     * Función genérica para eliminar un registro en una tabla de la base de datos
     * @param tabla 
     * @param condiciones 
     * @param callback 
     */
    static eliminar(tabla: string, condiciones: any, callback: Function) {
        const query = `DELETE  FROM ${tabla} WHERE ?`;
        this.instance.conexion.query(query, condiciones, (err, results, fields) => {
            if (err) {
                console.log("Error al insertar : " + err);
                return callback(err);
            }

            if (results.affectedRows === 0) {
                callback('El registro a eliminar no existe ')
            }
            else {
                callback(null, results.affectedRows);
            }
        });
    }


    /**
    * Función genérica para actualizar un registro en una tabla de la base de datos
    * @param tabla 
    * @param condiciones 
    * @param callback 
    */
    static actualizar(tabla: string, campos: any, condiciones: any, callback: Function) {
        let query = `UPDATE ${tabla} SET ? WHERE ?`;
        let data = [campos, condiciones];
        this.instance.conexion.query(query, data, (err, results, fields) => {
            if (err) {
                console.log("Error al insertar : " + err);
                return callback(err);
            }
            if (results.changedRows === 0) {
                callback('El registro a modificar no existe ')
            }
            else {
                callback(null, results.changedRows);
            }
        });
    }


    /**
     * Función genérica para realizar una consulta de un registro por Id
     * @param sql 
     * @param callback 
     */
    static buscarPorId(tabla: string, condicion: any, callback: Function) {
        const sql = `SELECT * FROM ${tabla} WHERE ?`;
        this.instance.conexion.query(sql, condicion, (err, results: Object[], fields) => {
            if (err) {
                console.log("Error al ejecutar : " + err);
                return callback(err);
            }

            if (results.length === 0) {
                callback(null, null);
            }
            else {
                callback(null, results[0]);
            }
        });
    }

    /**
     * Conexion a la base de datos Mysql
     */
    private conectarDB() {
        this.conexion.connect((err: mysql.MysqlError) => {

            if (err) {
                console.log(err.message);
                return;
            }

            this.isConectado = true;
            console.log('Base de datos MySQL online!');

        });
    }




}