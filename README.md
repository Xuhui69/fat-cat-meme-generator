# Coze API 测试工具

这是一个简单的网页工具，用于测试 Coze API 的流式响应功能。

## 功能特点

- 简洁的用户界面
- 支持流式响应显示
- 实时展示 API 返回内容

## 使用方法

1. 直接在浏览器中打开 `index.html` 文件
2. 在文本框中输入您想要发送的消息
3. 点击"发送消息"按钮
4. 在下方的响应区域中查看 API 返回的实时响应

## 文件说明

- `index.html`: 前端界面
- `script.js`: JavaScript 实现逻辑

## 注意事项

- API 密钥已经在代码中配置
- 确保网络连接正常
- API 返回的是流式数据，会实时显示在页面上

## 技术说明

该工具使用了以下技术：
- Fetch API 用于发送请求
- ReadableStream 用于处理流式响应
- 纯 JavaScript 实现，无需额外依赖

# 肥猫表情包生成器

一个简单易用的在线表情包生成工具，采用苹果风格设计。

## 功能特点

- 🎨 简约现代的界面设计
- 🚀 快速生成表情包
- 📱 支持移动端访问
- 💾 一键下载生成的表情
- 🏷️ 丰富的情绪标签选择

## 在线使用

访问：[肥猫表情包生成器](https://[你的GitHub用户名].github.io/fat-cat-meme-generator/)

## 本地运行

1. 克隆项目
```bash
git clone https://github.com/[你的GitHub用户名]/fat-cat-meme-generator.git
```

2. 打开项目文件夹
```bash
cd fat-cat-meme-generator
```

3. 使用任意 HTTP 服务器运行（例如 Python 的 SimpleHTTPServer）
```bash
python -m http.server 8000
```

4. 在浏览器中访问 `http://localhost:8000`

## 技术栈

- HTML5
- CSS3
- JavaScript
- SVG
- Coze API

## 贡献

欢迎提交 Issue 和 Pull Request！

## 许可证

MIT License
