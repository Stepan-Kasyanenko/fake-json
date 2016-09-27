-- --------------------------------------------------------
-- Хост:                         127.0.0.1
-- Версия сервера:               5.6.26 - MySQL Community Server (GPL)
-- ОС Сервера:                   Win32
-- HeidiSQL Версия:              9.3.0.4984
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;

-- Дамп структуры базы данных fakejsondb
CREATE DATABASE IF NOT EXISTS `fakejsondb` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `fakejsondb`;


-- Дамп структуры для таблица fakejsondb.json_configs
CREATE TABLE IF NOT EXISTS `json_configs` (
  `ID` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `session_id` varchar(50) NOT NULL DEFAULT '0',
  `identifier` varchar(8) NOT NULL DEFAULT '0',
  `name` varchar(100) NOT NULL DEFAULT '0',
  `config` text NOT NULL,
  `json` text NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- Дамп данных таблицы fakejsondb.json_configs: ~2 rows (приблизительно)
DELETE FROM `json_configs`;
/*!40000 ALTER TABLE `json_configs` DISABLE KEYS */;
INSERT INTO `json_configs` (`ID`, `session_id`, `identifier`, `name`, `config`, `json`) VALUES
	(1, '1', '12', 'user1', '{"code":{"type":"number","max":9,"min":0,"dmax":9,"dmin":0},"name":{"type":"string","max":6,"min":0,"dmax":6,"dmin":0,"regex":null},"login":{"type":"string","max":4,"min":0,"dmax":4,"dmin":0,"regex":null}}', '{"code":1,"name":"Melisa","login":"4234"}'),
	(3, '1', '12', 'user2', '{"id":{"type":"number","max":9,"min":0,"dmax":9,"dmin":0}}', '{"id":1}');
/*!40000 ALTER TABLE `json_configs` ENABLE KEYS */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
