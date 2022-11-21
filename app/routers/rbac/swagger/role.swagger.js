/**
 * @swagger
 *  components:
 *      schemas:
 *          addRole:
 *              type: object
 *              required:
 *                  -   title
 *              properties:
 *                  title:
 *                      type: string
 *                      description: title for role
 *                  description:
 *                      type: string
 *                      description: description for role
 *                  permissions:
 *                      type: array
 *                      description: add permissions for role
 *          updateRole:
 *              type: object
 *              properties:
 *                  title:
 *                      type: string
 *                      description: title for role
 *                  description:
 *                      type: string
 *                      description: description for role
 *                  permissions:
 *                      type: array
 *                      description: add permissions for role
 */

/**
 * @swagger
 *  tags:
 *      name: RBAC
 *      description: RBAC section
 */

/**
 * @swagger
 *  /role/get-all:
 *      get:
 *          tags: [RBAC]
 *          summary: get all roles
 *          responses:
 *              200:
 *                  description: success
 */

/**
 * @swagger
 *  /role/add:
 *      post:
 *          tags: [RBAC]
 *          summary: add role
 *          requestBody:
 *              required: true
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: '#/components/schemas/addRole'
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/addRole'
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
 *  /role/update/{roleId}:
 *      patch:
 *          tags: [RBAC]
 *          summary: update role
 *          parameters:
 *              -   in: path
 *                  name: roleId
 *                  type: string
 *                  required: true
 *          requestBody:
 *              required: true
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: '#/components/schemas/updateRole'
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/updateRole'
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
 *  /role/remove/{field}:
 *      delete:
 *          tags: [RBAC]
 *          summary: remove role
 *          parameters:
 *              -   in: path
 *                  name: field
 *                  type: string
 *                  required: true
 *                  description: field can be title or id
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
