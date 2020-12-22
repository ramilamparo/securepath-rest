"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var cookie_parser_1 = __importDefault(require("cookie-parser"));
var auth_1 = __importDefault(require("./routes/auth"));
var trackers_1 = __importDefault(require("./routes/trackers"));
var app = express_1.default();
app.use(cookie_parser_1.default());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(body_parser_1.default.json());
app.use("/api/securepath/auth", auth_1.default);
app.use("/api/securepath/trackers", trackers_1.default);
app.listen(3000, function () {
    console.log("Running on port 3000!");
});
