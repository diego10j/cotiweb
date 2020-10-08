import Server from './classes/server';
import bodyParser from 'body-parser';
import fileUpload from 'express-fileupload';
import sistemaRoutes from './routes/sistema';
import usuarioRoutes from './routes/usuario';
import tipoProductoRoutes from './routes/tipoProducto';
import unidadMedidaRoutes from './routes/unidadMedida';
import productoRoutes from './routes/producto';
import archivoProductoRoutes from './routes/archivoProducto';
import clienteRoutes from './routes/cliente';
import cotizacionRoutes from './routes/cotizacion';

import tipoCotizacionRoutes from './routes/tipoCotizacion';
import estadoCotizacionRoutes from './routes/estadoCotizacion';
import validezCotizacionRoutes from './routes/validezCotizacion';
import condicionCotizacionRoutes from './routes/condicionCotizacion';

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
server.app.use('/sistema', sistemaRoutes );
server.app.use('/usuario', usuarioRoutes );
server.app.use('/tipoProducto', tipoProductoRoutes );
server.app.use('/unidadMedida', unidadMedidaRoutes );
server.app.use('/producto', productoRoutes );
server.app.use('/archivoProducto', archivoProductoRoutes );
server.app.use('/cliente', clienteRoutes );
server.app.use('/cotizacion', cotizacionRoutes );

server.app.use('/tipoCotizacion', tipoCotizacionRoutes );
server.app.use('/estadoCotizacion', estadoCotizacionRoutes );
server.app.use('/condicionCotizacion', condicionCotizacionRoutes );
server.app.use('/validezCotizacion', validezCotizacionRoutes );
// Levantar express
server.start( () => {
    console.log(`Servidor corriendo en puerto ${ server.port }`);
});

