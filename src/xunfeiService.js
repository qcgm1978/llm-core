var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
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
var __await = (this && this.__await) || function (v) { return this instanceof __await ? (this.v = v, this) : new __await(v); }
var __asyncGenerator = (this && this.__asyncGenerator) || function (thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = Object.create((typeof AsyncIterator === "function" ? AsyncIterator : Object).prototype), verb("next"), verb("throw"), verb("return", awaitReturn), i[Symbol.asyncIterator] = function () { return this; }, i;
    function awaitReturn(f) { return function (v) { return Promise.resolve(v).then(f, reject); }; }
    function verb(n, f) { if (g[n]) { i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; if (f) i[n] = f(i[n]); } }
    function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
    function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
    function fulfill(value) { resume("next", value); }
    function reject(value) { resume("throw", value); }
    function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
};
import { generatePrompt } from './llmService';
import request_xunfei from './xunfei';
export function streamDefinition(topic_1) {
    return __asyncGenerator(this, arguments, function streamDefinition_1(topic, language, category, context) {
        var prompt_1, reader, accumulatedContent, decoder, buffer, _a, done, value, lines, _i, lines_1, line, data, parsed, e_1, errorPrefix, error_1, errorMessage, errorPrefix;
        var _b, _c, _d, _e, _f;
        if (language === void 0) { language = 'zh'; }
        return __generator(this, function (_g) {
            switch (_g.label) {
                case 0:
                    _g.trys.push([0, 28, , 31]);
                    prompt_1 = generatePrompt(topic, language, category, context);
                    return [4 /*yield*/, __await(request_xunfei(localStorage.getItem('XUNFEI_API_KEY') ||
                            (typeof process !== 'undefined' && ((_b = process.env) === null || _b === void 0 ? void 0 : _b.VITE_XUNFEI_API_KEY)) ||
                            '', localStorage.getItem('XUNFEI_API_SECRET') ||
                            (typeof process !== 'undefined' && ((_c = process.env) === null || _c === void 0 ? void 0 : _c.VITE_XUNFEI_API_SECRET)) ||
                            '', 'wss://spark-api.xf-yun.com/v1/x1', prompt_1))];
                case 1:
                    reader = _g.sent();
                    accumulatedContent = '';
                    if (!reader) return [3 /*break*/, 25];
                    decoder = new TextDecoder();
                    buffer = '';
                    _g.label = 2;
                case 2:
                    _g.trys.push([2, , 19, 23]);
                    _g.label = 3;
                case 3:
                    if (!true) return [3 /*break*/, 18];
                    return [4 /*yield*/, __await(reader.read())];
                case 4:
                    _a = _g.sent(), done = _a.done, value = _a.value;
                    if (done)
                        return [3 /*break*/, 18];
                    buffer += decoder.decode(value, { stream: true });
                    lines = buffer.split('\n');
                    buffer = lines.pop() || '';
                    _i = 0, lines_1 = lines;
                    _g.label = 5;
                case 5:
                    if (!(_i < lines_1.length)) return [3 /*break*/, 17];
                    line = lines_1[_i];
                    if (!line.startsWith('data: ')) return [3 /*break*/, 16];
                    data = line.slice(6);
                    if (!(data === '[DONE]')) return [3 /*break*/, 10];
                    if (!accumulatedContent) return [3 /*break*/, 8];
                    return [4 /*yield*/, __await(accumulatedContent)];
                case 6: return [4 /*yield*/, _g.sent()];
                case 7:
                    _g.sent();
                    accumulatedContent = '';
                    _g.label = 8;
                case 8: return [4 /*yield*/, __await(void 0)];
                case 9: return [2 /*return*/, _g.sent()];
                case 10:
                    _g.trys.push([10, 15, , 16]);
                    parsed = JSON.parse(data);
                    if (!((_f = (_e = (_d = parsed.choices) === null || _d === void 0 ? void 0 : _d[0]) === null || _e === void 0 ? void 0 : _e.delta) === null || _f === void 0 ? void 0 : _f.content)) return [3 /*break*/, 14];
                    accumulatedContent += parsed.choices[0].delta.content;
                    return [4 /*yield*/, __await(accumulatedContent)];
                case 11: return [4 /*yield*/, _g.sent()];
                case 12:
                    _g.sent();
                    accumulatedContent = '';
                    return [4 /*yield*/, __await(new Promise(function (resolve) { return setTimeout(resolve, 30); }))];
                case 13:
                    _g.sent();
                    _g.label = 14;
                case 14: return [3 /*break*/, 16];
                case 15:
                    e_1 = _g.sent();
                    return [3 /*break*/, 16];
                case 16:
                    _i++;
                    return [3 /*break*/, 5];
                case 17: return [3 /*break*/, 3];
                case 18: return [3 /*break*/, 23];
                case 19:
                    if (!accumulatedContent) return [3 /*break*/, 22];
                    return [4 /*yield*/, __await(accumulatedContent)];
                case 20: return [4 /*yield*/, _g.sent()];
                case 21:
                    _g.sent();
                    _g.label = 22;
                case 22:
                    reader.releaseLock();
                    return [7 /*endfinally*/];
                case 23: return [4 /*yield*/, __await(void 0)];
                case 24: return [2 /*return*/, _g.sent()];
                case 25:
                    errorPrefix = language === 'zh'
                        ? "\u65E0\u6CD5\u4E3A\"".concat(topic, "\"\u751F\u6210\u5185\u5BB9: ")
                        : "Could not generate content for \"".concat(topic, "\": ");
                    return [4 /*yield*/, __await("Error: ".concat(errorPrefix, "\u65E0\u6CD5\u8FDE\u63A5\u5230\u8BAF\u98DEAPI"))];
                case 26: return [4 /*yield*/, _g.sent()];
                case 27:
                    _g.sent();
                    throw new Error('无法连接到讯飞API');
                case 28:
                    error_1 = _g.sent();
                    errorMessage = error_1 instanceof Error ? error_1.message : 'An unknown error occurred.';
                    errorPrefix = language === 'zh'
                        ? "\u65E0\u6CD5\u4E3A\"".concat(topic, "\"\u751F\u6210\u5185\u5BB9: ")
                        : "Could not generate content for \"".concat(topic, "\": ");
                    return [4 /*yield*/, __await("Error: ".concat(errorPrefix).concat(errorMessage))];
                case 29: return [4 /*yield*/, _g.sent()];
                case 30:
                    _g.sent();
                    throw new Error(errorMessage);
                case 31: return [2 /*return*/];
            }
        });
    });
}
