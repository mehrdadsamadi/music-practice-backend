/**
 * @swagger
 *  components:
 *      schemas:
 *          addScore:
 *              type: object
 *              required:
 *                  -   score
 *              properties:
 *                  score:
 *                      type: string
 *                      description: entre user score to add
 *                  description:
 *                      type: string
 *                      description: entre score description
 *          updateScore:
 *              type: object
 *              properties:
 *                  score:
 *                      type: string
 *                      description: entre user score to add
 *                  description:
 *                      type: string
 *                      description: entre score description
 */

/**
 * @swagger
 *  tags:
 *      name: Score
 *      description: Score section
 */

/**
 * @swagger
 *  /user/score/get-all:
 *      get:
 *          tags: [Score]
 *          summary: get all user scores
 *          responses:
 *              200:
 *                  description: success
 */

/**
 * @swagger
 *  /user/score/get/{scoreId}:
 *      get:
 *          tags: [Score]
 *          summary: get one user score
 *          parameters:
 *              -   in: path
 *                  name: scoreId
 *                  type: string
 *                  required: true
 *          responses:
 *              200:
 *                  description: success
 */

/**
 * @swagger
 *  /user/score/add/{userId}:
 *      patch:
 *          tags: [Score]
 *          summary: add score to user
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
 *                          $ref: '#/components/schemas/addScore'
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/addScore'
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
 *  /user/score/update/{scoreId}:
 *      patch:
 *          tags: [Score]
 *          summary: update score
 *          parameters:
 *              -   in: path
 *                  name: scoreId
 *                  type: string
 *                  required: true
 *          requestBody:
 *              required: true
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: '#/components/schemas/updateScore'
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/updateScore'
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
 *  /user/score/remove/{scoreId}:
 *      delete:
 *          tags: [Score]
 *          summary: delete score by id
 *          parameters:
 *              -   in: path
 *                  name: scoreId
 *                  type: string
 *                  required: true
 *          responses:
 *              200:
 *                  description: success
 */