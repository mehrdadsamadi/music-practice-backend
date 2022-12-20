/**
 * @swagger
 *  components:
 *      schemas:
 *          addGift:
 *              type: object
 *              required:
 *                  -   name
 *                  -   min_score
 *              properties:
 *                  name:
 *                      type: string
 *                      description: entre gift name to add
 *                  min_score:
 *                      type: string
 *                      description: entre minimum score to get gift
 *                  in_festival:
 *                      type: boolean
 *                      description: gift use in festival or not
 *                  rank:
 *                      type: string
 *                      description: rank to get gift
 *          updateGift:
 *              type: object
 *              properties:
 *                  name:
 *                      type: string
 *                      description: entre gift name to add
 *                  min_score:
 *                      type: string
 *                      description: entre minimum score to get gift
 *                  in_festival:
 *                      type: boolean
 *                      description: gift use in festival or not
 *                  rank:
 *                      type: string
 *                      description: rank to get gift
 */

/**
 * @swagger
 *  tags:
 *      name: Gift
 *      description: Gift section
 */

/**
 * @swagger
 *  /gift/get-all:
 *      get:
 *          tags: [Gift]
 *          summary: get all gift
 *          responses:
 *              200:
 *                  description: success
 */

/**
 * @swagger
 *  /gift/add:
 *      post:
 *          tags: [Gift]
 *          summary: add gift
 *          requestBody:
 *              required: true
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: '#/components/schemas/addGift'
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/addGift'
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
 *  /gift/update/{giftId}:
 *      patch:
 *          tags: [Gift]
 *          summary: update gift
 *          parameters:
 *              -   in: path
 *                  name: giftId
 *                  type: string
 *                  required: true
 *          requestBody:
 *              required: true
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: '#/components/schemas/updateGift'
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/updateGift'
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
 *  /gift/remove/{giftId}:
 *      delete:
 *          tags: [Gift]
 *          summary: delete gift by id
 *          parameters:
 *              -   in: path
 *                  name: giftId
 *                  type: string
 *                  required: true
 *          responses:
 *              200:
 *                  description: success
 */