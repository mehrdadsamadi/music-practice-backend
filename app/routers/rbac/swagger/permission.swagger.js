/**
 * @swagger
 *  components:
 *      schemas:
 *          addPermission:
 *              type: object
 *              required:
 *                  -   name
 *              properties:
 *                  name:
 *                      type: string
 *                      description: name for permission
 *                  description:
 *                      type: string
 *                      description: description for permission
 *          addPermissionSection:
 *              type: object
 *              required:
 *                  -   section
 *              properties:
 *                  section:
 *                      type: string
 *                      description: name of section
 *          updatePermission:
 *              type: object
 *              properties:
 *                  name:
 *                      type: string
 *                      description: name for permission
 *                  description:
 *                      type: string
 *                      description: description for permission
 */

/**
 * @swagger
 *  /permission/get-all:
 *      get:
 *          tags: [RBAC]
 *          summary: get all permissions
 *          responses:
 *              200:
 *                  description: success
 */

/**
 * @swagger
 *  /permission/add:
 *      post:
 *          tags: [RBAC]
 *          summary: add permission
 *          requestBody:
 *              required: true
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: '#/components/schemas/addPermission'
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/addPermission'
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
 *  /permission/add-section:
 *      post:
 *          tags: [RBAC]
 *          summary: add permission section
 *          requestBody:
 *              required: true
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: '#/components/schemas/addPermissionSection'
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/addPermissionSection'
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
 *  /permission/update/{permissionId}:
 *      patch:
 *          tags: [RBAC]
 *          summary: update permission
 *          parameters:
 *              -   in: path
 *                  name: permissionId
 *                  type: string
 *                  required: true
 *          requestBody:
 *              required: true
 *              content:
 *                  application/x-www-form-urlencoded:
 *                      schema:
 *                          $ref: '#/components/schemas/updatePermission'
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/updatePermission'
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
 *  /permission/remove/{permissionId}:
 *      delete:
 *          tags: [RBAC]
 *          summary: remove permission
 *          parameters:
 *              -   in: path
 *                  name: permissionId
 *                  type: string
 *                  required: true
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
