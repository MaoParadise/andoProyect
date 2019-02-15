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
class StateMediaController {
    listStateMedia(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const statemedia = yield database_1.default.query('SELECT * from statemedia');
            res.json(statemedia);
        });
    }
    getStateMedia(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const statemedia = yield database_1.default.query('SELECT * FROM statemedia WHERE IDSTATEMEDIA = ?', [id]);
            console.log(statemedia.length);
            if (statemedia.length > 0) {
                return res.json(statemedia[0]);
            }
            res.status(404).json({ text: "The State doesn't exits" });
        });
    }
    createStateMedia(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query('INSERT INTO statemedia set ?', [req.body]);
            res.json({ message: 'State Saved ' });
        });
    }
    updateStateMedia(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query('UPDATE statemedia set ? WHERE IDSTATEMEDIA = ?', [req.body, id]);
            res.json({ message: 'the State was updated' });
        });
    }
    deleteStateMedia(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query('DELETE FROM statemedia WHERE IDSTATEMEDIA = ?', [id]);
            res.json({ message: 'The State was deleted' });
        });
    }
}
const stateMediaController = new StateMediaController();
exports.default = stateMediaController;
