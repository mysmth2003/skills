# OpenClaw 新手帮帮忙

为刚接触 OpenClaw 的新手提供完整指南。

**源码地址：https://github.com/kunyashaw/openclaw-newbie-faq.git**

## 功能截图

### 大模型常识
![大模型常识](./web/assets/index_common_sense.png)

### 常见问题
![常见问题](./web/assets/index_faq.png)

### 命令大全
![命令大全](./web/assets/index_commands.png)

### 调优建议
![调优建议](./web/assets/index_advice.png)

## 功能特性

- **大模型常识**：产业视角、工程视角和OpenClaw架构的 AI 大模型架构图
- **常见问题**：20 个真实问题解答
- **命令大全**：23 个常用命令
- **调优建议**：性能优化配置

## 安装

```bash
npx clawhub install openclaw-newbie-faq
```

## 使用

安装完成后，Web 服务会自动启动。

访问地址：http://localhost:34567

## 快速启动脚本

为了方便使用，可以创建一个启动脚本：

```bash
# macOS/Linux
echo '#!/bin/bash
cd ~/.openclaw/workspace/skills/openclaw-newbie-faq
npm start' > ~/start-openclaw-faq.sh
chmod +x ~/start-openclaw-faq.sh

# 使用
~/start-openclaw-faq.sh
```

## 许可证

MIT
