"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const datasource_1 = require("./utils/datasource");
const body_parser_1 = __importDefault(require("body-parser"));
(0, dotenv_1.configDotenv)();
const sample_routes_1 = __importDefault(require("./routes/sample.routes"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const PORT = process.env.PORT || 3000;
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
datasource_1.ds.initialize()
    .then(() => {
    console.log("Database connected");
})
    .catch((err) => {
    console.log(err);
});
app.get("/", (req, res) => {
    res.send("API is up and running!");
});
app.use("/sample", sample_routes_1.default);
app.use("/auth", auth_routes_1.default);
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
