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
var GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';
var GROQ_MODEL = 'meta-llama/llama-4-maverick-17b-128e-instruct';
function getApiKey() {
    if (typeof window !== 'undefined' && window.localStorage) {
        var savedApiKey = localStorage.getItem('GROQ_API_KEY');
        if (savedApiKey) {
            return savedApiKey;
        }
    }
    if (typeof process !== 'undefined' && process.env) {
        return process.env.GROQ_API_KEY;
    }
    return undefined;
}
export function setApiKey(apiKey) {
    if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.setItem('GROQ_API_KEY', apiKey);
    }
}
export function clearApiKey() {
    if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.removeItem('GROQ_API_KEY');
    }
}
export function hasApiKey() {
    return !!getApiKey();
}
export function streamDefinition(topic_1) {
    return __asyncGenerator(this, arguments, function streamDefinition_1(topic, language, category, context) {
        var apiKey, accumulatedContent, errorMsg, prompt, response, reader, decoder, buffer, _a, done, value, lines, _i, lines_1, line, data, parsed, e_1, error_1, errorMessage, msg;
        var _b, _c, _d, _e;
        if (language === void 0) { language = 'zh'; }
        return __generator(this, function (_f) {
            switch (_f.label) {
                case 0:
                    apiKey = getApiKey();
                    accumulatedContent = '';
                    if (!!apiKey) return [3 /*break*/, 4];
                    errorMsg = language === 'zh'
                        ? 'Error: GROQ_API_KEY is not configured. Please configure your API key in the settings to continue.'
                        : 'Error: GROQ_API_KEY is not configured. Please configure your API key in the settings to continue.';
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
                    _f.trys.push([5, 28, , 34]);
                    return [4 /*yield*/, __await(fetch(GROQ_API_URL, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                Authorization: "Bearer ".concat(apiKey)
                            },
                            body: JSON.stringify({
                                model: GROQ_MODEL,
                                messages: [
                                    {
                                        role: 'user',
                                        content: prompt
                                    }
                                ],
                                stream: true,
                                max_tokens: 1000,
                                temperature: 0.7,
                                top_p: 0.95
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
                    _f.trys.push([7, , 23, 27]);
                    _f.label = 8;
                case 8:
                    if (!true) return [3 /*break*/, 22];
                    return [4 /*yield*/, __await(reader.read())];
                case 9:
                    _a = _f.sent(), done = _a.done, value = _a.value;
                    if (done)
                        return [3 /*break*/, 22];
                    buffer += decoder.decode(value, { stream: true });
                    lines = buffer.split('\n');
                    buffer = lines.pop() || '';
                    _i = 0, lines_1 = lines;
                    _f.label = 10;
                case 10:
                    if (!(_i < lines_1.length)) return [3 /*break*/, 21];
                    line = lines_1[_i];
                    if (!line.startsWith('data: ')) return [3 /*break*/, 20];
                    data = line.slice(6);
                    if (!(data === '[DONE]')) return [3 /*break*/, 15];
                    if (!accumulatedContent) return [3 /*break*/, 13];
                    return [4 /*yield*/, __await(accumulatedContent)];
                case 11: return [4 /*yield*/, _f.sent()];
                case 12:
                    _f.sent();
                    accumulatedContent = '';
                    _f.label = 13;
                case 13: return [4 /*yield*/, __await(void 0)];
                case 14: return [2 /*return*/, _f.sent()];
                case 15:
                    _f.trys.push([15, 19, , 20]);
                    parsed = JSON.parse(data);
                    if (!((_e = (_d = (_c = parsed.choices) === null || _c === void 0 ? void 0 : _c[0]) === null || _d === void 0 ? void 0 : _d.delta) === null || _e === void 0 ? void 0 : _e.content)) return [3 /*break*/, 18];
                    accumulatedContent += parsed.choices[0].delta.content;
                    if (!(accumulatedContent.length >= 40)) return [3 /*break*/, 18];
                    return [4 /*yield*/, __await(accumulatedContent)];
                case 16: return [4 /*yield*/, _f.sent()];
                case 17:
                    _f.sent();
                    accumulatedContent = '';
                    _f.label = 18;
                case 18: return [3 /*break*/, 20];
                case 19:
                    e_1 = _f.sent();
                    return [3 /*break*/, 20];
                case 20:
                    _i++;
                    return [3 /*break*/, 10];
                case 21: return [3 /*break*/, 8];
                case 22: return [3 /*break*/, 27];
                case 23:
                    if (!accumulatedContent) return [3 /*break*/, 26];
                    return [4 /*yield*/, __await(accumulatedContent)];
                case 24: return [4 /*yield*/, _f.sent()];
                case 25:
                    _f.sent();
                    _f.label = 26;
                case 26:
                    reader.releaseLock();
                    return [7 /*endfinally*/];
                case 27: return [3 /*break*/, 34];
                case 28:
                    error_1 = _f.sent();
                    if (!accumulatedContent) return [3 /*break*/, 31];
                    return [4 /*yield*/, __await(accumulatedContent)];
                case 29: return [4 /*yield*/, _f.sent()];
                case 30:
                    _f.sent();
                    _f.label = 31;
                case 31:
                    console.error('Error streaming from Groq:', error_1);
                    errorMessage = error_1 instanceof Error ? error_1.message : 'An unknown error occurred.';
                    msg = language === 'zh'
                        ? "\u8BF7\u914D\u7F6EGROQ_API_KEY"
                        : "Please configure GROQ_API_KEY";
                    return [4 /*yield*/, __await("Error: ".concat(errorMessage, ". ").concat(msg))];
                case 32: return [4 /*yield*/, _f.sent()];
                case 33:
                    _f.sent();
                    throw new Error(errorMessage);
                case 34: return [2 /*return*/];
            }
        });
    });
}
export function getRandomWord() {
    return __awaiter(this, void 0, void 0, function () {
        var apiKey, prompt, response, data, error_2, errorMessage;
        var _a, _b, _c, _d;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    apiKey = getApiKey();
                    if (!apiKey) {
                        throw new Error('GROQ_API_KEY is not configured.');
                    }
                    prompt = "\u8BF7\u751F\u6210\u4E00\u4E2A\u6709\u8DA3\u7684\u4E2D\u6587\u8BCD\u6C47\u6216\u6982\u5FF5\uFF0C\u53EF\u4EE5\u662F\u540D\u8BCD\u3001\u52A8\u8BCD\u3001\u5F62\u5BB9\u8BCD\u6216\u4E13\u6709\u540D\u8BCD\u3002\u8BF7\u53EA\u56DE\u590D\u8BCD\u6C47\u6216\u6982\u5FF5\u672C\u8EAB\uFF0C\u4E0D\u8981\u989D\u5916\u7684\u6587\u5B57\u3001\u6807\u70B9\u7B26\u53F7\u6216\u683C\u5F0F\u3002";
                    _e.label = 1;
                case 1:
                    _e.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, fetch(GROQ_API_URL, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                Authorization: "Bearer ".concat(apiKey)
                            },
                            body: JSON.stringify({
                                model: GROQ_MODEL,
                                messages: [
                                    {
                                        role: 'user',
                                        content: prompt
                                    }
                                ],
                                stream: false,
                                max_tokens: 50,
                                temperature: 0.8
                            })
                        })];
                case 2:
                    response = _e.sent();
                    if (!response.ok) {
                        throw new Error("HTTP error! status: ".concat(response.status));
                    }
                    return [4 /*yield*/, response.json()];
                case 3:
                    data = _e.sent();
                    return [2 /*return*/, ((_d = (_c = (_b = (_a = data.choices) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.message) === null || _c === void 0 ? void 0 : _c.content) === null || _d === void 0 ? void 0 : _d.trim()) || ''];
                case 4:
                    error_2 = _e.sent();
                    console.error('Error getting random word from Groq:', error_2);
                    errorMessage = error_2 instanceof Error ? error_2.message : 'An unknown error occurred.';
                    throw new Error("Could not get random word: ".concat(errorMessage));
                case 5: return [2 /*return*/];
            }
        });
    });
}
