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
var DEEPSEEK_API_URL = 'https://api.deepseek.com/v1/chat/completions';
var DEEPSEEK_MODEL = 'deepseek-chat';
function getApiKey() {
    try {
        if (typeof window !== 'undefined' && window.localStorage) {
            var savedApiKey = localStorage.getItem('DEEPSEEK_API_KEY');
            if (savedApiKey) {
                return savedApiKey;
            }
        }
        if (typeof process !== 'undefined' && process.env) {
            return process.env.DEEPSEEK_API_KEY;
        }
    }
    catch (e) {
        console.error('Error getting DeepSeek API key:', e);
    }
    return undefined;
}
export function streamDefinition(topic_1) {
    return __asyncGenerator(this, arguments, function streamDefinition_1(topic, language, category, context) {
        var apiKey, accumulatedContent, errorMsg, prompt, response, reader, decoder, buffer, _a, done, value, lines, _i, lines_1, line, data, parsed, e_1, error_1, errorMessage, errorPrefix;
        var _b, _c, _d, _e;
        if (language === void 0) { language = 'zh'; }
        return __generator(this, function (_f) {
            switch (_f.label) {
                case 0:
                    apiKey = getApiKey();
                    accumulatedContent = '';
                    if (!!apiKey) return [3 /*break*/, 4];
                    errorMsg = language === 'zh'
                        ? 'Error: DEEPSEEK_API_KEY is not configured. Please configure your API key in the settings to continue.'
                        : 'Error: DEEPSEEK_API_KEY is not configured. Please configure your API key in the settings to continue.';
                    return [4 /*yield*/, __await(errorMsg)];
                case 1: return [4 /*yield*/, _f.sent()];
                case 2:
                    _f.sent();
                    return [4 /*yield*/, __await(void 0)];
                case 3: return [2 /*return*/, _f.sent()];
                case 4:
                    prompt = generatePrompt(topic, language, category, context);
                    _f.label = 5;
                case 5:
                    _f.trys.push([5, 21, , 24]);
                    return [4 /*yield*/, __await(fetch(DEEPSEEK_API_URL, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                Authorization: "Bearer ".concat(apiKey)
                            },
                            body: JSON.stringify({
                                model: DEEPSEEK_MODEL,
                                messages: [
                                    {
                                        role: 'user',
                                        content: prompt
                                    }
                                ],
                                stream: true,
                                max_tokens: 500,
                                temperature: 0.7
                            })
                        }))];
                case 6:
                    response = _f.sent();
                    if (!response.ok) {
                        throw new Error("HTTP error! status: ".concat(response.status));
                    }
                    reader = (_b = response.body) === null || _b === void 0 ? void 0 : _b.getReader();
                    if (!reader) {
                        throw new Error('Response body is not readable');
                    }
                    decoder = new TextDecoder();
                    buffer = '';
                    _f.label = 7;
                case 7:
                    _f.trys.push([7, , 19, 20]);
                    _f.label = 8;
                case 8:
                    if (!true) return [3 /*break*/, 18];
                    return [4 /*yield*/, __await(reader.read())];
                case 9:
                    _a = _f.sent(), done = _a.done, value = _a.value;
                    if (done)
                        return [3 /*break*/, 18];
                    buffer += decoder.decode(value, { stream: true });
                    lines = buffer.split('\n');
                    buffer = lines.pop() || '';
                    _i = 0, lines_1 = lines;
                    _f.label = 10;
                case 10:
                    if (!(_i < lines_1.length)) return [3 /*break*/, 17];
                    line = lines_1[_i];
                    if (!line.startsWith('data: ')) return [3 /*break*/, 16];
                    data = line.slice(6);
                    if (data === '[DONE]') {
                        return [3 /*break*/, 17];
                    }
                    _f.label = 11;
                case 11:
                    _f.trys.push([11, 15, , 16]);
                    parsed = JSON.parse(data);
                    if (!((_e = (_d = (_c = parsed.choices) === null || _c === void 0 ? void 0 : _c[0]) === null || _d === void 0 ? void 0 : _d.delta) === null || _e === void 0 ? void 0 : _e.content)) return [3 /*break*/, 14];
                    accumulatedContent += parsed.choices[0].delta.content;
                    return [4 /*yield*/, __await(accumulatedContent)];
                case 12: return [4 /*yield*/, _f.sent()];
                case 13:
                    _f.sent();
                    accumulatedContent = '';
                    _f.label = 14;
                case 14: return [3 /*break*/, 16];
                case 15:
                    e_1 = _f.sent();
                    console.error('Error parsing DeepSeek response:', e_1);
                    return [3 /*break*/, 16];
                case 16:
                    _i++;
                    return [3 /*break*/, 10];
                case 17: return [3 /*break*/, 8];
                case 18: return [3 /*break*/, 20];
                case 19:
                    reader.releaseLock();
                    return [7 /*endfinally*/];
                case 20: return [3 /*break*/, 24];
                case 21:
                    error_1 = _f.sent();
                    errorMessage = error_1 instanceof Error ? error_1.message : 'An unknown error occurred';
                    errorPrefix = language === 'zh'
                        ? "\u65E0\u6CD5\u4E3A\"".concat(topic, "\"\u751F\u6210\u5185\u5BB9: ")
                        : "Could not generate content for \"".concat(topic, "\": ");
                    return [4 /*yield*/, __await("Error: ".concat(errorPrefix).concat(errorMessage))];
                case 22: return [4 /*yield*/, _f.sent()];
                case 23:
                    _f.sent();
                    return [3 /*break*/, 24];
                case 24: return [2 /*return*/];
            }
        });
    });
}
