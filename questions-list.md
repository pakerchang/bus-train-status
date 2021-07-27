1. 解決 PostMan HMAC 認證問題
   ans: import cURL 指令

2.  當使用者進入頁面設定好縣市及公車路線點擊輸入按鈕後，useEffect 才開始作動
   ans: 使用 click function 處理資料後 在 useEffect 委託資料依賴

3. json 不知道如何根據 key 值抓取所需的資料結構，已能使用 map 單獨抓出想要的 key 值，但台鐵資料內的 timeInfos 是第二層 json 尚不清楚如何取出（可能需要二次處理資料）

4. 串接測試火車時刻表發現 table 有破版問題，同時 HomePage background-color 的顏色並不會跟著 Table 產生的長度向下延伸
   ans: 在 home.css 中加上 overflow-y : scroll; 後解決為延伸問題

5. 該如何調整 Material-UI Table Component CSS 的問題
   ans: 查詢官網後，發現可以調用 CSS API 找到 className 進行設定 ex: .MuiTable-root
