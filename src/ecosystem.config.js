module.exports = {
    apps: [
      {
        // Nombre de la aplicación
        name: 'express-typescript-api',
        // Ubicación de archivo principal del build
        script: 'index.js',
        env: {
          // Datos del .env
          DB_HOST: '127.0.0.1',
          DB_PORT: 3306,
          DB_USER: 'root',
          DB_PASSWORD: 1234,
          DB_NAME: 'beys_cafe',
          PORT: 8080,
          SECRET: '3f5e7894bc5f8e74c2b0e1eaf79db92cd63e71036ef65c925d6d67d0e6cb1db1'
        },
        env_production: {}
      }
    ]
  };