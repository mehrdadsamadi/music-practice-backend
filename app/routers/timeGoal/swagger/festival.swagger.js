/**
 * @swagger
 *  components:
 *      schemas:
 *          addTimeGoal:
 *              type: object
 *              required:
 *                  -   time
 *                  -   score
 *              properties:
 *                  time:
 *                      type: string
 *                      description: entre time to add
 *                  score:
 *                      type: string
 *                      description: entre score for timeGoal
 *                  period:
 *                      type: string
 *                      description: choose between daily,weekly,monthly
 *                  users:
 *                      type: array
 *                      description: entre users id for timeGoal
 *          updateTimeGoal:
 *              type: object
 *              properties:
 *                  time:
 *                      type: string
 *                      description: entre time to add
 *                  score:
 *                      type: string
 *                      description: entre score for timeGoal
 *                  period:
 *                      type: string
 *                      description: choose between daily,weekly,monthly
 *                  users:
 *                      type: array
 *                      description: entre users id for timeGoal
 */

/**
 * @swagger
 *  tags:
 *      name: TimeGoal
 *      description: TimeGoal section
 */

/**
 * @swagger
 *  /timeGoal/get-all:
 *      get:
 *          tags: [TimeGoal]
 *          summary: get all timeGoals
 *          responses:
 *              200:
 *                  description: success
 */

/**
 * @swagger
 *  /timeGoal/get/{timeGoalId}:
 *      get:
 *          tags: [TimeGoal]
 *          summary: get one timeGoal
 *          parameters:
 *              -   in: path
 *                  name: timeGoalId
 *                  type: string
 *                  required: true
 *          responses:
 *              200:
 *                  description: success
 */

/**
 * @swagger
 *  /timeGoal/add:
 *      post:
 *          tags: [TimeGoal]
 *          summary: add timeGoal
 *          requestBody:
 *              required: true
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: '#/components/schemas/addTimeGoal'
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/addTimeGoal'
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
 *  /timeGoal/update/{timeGoalId}:
 *      patch:
 *          tags: [TimeGoal]
 *          summary: update timeGoal
 *          parameters:
 *              -   in: path
 *                  name: timeGoalId
 *                  type: string
 *                  required: true
 *          requestBody:
 *              required: true
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: '#/components/schemas/updateTimeGoal'
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/updateTimeGoal'
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
 *  /timeGoal/remove/{timeGoalId}:
 *      delete:
 *          tags: [TimeGoal]
 *          summary: delete timeGoal by id
 *          parameters:
 *              -   in: path
 *                  name: timeGoalId
 *                  type: string
 *                  required: true
 *          responses:
 *              200:
 *                  description: success
 */