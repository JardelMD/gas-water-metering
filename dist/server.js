"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PORT = void 0;
const app_1 = __importDefault(require("./app"));
exports.PORT = process.env.PORT || 3000;
app_1.default.listen(exports.PORT, () => {
    console.log(`Server is running on port ${exports.PORT}`);
});
