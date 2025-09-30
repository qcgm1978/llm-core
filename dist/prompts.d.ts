export interface Prompt {
    act: string;
    prompt: string;
}
export interface LanguageOption {
    code: string;
    name: string;
}
interface PromptsCollection {
    languages: LanguageOption[];
    [key: string]: Prompt[] | LanguageOption[];
}
declare let prompts: PromptsCollection;
export declare const getLanguages: () => LanguageOption[];
export declare const getPromptsByLanguage: (language: string) => Prompt[];
export declare const getPromptByName: (name?: string, language?: "zh" | "en") => string | undefined;
export declare const formatPrompt: (prompt: string, replacements: Record<string, string>) => string;
export declare const updatePrompt: (name: string, prompt: string, language?: "zh" | "en") => boolean;
export declare const resetPrompts: () => void;
export default prompts;
