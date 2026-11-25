# 英语学习资料库

一个纯静态的英语学习资料站。已部署在 GitHub Pages：

<https://shxlxa.github.io/html/English/>

> 2026-11-25 起，绘本 PDF 与配套音频（合计约 220MB）已从仓库移除，站点只保留课程目录结构。
> 原因：每次 Pages 部署要打包上传 226MB artifact，导致 `deploy-pages` 查不到 artifact 而部署失败。
> 课程清单（标题、封面）仍在，媒体文件需另行托管后再把 `pdf` / `audio` 字段加回 `catalog.json`。

## 功能

- 首页卡片式展示所有资料系列，点击课程直接进入阅读页
- 阅读页使用 PDF.js 渲染 PDF，支持放大、缩小、适应宽度，移动端自适应
- 底部固定音频播放条：播放/暂停、拖动进度、前进/后退 15 秒、0.75x / 1x / 1.25x 倍速
- 自动记住每课的音频播放进度和最近阅读的课程（localStorage）
- 课程目录抽屉，快速切换本系列课程；顶部支持上一课/下一课

## 目录结构

```
English/
├── index.html            # 资料库首页
├── reader.html           # 阅读页（?series=系列id&lesson=课号）
├── assets/
│   ├── style.css         # 全站样式
│   ├── app.js            # 首页逻辑
│   └── reader.js         # 阅读页逻辑（PDF.js + 音频播放器）
├── data/
│   └── catalog.json      # 资料清单（唯一需要维护的数据文件）
└── materials/            # 媒体文件目录（当前为空）
```

## 如何新增一套资料

1. 在 `materials/` 下新建一个目录，用英文短横线命名，例如 `materials/graded-reading-2/`。
2. 在其中建 `pdf/` 和 `audio/` 两个子目录，放入文件并按序号重命名：`01.pdf`、`02.pdf`…、`01.mp3`、`02.mp3`…
   （文件名避免空格和特殊字符，序号补零保证排序正确。）
3. 在 `data/catalog.json` 的 `series` 数组中追加一个条目：

```json
{
  "id": "graded-reading-2",
  "title": "分级阅读第二级",
  "description": "系列简介",
  "cover": "📗",
  "lessons": [
    { "no": 1, "title": "课程标题", "pdf": "materials/graded-reading-2/pdf/01.pdf", "audio": "materials/graded-reading-2/audio/01.mp3" }
  ]
}
```

4. 提交并推送，GitHub Pages 会自动更新，首页会自动多出一张系列卡片，无需改任何代码。

> 某课如果没有 PDF（纯音频），把 `pdf` 字段设为 `null` 即可；PPT 素材可先用 LibreOffice 转成 PDF：
> `/Applications/LibreOffice.app/Contents/MacOS/soffice --headless --convert-to pdf --outdir 输出目录 文件.ppt`

> 注意：媒体文件不要直接提交进本仓库，单个文件超过 100MB 会被 GitHub 拒绝，且会拖垮 Pages 部署；
> 建议放到独立仓库、GitHub Releases 或对象存储，catalog.json 里写绝对 URL。

## 本地预览

在仓库根目录运行任意静态服务器，例如：

```bash
python3 -m http.server 8000
```

然后打开 <http://localhost:8000/English/>（直接双击 HTML 文件无法加载 PDF 和 JSON，必须走 HTTP）。
