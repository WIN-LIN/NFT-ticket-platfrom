-- MySQL dump 10.13  Distrib 8.0.30, for macos12.5 (arm64)
--
-- Host: localhost    Database: TICKET_PLATFORM
-- ------------------------------------------------------
-- Server version	8.0.30

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `event`
--

DROP TABLE IF EXISTS `event`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `event` (
  `name` varchar(100) DEFAULT NULL,
  `ID` int NOT NULL AUTO_INCREMENT,
  `ticket_address` varchar(100) DEFAULT NULL,
  `market_address` varchar(100) DEFAULT NULL,
  `cover_img` varchar(100) DEFAULT NULL,
  `place` varchar(100) DEFAULT NULL,
  `information` varchar(5000) DEFAULT NULL,
  `host` varchar(100) DEFAULT NULL,
  `start_time` bigint DEFAULT NULL,
  `end_time` bigint DEFAULT NULL,
  `refund_time` bigint DEFAULT NULL,
  `ticket_price` float DEFAULT NULL,
  `refund_rate` int DEFAULT NULL,
  `royalty_rate` int DEFAULT NULL,
  `event_symbol` varchar(10) DEFAULT NULL,
  `ticket_total` int DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `event`
--

LOCK TABLES `event` WRITE;
/*!40000 ALTER TABLE `event` DISABLE KEYS */;
INSERT INTO `event` VALUES ('芝新朋友',12,'0x380004B4DffDd2e0cD79C0A2782022491D0571AC','0x1c91BdfD08128b8795a36974683f2dda95Fb0160','芝新朋友/47a3ed78.png','台灣新北市幸福咖啡站','<p><br><strong>■ 午會地點｜</strong>幸福咖啡站<br>&nbsp; &nbsp;(新北市三芝區福德里土地公埔5鄰42之1號)<br>（報名成功後，3日內會收到一份<strong>特別行動邀請函</strong>，請在四下無人時偷偷檢查Email信箱。） &nbsp; &nbsp;</p><p><strong>■ 參與資格｜</strong><br>．18~28歲的人<br>．28~38歲的人<br>．38~48歲的人<br>．18~48歲覺得我們廢話很多的人</p><p><br><strong>■ 準備事項｜</strong></p><p>請帶一個無價的創意手作（可以是一幅畫、手工餅乾、阿嬤田裡偷拔的筊白筍等），如果覺得自己手殘生不出來，就準備200元以內的小禮物。</p><p>&nbsp;</p><p><strong>■ 其他小小資訊｜</strong></p><p>．人數：限定10人，12/20(二)報名截止或額滿為止。</p><p>．費用：每人300元（12/15(四)前早鳥勇氣價240元、害羞要有人陪兩人同行價500元）。現場提供飲品和小點心。</p><p>．本活動報名後不可退費，可以找人替補或保留至下一場參加。</p><p>．活動過程將進行拍照，報名即視同同意主辦單位將影像於推廣使用。如果你真的不想被拍照，請事先讓我們知道。</p>','0x14ce172046979510C7CAaeC116c18967366bc77b',1672120800,1672214400,1672070400,0.01,50,50,'GOOD',30),('【內湖草莓季－1月場】',13,'0xc664ED437D021564F7174076Df85246414BFaC83','0xd592c9B9B594991051b738210A364471d0da3f57','【內湖草莓季－1月場】東林草莓農場 －採草莓 + 手作天然草莓果醬 + 農場午餐/3531b17e.png',' 台灣台北市內湖區碧山路43-18號','<p><strong>2023&nbsp;假日樂活趣！</strong></p><p><strong>🍓 東林草莓農場－採草莓+手作天然草莓果醬 🍓</strong></p><p><strong>誰說採草莓只能去大湖呢？🍓</strong></p><p><strong>冬季限定，城市裡採草莓+手作天然草莓果醬！</strong></p><p><img src=\"https://static.accupass.com/eventintro/1912160311137424637320.jpg\" alt=\"\"></p><p><strong>【 東林草莓農場&nbsp;x 採草莓+手作天然草莓果醬】</strong></p><p><strong>新鮮無毒農草莓，讓你自己摘也自己吃</strong></p><p><strong>在東林這座群山環抱、林木參天的世外桃源，全家大小都能一同探索生態的奇妙</strong></p><p><strong>除了能夠親自體驗摘下草莓的樂趣外，你還能夠帶走價值200元的草莓禮盒</strong></p><p><strong>當天也有草莓果醬DIY的活動。天然無添加的草莓手工果醬，親手熬煮最放心</strong></p><p><strong>貼心的園長還會準備豐盛的農場午餐＆草莓奶酪，讓你真正體驗別於都市的慢活！</strong></p><p><img src=\"https://static.accupass.com/eventintro/2112140836565890212020.jpg\"></p><p><strong>+ 活動流程 +</strong></p><figure class=\"table\"><table><tbody><tr><td><strong>時間</strong></td><td><strong>行程</strong></td><td><strong>備註</strong></td></tr><tr><td><strong>09:30</strong></td><td><strong>東林草莓園入口集合</strong></td><td><strong>9:30準時集合喔~</strong></td></tr><tr><td><strong>09:30-10:00</strong></td><td><strong>園區介紹</strong></td><td><strong>東林農園簡介+草莓生態+食農教育分享</strong></td></tr><tr><td><strong>10:00-10:40</strong></td><td><strong>參觀園區 + 現採草莓(200元禮盒)</strong></td><td><strong>採草莓的價格若超過200元，需現場額外支付；</strong><br><strong>若不滿200元，以200元為準，恕不退費</strong></td></tr><tr><td><strong>10:40-11:20</strong></td><td><strong>草莓果醬DIY</strong></td><td><strong>製作草莓果醬時間，可能會和採草莓時間調換，行程安排依當日為主</strong></td></tr><tr><td><strong>11:20-12:00</strong></td><td><strong>山水農食</strong></td><td><strong>午餐時間，園區提供餐點，料理照片為示意圖，</strong><br><strong>詳細內容為當季當日為主，含甜點草莓奶酪一份</strong></td></tr><tr><td><strong>12:30</strong></td><td><strong>快樂賦歸</strong></td><td><strong>收拾您的行囊，記得要帶走自己做的果醬和採收的草莓喔！</strong></td></tr></tbody></table></figure><p><strong>每張票券$699，皆含一人份200元草莓禮盒、採草莓體驗、草莓果醬水果及其材料費、製作協助，以及農場精緻午餐及甜點草莓奶酪。</strong></p><p><strong>★ 貼心提醒：</strong></p><p><strong>最低1人成團，滿團人數40人</strong><br><strong>若有攜帶3歲(含)以下孩童需求，會於現場酌收50元清潔費用！</strong><br><strong>(1位成人至多攜帶1名幼童)</strong></p><p><strong>-內湖東林草莓園-</strong></p><p><strong><img src=\"https://static.accupass.com/userupload/b88689479933484698dca16939db8c13.jpg\" alt=\"\"></strong></p><figure class=\"table\"><table><tbody><tr><td><strong>內湖草莓東林農園位在台北市內湖區「白石湖休閒農業特區」，地理環境絕佳，一年四季作物都繁茂生長。 在群山環繞的園區裡，不僅可享受悠閒的食農時光，還能遠眺著名的「龍船岩」，優美景色讓人不敢置信自己身處繁榮的台北市。 以無毒有機施作草莓及夏季蔬果，是個親子假日休閒、體驗食農教育的好所在。！</strong></td></tr></tbody></table></figure><p><br><strong>【&nbsp; 注意事項&nbsp; 】</strong></p><p><strong>1.如有三歲以下幼兒（含三歲）同行，需於現場酌收50元清潔費；其餘大人、兒童皆須購買票券！(3歲以上孩童皆須購買單人票)</strong></p><p><strong>2.農場提供素食餐點，請於報名表中註記。</strong></p><p><strong>3.最低1人成團，滿團人數40人，若不足人數無法開團，將由主辦自行協助處理。</strong></p><p><strong>4. 由於此活動報名人數眾多，恕不提供由主辦單位協助更換場次，如需換場，請先做退費，再購買喔！</strong></p><p><strong>5.愛地球，減垃圾，東林農場響應環保，請自備環保碗筷來園區用餐喔 !</strong></p><p><strong>【東林草莓園】</strong></p><p><strong>營業時間：假日開團&nbsp;&nbsp;&nbsp;園區地址：地址：台北市內湖區碧山路43-18號</strong></p><p><strong>&nbsp; 東林草莓園 X 採草莓+手作天然草莓果醬＆草莓奶酪&nbsp; &nbsp;&nbsp;</strong></p><p><strong>🍓 限量甜蜜草莓&nbsp;x 2023&nbsp;冬季首發團&nbsp;🍓&nbsp;&nbsp;</strong></p>','0x14ce172046979510C7CAaeC116c18967366bc77b',1672545600,1673712000,1672459200,0.01,10,80,'STRAWBERRY',20),('BABY SHARK 放電趴',14,'0xF1Ff7e4014B94e4503a2F56e6E0a4530ea5c3b41','0xa305bf3a6177070bd874c869c213D640248377c8','BABY SHARK 放電趴/58b54882.png',' 台灣台北市中正區八德路一段1號','<p><img src=\"https://static.accupass.com/eventintro/2211301114521141286731.jpg\" alt=\"\"></p><p><img src=\"https://static.accupass.com/eventintro/2210260547161531740124.jpg\" alt=\"\"></p><p>&nbsp;</p><p><br><strong>「Baby Shark, doo doo doo doo doo doo ……」鯊魚寶寶迷們準備好來朝聖了嗎？</strong></p><p><strong>今年年底， INCEPTION 啟藝帶著碰碰狐和鯊魚寶寶來跟全台灣的小朋友們、大家見面啦！YouTube 點閱破 100 億，有史以來最多觀看次數紀錄，空降美國告示牌排行榜，就連周杰倫、郭富城、BLACKPINK、BTS 和席琳狄翁等大明星都在唱的洗腦兒歌，擋不住的魅力，只要聽一次就會唱，前奏一下就會跳，輕快的旋律搭配簡單的手勢，讓你想忘也忘不掉，兒童界超人氣巨星鯊魚寶寶即將在華山 1914 文創園區，邀請大小朋友來到海底世界一起開派對囉～</strong></p><p>&nbsp;</p><p><strong>It\'s PARTY TIME !!!!!!</strong></p><p><strong>海底派對初體驗，在鯊魚寶寶的房間裡開派對當然不夠！碰碰狐和鯊魚寶寶帶著大家穿越海底隧道，來到鯊魚一家人的秘密基地，哇！！五彩繽紛的燈光加上歡樂的《Baby Shark》舞曲，搖身一變成派對現場～全場焦點就是你！來場活力四射的音樂派對，舞台區設置大型LED 螢幕，讓小朋友跟著 MV 唱唱跳跳，還能和碰碰狐跟鯊魚寶寶面對面跳舞狂歡放電，在珊瑚礁裡和碰碰狐玩捉迷藏，坐上鯊魚寶寶在繽紛的深海中探險，展場內還有巨大的鯊魚爸爸溜滑梯和多種海洋生物等你來認識，讓小寶貝們打造自己的海底世界，再加上史上最多樣的鯊魚寶寶周邊商品，限量的獨家周邊絕對要收藏，打造兒童界最 SHARK 趴的派對，不僅能在派對裡徹底放電，還能實現小朋友心中的夢想！</strong></p><p>&nbsp;</p><p><strong>《 BABY SHARK 放電趴 》六大玩法最 SHARK 趴&nbsp;</strong></p><p><img src=\"https://static.accupass.com/eventintro/2210260549094688361310.jpg\" alt=\"\"></p><p><strong>⚡️必玩第 1 站：碰碰狐和鯊魚寶寶驚喜現身</strong></p><p><strong>派對怎麼能少了主角呢？碰碰狐和鯊魚寶寶走出螢幕，近距離帶著小朋友們唱唱跳跳，面對面狂歡。</strong></p><p>&nbsp;</p><p><strong>⚡️&nbsp;必玩第 2&nbsp;站：和鯊魚寶寶一起加速放電</strong></p><p><strong>坐上鯊魚寶寶，隨著音樂速度穿梭珊瑚群當中，探索繽紛的海底世界！</strong></p><p><img src=\"https://static.accupass.com/eventintro/2210260549501171796875.jpg\" alt=\"\"></p><p><strong>⚡️ 必玩第 3&nbsp;站：派對就是要拍照打卡！</strong></p><p><strong>擺出萌度破表的創意 Pose ！和碰碰狐及鯊魚家族一起拍出最可愛、最 ㄎㄧㄤ 的派對合照～</strong></p><p>&nbsp;</p><p><strong>⚡️&nbsp;必玩第 4&nbsp;站：首次引進跳跳鯊魚</strong></p><p><strong>跳！跳！跳！和鯊魚家族一起嗨翻海底，隨著派對的音樂節奏上下彈跳，要抓緊鯊魚寶寶免得跌倒哦！</strong></p><p>&nbsp;</p><p><img src=\"https://static.accupass.com/eventintro/2210260550171994154284.jpg\" alt=\"\"></p><p><strong>⚡️&nbsp;必玩第 5&nbsp;站：巨型鯊魚爸爸帶你暢游海底</strong></p><p><strong>開心的鯊魚爸爸和大家一起狂歡，爬上他 3 公尺高的背鰭，一路滑下，好玩又刺激。</strong></p><p>&nbsp;</p><p><strong>⚡️&nbsp;必玩第 6&nbsp;站：海底捉迷藏</strong></p><p><strong>派對到一半，碰碰狐突然不見了！躲在哪裡呢？趕快在珊瑚礁裡找出碰碰狐，但要小心不要在海底迷路囉～</strong></p><p>&nbsp;</p><p><strong>今年寒假來 SHARK 趴，才夠蝦趴！</strong></p><p><img src=\"https://static.accupass.com/eventintro/2211301115181694308858.jpg\" alt=\"\"></p><p><strong>更多不可錯過的展覽資訊，請追蹤官方粉絲團：</strong><a href=\"https://www.facebook.com/BABYSHARK.PARTY/\"><strong>https://www.facebook.com/BABYSHARK.PARTY/</strong></a></p><p><strong>【 BABY SHARK 放電趴 】</strong><br><strong>▩ 展出期間：2022 / 12 / 31 ( 六 ) - 2023 / 4 / 5 ( 三 )&nbsp;</strong><br><strong>▩ 展覽地點：華山 1914 文創園區東 2C</strong><br><strong>▩ 開放時間：10 : 00 - 18 : 00</strong><br><strong>▩ 展覽 Facebook 粉絲團：</strong><a href=\"https://www.facebook.com/BABYSHARK.PARTY/\"><strong>https://www.facebook.com/BABYSHARK.PARTY/</strong></a><br><strong>▩ 展覽 Instagram：</strong><a href=\"https://instagram.com/babyshark.party\"><strong>https://instagram.com/babyshark.party</strong></a><br><strong>▩ 主辦單位：INCEPTION 啟藝</strong><br><strong>▩ 策展單位：INCEPTION 啟藝</strong><br><strong>▩ 授權單位：The Pinkfong Company、好園地股份有限公司</strong></p>','0x14ce172046979510C7CAaeC116c18967366bc77b',1672459200,1680667200,1677643200,0.001,49,30,'BABY SHARK',10);
/*!40000 ALTER TABLE `event` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ticket`
--

DROP TABLE IF EXISTS `ticket`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ticket` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `event_id` int DEFAULT NULL,
  `use` int DEFAULT NULL,
  `last_use_time` timestamp NULL DEFAULT NULL,
  `on_sale` tinyint(1) DEFAULT NULL,
  `selling_price` float DEFAULT NULL,
  `token_id` int DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `ticket_event_null_fk` (`event_id`),
  CONSTRAINT `ticket_event_null_fk` FOREIGN KEY (`event_id`) REFERENCES `event` (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=88 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ticket`
--

LOCK TABLES `ticket` WRITE;
/*!40000 ALTER TABLE `ticket` DISABLE KEYS */;
INSERT INTO `ticket` VALUES (28,12,0,NULL,1,0.001,1),(29,12,0,NULL,1,0.001,2),(30,12,0,NULL,1,0.001,3),(31,12,0,NULL,1,0.001,4),(32,12,0,NULL,1,0.001,5),(33,12,0,NULL,1,0.001,6),(34,12,0,NULL,1,0.001,7),(35,12,0,NULL,1,0.001,8),(36,12,0,NULL,1,0.001,9),(37,12,0,NULL,1,0.001,10),(38,12,0,NULL,1,0.01,11),(39,12,0,NULL,1,0.01,12),(40,12,0,NULL,1,0.01,13),(41,12,0,NULL,1,0.01,14),(42,12,0,NULL,1,0.01,15),(43,12,0,NULL,1,0.01,16),(44,12,0,NULL,1,0.01,17),(45,12,0,NULL,1,0.01,18),(46,12,0,NULL,1,0.01,19),(47,12,0,NULL,1,0.01,20),(48,12,0,NULL,1,0.01,21),(49,12,0,NULL,1,0.01,22),(50,12,0,NULL,1,0.01,23),(51,12,0,NULL,1,0.01,24),(52,12,0,NULL,1,0.01,25),(53,12,0,NULL,1,0.01,26),(54,12,0,NULL,1,0.01,27),(55,12,0,NULL,1,0.01,28),(56,12,0,NULL,1,0.01,29),(57,12,0,NULL,1,0.01,30),(58,13,0,NULL,1,0.001,1),(59,13,0,NULL,1,0.001,2),(60,13,0,NULL,1,0.001,3),(61,13,0,NULL,1,0.001,4),(62,13,0,NULL,1,0.001,5),(63,13,0,NULL,1,0.001,6),(64,13,0,NULL,1,0.001,7),(65,13,0,NULL,1,0.001,8),(66,13,0,NULL,1,0.001,9),(67,13,0,NULL,1,0.001,10),(68,13,0,NULL,1,0.01,11),(69,13,0,NULL,1,0.01,12),(70,13,0,NULL,1,0.01,13),(71,13,0,NULL,1,0.01,14),(72,13,0,NULL,1,0.01,15),(73,13,0,NULL,1,0.01,16),(74,13,0,NULL,1,0.01,17),(75,13,0,NULL,1,0.01,18),(76,13,0,NULL,1,0.01,19),(77,13,0,NULL,1,0.01,20),(78,14,0,NULL,0,0.001,1),(79,14,0,NULL,0,0.001,2),(80,14,0,NULL,1,0.001,3),(81,14,0,NULL,1,0.001,4),(82,14,0,NULL,1,0.001,5),(83,14,0,NULL,1,0.001,6),(84,14,0,NULL,1,0.001,7),(85,14,0,NULL,1,0.001,8),(86,14,0,NULL,1,0.001,9),(87,14,0,NULL,1,0.001,10);
/*!40000 ALTER TABLE `ticket` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-12-25 15:35:41
