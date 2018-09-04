"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const PORT = process.env.PORT;
app_1.default.listen(PORT, () => {
    console.log(`Battles API server running on ${PORT}`);
});
//# sourceMappingURL=server.js.map