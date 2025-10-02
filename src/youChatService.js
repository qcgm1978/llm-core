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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import { generatePrompt } from './llmService';
import queryString from 'query-string';
import { SSE } from 'sse.js';
import { v4 as uuidv4 } from 'uuid';
var YOUCHAT_API_URL = 'https://you.com/api/streamingSearch';
function getApiKey() {
    if (typeof window !== 'undefined' && window.localStorage) {
        var savedApiKey = localStorage.getItem('YOUCHAT_API_KEY');
        if (savedApiKey) {
            return savedApiKey;
        }
    }
    if (typeof process !== 'undefined' && process.env) {
        return process.env.YOUCHAT_API_KEY;
    }
    return undefined;
}
export function setApiKey(apiKey) {
    if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.setItem('YOUCHAT_API_KEY', apiKey);
    }
}
export function clearApiKey() {
    if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.removeItem('YOUCHAT_API_KEY');
    }
}
export function hasApiKey() {
    return true;
}
var chatContext = {
    chatId: uuidv4(),
    chatHistory: []
};
function getChatContext() {
    return chatContext;
}
function setChatContext(context) {
    chatContext = context;
}
export function streamDefinition(topic_1) {
    return __asyncGenerator(this, arguments, function streamDefinition_1(topic, language, category, context) {
        var prompt, contextData, text, queue_1, isDone_1, resolvePromise_1, streamPromise, error_1, errorMessage, msg;
        if (language === void 0) { language = 'zh'; }
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    prompt = generatePrompt(topic, language, category, context);
                    contextData = getChatContext();
                    text = '';
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 10, , 13]);
                    queue_1 = [];
                    isDone_1 = false;
                    resolvePromise_1 = null;
                    streamPromise = new Promise(function (resolve, reject) {
                        resolvePromise_1 = resolve;
                        try {
                            var headers = {
                                accept: 'text/event-stream',
                            };
                            var payload = {
                                q: prompt,
                                domain: 'youchat',
                                chatId: contextData.chatId,
                                queryTraceId: contextData.chatId,
                                chat: JSON.stringify(contextData.chatHistory),
                            };
                            var source = new SSE("".concat(YOUCHAT_API_URL, "?").concat(queryString.stringify(payload)), {
                                headers: headers,
                                withCredentials: false,
                            });
                            source.addEventListener('youChatToken', function (event) {
                                try {
                                    var data = JSON.parse(event.data);
                                    if (data.youChatToken) {
                                        text += data.youChatToken;
                                        queue_1.push(data.youChatToken);
                                    }
                                }
                                catch (e) { }
                            });
                            source.addEventListener('done', function () {
                                setChatContext({
                                    chatId: contextData.chatId,
                                    chatHistory: __spreadArray(__spreadArray([], contextData.chatHistory, true), [
                                        {
                                            question: prompt,
                                            answer: text,
                                        },
                                    ], false),
                                });
                                isDone_1 = true;
                                if (resolvePromise_1)
                                    resolvePromise_1();
                            });
                            source.addEventListener('error', function (event) {
                                console.error(event);
                                reject(event);
                            });
                            source.stream();
                        }
                        catch (err) {
                            reject(err);
                        }
                    });
                    _a.label = 2;
                case 2:
                    if (!(!isDone_1 || queue_1.length > 0)) return [3 /*break*/, 8];
                    if (!(queue_1.length > 0)) return [3 /*break*/, 5];
                    return [4 /*yield*/, __await(queue_1.shift())];
                case 3: return [4 /*yield*/, _a.sent()];
                case 4:
                    _a.sent();
                    return [3 /*break*/, 7];
                case 5: return [4 /*yield*/, __await(new Promise(function (resolve) { return setTimeout(resolve, 50); }))];
                case 6:
                    _a.sent();
                    _a.label = 7;
                case 7: return [3 /*break*/, 2];
                case 8: return [4 /*yield*/, __await(streamPromise)];
                case 9:
                    _a.sent();
                    return [3 /*break*/, 13];
                case 10:
                    error_1 = _a.sent();
                    console.error('Error streaming from YouChat:', error_1);
                    errorMessage = error_1 instanceof Error ? error_1.message : 'An unknown error occurred.';
                    msg = language === 'zh' ? '请检查网络连接或稍后再试' : 'Please check your network connection or try again later';
                    return [4 /*yield*/, __await("Error: ".concat(errorMessage, ". ").concat(msg))];
                case 11: return [4 /*yield*/, _a.sent()];
                case 12:
                    _a.sent();
                    throw new Error(errorMessage);
                case 13: return [2 /*return*/];
            }
        });
    });
}
