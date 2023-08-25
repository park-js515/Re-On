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
-- Table structure for table `video`
--

DROP TABLE IF EXISTS `video`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `video` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `create_date` datetime(6) DEFAULT NULL,
  `modify_date` datetime(6) DEFAULT NULL,
  `actor` varchar(255) NOT NULL,
  `script` varchar(255) DEFAULT NULL,
  `stt_script` varchar(255) DEFAULT NULL,
  `thumbnail` varchar(255) NOT NULL,
  `title` varchar(255) NOT NULL,
  `video_path` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `video`
--

LOCK TABLES `video` WRITE;
/*!40000 ALTER TABLE `video` DISABLE KEYS */;
INSERT INTO `video` VALUES (1,'2023-08-14 11:39:02.158981','2023-08-14 11:39:02.158981','홍진식','아 홍진식 트리플 킬','아 혼진시 트리플 킬','12580d17-7e13-4128-b141-8579ed55aea5','롤의 신 홍 진 식','2e72c29b-eda7-46a8-a943-35685f6f8169'),(2,'2023-08-14 11:39:04.278577','2023-08-14 11:39:04.278577','홍진식','아 홍진식 트리플 킬','아 혼진시 트리플 킬','993299e2-4e19-4222-a0ca-fe1705417796','롤의 신 홍 진 식','72ac97bf-2868-4432-a329-7cdec7111feb'),(3,'2023-08-14 11:39:05.605498','2023-08-14 11:39:05.605498','홍진식','아 홍진식 트리플 킬','아 혼진시 트리플 킬','000932c2-9bf6-46e5-af61-5005bf8c347d','롤의 신 홍 진 식','efbf3582-3d78-4e5d-912d-81693c6f3940'),(4,'2023-08-14 11:39:06.861117','2023-08-14 11:39:06.861117','홍진식','아 홍진식 트리플 킬','아 혼진시 트리플 킬','33a31e2e-751c-4e50-a45f-5b396ed338ab','롤의 신 홍 진 식','3376224d-f2fd-4e4e-b63e-5e1ee3f0a003'),(5,'2023-08-14 11:39:21.717534','2023-08-14 11:39:21.717534','홍진식','아 홍진식 트리플 킬','아 혼진시 트리플 킬','83217c19-f22a-450e-a773-30d294b60142','롤의 12신 홍 진 식','d69b7625-7208-4ee1-bd06-74955462e554'),(6,'2023-08-14 11:39:25.334756','2023-08-14 11:39:25.334756','홍진식','아 홍진식 트리플 킬','아 혼진시 트리플 킬','58f1c8c2-9347-4105-9849-553443178479','롤의 12신 21313홍 진 식','f078b7e5-f8bf-42b3-b556-2506dcdd7f46'),(7,'2023-08-14 11:39:29.213944','2023-08-14 11:39:29.213944','홍진식','아 홍진식 트리플 킬','아 혼진시 트리플 킬','51a4d037-60d5-4db3-b113-d69b84f8edfb','롤123123의 12신 21313홍 진 식','df5c4524-4006-490d-be18-7a8f91c9eda0'),(8,'2023-08-14 11:39:34.235720','2023-08-14 11:39:34.235720','홍진식','아 홍@@@진식 트리플 킬','아 혼진시 트리플 킬','9650ce78-c92a-465c-9068-6067d7a0687f','롤123123의 12신 21313홍 진 식','793c55af-a579-4a19-a10b-b7b8bd61f19a'),(9,'2023-08-17 12:03:03.266757','2023-08-17 12:03:03.266757','12홍진식','아 홍@@@12진식 트리플 킬','아 혼진12시 트리플 킬','b9c43f01-528f-40fd-943b-10cd4938c082','롤123112312323의 12신 21313홍 진 식','fe81d4f0-f361-4760-9d27-71164c287b63'),(10,'2023-08-17 13:44:10.567362','2023-08-17 13:44:10.567362','이병헌','내 나라 내 백성이 열갑절 백갑절은 더 소중하오','내 나라 내 백성이 열갑절 백갑절은 더 소중하오','2f61b048-afb0-48e8-a3a3-10aaf2c667e7','광해','2d03cde2-4973-4fda-a3f0-0525c7c2bde5');
/*!40000 ALTER TABLE `video` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-08-18 12:09:14
