-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: reon_local
-- ------------------------------------------------------
-- Server version	8.0.33

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `member`
--

DROP TABLE IF EXISTS `member`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `member` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `create_date` datetime(6) DEFAULT NULL,
  `modify_date` datetime(6) DEFAULT NULL,
  `birthday` varchar(255) NOT NULL,
  `code` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `gender` varchar(255) NOT NULL,
  `game_cnt` int NOT NULL DEFAULT '0',
  `lose` int NOT NULL DEFAULT '0',
  `score` int NOT NULL DEFAULT '0',
  `tier` varchar(255) DEFAULT NULL,
  `win` int NOT NULL DEFAULT '0',
  `banned` int NOT NULL,
  `deleted` int NOT NULL,
  `introduce` varchar(150) DEFAULT NULL,
  `nick_name` varchar(16) NOT NULL,
  `profile_img` varchar(255) DEFAULT NULL,
  `reported` int NOT NULL,
  `name` varchar(255) NOT NULL,
  `refresh_token` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK_4khba0d7ikbnm1uilh1po0u0c` (`code`),
  UNIQUE KEY `UK_mbmcqelty0fbrvxp1q58dn57t` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `member`
--

LOCK TABLES `member` WRITE;
/*!40000 ALTER TABLE `member` DISABLE KEYS */;
INSERT INTO `member` VALUES (1,'2023-08-14 16:33:28.725259','2023-08-17 11:28:29.936813','02-15','t84YUoYQQtUai8yTgEmonLkp6JCOuKikntPfe7P8tIo','wlstlr159357','M',0,0,0,'BRONZE',0,0,0,NULL,'콩진딕','f5ee8869-f357-4dd5-82de-5e92a6d11d82',0,'홍진식','eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxIiwiYXV0aCI6InVzZXIiLCJleHAiOjE2OTI4NDQxMDl9.b2J5JwZM5LbLTunOWqbQaItjAQMGh0edqIWDMVaFRQgHzN28gEum8ohILgNtog6kZ8Oh6hAOfDm5ieFp_LxqRA'),(2,'2023-08-14 16:44:17.259546','2023-08-14 16:44:17.262560','02-15','8ukpDK6IWhWWpuA6KSqDHKp4NIUZqOrdAUlnxubvNWQ','wlstlr357159','M',0,0,0,'BRONZE',0,0,0,NULL,'wls',NULL,0,'홍진식','eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIyIiwiYXV0aCI6InVzZXIiLCJleHAiOjE2OTI2MDM4NTd9.vFCA02__dhFKUZbkjKc9Uce6F8tgl7ZzmIuO1pQkEm_4OVYOoKuKaiHcRYenGzxbmoLKizjhw5aCjF4s5SKsQA');
/*!40000 ALTER TABLE `member` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-08-18 12:09:10
