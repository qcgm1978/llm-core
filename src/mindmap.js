import { getPromptByName } from './prompts';
// 获取思维导图生成提示
// 修改为使用当前模块中的 getPromptByName 函数
export var getChapterMindMapPrompt = function () {
    var prompt = getPromptByName('思维导图生成', 'zh');
    return prompt || '';
};
export var getMindMapArrowPrompt = function () {
    var prompt = getPromptByName('思维导图箭头生成', 'zh');
    return prompt || '';
};
