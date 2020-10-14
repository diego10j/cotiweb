
import express from 'express';


export default class Server {

    public app : express.Application;
    public port: number =  parseInt(<string>process.env.PORT, 10) || 3200;

    constructor() {
        this.app = express();
    }

    start( callback: Function ) {
        this.app.listen(  this.port );
    }

}