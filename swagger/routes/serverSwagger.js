/**
 * @swagger
 * tags:
 *   name: Servers
 *   description: Server management and retrieval
 */

/**
 * @swagger
 * /servers:
 *   post:
 *     summary: Create a server
 *     description: ADMIN can create server.
 *     tags: [Servers]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/createServer'
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 doc:
 *                     $ref: '#/components/schemas/Server'
 *       "400":
 *         $ref: '#/components/responses/DuplicateEmail'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *
 *   get:
 *     summary: Get all servers
 *     description: USER,ADMIN can retrieve all servers.
 *     tags: [Servers]
 *     security:
 *       - Bearer: []
 *     parameters:
 *       - in: query
 *         name: fields
 *         schema:
 *           type: string
 *         description: what fields do you want to show (ex. name,price)
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *         default: 10
 *         description: Maximum number of servers
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: key-words you want to search about it
 *       - in: query
 *         name: agg
 *         schema:
 *           type: string
 *         description: group data by any field  (ex. {group=[brand],max=price,min= price,sum=price,avg=price})
 *       - in: query
 *         name: aggDate
 *         schema:
 *           type: string
 *         description: group data by date fields   (ex. {group=[createdAt],date=month,max=price,min=price,avg=price,year=2022})
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *         description: sort by query in the form of field:desc/asc (ex. name,-price)
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 doc:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Server'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 */

/**
 * @swagger
 * /servers/{id}:
 *   get:
 *     summary: Get a server
 *     description: USER,ADMIN can use this router.
 *     tags: [Servers]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Server id
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 doc:
 *                     $ref: '#/components/schemas/Server'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   patch:
 *     summary: Update a server
 *     description: ADMIN can use this router.
 *     tags: [Servers]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Server id
 *     requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/updateServer'
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 doc:
 *                     $ref: '#/components/schemas/Server'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   delete:
 *     summary: Delete a  server.
 *     description: ADMIN can use this router.
 *     tags: [Servers]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Server id
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   type: string
 *                   example: null
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */

exports.Server = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    // property
    lastChecked: { type: 'boolean' },
    location: { type: 'string' },
    priceMonthly: { type: 'number' },
    price: { type: 'number' },
    storage: { type: 'string' },
    cpu: { type: 'string' },
    ram: { type: 'number' },
    type: { type: 'string' },
    name: { type: 'string' },
  },
  example: {
    _id: '5ebac534954b54139806c112',
    // property example
    lastChecked: 2026 - 4 - 4,

    location: 'gujhik',

    priceMonthly: 600,

    price: 500,

    storage: '1 T',

    cpu: 'intel core i 7',

    ram: 16,

    typeId: '673c40cd59e293827f79e398',

    name: 'AWS',

    createdAt: '2024-11-24T16:35:04.438Z',
    updatedAt: '2024-11-24T16:35:04.438Z',
  },
};
exports.createServer = {
  type: 'object',
  properties: {
    // create property
    lastChecked: { type: 'boolean' },
    location: { type: 'string' },
    priceMonthly: { type: 'number' },
    price: { type: 'number' },
    storage: { type: 'string' },
    cpu: { type: 'string' },
    ram: { type: 'number' },
    type: { type: 'string' },
    name: { type: 'string' },
  },
  example: {
    // create property example
    lastChecked: 2026 - 4 - 4,

    location: 'gujhik',

    priceMonthly: 600,

    price: 500,

    storage: '1 T',

    cpu: 'intel core i 7',

    ram: 16,

    typeId: '673c40cd59e293827f79e398',

    name: 'AWS',
  },
  required: [
    // required property

    'location',

    'priceMonthly',

    'price',

    'storage',

    'cpu',

    'ram',

    'type',

    'name',
  ],
};
exports.updateServer = {
  type: 'object',
  properties: {
    // update property
    lastChecked: { type: 'boolean' },
    location: { type: 'string' },
    priceMonthly: { type: 'number' },
    price: { type: 'number' },
    storage: { type: 'string' },
    cpu: { type: 'string' },
    ram: { type: 'number' },
    type: { type: 'string' },
    name: { type: 'string' },
  },
  example: {
    // update property example
    lastChecked: 2026 - 4 - 4,

    location: 'gujhik',

    priceMonthly: 600,

    price: 500,

    storage: '1 T',

    cpu: 'intel core i 7',

    ram: 16,

    typeId: '673c40cd59e293827f79e398',

    name: 'AWS',
  },
};
