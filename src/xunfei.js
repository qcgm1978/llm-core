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
var XunfeiWebSocketParams = /** @class */ (function () {
    function XunfeiWebSocketParams(APIKey, APISecret, gpt_url, prompt) {
        this.APIKey = APIKey;
        this.APISecret = APISecret;
        var parsedUrl = new URL(gpt_url);
        this.host = parsedUrl.host;
        this.path = parsedUrl.pathname + parsedUrl.search;
        this.gpt_url = gpt_url;
        this.prompt = prompt;
    }
    XunfeiWebSocketParams.prototype.create_url = function () {
        return __awaiter(this, void 0, void 0, function () {
            var now, date, signature_origin, signature_sha, signature_sha_base64, authorization_origin, authorization, v, queryString, wsUrl;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        now = new Date();
                        date = this.format_date_time(now);
                        signature_origin = "host: ".concat(this.host, "\ndate: ").concat(date, "\nGET ").concat(this.path, " HTTP/1.1");
                        return [4 /*yield*/, this.generateHmac(this.APISecret, signature_origin)];
                    case 1:
                        signature_sha = _a.sent();
                        if (!signature_sha) {
                            return [2 /*return*/, null];
                        }
                        signature_sha_base64 = btoa(String.fromCharCode.apply(String, new Uint8Array(signature_sha)));
                        authorization_origin = "api_key=\"".concat(this.APIKey, "\", algorithm=\"hmac-sha256\", headers=\"host date request-line\", signature=\"").concat(signature_sha_base64, "\"");
                        authorization = btoa(authorization_origin);
                        v = {
                            authorization: authorization,
                            date: date,
                            host: this.host
                        };
                        queryString = new URLSearchParams(v).toString();
                        wsUrl = "".concat(this.gpt_url, "?").concat(queryString);
                        return [2 /*return*/, wsUrl];
                }
            });
        });
    };
    XunfeiWebSocketParams.prototype.generateHmac = function (key, data) {
        return __awaiter(this, void 0, void 0, function () {
            var encoder, keyData, dataData, cryptoKey, signature, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        encoder = new TextEncoder();
                        keyData = encoder.encode(key);
                        dataData = encoder.encode(data);
                        return [4 /*yield*/, window.crypto.subtle.importKey('raw', keyData, { name: 'HMAC', hash: 'SHA-256' }, false, ['sign'])];
                    case 1:
                        cryptoKey = _a.sent();
                        return [4 /*yield*/, window.crypto.subtle.sign('HMAC', cryptoKey, dataData)];
                    case 2:
                        signature = _a.sent();
                        return [2 /*return*/, signature];
                    case 3:
                        error_1 = _a.sent();
                        console.error('Error generating HMAC:', error_1);
                        return [2 /*return*/, null];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    XunfeiWebSocketParams.prototype.format_date_time = function (date) {
        return date.toUTCString();
    };
    return XunfeiWebSocketParams;
}());
function on_error(error) {
    console.log("### error:", error);
}
function on_close(close_status_code, close_msg) {
    console.log("### closed ###");
}
function on_open(ws, prompt) {
    var data = JSON.stringify({
        "payload": {
            "message": {
                "text": [
                    {
                        "role": "system",
                        "content": ""
                    },
                    {
                        "role": "user",
                        "content": prompt || "请在此处输入你的问题!!!"
                    }
                ]
            }
        },
        "parameter": {
            "chat": {
                "max_tokens": 32768,
                "domain": "x1",
                "top_k": 6,
                "temperature": 1.2,
                "tools": [
                    {
                        "web_search": {
                            "search_mode": "normal",
                            "enable": false
                        },
                        "type": "web_search"
                    }
                ]
            }
        },
        "header": {
            "app_id": "7802f8ba"
        }
    });
    ws.send(data);
}
export default function request_xunfei(api_secret, api_key, gpt_url, prompt) {
    return __awaiter(this, void 0, void 0, function () {
        var wsParam_1, wsUrl, ws_1, _a, readable, writable, writer_1, encoder_1, error_2;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    wsParam_1 = new XunfeiWebSocketParams(api_key, api_secret, gpt_url, prompt);
                    return [4 /*yield*/, wsParam_1.create_url()];
                case 1:
                    wsUrl = _b.sent();
                    if (!wsUrl) {
                        return [2 /*return*/, null];
                    }
                    ws_1 = new WebSocket(wsUrl);
                    ws_1.onopen = function () { return on_open(ws_1, wsParam_1.prompt); };
                    ws_1.onerror = on_error;
                    ws_1.onclose = function (event) { return on_close(event.code, event.reason); };
                    _a = new TransformStream(), readable = _a.readable, writable = _a.writable;
                    writer_1 = writable.getWriter();
                    encoder_1 = new TextEncoder();
                    ws_1.onmessage = function (event) {
                        var _a, _b, _c, _d, _e, _f, _g;
                        try {
                            var data = event.data;
                            var message = JSON.parse(data);
                            if ((_d = (_c = (_b = (_a = message.payload) === null || _a === void 0 ? void 0 : _a.choices) === null || _b === void 0 ? void 0 : _b.text) === null || _c === void 0 ? void 0 : _c[0]) === null || _d === void 0 ? void 0 : _d.content) {
                                var content = message.payload.choices.text[0].content;
                                writer_1.write(encoder_1.encode("data: ".concat(JSON.stringify({ choices: [{ delta: { content: content } }] }), "\n\n")));
                            }
                            if (((_e = message.header) === null || _e === void 0 ? void 0 : _e.code) !== 0) {
                                writer_1.close();
                                ws_1.close();
                            }
                            if (((_g = (_f = message.payload) === null || _f === void 0 ? void 0 : _f.choices) === null || _g === void 0 ? void 0 : _g.status) === 2) {
                                writer_1.write(encoder_1.encode('data: [DONE]\n\n'));
                                writer_1.close();
                                ws_1.close();
                            }
                        }
                        catch (e) {
                            console.error('Error processing message:', e);
                        }
                    };
                    ws_1.onerror = function (error) {
                        console.error('WebSocket error:', error);
                        writer_1.close();
                    };
                    return [2 /*return*/, readable.getReader()];
                case 2:
                    error_2 = _b.sent();
                    console.error('Error in request_xunfei:', error_2);
                    return [2 /*return*/, null];
                case 3: return [2 /*return*/];
            }
        });
    });
}
export { request_xunfei, XunfeiWebSocketParams };
