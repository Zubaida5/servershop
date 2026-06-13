const swaggerJsDoc = require('swagger-jsdoc');
const { Order, createOrder, updateOrder } = require('./routes/orderSwagger');
const {
  Massages,
  createMassages,
  updateMassages,
} = require('./routes/massagesSwagger');
const {
  Review,
  createReview,
  updateReview,
} = require('./routes/reviewSwagger');
const { Type, createType, updateType } = require('./routes/typeSwagger');
const {
  Server,
  createServer,
  updateServer,
} = require('./routes/serverSwagger');
const { signUp } = require('./routes/auth');
const { User, updateMe, createUser } = require('./routes/users');
const {
  DuplicateEmail,
  Error,
  Forbidden,
  NotFound,
  Unauthorized,
} = require('./components');

const options = {
  url: '',
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'REST API Docs',
      version: '1.0.0',
      description:
        'This is an API simpel Auth made with Express and documented with Swagger',
    },
    servers: [
      {
        url: 'http://localhost:7000/api/v1.0.0',
        description: 'Development server',
      },
    ],
    components: {
      schemas: {
        Order,
        createOrder,
        updateOrder,
        Massages,
        createMassages,
        updateMassages,
        Review,
        createReview,
        updateReview,
        Type,
        createType,
        updateType,
        Server,
        createServer,
        updateServer,
        signUp,
        createUser,
        updateMe,
        User,
        Error,
      },
      securitySchemes: {
        Bearer: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'Enter the token : abcde12345".',
        },
      },
      responses: {
        DuplicateEmail,
        Forbidden,
        NotFound,
        Unauthorized,
        201: {
          description: 'created',
        },
        200: {
          description: 'ok',
        },
        204: {
          description: 'No content',
        },
        400: {
          description: 'Bad request',
        },
        401: {
          description: 'Unauthorized',
        },
        403: {
          description: 'Forbidden',
        },
        404: {
          description: 'Not found',
        },
        413: {
          description: 'Payload Too Large',
        },
        500: {
          description: 'Internal server error',
        },
      },
    },
  },
  apis: ['./swagger/routes/*.js'],
};
const swaggerSpec = swaggerJsDoc(options);
module.exports = swaggerSpec;
