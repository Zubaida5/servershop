/**
 * @swagger
 * tags:
 *   name: Messages
 *   description: Message management and retrieval
 */

/**
 * @swagger
 * /messages/mine:
 *   get:
 *     summary: Get all messages
 *     description:  can retrieve all messages.
 *     tags: [Messages]
 *     security:
 *       - Bearer: []
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
 *                     $ref: '#/components/schemas/Message'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 */

/**
 * @swagger
 * /messages/{id}:
 *   get:
 *     summary: Get a message
 *     description:  can use this router.
 *     tags: [Messages]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Message id
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
 *                     $ref: '#/components/schemas/Message'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   patch:
 *     summary: Update a message
 *     description: USER,ADMIN can use this router.
 *     tags: [Messages]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Message id
 *     requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/updateMessage'
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
 *                     $ref: '#/components/schemas/Message'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 */

exports.Message = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    // property
    body: {
      type: 'object',
      properties: {
        //  properties body
      },
    },
    title: { type: 'string' },
    user: { type: 'string' },
    isRead: { type: 'boolean' },
  },
  example: {
    _id: '5ebac534954b54139806c112',
    // property example
    body: {
      // property example body
    },

    title: 'hello',

    userId: '673c40cd59e293827f79e398',

    isRead: false,

    createdAt: '2024-11-24T16:35:04.438Z',
    updatedAt: '2024-11-24T16:35:04.438Z',
  },
};
exports.createMessage = {
  type: 'object',
  properties: {
    // create property
    body: {
      type: 'object',
      properties: {
        //  create  properties body
      },
    },
    title: { type: 'string' },
    user: { type: 'string' },
    isRead: { type: 'boolean' },
  },
  example: {
    // create property example
    body: {
      // create property example body
    },

    title: 'hello',

    userId: '673c40cd59e293827f79e398',

    isRead: false,
  },
  required: [
    // required property

    'title',

    'user',
  ],
};
exports.updateMessage = {
  type: 'object',
  properties: {
    // update property
    body: {
      type: 'object',
      properties: {
        //  update properties body
      },
    },
    title: { type: 'string' },
    user: { type: 'string' },
    isRead: { type: 'boolean' },
  },
  example: {
    // update property example
    body: {
      // update property example body
    },

    title: 'hello',

    userId: '673c40cd59e293827f79e398',

    isRead: false,
  },
};
