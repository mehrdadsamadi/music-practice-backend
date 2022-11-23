/**
 * @swagger
 *  components:
 *      schemas:
 *          addPractice:
 *              type: object
 *              required:
 *                  -   time
 *              properties:
 *                  time:
 *                      type: string
 *                      description: entre time of user practice to add
 *          updatePractice:
 *              type: object
 *              properties:
 *                  time:
 *                      type: string
 *                      description: entre time of user practice to add
 */

/**
 * @swagger
 *  tags:
 *      name: Practice
 *      description: Practice section
 */

/**
 * @swagger
 *  /user/practice/get-all/{userId}:
 *      get:
 *          tags: [Practice]
 *          summary: get all user practice
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
 *  /user/practice/get/{practiceId}:
 *      get:
 *          tags: [Practice]
 *          summary: get one user practice
 *          parameters:
 *              -   in: path
 *                  name: practiceId
 *                  type: string
 *                  required: true
 *          responses:
 *              200:
 *                  description: success
 */

/**
 * @swagger
 *  /user/practice/add/{userId}:
 *      patch:
 *          tags: [Practice]
 *          summary: add practice to user
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
 *                          $ref: '#/components/schemas/addPractice'
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/addPractice'
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
 *  /user/practice/update/{practiceId}:
 *      patch:
 *          tags: [Practice]
 *          summary: update practice
 *          parameters:
 *              -   in: path
 *                  name: practiceId
 *                  type: string
 *                  required: true
 *          requestBody:
 *              required: true
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: '#/components/schemas/updatePractice'
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/updatePractice'
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
 *  /user/practice/remove/{practiceId}:
 *      delete:
 *          tags: [Practice]
 *          summary: delete practice by id
 *          parameters:
 *              -   in: path
 *                  name: practiceId
 *                  type: string
 *                  required: true
 *          responses:
 *              200:
 *                  description: success
 */