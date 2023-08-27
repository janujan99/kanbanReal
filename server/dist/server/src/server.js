"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const PORT = 3001;
app.use((0, cors_1.default)());
let boardsFromBackend = [{ name: "Gaels", id: 0, nextColumnId: 0, columns: ["you", "are", "mean"] }, { name: "Dorchester", id: 0, nextColumnId: 0, columns: ["you", "are", "mean"] }];
app.get('/getBoards', (req, res) => {
    let filteredBoards = boardsFromBackend.filter((o) => o !== null);
    res.status(200).json({ boards: filteredBoards });
});
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
