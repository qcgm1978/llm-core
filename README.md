# llm-core

LLM Core 是一个用于 LLM 服务提供商的核心功能模块，提供统一的 API 接口和服务管理功能。

## 功能特点

- 支持多种 LLM 服务提供商（OpenAI、Gemini、DeepSeek、Groq、YouChat、讯飞等）
- 统一的流式响应接口
- 提示词管理和格式化
- 思维导图生成功能
- API 密钥管理

## 安装

```bash
npm install llm-core
# 或使用 cnpm
cnpm install llm-core
```

## 核心依赖

- `@google/generative-ai` (^0.16.0) - 可选，用于 Gemini 服务

## 使用示例

```typescript
import { ServiceProvider, registerServiceProvider, streamDefinition } from 'llm-core';

// 注册服务提供商
registerServiceProvider(ServiceProvider.GEMINI, {
  streamDefinition: (params) => {
    // 实现 Gemini 流式响应
    return new ReadableStream({ /* ... */ });
  }
});

// 使用服务
const stream = streamDefinition(ServiceProvider.GEMINI, {
  prompt: 'Hello world',
  model: 'gemini-pro',
  apiKey: 'your-api-key'
});
```

## API 接口

### ServiceProvider 枚举

定义支持的 LLM 服务提供商：
- OPENAI
- GEMINI
- DEEPSEEK
- GROQ
- YOUCHAT
- XUNFEI

### 函数

- `streamDefinition(provider, params)` - 获取指定服务提供商的流式响应
- `setApiKey(provider, apiKey)` - 设置服务提供商的 API 密钥
- `getApiKey(provider)` - 获取服务提供商的 API 密钥
- `getPromptByName(name, language)` - 根据名称和语言获取提示词
- `formatPrompt(template, variables)` - 格式化提示词模板

## 构建

```bash
# 在 llm-core 目录下
cnpm install
cnpm run build
```

构建后的文件将输出到 `dist` 目录。