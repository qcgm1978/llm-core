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
// 豆包 API 配置
var DOUBAO_API_URL = 'https://ark.cn-beijing.volces.com/api/v3/chat/completions';
var DOUBAO_MODEL = 'doubao-1-5-pro-32k-250115';
// 获取 API Key
var getApiKey = function () {
    return localStorage.getItem('DOUBAO_API_KEY') || '';
};
// 更新 API Key
export var updateApiKey = function (key) {
    // 这里可以做一些验证或其他操作
};
// 处理豆包 API 响应
var processResponse = function (response) { return __awaiter(void 0, void 0, void 0, function () {
    var reader;
    var _a;
    return __generator(this, function (_b) {
        if (!response.ok) {
            throw new Error("API request failed with status ".concat(response.status));
        }
        reader = (_a = response.body) === null || _a === void 0 ? void 0 : _a.getReader();
        if (!reader) {
            throw new Error('No response body');
        }
        return [2 /*return*/, reader];
    });
}); };
// 解析豆包 API 流式响应
var parseChunk = function (chunk) {
    var _a;
    try {
        var lines = chunk.split('\n');
        var content = '';
        for (var _i = 0, lines_1 = lines; _i < lines_1.length; _i++) {
            var line = lines_1[_i];
            if (line.trim() === '')
                continue;
            if (line.startsWith('data:')) {
                var data = line.substring(5).trim();
                if (data === '[DONE]')
                    break;
                var parsed = JSON.parse(data);
                var delta = (_a = parsed.choices[0]) === null || _a === void 0 ? void 0 : _a.delta;
                if (delta === null || delta === void 0 ? void 0 : delta.content) {
                    content += delta.content;
                }
            }
        }
        return content;
    }
    catch (error) {
        console.error('Error parsing chunk:', error);
        return '';
    }
};
export function streamDefinition(topic_1) {
    return __asyncGenerator(this, arguments, function streamDefinition_1(topic, language, category, context) {
        var apiKey, prompt, response, reader, decoder, _a, done, value, chunk, content, error_1, errorMessage;
        if (language === void 0) { language = 'zh'; }
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    apiKey = getApiKey();
                    if (!!apiKey) return [3 /*break*/, 4];
                    return [4 /*yield*/, __await('请先设置豆包 API Key')];
                case 1: return [4 /*yield*/, _b.sent()];
                case 2:
                    _b.sent();
                    return [4 /*yield*/, __await(void 0)];
                case 3: return [2 /*return*/, _b.sent()];
                case 4:
                    prompt = generatePrompt(topic, language, category, context);
                    _b.label = 5;
                case 5:
                    _b.trys.push([5, 14, , 17]);
                    return [4 /*yield*/, __await(fetch(DOUBAO_API_URL, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': "Bearer ".concat(apiKey)
                            },
                            body: JSON.stringify({
                                model: DOUBAO_MODEL,
                                messages: [
                                    {
                                        role: 'user',
                                        content: prompt
                                    }
                                ],
                                stream: true
                            })
                        }))];
                case 6:
                    response = _b.sent();
                    return [4 /*yield*/, __await(processResponse(response))];
                case 7:
                    reader = _b.sent();
                    decoder = new TextDecoder();
                    _b.label = 8;
                case 8:
                    if (!true) return [3 /*break*/, 13];
                    return [4 /*yield*/, __await(reader.read())];
                case 9:
                    _a = _b.sent(), done = _a.done, value = _a.value;
                    if (done)
                        return [3 /*break*/, 13];
                    chunk = decoder.decode(value, { stream: true });
                    content = parseChunk(chunk);
                    if (!content) return [3 /*break*/, 12];
                    return [4 /*yield*/, __await(content)];
                case 10: return [4 /*yield*/, _b.sent()];
                case 11:
                    _b.sent();
                    _b.label = 12;
                case 12: return [3 /*break*/, 8];
                case 13: return [3 /*break*/, 17];
                case 14:
                    error_1 = _b.sent();
                    errorMessage = error_1 instanceof Error ? error_1.message : '豆包服务请求失败';
                    return [4 /*yield*/, __await("\u9519\u8BEF: ".concat(errorMessage))];
                case 15: return [4 /*yield*/, _b.sent()];
                case 16:
                    _b.sent();
                    return [3 /*break*/, 17];
                case 17: return [2 /*return*/];
            }
        });
    });
}
