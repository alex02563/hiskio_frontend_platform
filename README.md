# hiskio_frontend_platform 徵才測驗
#### -hiskio 購物車情境 demo-
## Image
[Image Resource](https://hiskio.com) by hiskio

## Tech 
- Nuxt.js 架構
- Router 路由配置
  * 首頁- /
  * 購物車頁 /carts
- TailwindCss 美觀
- Vue-toasted 提示
- Axios 抽象
- Js-cookie

## Features
- 登入機制
    * 為了模擬Auth延長時效獲取新token的機制，所以緩存 ~~明碼~~ 在Cookie上撈取(很醜但臨時想不到更好的調法QQ)
    * 加入購物車功能
- 首頁
    * 供正在募資中的課程列表資訊
- 購物車頁-須先進行登入才可進入此頁
    * 返回導址 - /
    * 供購物車列表資訊呈現
    * 供結帳小記顯示金額、折抵價錢
    * 供正在募資中的課程列表資訊
    * 加入購物車功能
    * 供刪除購物車功能、列表及小計都會響應變化
- 購物車列表 Cookie 緩存
    * 不管有無有登入，只要按下加入都會先緩存在Cookie上，登入時進入購物車頁會再跟自己的清單合併刷新 Cookie
- Loading Page
- 404 Router 攔截
- Meta tag og
## Installation
Dillinger requires [Node.js](https://nodejs.org/) v10+ to run.
Install the dependencies and devDependencies and start the server.

```sh
cd hiskio_frontend_platform
yarn install
yarn run dev
```
