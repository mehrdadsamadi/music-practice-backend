/**
 * @swagger
 *  components:
 *      schemas:
 *          addMessage:
 *              type: object
 *              required:
 *                  -   message
 *              properties:
 *                  message:
 *                      type: string
 *                      description: entre user message to send
 *          updateMessage:
 *              type: object
 *              properties:
 *                  message:
 *                      type: string
 *                      description: entre user message to send
 */

/**
 * @swagger
 *  tags:
 *      name: Message
 *      description: Message section
 */

/**
 * @swagger
 *  /user/message/get-all/{userId}:
 *      get:
 *          tags: [Message]
 *          summary: get all user messages
 *          parameters:
 *              -   in: path
 *                  name: userId
 *                  type: string
 *                  required: true
 *          responses:
 *              200:
 *                  description: success
 */

/**
 * @swagger
 *  /user/message/get/{messageId}:
 *      get:
 *          tags: [Message]
 *          summary: get one user message
 *          parameters:
 *              -   in: path
 *                  name: messageId
 *                  type: string
 *                  required: true
 *          responses:
 *              200:
 *                  description: success
 */

/**
 * @swagger
 *  /user/message/add/{userId}:
 *      patch:
 *          tags: [Message]
 *          summary: add message to user
 *          parameters:
 *              -   in: path
 *                  name: userId
 *                  type: string
 *                  required: true
 *          requestBody:
 *              required: true
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: '#/components/schemas/addMessage'
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/addMessage'
 *          responses:
 *              201:
 *                  description: success
 *              400: 
 *                  description: bad request
 *              401:
 *                  description: unauthorization
 *              500:
 *                  description: internal server error
 */

/**
 * @swagger
 *  /user/message/update/{messageId}:
 *      patch:
 *          tags: [Message]
 *          summary: update message
 *          parameters:
 *              -   in: path
 *                  name: messageId
 *                  type: string
 *                  required: true
 *          requestBody:
 *              required: true
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: '#/components/schemas/updateMessage'
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/updateMessage'
 *          responses:
 *              201:
 *                  description: success
 *              400: 
 *                  description: bad request
 *              401:
 *                  description: unauthorization
 *              500:
 *                  description: internal server error
 */

/**
 * @swagger
 *  /user/message/remove/{messageId}:
 *      delete:
 *          tags: [Message]
 *          summary: delete message by id
 *          parameters:
 *              -   in: path
 *                  name: messageId
 *                  type: string
 *                  required: true
 *          responses:
 *              200:
 *                  description: success
 */