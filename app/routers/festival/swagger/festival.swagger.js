/**
 * @swagger
 *  components:
 *      schemas:
 *          addFestival:
 *              type: object
 *              required:
 *                  -   name
 *                  -   start_in
 *                  -   end_in
 *              properties:
 *                  name:
 *                      type: string
 *                      description: entre festival name to add
 *                  start_in:
 *                      type: string
 *                      description: entre start Date for festival
 *                  end_in:
 *                      type: string
 *                      description: entre end Date for festival
 *                  gifts:
 *                      type: array
 *                      description: entre gifts id for festival
 *                  users:
 *                      type: array
 *                      description: entre users id for festival
 *          updateFestival:
 *              type: object
 *              properties:
 *                  name:
 *                      type: string
 *                      description: entre festival name to add
 *                  start_in:
 *                      type: string
 *                      description: entre start Date for festival
 *                  end_in:
 *                      type: string
 *                      description: entre end Date for festival
 *                  gifts:
 *                      type: array
 *                      description: entre gifts id for festival
 *                  users:
 *                      type: array
 *                      description: entre users id for festival
 */

/**
 * @swagger
 *  tags:
 *      name: Festival
 *      description: Festival section
 */

/**
 * @swagger
 *  /festival/get-all:
 *      get:
 *          tags: [Festival]
 *          summary: get all festivals
 *          responses:
 *              200:
 *                  description: success
 */

/**
 * @swagger
 *  /festival/get/{festivalId}:
 *      get:
 *          tags: [Festival]
 *          summary: get one festival
 *          parameters:
 *              -   in: path
 *                  name: festivalId
 *                  type: string
 *                  required: true
 *          responses:
 *              200:
 *                  description: success
 */

/**
 * @swagger
 *  /festival/add:
 *      post:
 *          tags: [Festival]
 *          summary: add festival
 *          requestBody:
 *              required: true
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: '#/components/schemas/addFestival'
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/addFestival'
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
 *  /festival/update/{festivalId}:
 *      patch:
 *          tags: [Festival]
 *          summary: update festival
 *          parameters:
 *              -   in: path
 *                  name: festivalId
 *                  type: string
 *                  required: true
 *          requestBody:
 *              required: true
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: '#/components/schemas/updateFestival'
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/updateFestival'
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
 *  /festival/remove/{festivalId}:
 *      delete:
 *          tags: [Festival]
 *          summary: delete festival by id
 *          parameters:
 *              -   in: path
 *                  name: festivalId
 *                  type: string
 *                  required: true
 *          responses:
 *              200:
 *                  description: success
 */