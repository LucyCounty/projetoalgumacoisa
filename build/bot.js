"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var node_telegram_bot_api_1 = __importDefault(require("node-telegram-bot-api"));
var dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
var hour;
var minute;
var second;
var day;
var bot = new node_telegram_bot_api_1.default(process.env.TELEGRAM_TOKEN, { polling: true });
bot.onText(/\/echo (.+)/, function (msg, match) {
    var chatId = msg.chat.id;
    if (match) {
        var resp = match[1];
        bot.sendMessage(chatId, resp);
    }
});
bot.on('message', function (msg) { return __awaiter(void 0, void 0, void 0, function () {
    function sendMultiplesMessages(chatId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(day >= 2 && day <= 5)) return [3 /*break*/, 5];
                        if (!(hour > 8 && hour < 20)) return [3 /*break*/, 2];
                        return [4 /*yield*/, weAreOpen(chatId, date)];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, weAreCloseHour(chatId, date)];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        weAreCloseDay(chatId, date);
                        _a.label = 6;
                    case 6: return [2 /*return*/];
                }
            });
        });
    }
    var chatId, date, userMessage, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                chatId = msg.chat.id;
                date = new Date();
                hour = date.getHours();
                minute = date.getMinutes();
                second = date.getSeconds();
                day = date.getDay();
                userMessage = msg.text;
                console.log(msg);
                console.log(date);
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, sendMultiplesMessages(chatId)];
            case 2:
                _a.sent();
                return [3 /*break*/, 4];
            case 3:
                error_1 = _a.sent();
                console.error("Erro ao enviar a mensagem)", error_1);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
function weAreOpen(chatId, date) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, bot.sendMessage(chatId, 'Olá! Você entrou no sistema da Faesa as ' + hour + ':' + minute + ':' + second)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, delay(1000)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, bot.sendMessage(chatId, 'Como posso te ajudar?')];
                case 3:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function weAreCloseHour(chatId, date) {
    return __awaiter(this, void 0, void 0, function () {
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    bot.sendMessage(chatId, 'Olá, No momento nós estamos fechados!');
                    return [4 /*yield*/, delay(1000)];
                case 1:
                    _a.sent();
                    bot.sendMessage(chatId, 'Agora são ' + hour + ':' + minute + ' e o nosso sistema funciona apenas entre as 8 horas até as 20 horas.');
                    return [4 /*yield*/, delay(1000)];
                case 2:
                    _a.sent();
                    bot.sendMessage(chatId, 'Você poderia digitar o seu e-mail? Pois assim que possivel, responderemos por lá!');
                    bot.on('message', function (msg) { return __awaiter(_this, void 0, void 0, function () {
                        var userMessage;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    userMessage = msg.text;
                                    return [4 /*yield*/, console.log("E-mail do usuário:", userMessage)];
                                case 1:
                                    _a.sent();
                                    bot.sendMessage(chatId, 'Obrigado por enviar o seu e-mail. Fique no aguardo que logo lhe responderemos!');
                                    return [2 /*return*/];
                            }
                        });
                    }); });
                    return [2 /*return*/];
            }
        });
    });
}
function weAreCloseDay(chatId, date) {
    return __awaiter(this, void 0, void 0, function () {
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!(day == 6)) return [3 /*break*/, 3];
                    bot.sendMessage(chatId, 'Olá, No momento nós estamos fechados!');
                    return [4 /*yield*/, delay(1000)];
                case 1:
                    _a.sent();
                    bot.sendMessage(chatId, 'Hoje é Sábado e o nosso sistema funciona apenas entre segunda a sábado.');
                    return [4 /*yield*/, delay(1000)];
                case 2:
                    _a.sent();
                    bot.sendMessage(chatId, 'Você poderia digitar o seu e-mail? Pois assim que possivel, responderemos por lá!');
                    bot.on('message', function (msg) { return __awaiter(_this, void 0, void 0, function () {
                        var userMessage;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    userMessage = msg.text;
                                    return [4 /*yield*/, console.log("E-mail do usuário:", userMessage)];
                                case 1:
                                    _a.sent();
                                    bot.sendMessage(chatId, 'Obrigado por enviar o seu e-mail. Fique no aguardo que logo lhe responderemos!');
                                    return [2 /*return*/];
                            }
                        });
                    }); });
                    return [3 /*break*/, 6];
                case 3:
                    bot.sendMessage(chatId, 'Olá, No momento nós estamos fechados!');
                    return [4 /*yield*/, delay(1000)];
                case 4:
                    _a.sent();
                    bot.sendMessage(chatId, 'Hoje é Domingo e o nosso sistema funciona apenas entre segunda a sábado.');
                    return [4 /*yield*/, delay(1000)];
                case 5:
                    _a.sent();
                    bot.sendMessage(chatId, 'Você poderia digitar o seu e-mail? Pois assim que possivel, responderemos por lá!');
                    bot.on('message', function (msg) { return __awaiter(_this, void 0, void 0, function () {
                        var userMessage;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    userMessage = msg.text;
                                    return [4 /*yield*/, console.log("E-mail do usuário:", userMessage)];
                                case 1:
                                    _a.sent();
                                    bot.sendMessage(chatId, 'Obrigado por enviar o seu e-mail. Fique no aguardo que logo lhe responderemos!');
                                    return [2 /*return*/];
                            }
                        });
                    }); });
                    _a.label = 6;
                case 6: return [2 /*return*/];
            }
        });
    });
}
function delay(ms) {
    return new Promise(function (resolve) { return setTimeout(resolve, ms); });
}
