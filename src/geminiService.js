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
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
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
import { GoogleGenAI } from '@google/genai';
import { generatePrompt } from './llmService';
var apiKey = null;
if (typeof window !== 'undefined') {
    apiKey = localStorage.getItem('GEMINI_API_KEY');
}
var ai = null;
if (apiKey) {
    ai = new GoogleGenAI({ apiKey: apiKey });
}
var artModelName = 'gemini-2.5-flash';
var textModelName = 'gemini-2.5-flash-lite';
export var updateApiKey = function (newApiKey) {
    apiKey = newApiKey;
    if (newApiKey) {
        ai = new GoogleGenAI({ apiKey: newApiKey });
    }
    else {
        ai = null;
    }
};
export function streamDefinition(topic_1) {
    return __asyncGenerator(this, arguments, function streamDefinition_1(topic, language, category, context) {
        var prompt, response, _a, response_1, response_1_1, chunk, e_1_1, error_1, message, errorMessage;
        var _b, e_1, _c, _d;
        if (language === void 0) { language = 'zh'; }
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    if (!!ai) return [3 /*break*/, 4];
                    return [4 /*yield*/, __await('Error: GEMINI_API_KEY is not configured. Please check your settings to continue.')];
                case 1: return [4 /*yield*/, _e.sent()];
                case 2:
                    _e.sent();
                    return [4 /*yield*/, __await(void 0)];
                case 3: return [2 /*return*/, _e.sent()];
                case 4:
                    prompt = generatePrompt(topic, language, category, context);
                    _e.label = 5;
                case 5:
                    _e.trys.push([5, 21, , 24]);
                    return [4 /*yield*/, __await(ai.models.generateContentStream({
                            model: textModelName,
                            contents: prompt,
                            config: {
                                thinkingConfig: { thinkingBudget: 0 }
                            }
                        }))];
                case 6:
                    response = _e.sent();
                    _e.label = 7;
                case 7:
                    _e.trys.push([7, 14, 15, 20]);
                    _a = true, response_1 = __asyncValues(response);
                    _e.label = 8;
                case 8: return [4 /*yield*/, __await(response_1.next())];
                case 9:
                    if (!(response_1_1 = _e.sent(), _b = response_1_1.done, !_b)) return [3 /*break*/, 13];
                    _d = response_1_1.value;
                    _a = false;
                    chunk = _d;
                    if (!chunk.text) return [3 /*break*/, 12];
                    return [4 /*yield*/, __await(chunk.text)];
                case 10: return [4 /*yield*/, _e.sent()];
                case 11:
                    _e.sent();
                    _e.label = 12;
                case 12:
                    _a = true;
                    return [3 /*break*/, 8];
                case 13: return [3 /*break*/, 20];
                case 14:
                    e_1_1 = _e.sent();
                    e_1 = { error: e_1_1 };
                    return [3 /*break*/, 20];
                case 15:
                    _e.trys.push([15, , 18, 19]);
                    if (!(!_a && !_b && (_c = response_1.return))) return [3 /*break*/, 17];
                    return [4 /*yield*/, __await(_c.call(response_1))];
                case 16:
                    _e.sent();
                    _e.label = 17;
                case 17: return [3 /*break*/, 19];
                case 18:
                    if (e_1) throw e_1.error;
                    return [7 /*endfinally*/];
                case 19: return [7 /*endfinally*/];
                case 20: return [3 /*break*/, 24];
                case 21:
                    error_1 = _e.sent();
                    message = JSON.parse(JSON.parse(JSON.stringify(error_1)).message).error;
                    console.error('Error streaming from Gemini:', error_1);
                    errorMessage = error_1 instanceof Error ? message : 'An unknown error occurred.';
                    return [4 /*yield*/, __await("Error: Could not generate content for \"".concat(topic, "\". ").concat(errorMessage))];
                case 22: return [4 /*yield*/, _e.sent()];
                case 23:
                    _e.sent();
                    throw new Error(errorMessage);
                case 24: return [2 /*return*/];
            }
        });
    });
}
