import Server from './classes/server';
import bodyParser from 'body-parser';
import fileUpload from 'express-fileupload';
import usuarioRoutes from './routes/usuario';
import tipoProductoRoutes from './routes/tipoProducto';
import unidadMedidaRoutes from './routes/unidadMedida';
import productoRoutes from './routes/producto';
import archivoProductoRoutes from './routes/archivoProducto';

const server = new Server();

// Configurar cabeceras y cors
server.app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method, cotiweb-token');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});


// Body parser
server.app.use( bodyParser.urlencoded({ extended: true }));
server.app.use( bodyParser.json() );

// FileUpload
server.app.use( fileUpload({ useTempFiles: true }) );

// Rutas de mi app
server.app.use('/usuario', usuarioRoutes );
server.app.use('/tipoProducto', tipoProductoRoutes );
server.app.use('/unidadMedida', unidadMedidaRoutes );
server.app.use('/producto', productoRoutes );
server.app.use('/archivoProducto', archivoProductoRoutes );


// Levantar express
server.start( () => {
    console.log(`Servidor corriendo en puerto ${ server.port }`);
});