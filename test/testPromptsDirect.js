import { readFile } from 'fs/promises';
import { resolve } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const runTest = async () => {
  console.log('开始直接测试JSON文件访问...');
  
  try {
    const jsonPath = resolve(__dirname, '..', 'src', 'assets', 'openai_prompts.json');
    console.log('尝试访问的JSON文件路径:', jsonPath);
    
    const jsonContent = await readFile(jsonPath, 'utf8');
    const openaiPrompts = JSON.parse(jsonContent);
    
    if (openaiPrompts && openaiPrompts.chatgpt_for_engineering_teams_prompts) {
      console.log(`成功加载JSON文件，包含 ${openaiPrompts.chatgpt_for_engineering_teams_prompts.length} 个提示模板`);
      console.log('测试成功: JSON文件访问正常！');
    } else {
      console.log('测试失败: JSON文件结构不正确');
    }
  } catch (error) {
    console.error('测试失败:', error);
  }
};

runTest();
