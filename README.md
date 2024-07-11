启动项目
```
npm i
npm run dev
```

然后在浏览器以 http://localhost:8080 访问 前端页面
请下载 splashtop ssw extension，并解压，放到根目录，重命名为 ```ext```。
1. 在url 输入 url
2. 如果需要启用 headless chrome，请勾选 Is headless
点击 submit，则会 launch 一个puppeteer，并打开输入的 url。·


如果要以坐标的形式点击puppeteer页面，请在 前端页面 输入x，y轴坐标，然后单击 page click, 则会在puppeteer 页面点击。
