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
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
var __await = (this && this.__await) || function (v) { return this instanceof __await ? (this.v = v, this) : new __await(v); }
var __asyncDelegator = (this && this.__asyncDelegator) || function (o) {
    var i, p;
    return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
    function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: false } : f ? f(v) : v; } : f; }
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
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
var _a;
// 添加缺少的导入语句
import { getPromptByName, formatPrompt } from './prompts';
import { getChapterMindMapPrompt, getMindMapArrowPrompt } from './mindmap';
export var ServiceProvider;
(function (ServiceProvider) {
    ServiceProvider["DEEPSEEK"] = "deepseek";
    ServiceProvider["GEMINI"] = "gemini";
    ServiceProvider["XUNFEI"] = "xunfei";
    ServiceProvider["YOUCHAT"] = "youchat";
    ServiceProvider["GROQ"] = "groq";
    ServiceProvider["OPENAI"] = "openai";
    ServiceProvider["DOUBAO"] = "doubao";
})(ServiceProvider || (ServiceProvider = {}));
export var getSelectedServiceProvider = function () {
    var saved = localStorage.getItem('selected_service_provider');
    if (saved &&
        Object.values(ServiceProvider).includes(saved)) {
        return saved;
    }
    if (hasDeepSeekApiKey()) {
        return ServiceProvider.DEEPSEEK;
    }
    else if (hasOpenAiApiKey()) {
        return ServiceProvider.OPENAI;
    }
    else if (hasGeminiApiKey()) {
        return ServiceProvider.GEMINI;
    }
    else if (hasGroqApiKey()) {
        return ServiceProvider.GROQ;
    }
    else if (hasYouChatApiKey()) {
        return ServiceProvider.YOUCHAT;
    }
    else if (hasDoubaoApiKey()) {
        return ServiceProvider.DOUBAO;
    }
    else {
        return ServiceProvider.XUNFEI;
    }
};
export var setSelectedServiceProvider = function (provider) {
    localStorage.setItem('selected_service_provider', provider);
};
export var hasDeepSeekApiKey = function () {
    var key = localStorage.getItem('DEEPSEEK_API_KEY');
    return !!key && key.trim().length > 0;
};
export var hasGeminiApiKey = function () {
    var key = localStorage.getItem('GEMINI_API_KEY');
    return !!key && key.trim().length > 0;
};
export var hasFreeApiKey = function () {
    return hasXunfeiApiKey() && hasXunfeiApiSecret();
};
export var setDeepSeekApiKey = function (key) {
    if (key) {
        localStorage.setItem('DEEPSEEK_API_KEY', key);
    }
    else {
        localStorage.removeItem('DEEPSEEK_API_KEY');
    }
};
export var serviceProvidersRegistry = (_a = {},
    _a[ServiceProvider.DEEPSEEK] = null,
    _a[ServiceProvider.GEMINI] = null,
    _a[ServiceProvider.XUNFEI] = null,
    _a[ServiceProvider.YOUCHAT] = null,
    _a[ServiceProvider.GROQ] = null,
    _a[ServiceProvider.OPENAI] = null,
    _a[ServiceProvider.DOUBAO] = null,
    _a);
export var registerServiceProvider = function (provider, implementation) {
    serviceProvidersRegistry[provider] = implementation;
};
export var setGeminiApiKey = function (key) {
    if (key) {
        localStorage.setItem('GEMINI_API_KEY', key);
        // 更新 Gemini API 密钥
        try {
            // 动态导入以避免循环依赖
            import('./geminiService').then(function (_a) {
                var updateApiKey = _a.updateApiKey;
                updateApiKey(key);
            });
        }
        catch (e) {
            console.error('Failed to update Gemini API key:', e);
        }
    }
    else {
        localStorage.removeItem('GEMINI_API_KEY');
    }
};
export function streamDefinition(topic_1) {
    return __asyncGenerator(this, arguments, function streamDefinition_1(topic, language, category, context) {
        var provider, implementation, _a, streamDefinition_2, streamDefinition_3, streamDefinition_4, streamDefinition_5, streamDefinition_6, streamDefinition_7, streamDefinition_8, streamDefinition_9, error_1, errorMessage, prefix;
        if (language === void 0) { language = 'zh'; }
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    provider = getSelectedServiceProvider();
                    implementation = serviceProvidersRegistry[provider];
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 38, , 41]);
                    if (!implementation) return [3 /*break*/, 4];
                    return [5 /*yield**/, __values(__asyncDelegator(__asyncValues(implementation.streamDefinition(topic, language, category, context))))];
                case 2: return [4 /*yield*/, __await.apply(void 0, [_b.sent()])];
                case 3:
                    _b.sent();
                    return [3 /*break*/, 37];
                case 4:
                    _a = provider;
                    switch (_a) {
                        case ServiceProvider.DEEPSEEK: return [3 /*break*/, 5];
                        case ServiceProvider.OPENAI: return [3 /*break*/, 9];
                        case ServiceProvider.GEMINI: return [3 /*break*/, 13];
                        case ServiceProvider.GROQ: return [3 /*break*/, 17];
                        case ServiceProvider.YOUCHAT: return [3 /*break*/, 21];
                        case ServiceProvider.XUNFEI: return [3 /*break*/, 25];
                        case ServiceProvider.DOUBAO: return [3 /*break*/, 29];
                    }
                    return [3 /*break*/, 33];
                case 5:
                    if (!hasDeepSeekApiKey()) return [3 /*break*/, 9];
                    return [4 /*yield*/, __await(import('./deepseekService'))];
                case 6:
                    streamDefinition_2 = (_b.sent()).streamDefinition;
                    return [5 /*yield**/, __values(__asyncDelegator(__asyncValues(streamDefinition_2(topic, language, category, context))))];
                case 7: return [4 /*yield*/, __await.apply(void 0, [_b.sent()])];
                case 8:
                    _b.sent();
                    return [3 /*break*/, 37];
                case 9:
                    if (!hasOpenAiApiKey()) return [3 /*break*/, 13];
                    return [4 /*yield*/, __await(import('./openaiService'))];
                case 10:
                    streamDefinition_3 = (_b.sent()).streamDefinition;
                    return [5 /*yield**/, __values(__asyncDelegator(__asyncValues(streamDefinition_3(topic, language, category, context))))];
                case 11: return [4 /*yield*/, __await.apply(void 0, [_b.sent()])];
                case 12:
                    _b.sent();
                    return [3 /*break*/, 37];
                case 13:
                    if (!hasGeminiApiKey()) return [3 /*break*/, 17];
                    return [4 /*yield*/, __await(import('./geminiService'))];
                case 14:
                    streamDefinition_4 = (_b.sent()).streamDefinition;
                    return [5 /*yield**/, __values(__asyncDelegator(__asyncValues(streamDefinition_4(topic, language, category, context))))];
                case 15: return [4 /*yield*/, __await.apply(void 0, [_b.sent()])];
                case 16:
                    _b.sent();
                    return [3 /*break*/, 37];
                case 17:
                    if (!hasGroqApiKey()) return [3 /*break*/, 21];
                    return [4 /*yield*/, __await(import('./groqService'))];
                case 18:
                    streamDefinition_5 = (_b.sent()).streamDefinition;
                    return [5 /*yield**/, __values(__asyncDelegator(__asyncValues(streamDefinition_5(topic, language, category, context))))];
                case 19: return [4 /*yield*/, __await.apply(void 0, [_b.sent()])];
                case 20:
                    _b.sent();
                    return [3 /*break*/, 37];
                case 21:
                    if (!hasYouChatApiKey()) return [3 /*break*/, 25];
                    return [4 /*yield*/, __await(import('./youChatService'))];
                case 22:
                    streamDefinition_6 = (_b.sent()).streamDefinition;
                    return [5 /*yield**/, __values(__asyncDelegator(__asyncValues(streamDefinition_6(topic, language, category, context))))];
                case 23: return [4 /*yield*/, __await.apply(void 0, [_b.sent()])];
                case 24:
                    _b.sent();
                    return [3 /*break*/, 37];
                case 25:
                    if (!hasFreeApiKey()) return [3 /*break*/, 29];
                    return [4 /*yield*/, __await(import('./xunfeiService'))];
                case 26:
                    streamDefinition_7 = (_b.sent()).streamDefinition;
                    return [5 /*yield**/, __values(__asyncDelegator(__asyncValues(streamDefinition_7(topic, language, category, context))))];
                case 27: return [4 /*yield*/, __await.apply(void 0, [_b.sent()])];
                case 28:
                    _b.sent();
                    return [3 /*break*/, 37];
                case 29:
                    if (!hasDoubaoApiKey()) return [3 /*break*/, 33];
                    return [4 /*yield*/, __await(import('./doubaoService'))];
                case 30:
                    streamDefinition_8 = (_b.sent()).streamDefinition;
                    return [5 /*yield**/, __values(__asyncDelegator(__asyncValues(streamDefinition_8(topic, language, category, context))))];
                case 31: return [4 /*yield*/, __await.apply(void 0, [_b.sent()])];
                case 32:
                    _b.sent();
                    return [3 /*break*/, 37];
                case 33: return [4 /*yield*/, __await(import('./xunfeiService'))];
                case 34:
                    streamDefinition_9 = (_b.sent()).streamDefinition;
                    return [5 /*yield**/, __values(__asyncDelegator(__asyncValues(streamDefinition_9(topic, language, category, context))))];
                case 35: return [4 /*yield*/, __await.apply(void 0, [_b.sent()])];
                case 36:
                    _b.sent();
                    _b.label = 37;
                case 37: return [3 /*break*/, 41];
                case 38:
                    error_1 = _b.sent();
                    errorMessage = error_1 instanceof Error ? error_1.message : 'An unknown error occurred';
                    prefix = language === 'zh' ? '发生错误: ' : 'Error: ';
                    return [4 /*yield*/, __await("".concat(prefix).concat(errorMessage))];
                case 39: return [4 /*yield*/, _b.sent()];
                case 40:
                    _b.sent();
                    return [3 /*break*/, 41];
                case 41: return [2 /*return*/];
            }
        });
    });
}
export var hasGroqApiKey = function () {
    var key = localStorage.getItem('GROQ_API_KEY');
    return !!key && key.trim().length > 0;
};
export var setGroqApiKey = function (key) {
    if (key) {
        localStorage.setItem('GROQ_API_KEY', key);
    }
    else {
        localStorage.removeItem('GROQ_API_KEY');
    }
};
export var clearAllApiKeys = function () {
    localStorage.removeItem('DEEPSEEK_API_KEY');
    localStorage.removeItem('GEMINI_API_KEY');
    localStorage.removeItem('GROQ_API_KEY');
    localStorage.removeItem('OPENAI_API_KEY');
    localStorage.removeItem('DOUBAO_API_KEY');
};
export var generatePrompt = function (topic, language, category, context) {
    if (language === void 0) { language = 'zh'; }
    var promptTemplate;
    // 首先检查是否有用户手动选择的模板类型
    var selectedTemplate = localStorage.getItem('SELECTED_PROMPT_TEMPLATE');
    if (selectedTemplate) {
        // 如果有用户选择的模板，优先使用
        promptTemplate = getPromptByName(selectedTemplate, language);
        // 特殊处理wiki模板，当category为空时使用简化版本
        if (selectedTemplate === 'wiki' && !category && language === 'zh') {
            promptTemplate = '请用中文为"{topic}"提供一个简洁、百科全书式的定义。请提供信息丰富且中立的内容。不要使用markdown、标题或任何特殊格式。只返回定义本身的文本。';
        }
    }
    // 如果没有用户选择的模板或者找不到该模板，则按原来的逻辑选择模板
    if (!promptTemplate) {
        if (language === 'zh') {
            if (context) {
                promptTemplate = getPromptByName('带上下文回答', 'zh');
            }
            else if (category) {
                promptTemplate = getPromptByName('wiki', 'zh');
            }
            else {
                promptTemplate = getPromptByName('简洁定义', 'zh');
            }
        }
        else {
            if (context) {
                promptTemplate = getPromptByName('Answer with Context', 'en');
            }
            else if (category) {
                promptTemplate = getPromptByName('Category Definition', 'en');
            }
            else {
                promptTemplate = getPromptByName('Concise Definition', 'en');
            }
        }
    }
    // 如果找不到模板，使用默认实现
    if (!promptTemplate) {
        // 保留原来的默认实现作为后备
        if (language === 'zh') {
            if (context) {
                return "".concat(topic, "\n\n").concat(context);
            }
            else if (category) {
                return "".concat(topic);
            }
            else {
                return "".concat(topic);
            }
        }
        else {
            if (context) {
                return "".concat(topic, "\n\n").concat(context);
            }
            else if (category) {
                return "".concat(topic);
            }
            else {
                return "".concat(topic);
            }
        }
    }
    // 替换提示模板中的变量
    var replacements = { topic: topic };
    if (category)
        replacements.category = category;
    if (context)
        replacements.context = context;
    return formatPrompt(promptTemplate, replacements);
};
export var hasXunfeiApiKey = function () {
    var key = localStorage.getItem('XUNFEI_API_KEY');
    return !!key && key.trim().length > 0;
};
export var hasXunfeiApiSecret = function () {
    var secret = localStorage.getItem('XUNFEI_API_SECRET');
    return !!secret && secret.trim().length > 0;
};
export var setXunfeiApiKey = function (key) {
    if (key) {
        localStorage.setItem('XUNFEI_API_KEY', key);
    }
    else {
        localStorage.removeItem('XUNFEI_API_KEY');
    }
};
export var setXunfeiApiSecret = function (secret) {
    if (secret) {
        localStorage.setItem('XUNFEI_API_SECRET', secret);
    }
    else {
        localStorage.removeItem('XUNFEI_API_SECRET');
    }
};
export var hasShownApiKeyPrompt = function () {
    var shown = localStorage.getItem('has_shown_api_key_prompt');
    return shown === 'true';
};
export var setHasShownApiKeyPrompt = function (shown) {
    localStorage.setItem('has_shown_api_key_prompt', shown.toString());
};
export var hasYouChatApiKey = function () {
    return true;
};
export var setYouChatApiKey = function (key) {
    if (key) {
        localStorage.setItem('YOUCHAT_API_KEY', key);
    }
    else {
        localStorage.removeItem('YOUCHAT_API_KEY');
    }
};
export var hasOpenAiApiKey = function () {
    var key = localStorage.getItem('OPENAI_API_KEY');
    return !!key && key.trim().length > 0;
};
export var setOpenAiApiKey = function (key) {
    if (key) {
        localStorage.setItem('OPENAI_API_KEY', key);
    }
    else {
        localStorage.removeItem('OPENAI_API_KEY');
    }
};
export var hasApiKey = function () {
    return (hasDeepSeekApiKey() ||
        hasGeminiApiKey() ||
        hasGroqApiKey() ||
        hasYouChatApiKey() ||
        hasFreeApiKey() ||
        hasOpenAiApiKey() ||
        hasDoubaoApiKey());
};
// 思维导图生成函数
export function streamMindMap(content_1) {
    return __asyncGenerator(this, arguments, function streamMindMap_1(content, language) {
        var prompt, fullPrompt, error_2, errorMessage, prefix;
        if (language === void 0) { language = 'zh'; }
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    prompt = getChapterMindMapPrompt();
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 7]);
                    fullPrompt = "".concat(content, "\n\n").concat(prompt);
                    // 使用streamDefinition函数来生成思维导图，但更改category以区分
                    return [5 /*yield**/, __values(__asyncDelegator(__asyncValues(streamDefinition(fullPrompt, language, 'mindmap'))))];
                case 2: 
                // 使用streamDefinition函数来生成思维导图，但更改category以区分
                return [4 /*yield*/, __await.apply(void 0, [_a.sent()])];
                case 3:
                    // 使用streamDefinition函数来生成思维导图，但更改category以区分
                    _a.sent();
                    return [3 /*break*/, 7];
                case 4:
                    error_2 = _a.sent();
                    errorMessage = error_2 instanceof Error ? error_2.message : 'An unknown error occurred';
                    prefix = language === 'zh' ? '生成思维导图时发生错误: ' : 'Error generating mind map: ';
                    return [4 /*yield*/, __await("".concat(prefix).concat(errorMessage))];
                case 5: return [4 /*yield*/, _a.sent()];
                case 6:
                    _a.sent();
                    return [3 /*break*/, 7];
                case 7: return [2 /*return*/];
            }
        });
    });
}
// 思维导图箭头生成函数
export function streamMindMapArrows(mindMapData_1) {
    return __asyncGenerator(this, arguments, function streamMindMapArrows_1(mindMapData, language) {
        var prompt, fullPrompt, error_3, errorMessage, prefix;
        if (language === void 0) { language = 'zh'; }
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    prompt = getMindMapArrowPrompt();
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 7]);
                    fullPrompt = "".concat(mindMapData, "\n\n").concat(prompt);
                    // 使用streamDefinition函数来生成箭头，但更改category以区分
                    return [5 /*yield**/, __values(__asyncDelegator(__asyncValues(streamDefinition(fullPrompt, language, 'mindmap_arrows'))))];
                case 2: 
                // 使用streamDefinition函数来生成箭头，但更改category以区分
                return [4 /*yield*/, __await.apply(void 0, [_a.sent()])];
                case 3:
                    // 使用streamDefinition函数来生成箭头，但更改category以区分
                    _a.sent();
                    return [3 /*break*/, 7];
                case 4:
                    error_3 = _a.sent();
                    errorMessage = error_3 instanceof Error ? error_3.message : 'An unknown error occurred';
                    prefix = language === 'zh' ? '生成思维导图箭头时发生错误: ' : 'Error generating mind map arrows: ';
                    return [4 /*yield*/, __await("".concat(prefix).concat(errorMessage))];
                case 5: return [4 /*yield*/, _a.sent()];
                case 6:
                    _a.sent();
                    return [3 /*break*/, 7];
                case 7: return [2 /*return*/];
            }
        });
    });
}
// 添加 hasDoubaoApiKey 函数
export var hasDoubaoApiKey = function () {
    var key = localStorage.getItem('DOUBAO_API_KEY');
    return !!key && key.trim().length > 0;
};
// 添加 setDoubaoApiKey 函数
export var setDoubaoApiKey = function (key) {
    if (key) {
        localStorage.setItem('DOUBAO_API_KEY', key);
    }
    else {
        localStorage.removeItem('DOUBAO_API_KEY');
    }
};
