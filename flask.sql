-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: May 04, 2022 at 08:50 AM
-- Server version: 5.7.36
-- PHP Version: 7.4.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `flask`
--

-- --------------------------------------------------------

--
-- Table structure for table `result`
--

DROP TABLE IF EXISTS `result`;
CREATE TABLE IF NOT EXISTS `result` (
  `RESULT_ID` int(11) NOT NULL AUTO_INCREMENT,
  `USER_ID` int(11) NOT NULL,
  `RESULT` varchar(100) NOT NULL,
  `RESULT_DATE` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  PRIMARY KEY (`RESULT_ID`),
  KEY `result_relation` (`USER_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `result`
--

INSERT INTO `result` (`RESULT_ID`, `USER_ID`, `RESULT`, `RESULT_DATE`) VALUES
(1, 4, 'sad', '2022-04-21 17:00:00.000000'),
(2, 4, 'sad', '2022-04-21 17:00:00.000000'),
(3, 4, 'sad', '2022-04-27 08:19:50.620010'),
(4, 4, 'sad', '2022-04-27 08:19:50.805838'),
(5, 4, 'happy', '2022-04-27 08:21:45.134513'),
(6, 4, 'fear', '2022-04-27 08:22:53.334827'),
(7, 4, 'neutral', '2022-04-27 09:17:53.259762'),
(8, 4, 'neutral', '2022-04-27 09:18:53.344951'),
(9, 4, 'neutral', '2022-04-27 09:19:56.879905'),
(10, 4, 'neutral', '2022-04-27 09:23:35.944379'),
(11, 4, 'neutral', '2022-04-27 09:24:46.860699'),
(12, 4, 'neutral', '2022-04-27 09:25:52.701257'),
(13, 4, 'neutral', '2022-04-27 09:31:05.344850'),
(14, 6, 'sad', '2022-04-28 00:05:02.252534'),
(15, 4, 'sad', '2022-05-04 02:31:49.574233'),
(16, 4, 'sad', '2022-05-04 02:46:43.961578'),
(17, 4, 'sad', '2022-05-04 07:18:49.416461'),
(18, 4, 'sad', '2022-05-04 08:11:13.194990'),
(19, 4, 'sad', '2022-05-04 08:14:52.575804'),
(20, 4, 'sad', '2022-05-04 08:33:07.305180');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
CREATE TABLE IF NOT EXISTS `user` (
  `id` int(50) NOT NULL AUTO_INCREMENT,
  `user_name` varchar(50) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `password` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `email` varchar(100) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `create_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `user_name`, `password`, `email`, `create_date`) VALUES
(4, 'orekisora', '$2b$12$ISD31FXcCofFv4xBb1c62uUIjTIlva4YMMvzfJeilBq1VJ3ACJFHa', 'otakutonyvo16@gmail.com', '2022-02-28 08:04:51'),
(6, 'admin11', '$2b$12$oG7p0bFEFBFlJvkIgmWiUe30qTqxscpgMfIAnBCXoqOCTfxYqG2M2', 'gg@gmail.com', '2022-04-28 00:01:54');

--
-- Constraints for dumped tables
--

--
-- Constraints for table `result`
--
ALTER TABLE `result`
  ADD CONSTRAINT `result_relation` FOREIGN KEY (`USER_ID`) REFERENCES `user` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
