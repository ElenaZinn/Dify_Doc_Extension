# Dify Knowledge Base Chrome Extension

这是一个 Chrome 浏览器扩展，可以帮助用户将当前网页内容保存到 Dify 知识库中。

## 功能特点

- 苹果风格的用户界面
- 保存 API Token 和知识库 ID 的设置
- 一键清除保存的设置
- 将当前网页内容导入到 Dify 知识库

## 安装说明

1. 打开 Chrome 浏览器，访问 `chrome://extensions/`
2. 开启右上角的"开发者模式"
3. 点击"加载已解压的扩展程序"
4. 选择本插件所在的文件夹

## 使用方法

1. 点击 Chrome 工具栏中的插件图标
2. 在弹出窗口中输入：
   - Dify API Token
   - 知识库 ID（dataset_id）
3. 设置会自动保存
4. 在想要保存的网页上点击"Save Content"按钮
5. 如果需要清除保存的设置，点击"Clear Settings"按钮

## 注意事项

- 确保 Dify 服务器在本地运行（默认端口 80）
- API Token 和知识库 ID 都是必填项
- 保存的内容包括网页标题和正文

## 技术说明

- 使用 Chrome Extension Manifest V3
- 使用 Chrome Storage API 保存设置
- 使用 Chrome Scripting API 获取页面内容
- 使用 Fetch API 发送数据到 Dify 服务器

## API 文档

详细的 API 文档可以在这里找到：
https://docs.dify.ai/guides/knowledge-base/knowledge-and-documents-maintenance/maintain-dataset-via-api 