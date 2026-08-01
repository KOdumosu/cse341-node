const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'School API',
      version: '1.0.0',
      description: 'CSE341 School Management REST API'
    },
    servers: [
      {
        url: process.env.RENDER_EXTERNAL_URL || `http://localhost:${process.env.PORT || 3000}`
      }
    ]
  },
  apis: ['./routes/*.js']
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = {
  swaggerUi,
  swaggerSpec
};