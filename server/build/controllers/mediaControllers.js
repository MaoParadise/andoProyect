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
class MediaController {
    listMedia(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const media = yield database_1.default.query('SELECT * from media');
            res.json(media);
        });
    }
    getMediaLike(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = req.body.query;
            const media = yield database_1.default.query(`SELECT * FROM media WHERE media.TITLE LIKE '%${query}%' LIMIT 6`);
            console.log(media.length);
            if (media.length == 0) {
                return res.status(404).json({ text: "The Media doesn't exits", boolean: false });
            }
            res.json(media);
        });
    }
    createUpload(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const email = req.body.email;
            const media = req.body.media;
            const numberEpisode = req.body.episode;
            const embedFrame = req.body.embedFrame;
            const quality = req.body.quality;
            database_1.default.query(`INSERT INTO upload VALUES ('${media.IDMEDIA}', '${email}', '${numberEpisode}', CURRENT_TIMESTAMP(), CURRENT_TIMESTAMP(), '1')`, (error) => {
                if (error) {
                    res.json({
                        message: 'The Upload can not be becausa an unexpected error, check if the primary key is not duplicated ---',
                        success: false,
                        error: error
                    });
                }
                else {
                    database_1.default.query(`INSERT INTO embedFrame VALUES (NULL, '${media.IDMEDIA}', '${email}', '${numberEpisode}', '${embedFrame}', NULL, '${quality}', '1')`, (error) => {
                        if (error) {
                            res.json({
                                message: 'The embed Frame can not be becausa an unexpected error, check if the primary key is not duplicated ---',
                                success: false,
                                error: error
                            });
                        }
                        else {
                            res.json({
                                message: 'the upload and the first Embed frame are Up !',
                                success: true
                            });
                        }
                    });
                }
            });
        });
    }
    createFrame(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.body.id;
            const email = req.body.email;
            const numberEpisode = req.body.numberEpisode;
            const embedFrame = req.body.embedFrame;
            const quality = req.body.quality;
            console.log(`INSERT INTO embedframe
        VALUES (NULL, '${id}', '${email}', '${numberEpisode}',
        '${embedFrame}', NULL, '${quality}', '1')`);
            yield database_1.default.query(`INSERT INTO embedframe
                        VALUES (NULL, '${id}', '${email}', '${numberEpisode}',
                        '${embedFrame}', NULL, '${quality}', '1')`, (error) => {
                if (error) {
                    res.json({
                        message: 'The embed frame was not created becausa an unexpected error, check if the primary key is not duplicated',
                        success: false
                    });
                }
                else {
                    res.json({
                        message: 'the Embed frame was created',
                        success: true
                    });
                }
            });
        });
    }
    updateFrame(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.body.id;
            const embedFrame = req.body.embedFrame;
            const quality = req.body.quality;
            yield database_1.default.query(`UPDATE embedframe SET EMBEDFRAME = '${embedFrame}', QUALITY = '${quality}' WHERE embedframe.IDFRAME = ${id}`, (error) => {
                if (error) {
                    res.json({
                        message: 'The embed frame was not updated becausa an unexpected error',
                        success: false
                    });
                }
                else {
                    res.json({
                        message: 'the Embed frame was updated',
                        test: `UPDATE embedframe SET EMBEDFRAME = '${embedFrame}', QUALITY = '${quality}' WHERE embedframe.IDFRAME = ${id}`,
                        success: true
                    });
                }
            });
        });
    }
    getMediaLibrary(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email } = req.params;
            const media = yield database_1.default.query(`SELECT * FROM media INNER JOIN upload ON media.IDMEDIA = upload.IDMEDIA WHERE upload.EMAIL = '${email}'`);
            console.log(media.length);
            if (media.length == 0) {
                return res.status(404).json({ message: "The User dont have medias in the library", boolean: false });
            }
            res.json(media);
        });
    }
    getEmbedFrames(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.body.id;
            const email = req.body.email;
            const numberEpisode = req.body.numberEpisode;
            const media = yield database_1.default.query(`SELECT * FROM (upload INNER JOIN embedframe 
            ON upload.IDMEDIA = embedframe.IDMEDIA AND upload.EMAIL = embedframe.EMAIL
            AND upload.NUMBEREPISODE = embedframe.NUMBEREPISODE)
            WHERE embedframe.IDMEDIA = '${id}' AND embedframe.EMAIL = '${email}' AND embedframe.NUMBEREPISODE = '${numberEpisode}'`);
            console.log(media.length);
            if (media.length == 0) {
                return res.status(404).json({ message: "The request media dont have any embed frame to see", boolean: false });
            }
            res.json(media);
        });
    }
    deleteEmbedFrames(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield database_1.default.query('DELETE FROM embedframe WHERE IDFRAME = ?', [id]);
            res.json({ message: 'The Frame was deleted' });
        });
    }
}
const mediaController = new MediaController();
exports.default = mediaController;
