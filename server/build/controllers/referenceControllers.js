"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../database"));
class ReferenceController {
    getReferencesMEDIA(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const IDMEDIA = req.body.IDMEDIA;
            const EMAIL = req.body.EMAIL;
            const reference = yield database_1.default.query(`SELECT * FROM referenceupload WHERE IDMEDIA = ? AND EMAIL = ?`, [IDMEDIA, EMAIL]);
            console.log(reference.length);
            if (reference.length > 0) {
                return res.json(reference[0]);
            }
            res.status(404).json({ text: "The Reference doesn't exits" });
        });
    }
    insertReferenceMedia(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query(`INSERT INTO referenceupload VALUES ('${req.body.IDMEDIA}', '${req.body.EMAIL}', '${req.body.REFERENCEUPLOADSTRING}')`);
            res.json({ message: 'Reference Saved ' });
        });
    }
    updateReferenceMedia(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query(`UPDATE referenceupload SET REFERENCEUPLOADSTRING = '${req.body.REFERENCEUPLOADSTRING}' WHERE referenceupload.IDMEDIA = ${req.body.IDMEDIA} AND referenceupload.EMAIL = '${req.body.EMAIL}'`);
            res.json({ message: 'the Reference was updated' });
        });
    }
}
const referenceController = new ReferenceController();
exports.default = referenceController;
