"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const courses_1 = __importDefault(require("./courses"));
const CORS = require("cors");
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
app.use(CORS());
app.use(express_1.default.json());
app.get("/", (_, res) => {
    res.json({
        message: "Server is healthy"
    });
});
app.get("/courses", (_, res) => {
    res.send(courses_1.default);
});
app.get("/courses/:id", (req, res) => {
    try {
        res.send(courses_1.default.filter((course) => parseInt(req.params.id) === course.id));
    }
    catch (e) {
        res.status(500).json({
            message: "Internal server Error"
        });
    }
});
app.put("/courses/like", (req, res) => {
    try {
        const idx = courses_1.default.findIndex((course) => parseInt(req.query.id) === course.id);
        courses_1.default[idx].likes++;
        res.status(200).json(courses_1.default[idx]);
    }
    catch (e) {
        res.send(e);
    }
});
app.listen(PORT, () => console.log(`Server started at port ${PORT}`));
