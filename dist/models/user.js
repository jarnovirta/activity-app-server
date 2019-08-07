"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
// TODO: validation
const UserSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    passwordHash: { type: String, required: true },
    stravaAccessToken: { type: String, required: false },
    stravaRefreshToken: { type: String, required: false },
    username: { type: String, required: true, unique: true }
});
UserSchema.statics.format = (user) => {
    return {
        id: user._id,
        name: user.name,
        stravaAccessToken: user.stravaAccessToken,
        username: user.username
    };
};
exports.default = mongoose_1.model("User", UserSchema);
//# sourceMappingURL=user.js.map