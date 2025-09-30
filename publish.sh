#!/bin/bash

# 确保脚本在遇到错误时退出
set -e

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

# 显示帮助信息
show_help() {
  echo "${GREEN}LLM Core 模块发布脚本${NC}"
  echo ""
  echo "用法: ./publish.sh [选项]"
  echo ""
  echo "选项: "
  echo "  --help, -h      显示帮助信息"
  echo "  --patch, -p     增加补丁版本号 (x.y.Z)"
  echo "  --minor, -m     增加小版本号 (x.Y.z)"
  echo "  --major, -M     增加主版本号 (X.y.z)"
  echo "  --dry-run, -d   仅模拟发布过程，不实际发布"
  echo "  --tag, -t       指定发布标签（默认为 latest）"
  echo ""
}

# 默认参数
VERSION_BUMP="patch"
DRY_RUN=false
TAG="latest"

# 解析命令行参数
while [[ $# -gt 0 ]]; do
  case $1 in
    --help|-h)
      show_help
      exit 0
      ;;
    --patch|-p)
      VERSION_BUMP="patch"
      shift
      ;;
    --minor|-m)
      VERSION_BUMP="minor"
      shift
      ;;
    --major|-M)
      VERSION_BUMP="major"
      shift
      ;;
    --dry-run|-d)
      DRY_RUN=true
      shift
      ;;
    --tag|-t)
      if [ -n "$2" ]; then
        TAG="$2"
        shift 2
      else
        echo "${RED}错误: --tag 选项需要一个参数${NC}"
        show_help
        exit 1
      fi
      ;;
    *)
      echo "${RED}未知选项: $1${NC}"
      show_help
      exit 1
      ;;
  esac
done

# 确保 TAG 有值
if [ -z "$TAG" ]; then
  TAG="latest"
fi

# 打印开始信息
echo "${GREEN}开始准备 llm-core 模块发布...${NC}"

# 检查是否在正确的目录
if [ ! -f "package.json" ]; then
  echo "${RED}错误: 请在 llm-core 目录下运行此脚本${NC}"
  exit 1
fi

# 清理并安装依赖
if [ "$DRY_RUN" = false ]; then
  echo "${YELLOW}清理 node_modules 并安装依赖...${NC}"
  rm -rf node_modules
  cnpm install
else
  echo "${YELLOW}[模拟] 清理 node_modules 并安装依赖...${NC}"
fi

# 构建项目
if [ "$DRY_RUN" = false ]; then
  echo "${YELLOW}构建项目...${NC}"
  cnpm run build
  if [ ! -d "dist" ] || [ -z "$(ls -A dist)" ]; then
    echo "${RED}构建失败: dist 目录不存在或为空${NC}"
    exit 1
  fi
else
  echo "${YELLOW}[模拟] 构建项目...${NC}"
fi

# 增加版本号
if [ "$DRY_RUN" = false ]; then
  echo "${YELLOW}增加 $VERSION_BUMP 版本号...${NC}"
  cnpm version $VERSION_BUMP --no-git-tag-version
  # 获取新版本号
  NEW_VERSION=$(node -p "require('./package.json').version")
  echo "新版本号: $NEW_VERSION"
  
  # Git提交和推送 - 自动处理所有修改和未跟踪文件
  echo "${YELLOW}Git 提交和推送...${NC}"
  git add .
  git commit -m "Bump version to $NEW_VERSION"
  git push origin HEAD
  
  # 创建并推送标签
  GIT_TAG="llm-core-v$NEW_VERSION"
  git tag $GIT_TAG
  git push origin $GIT_TAG
else
  echo "${YELLOW}[模拟] 增加 $VERSION_BUMP 版本号...${NC}"
  CURRENT_VERSION=$(node -p "require('./package.json').version")
  echo "当前版本: $CURRENT_VERSION"
  echo "${YELLOW}[模拟] Git 提交和推送...${NC}"
  echo "${YELLOW}[模拟] 创建并推送标签: llm-core-v$CURRENT_VERSION${NC}"
fi

# 提示用户GitHub Actions将处理发布
echo "${GREEN}版本管理完成！${NC}"
echo "${YELLOW}GitHub Actions将自动处理发布过程${NC}"

echo "${GREEN}llm-core 模块发布准备已完成${NC}"