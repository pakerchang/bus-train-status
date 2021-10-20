## 整合台鐵與公車每日時刻表查詢

原始發想是為了轉職所做的整合火車及公車預定時刻表，目前在公車部分卡關，先將火車部分整理上線，後續慢慢完善

- [火車時刻查詢](https://train-bus-status.netlify.app/)

- [台南、岡山、楠梓，新左營車站點即時狀態](https://train-bus-status.netlify.app/LiveStation)
> 做給朋友用的 side project

- [公車屍體](https://train-bus-status.netlify.app/Bus)

---

## 使用套件

- [React(CRA)](https://create-react-app.dev/)
- [React Router DOM](https://reactrouter.com/web/guides/quick-start)
- [Material-UI Version 4](https://v4.mui.com/)
- [date-fns](https://github.com/date-fns/date-fns)
- API 串接使用:
  - [PTX 公眾運輸平台](https://ptx.transportdata.tw/PTX/)
  - [Axios](https://github.com/axios/axios)
- 登入:
  - [React-Google-Login](https://github.com/anthonyjgrove/react-google-login)
  - [React-Facebook-Login](https://github.com/keppelen/react-facebook-login)
- Deploy:
  - [Netlify](https://www.netlify.com/)

---

## Task Board:

### Project

Project Description

2021-7-28 第一次紀錄

### Todo

- [ ] 火車時間列表 UI 重構

### In Progress

- [ ] add google login

### Done ✓

- [x] live station 時間正則
- [x] 新增 menu 欄位
- [x] 編寫 icon 伴隨車種資料改變顏色邏輯
- [x] 空陣列時，頁面顯示
- [x] 回到頂部 Button
- [x] 編寫 API 回傳空陣列時的防呆機制
- [x] 公車資料解構
- [x] 串接公車 api
- [x] 處理公車動態資料 status 429 問題
- [x] 修改車種顯示方式
- [x] 火車時間排序
- [x] 台鐵車次資料二次解構
- [x] 解決問題集中的第三題
- [x] 串接台鐵火車 api
- [x] build request api
- [x] 測試 input 到 trainList component 的 props 接收並確認 request 網址產出正確
- [x] 解決複數 api 端口請求的 request 函式
- [x] 實作查詢所需的 input key in 功能
- [x] Material-UI Table 調整 css
