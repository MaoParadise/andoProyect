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
class CategoryController {
    listCategoryMedia(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const category = yield database_1.default.query('SELECT * from category');
            res.json(category);
        });
    }
    getCategoryMedia(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const category = yield database_1.default.query('SELECT * FROM category WHERE IDCATEGORY = ?', [id]);
            console.log(category.length);
            if (category.length > 0) {
                return res.json(category[0]);
            }
            res.status(404).json({ text: "The Category doesn't exits" });
        });
    }
    createCategoryMedia(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query('INSERT INTO category set ?', [req.body]);
            res.json({ message: 'Category Saved ' });
        });
    }
    updateCategoryMedia(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query('UPDATE category set ? WHERE IDCATEGORY = ?', [req.body, id]);
            res.json({ message: 'the Category was updated' });
        });
    }
    deleteCategoryMedia(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query('DELETE FROM category WHERE IDCATEGORY = ?', [id]);
            res.json({ message: 'The Category was deleted' });
        });
    }
    getCategoryLike(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = req.body.query;
            const media = yield database_1.default.query(`SELECT * FROM category WHERE category.NAMECATEGORY LIKE '%${query}%' OR category.DESCRIPTIONCATEGORY LIKE '%${query}%' LIMIT 6`);
            console.log(media.length);
            if (media.length == 0) {
                //return res.status(404).json({ text: "The Category doesn't exits", boolean: false });
            }
            res.json(media);
        });
    }
    createPreferencesUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.query(`INSERT INTO preference VALUES ('${req.body.email}', '${req.body.data}', CURRENT_TIMESTAMP)`);
            res.json({ message: 'Preferences Saved ' });
        });
    }
    updatePreferences(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query('UPDATE preference set ? WHERE EMAIL = ?', [req.body, id]);
            res.json({ message: 'the Preferences was updated' });
        });
    }
    getPreferences(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = req.body.query;
            const preferences = yield database_1.default.query(`SELECT * from preference WHERE EMAIL = '${query}'`);
            res.json(preferences);
        });
    }
}
const categoryController = new CategoryController();
exports.default = categoryController;
