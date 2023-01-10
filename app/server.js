const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');
const createHttpError = require('http-errors');
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');

const path = require('path');
const http = require('http');

const {AllRoutes} = require('./routers/router');

module.exports = class Application {
    #app = express()
    #DB_URI;
    #PORT;

    constructor(PORT, DB_URI) {
        this.#PORT =  PORT
        this.#DB_URI = DB_URI

        this.configApplication()
        this.connectToDB()
        this.createServer()
        this.createRoutes()
        this.errorHandling()
    }

    configApplication() {
        this.#app.use(cors())
        this.#app.use(morgan("dev"))
        this.#app.use(express.json())
        this.#app.use(express.urlencoded({extended: true}))
        this.#app.use(express.static(path.join(__dirname, "..", "public")))
        
        this.#app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(
            swaggerJsDoc({
                swaggerDefinition: {
                    openapi: "3.0.0",
                    info: {
                        title: "Music Practice App",
                        version: "1.0.0",
                        description: "اپلیکیشن مدیریت تمرین های هنرجویان",
                        contact: {
                            name: "Mehrdad Samadi Moghadam",
                            email: "samadimehrdad49@gmail.com"
                        }
                    },
                    servers: [
                        {
                            url: `http://mp-app.ir:${this.#PORT}`
                        }
                    ],
                    components: {
                        securitySchemes: {
                            bearerAuth: {
                                type: "http",
                                scheme: "bearer",
                                bearerFormat: "JWT"
                            }
                        }
                    },
                    security: [{bearerAuth: []}]
                },
                apis: ["./app/routers/**/swagger/*.swagger.js"]
            }),
            {explorer: true}
        ))
    }

    createServer() {
        http.createServer(this.#app).listen(this.#PORT, () => {
            console.log("server run in http://localhost:" + this.#PORT + "/api-docs");
        })
    }

    connectToDB() {
        mongoose.connect(this.#DB_URI, (err) => {
            if(!err) return console.log("connect to mongoDB");
            return console.log(err)
        })

        mongoose.connection.on("connected", () => {
            console.log("mongoose connect to DB");
        })

        mongoose.connection.on("disconnected", () => {
            console.log("mongoose disconnected from DB");
        })

        process.on("SIGINT", async () => {
            await mongoose.connection.close()
            console.log("app disconnected");
            process.exit(0)
        })
    }

    createRoutes() {
        this.#app.use(AllRoutes)
    }

    errorHandling() {
        this.#app.use((req, res, next) => {
            next(createHttpError.NotFound("آدرس مورد نظر یافت نشد"))
        })

        this.#app.use((err, req, res, next) => {
            const serverError = createHttpError.InternalServerError()
            const status = err.status || serverError.status
            const message = err.message || serverError.message

            return res.status(status).json({
                error: {
                    status,
                    message
                }
            })
        })
    }
}