/**
 * @swagger
 *  components:
 *      schemas:
 *          getOtp:
 *              type: object
 *              required:
 *                  -   mobile
 *              properties:
 *                  mobile:
 *                      type: string
 *                      description: entre your phone number to signin/signup
 *          checkOtp:
 *              type: object
 *              required: 
 *                  -   mobile
 *                  -   code
 *              properties:
 *                  mobile:
 *                      type: string
 *                      description: entre your phone number to signin
 *                  code:
 *                      type: integer
 *                      description: entre otp code
 */

/**
 * @swagger
 *  tags:
 *      name: User-Authentication
 *      description: user auth section
 */

/**
 * @swagger
 *  /auth/get-otp:
 *      post:
 *          tags: [User-Authentication]
 *          summary: login user in user panel with phone number
 *          description: one time password login
 *          requestBody:
 *              required: true
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: '#/components/schemas/getOtp'
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/getOtp'
 *          responses:
 *              200:
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
 *  /auth/check-otp:
 *      post:
 *          tags: [User-Authentication]
 *          summary: login user in user panel with phone number
 *          description: one time password login
 *          requestBody:
 *              required: true
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: '#/components/schemas/checkOtp'
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/checkOtp'
 *          responses:
 *              200:
 *                  description: success
 *              400: 
 *                  description: bad request
 *              401:
 *                  description: unauthorization
 *              500:
 *                  description: internal server error
 */