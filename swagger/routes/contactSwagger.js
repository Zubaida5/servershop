/**
 * @swagger
 * tags:
 *   name: Contacts
 *   description: Contact and support management
 */

/**
 * @swagger
 * /contacts:
 *   post:
 *     summary: Send a message
 *     description: Logged in USER can send a support message.
 *     tags: [Contacts]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/createContact'
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
 *                     contact:
 *                       $ref: '#/components/schemas/Contact'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *
 *   get:
 *     summary: Get all messages
 *     description: ADMIN can retrieve all contact messages.
 *     tags: [Contacts]
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
 *                 results:
 *                   type: number
 *                   example: 5
 *                 data:
 *                   type: object
 *                   properties:
 *                     doc:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/Contact'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *
 * /contacts/{id}:
 *   delete:
 *     summary: Delete a contact message
 *     description: ADMIN can delete a contact message.
 *     tags: [Contacts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Contact id
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

exports.Contact = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    email: { type: 'string' },
    message: { type: 'string' },
    userId: { type: 'string' },
  },
  example: {
    _id: '5ebac534954b54139806c112',
    email: 'user@gmail.com',
    message: 'أحتاج مساعدة في إعداد السيرفر',
    userId: '6a2f01f71a762e06b098a7e6',
    createdAt: '2024-11-24T16:35:04.438Z',
    updatedAt: '2024-11-24T16:35:04.438Z',
  },
};

exports.createContact = {
  type: 'object',
  properties: {
    message: { type: 'string' },
  },
  example: {
    message: 'أحتاج مساعدة في إعداد السيرفر',
  },
  required: ['message'],
};
