"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const config_1 = require("./config/config");
const PORT = config_1.default.PORT;
app_1.default.listen(PORT, () => {
    console.log(`Battles API server running on ${PORT}`);
});
//# sourceMappingURL=server.js.map