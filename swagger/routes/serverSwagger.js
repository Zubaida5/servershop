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
    name: { type: 'string' },
    location: { type: 'string' },
    cpu: { type: 'string' },
    totalRam: { type: 'number' },
    usedRam: { type: 'number' },
    totalStorage: { type: 'string' },
    usedStorage: { type: 'number' },
    isAvailable: { type: 'boolean' },
    lastChecked: { type: 'string' },
    typeId: { type: 'string' },
  },
  example: {
    _id: '5ebac534954b54139806c112',
    name: 'Alpha-VPS-01',
    location: 'Damascus',
    cpu: 'Intel Xeon E-2334',
    totalRam: 256,
    usedRam: 0,
    totalStorage: '4 TB',
    usedStorage: 0,
    isAvailable: true,
    lastChecked: '2026-06-18T20:27:33.708Z',
    typeId: '6a2f01f71a762e06b098a7e6',
    createdAt: '2024-11-24T16:35:04.438Z',
    updatedAt: '2024-11-24T16:35:04.438Z',
  },
};

exports.createServer = {
  type: 'object',
  properties: {
    name: { type: 'string' },
    location: { type: 'string' },
    cpu: { type: 'string' },
    totalRam: { type: 'number' },
    totalStorage: { type: 'string' },
    typeId: { type: 'string' },
  },
  example: {
    name: 'Alpha-VPS-01',
    location: 'Damascus',
    cpu: 'Intel Xeon E-2334',
    totalRam: 256,
    totalStorage: '4 TB',
    typeId: '6a2f01f71a762e06b098a7e6',
  },
  required: ['name', 'location', 'cpu', 'totalRam', 'totalStorage', 'typeId'],
};

exports.updateServer = {
  type: 'object',
  properties: {
    name: { type: 'string' },
    location: { type: 'string' },
    cpu: { type: 'string' },
    totalRam: { type: 'number' },
    totalStorage: { type: 'string' },
    isAvailable: { type: 'boolean' },
  },
  example: {
    name: 'Alpha-VPS-01',
    location: 'Damascus',
    cpu: 'Intel Xeon E-2334',
    totalRam: 256,
    totalStorage: '4 TB',
    isAvailable: true,
  },
};