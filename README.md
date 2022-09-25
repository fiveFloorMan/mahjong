# mahjong

### 如果常常找客戶/好友一起來家裡打麻將，那這個專案將幫助你更好管理客戶時間，以及增加與客戶的黏濁度。

## 內容
* 一般會員視角
  * 了解全部牌友會員的**排名(rank)**
  * 查找自己以及其他會員的**個人總成績(score)**
  * **預約**場地開放的日期
  * **註冊**新會員
 
* 管理員視角(後台)
  * 為了怕一般會員誤闖後台，使用後台時要限定帳密&自行輸入URI !!
  * **編輯/刪除**每一筆的會員遊戲紀錄 `http://localhost:3000/admin/edit`
  * **新增**會員遊戲紀錄 `http://localhost:3000/admin/addRecord`
  * 開放可以預約場地的日期, 編輯時間、日期和參賽會員 `http://localhost:3000/admin/openGameReserve`
  
## 適合下載的人
* 你想要用打麻將的方式經營客戶關係
  * 透過紀錄遊戲結果的方式**產生與客戶的新話題**,同時提升**下次再戰**的慾望. (就像有了全聯會員, 就會更願意去全聯消費)
  * 透過預約系統來**輕鬆管理大量客戶的行程**. 
  * 當然, 如果你是麻將場場主也推薦使用. (不過聚賭是會觸法的喔, 如果你被抓了不關我的事喔)
  
## 如何使用

1. 安裝node.js & npm 
2. 將專案clone到local 
    ```
    git clone https://github.com/fiveFloorMan/mahjong.git
    ```
3. 安裝相關套件
    ```
    npm install connect-flash@0.1.1 dotenv@8.2.0 express@4.18.1 express-handlebars@3.0.0 express-session@1.17.1 method-override@3.0.0 mongoose@5.9.7 passport"@0.4.1 passport-local@1.0.0
    ```
4. 安裝完畢, 輸入以下指令, 運行專案 
    ```
    npm run dev
    ```
5. 出現以下網址代表運行順利 
    ```
    Running on localhost:3000
    ```
6. 建立種子資料, 依序是**遊戲紀錄**、**會員資料**和**預約**資料. (每一個資料跑完請按^C結束)
    ```
    npm run seederOne
    ```
    ```
    npm run seederTwo
    ```
    ```
    npm run seederThree
    ```
    **會員種子資料簡歷**
    | player name | password | 管理員帳密 |
    | :----------:|:--------:|:---------:|
    | admin01     |admin01   |是管理員帳密|
    | test1       | test1    |false      |
    | test2       | test2    |false      |
    | test3       | test3    |false      |
    | test4       | test4    |false      |
## 開發工具
* connect-flash@0.1.1
* dotenv@8.2.0
* express@4.18.1
* express-handlebars@3.0.0
* express-session@1.17.1
* method-override@3.0.0
* mongoose@5.9.7
* passport"@0.4.1
* passport-local@1.0.0
