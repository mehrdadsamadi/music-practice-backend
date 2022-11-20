module.exports = {
    ROLES : Object.freeze({
        USER: "USER",
        ADMIN: "ADMIN"
    }),
    PERMISSIONS : Object.freeze({
        USER: {
            CREATE: "create-user",
            READ: "read-user",
            UPDATE: "update-user",
            DELETE: "delete-user",
        },
        ROLE: {
            CREATE: "create-role",
            READ: "read-role",
            UPDATE: "update-role",
            DELETE: "delete-role",
        },
        PERMISSION: {
            CREATE: "create-permission",
            READ: "read-permission",
            UPDATE: "update-permission",
            DELETE: "delete-permission",
        },
        INSTRUMENT: {
            CREATE: "create-instrument",
            READ: "read-instrument",
            UPDATE: "update-instrument",
            DELETE: "delete-instrument",
        },
        GIFT: {
            CREATE: "create-gift",
            READ: "read-gift",
            UPDATE: "update-gift",
            DELETE: "delete-gift",
        },
        FESTIVAl: {
            CREATE: "create-festival",
            READ: "read-festival",
            UPDATE: "update-festival",
            DELETE: "delete-festival",
        },
        ADMIN: "ALL"
    })
}