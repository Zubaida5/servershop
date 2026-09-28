/**
 * @swagger
 * tags:
 *   name: Admin
 *   description: Admin-only analytics endpoints
 */

/**
 * @swagger
 * /admin/global-analytics:
 *   get:
 *     summary: Platform-wide totals
 *     description: ADMIN only. Users, servers, orders and revenue counters.
 *     tags: [Admin]
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
 *                 data:
 *                   type: object
 *                   properties:
 *                     totalUsers: { type: integer }
 *                     activeUsers: { type: integer }
 *                     totalServers: { type: integer }
 *                     totalOrders: { type: integer }
 *                     completedOrders: { type: integer }
 *                     pendingOrders: { type: integer }
 *                     totalRevenue: { type: number }
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 */

/**
 * @swagger
 * /admin/revenue-monthly:
 *   get:
 *     summary: Revenue for the last six months
 *     description: >
 *       ADMIN only. Sums item prices of completed orders per calendar month.
 *       Months with no completed orders are returned with a revenue of 0 so the
 *       dashboard chart stays continuous.
 *     tags: [Admin]
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
 *                 data:
 *                   type: object
 *                   properties:
 *                     series:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           month: { type: string, example: Sep }
 *                           year: { type: integer, example: 2026 }
 *                           revenue: { type: number, example: 1420 }
 *                           orders: { type: integer, example: 6 }
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 */
