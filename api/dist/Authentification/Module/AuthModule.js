"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const jwt_1 = require("@nestjs/jwt");
const typeorm_1 = require("@nestjs/typeorm");
const UserRepository_1 = require("../../User/Repository/UserRepository");
const AuthManager_1 = require("../Manager/AuthManager");
const AuthService_1 = require("../Service/AuthService");
const JwtValidatorImpl_1 = require("../Validator/Impl/JwtValidatorImpl");
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
let AuthModule = class AuthModule {
};
AuthModule = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        imports: [
            passport_1.PassportModule.register({ defaultStrategy: 'jwt' }),
            jwt_1.JwtModule.register({
                secret: process.env.JWT_SECRET,
                signOptions: {
                    expiresIn: +process.env.JWT_EXPIRES,
                },
            }),
            typeorm_1.TypeOrmModule.forFeature([UserRepository_1.default]),
        ],
        controllers: [AuthManager_1.AuthManager],
        providers: [AuthService_1.default, JwtValidatorImpl_1.JwtValidatorImpl],
        exports: [JwtValidatorImpl_1.JwtValidatorImpl, AuthService_1.default],
    })
], AuthModule);
exports.AuthModule = AuthModule;
//# sourceMappingURL=AuthModule.js.map