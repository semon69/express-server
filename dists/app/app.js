"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
// router
const userRouter = express_1.default.Router();
const courseRouter = express_1.default.Router();
// parser
app.use(express_1.default.json());
app.use('/api/v1/users', userRouter);
app.use('/api/v1/courses', courseRouter);
// middleware
const logger = (req, res, next) => {
    next();
};
userRouter.post('/create-user', (req, res) => {
    const user = req.body;
    console.log(user);
    res.json({
        success: true,
        message: "User is created successfully",
        data: user
    });
});
courseRouter.post('/create-course', (req, res) => {
    const course = req.body;
    console.log(course);
    res.json({
        success: true,
        message: "Course created successfully",
        data: course
    });
});
app.get('/', logger, (req, res, next) => {
    try {
        res.send("Hello");
    }
    catch (error) {
        next(error);
    }
});
app.post('/', logger, (req, res) => {
    console.log(req.body);
    res.send('Got data');
});
// Error: If route not found
app.all('*', (req, res) => {
    res.status(400).json({
        success: false,
        message: "Route not found"
    });
});
// Global error handling
app.use((error, req, res, next) => {
    console.log(error);
    if (error) {
        res.json({
            success: false,
            message: "Something went wrong"
        });
    }
});
exports.default = app;
