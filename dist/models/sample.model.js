"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sample = exports.ExampleStatus = void 0;
const typeorm_1 = require("typeorm");
var ExampleStatus;
(function (ExampleStatus) {
    ExampleStatus["SUCCESS"] = "SUCCESS";
    ExampleStatus["FAILED"] = "FAILED";
    ExampleStatus["PENDING"] = "PENDING";
})(ExampleStatus || (exports.ExampleStatus = ExampleStatus = {}));
let Sample = exports.Sample = class Sample {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], Sample.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "int",
        generated: "increment",
    }),
    __metadata("design:type", Number)
], Sample.prototype, "sno", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], Sample.prototype, "quantity", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Boolean)
], Sample.prototype, "approval", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "enum",
        enum: ExampleStatus,
        default: ExampleStatus.PENDING,
    }),
    __metadata("design:type", String)
], Sample.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: "timestamp" }),
    __metadata("design:type", Date)
], Sample.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ type: "timestamp" }),
    __metadata("design:type", Date)
], Sample.prototype, "updatedAt", void 0);
exports.Sample = Sample = __decorate([
    (0, typeorm_1.Entity)()
], Sample);
