export declare enum ServiceProvider {
    DEEPSEEK = "deepseek",
    GEMINI = "gemini",
    XUNFEI = "xunfei",
    YOUCHAT = "youchat",
    GROQ = "groq",
    OPENAI = "openai"
}
export declare const getSelectedServiceProvider: () => ServiceProvider;
export declare const setSelectedServiceProvider: (provider: ServiceProvider) => void;
export declare const hasDeepSeekApiKey: () => boolean;
export declare const hasGeminiApiKey: () => boolean;
export declare const hasFreeApiKey: () => boolean;
export declare const setDeepSeekApiKey: (key: string) => void;
export interface ServiceProviderImplementation {
    streamDefinition: (topic: string, language: 'zh' | 'en', category?: string, context?: string) => AsyncGenerator<string, void, undefined>;
}
export declare const serviceProvidersRegistry: Record<ServiceProvider, ServiceProviderImplementation | null>;
export declare const registerServiceProvider: (provider: ServiceProvider, implementation: ServiceProviderImplementation) => void;
export declare const setGeminiApiKey: (key: string) => void;
export declare function streamDefinition(topic: string, language?: 'zh' | 'en', category?: string, context?: string): AsyncGenerator<string, void, undefined>;
export declare const hasGroqApiKey: () => boolean;
export declare const setGroqApiKey: (key: string) => void;
export declare const clearAllApiKeys: () => void;
export declare const generatePrompt: (topic: string, language?: "zh" | "en", category?: string, context?: string) => string;
export declare const hasXunfeiApiKey: () => boolean;
export declare const hasXunfeiApiSecret: () => boolean;
export declare const setXunfeiApiKey: (key: string) => void;
export declare const setXunfeiApiSecret: (secret: string) => void;
export declare const hasShownApiKeyPrompt: () => boolean;
export declare const setHasShownApiKeyPrompt: (shown: boolean) => void;
export declare const hasYouChatApiKey: () => boolean;
export declare const setYouChatApiKey: (key: string) => void;
export declare const hasOpenAiApiKey: () => boolean;
export declare const setOpenAiApiKey: (key: string) => void;
export declare const hasApiKey: () => boolean;
export declare function streamMindMap(content: string, language?: 'zh' | 'en'): AsyncGenerator<string, void, undefined>;
export declare function streamMindMapArrows(mindMapData: string, language?: 'zh' | 'en'): AsyncGenerator<string, void, undefined>;
