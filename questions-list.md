1. 解決HMAC認證機制問題 (Postman)
    ans: import cURL指令
2. 當使用者進入頁面設定好縣市及公車路線點擊輸入按鈕後，useEffect才開始作動
    ans: 使用click function 處理資料後 在useEffect 委託資料依賴

3. json 不知道如何根據key值抓取所需的資料結構，已能使用map單獨抓出想要的key值，但台鐵資料內的timeInfos是第二層json 尚不清楚如何取出（可能需要二次map資料）



/v2/Rail/TRA/LiveBoard/Station/{StationID}
取得指定[車站]列車即時到離站電子看板(動態前後30分鐘的車次)