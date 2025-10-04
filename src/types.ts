export interface Prompt {
  act: string;
  prompt: string;
}

export interface LanguageOption {
  code: string;
  name: string;
}

export interface PromptsCollection {
  languages: LanguageOption[];
  [key: string]: Prompt[] | LanguageOption[];
}

export interface OpenAIPrompt {
  use_case: string;
  prompt: string;
  中文翻译: string;
}

export interface OpenAIPromptsCollection {
  chatgpt_for_engineering_teams_prompts: OpenAIPrompt[];
}