/**
 * @swagger
 *  components:
 *      schemas:
 *          addInstrument:
 *              type: object
 *              required:
 *                  -   name
 *              properties:
 *                  name:
 *                      type: string
 *                      description: entre instrument name to add
 */

/**
 * @swagger
 *  tags:
 *      name: Instrument
 *      description: Instrument section
 */

/**
 * @swagger
 *  /instrument/get-all:
 *      get:
 *          tags: [Instrument]
 *          summary: get all instruments
 *          responses:
 *              200:
 *                  description: success
 */

/**
 * @swagger
 *  /instrument/add:
 *      post:
 *          tags: [Instrument]
 *          summary: add instrument
 *          requestBody:
 *              required: true
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: '#/components/schemas/addInstrument'
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/addInstrument'
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
