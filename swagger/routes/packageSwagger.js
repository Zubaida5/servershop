/**
 * @swagger
 * tags:
 *   name: packages
 *   description: package management and retrieval
 */

/**
 * @swagger
 * /packages:
 *   post:
 *     summary: Create a package
 *     description: ADMIN can create package.
 *     tags: [packages]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/createpackage'
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
 *                 data:
 *                   type: object
 *                   properties:
 *                     doc:
 *                       $ref: '#/components/schemas/package'
 *       "400":
 *         $ref: '#/components/responses/DuplicateEmail'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *
 *   get:
 *     summary: Get all packages
 *     description: USER,ADMIN can retrieve all packages. ADMIN sees full server details, USER sees server id only.
 *     tags: [packages]
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
 *         description: Maximum number of packages
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: key-words you want to search about it
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
 *                 results:
 *                   type: number
 *                   example: 6
 *                 data:
 *                   type: object
 *                   properties:
 *                     doc:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/package'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 */

/**
 * @swagger
 * /packages/{id}:
 *   get:
 *     summary: Get a package
 *     description: USER,ADMIN can use this router. ADMIN sees full server details, USER sees server id only.
 *     tags: [packages]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: package id
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
 *                   type: object
 *                   properties:
 *                     doc:
 *                       $ref: '#/components/schemas/package'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   patch:
 *     summary: Update a package
 *     description: ADMIN can use this router.
 *     tags: [packages]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: package id
 *     requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/updatepackage'
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
 *                   type: object
 *                   properties:
 *                     doc:
 *                       $ref: '#/components/schemas/package'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   delete:
 *     summary: Delete a package.
 *     description: ADMIN can use this router.
 *     tags: [packages]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: package id
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

exports.package = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    name: { type: 'string' },
    ram: { type: 'number' },
    storage: { type: 'string' },
    cpu: { type: 'string' },
    price: { type: 'number' },
    priceMonthly: { type: 'number' },
    serverId: { type: 'string' },
    isAvailable: { type: 'boolean' },
  },
  example: {
    _id: '5ebac534954b54139806c112',
    name: 'VPS Starter',
    ram: 8,
    storage: '256 GB',
    cpu: 'Intel Xeon E-2334',
    price: 99,
    priceMonthly: 9,
    serverId: '6a2f01f71a762e06b098a7e6',
    isAvailable: true,
    createdAt: '2024-11-24T16:35:04.438Z',
    updatedAt: '2024-11-24T16:35:04.438Z',
  },
};

exports.createpackage = {
  type: 'object',
  properties: {
    name: { type: 'string' },
    ram: { type: 'number' },
    storage: { type: 'string' },
    cpu: { type: 'string' },
    price: { type: 'number' },
    priceMonthly: { type: 'number' },
    serverId: { type: 'string' },
  },
  example: {
    name: 'VPS Starter',
    ram: 8,
    storage: '256 GB',
    cpu: 'Intel Xeon E-2334',
    price: 99,
    priceMonthly: 9,
    serverId: '6a2f01f71a762e06b098a7e6',
  },
  required: [
    'name',
    'ram',
    'storage',
    'cpu',
    'price',
    'priceMonthly',
    'serverId',
  ],
};

exports.updatepackage = {
  type: 'object',
  properties: {
    name: { type: 'string' },
    ram: { type: 'number' },
    storage: { type: 'string' },
    cpu: { type: 'string' },
    price: { type: 'number' },
    priceMonthly: { type: 'number' },
    isAvailable: { type: 'boolean' },
  },
  example: {
    name: 'VPS Starter',
    ram: 8,
    storage: '256 GB',
    cpu: 'Intel Xeon E-2334',
    price: 99,
    priceMonthly: 9,
    isAvailable: true,
  },
};
