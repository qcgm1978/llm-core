import { getChapterMindMapPrompt, getMindMapArrowPrompt } from './mindmap';
import { getPromptByName, formatPrompt } from './prompts';
export var ServiceProvider;
(function (ServiceProvider) {
    ServiceProvider["DEEPSEEK"] = "deepseek";
    ServiceProvider["GEMINI"] = "gemini";
    ServiceProvider["XUNFEI"] = "xunfei";
    ServiceProvider["YOUCHAT"] = "youchat";
    ServiceProvider["GROQ"] = "groq";
    ServiceProvider["OPENAI"] = "openai";
})(ServiceProvider || (ServiceProvider = {}));
export const getSelectedServiceProvider = () => {
    const saved = localStorage.getItem('selected_service_provider');
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
    else {
        return ServiceProvider.XUNFEI;
    }
};
export const setSelectedServiceProvider = (provider) => {
    localStorage.setItem('selected_service_provider', provider);
};
export const hasDeepSeekApiKey = () => {
    const key = localStorage.getItem('DEEPSEEK_API_KEY');
    return !!key && key.trim().length > 0;
};
export const hasGeminiApiKey = () => {
    const key = localStorage.getItem('GEMINI_API_KEY');
    return !!key && key.trim().length > 0;
};
export const hasFreeApiKey = () => {
    return hasXunfeiApiKey() && hasXunfeiApiSecret();
};
export const setDeepSeekApiKey = (key) => {
    if (key) {
        localStorage.setItem('DEEPSEEK_API_KEY', key);
    }
    else {
        localStorage.removeItem('DEEPSEEK_API_KEY');
    }
};
export const serviceProvidersRegistry = {
    [ServiceProvider.DEEPSEEK]: null,
    [ServiceProvider.GEMINI]: null,
    [ServiceProvider.XUNFEI]: null,
    [ServiceProvider.YOUCHAT]: null,
    [ServiceProvider.GROQ]: null,
    [ServiceProvider.OPENAI]: null
};
export const registerServiceProvider = (provider, implementation) => {
    serviceProvidersRegistry[provider] = implementation;
};
export const setGeminiApiKey = (key) => {
    if (key) {
        localStorage.setItem('GEMINI_API_KEY', key);
    }
    else {
        localStorage.removeItem('GEMINI_API_KEY');
    }
};
export async function* streamDefinition(topic, language = 'zh', category, context) {
    const provider = getSelectedServiceProvider();
    const implementation = serviceProvidersRegistry[provider];
    try {
        if (implementation) {
            yield* implementation.streamDefinition(topic, language, category, context);
        }
        else {
            const prefix = language === 'zh' ? '错误: ' : 'Error: ';
            yield `${prefix}未找到 ${provider} 的实现`;
        }
    }
    catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
        const prefix = language === 'zh' ? '发生错误: ' : 'Error: ';
        yield `${prefix}${errorMessage}`;
    }
}
export const hasGroqApiKey = () => {
    const key = localStorage.getItem('GROQ_API_KEY');
    return !!key && key.trim().length > 0;
};
export const setGroqApiKey = (key) => {
    if (key) {
        localStorage.setItem('GROQ_API_KEY', key);
    }
    else {
        localStorage.removeItem('GROQ_API_KEY');
    }
};
export const clearAllApiKeys = () => {
    localStorage.removeItem('DEEPSEEK_API_KEY');
    localStorage.removeItem('GEMINI_API_KEY');
    localStorage.removeItem('GROQ_API_KEY');
    localStorage.removeItem('OPENAI_API_KEY');
};
export const generatePrompt = (topic, language = 'zh', category, context) => {
    let promptTemplate;
    const selectedTemplate = localStorage.getItem('SELECTED_PROMPT_TEMPLATE');
    if (selectedTemplate) {
        promptTemplate = getPromptByName(selectedTemplate, language);
        if (selectedTemplate === 'wiki' && !category && language === 'zh') {
            promptTemplate = '请用中文为"{topic}"提供一个简洁、百科全书式的定义。请提供信息丰富且中立的内容。不要使用markdown、标题或任何特殊格式。只返回定义本身的文本。';
        }
    }
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
    if (!promptTemplate) {
        if (language === 'zh') {
            if (context) {
                return `${topic}\n\n${context}`;
            }
            else if (category) {
                return `${topic}`;
            }
            else {
                return `${topic}`;
            }
        }
        else {
            if (context) {
                return `${topic}\n\n${context}`;
            }
            else if (category) {
                return `${topic}`;
            }
            else {
                return `${topic}`;
            }
        }
    }
    const replacements = { topic };
    if (category)
        replacements.category = category;
    if (context)
        replacements.context = context;
    return formatPrompt(promptTemplate, replacements);
};
export const hasXunfeiApiKey = () => {
    const key = localStorage.getItem('XUNFEI_API_KEY');
    return !!key && key.trim().length > 0;
};
export const hasXunfeiApiSecret = () => {
    const secret = localStorage.getItem('XUNFEI_API_SECRET');
    return !!secret && secret.trim().length > 0;
};
export const setXunfeiApiKey = (key) => {
    if (key) {
        localStorage.setItem('XUNFEI_API_KEY', key);
    }
    else {
        localStorage.removeItem('XUNFEI_API_KEY');
    }
};
export const setXunfeiApiSecret = (secret) => {
    if (secret) {
        localStorage.setItem('XUNFEI_API_SECRET', secret);
    }
    else {
        localStorage.removeItem('XUNFEI_API_SECRET');
    }
};
export const hasShownApiKeyPrompt = () => {
    const shown = localStorage.getItem('has_shown_api_key_prompt');
    return shown === 'true';
};
export const setHasShownApiKeyPrompt = (shown) => {
    localStorage.setItem('has_shown_api_key_prompt', shown.toString());
};
export const hasYouChatApiKey = () => {
    return true;
};
export const setYouChatApiKey = (key) => {
    if (key) {
        localStorage.setItem('YOUCHAT_API_KEY', key);
    }
    else {
        localStorage.removeItem('YOUCHAT_API_KEY');
    }
};
export const hasOpenAiApiKey = () => {
    const key = localStorage.getItem('OPENAI_API_KEY');
    return !!key && key.trim().length > 0;
};
export const setOpenAiApiKey = (key) => {
    if (key) {
        localStorage.setItem('OPENAI_API_KEY', key);
    }
    else {
        localStorage.removeItem('OPENAI_API_KEY');
    }
};
export const hasApiKey = () => {
    return (hasDeepSeekApiKey() ||
        hasGeminiApiKey() ||
        hasGroqApiKey() ||
        hasYouChatApiKey() ||
        hasFreeApiKey() ||
        hasOpenAiApiKey());
};
export async function* streamMindMap(content, language = 'zh') {
    const provider = getSelectedServiceProvider();
    const prompt = getChapterMindMapPrompt();
    try {
        const fullPrompt = `${content}\n\n${prompt}`;
        yield* streamDefinition(fullPrompt, language, 'mindmap');
    }
    catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
        const prefix = language === 'zh' ? '生成思维导图时发生错误: ' : 'Error generating mind map: ';
        yield `${prefix}${errorMessage}`;
    }
}
export async function* streamMindMapArrows(mindMapData, language = 'zh') {
    const provider = getSelectedServiceProvider();
    const prompt = getMindMapArrowPrompt();
    try {
        const fullPrompt = `${mindMapData}\n\n${prompt}`;
        yield* streamDefinition(fullPrompt, language, 'mindmap_arrows');
    }
    catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
        const prefix = language === 'zh' ? '生成思维导图箭头时发生错误: ' : 'Error generating mind map arrows: ';
        yield `${prefix}${errorMessage}`;
    }
}
