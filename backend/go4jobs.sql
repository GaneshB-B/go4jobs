--
-- Table structure for table `jobs_shift`
--

DROP TABLE IF EXISTS `jobs_shift`;


CREATE TABLE `jobs_shift` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(128) NOT NULL,
  `start_hours` time NOT NULL,
  `end_hours` time NOT NULL,
  `flexible_minutes` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


--
-- Table structure for table `jobs_team`
--

DROP TABLE IF EXISTS `jobs_team`;


CREATE TABLE `jobs_team` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(256) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


--
-- Table structure for table `jobs_status`
--

DROP TABLE IF EXISTS `jobs_status`;


CREATE TABLE `jobs_status` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `status` varchar(32) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

--
-- Data for table `jobs_status`
--

LOCK TABLES `jobs_status` WRITE;
/*!40000 ALTER TABLE `jobs_status` DISABLE KEYS */;
INSERT INTO `jobs_status` VALUES (1,'Active'),(2,'Disabled'),(3,'Fulfilled'),(4,'Deleted');
/*!40000 ALTER TABLE `jobs_status` ENABLE KEYS */;
UNLOCK TABLES;


--
-- Table structure for table `jobs_post`
--

DROP TABLE IF EXISTS `jobs_post`;


CREATE TABLE `jobs_post` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(256) NOT NULL,
  `description` text NOT NULL,
  `team` int(10) unsigned DEFAULT NULL,
  `shift` int(10) unsigned DEFAULT NULL,
  `min_salary` int(10) unsigned DEFAULT NULL,
  `max_salary` int(10) unsigned DEFAULT NULL,
  `currency` varchar(32) DEFAULT NULL,
  `location` varchar(256) DEFAULT NULL,
  `joining_in_days` int(10) unsigned DEFAULT NULL,
  `status` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `jobs_post_FK` (`shift`),
  KEY `jobs_post_FK_1` (`status`),
  KEY `jobs_post_FK_2` (`team`),
  CONSTRAINT `jobs_post_FK` FOREIGN KEY (`shift`) REFERENCES `jobs_shift` (`id`),
  CONSTRAINT `jobs_post_FK_1` FOREIGN KEY (`status`) REFERENCES `jobs_status` (`id`),
  CONSTRAINT `jobs_post_FK_2` FOREIGN KEY (`team`) REFERENCES `jobs_team` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


--
-- Table structure for table `jobs_applicant`
--

DROP TABLE IF EXISTS `jobs_applicant`;


CREATE TABLE `jobs_applicant` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `email` varchar(512) DEFAULT NULL,
  `location` varchar(256) DEFAULT NULL,
  `company` varchar(512) DEFAULT NULL,
  `experience_months` varchar(256) DEFAULT NULL,
  `resume` varchar(256) DEFAULT NULL,
  `contact` varchar(20) DEFAULT NULL,
  `name` varchar(256) DEFAULT NULL,
  `gender` varchar(256) DEFAULT NULL,
  `notice_period` varchar(256) DEFAULT NULL,
  `skills` varchar(512) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `jobs_applicant_UN` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


--
-- Table structure for table `jobs_applicant_education`
--

DROP TABLE IF EXISTS `jobs_applicant_education`;


CREATE TABLE `jobs_applicant_education` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(256) NOT NULL,
  `institution` varchar(256) NOT NULL,
  `city` varchar(256) NOT NULL,
  `state` varchar(256) NOT NULL,
  `country` int(11) NOT NULL,
  `year_started` year(4) DEFAULT NULL,
  `year_graduated` year(4) DEFAULT NULL,
  `credentials` varchar(256) NOT NULL,
  `applicant` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `jobs_applicant_education_FK` (`country`),
  KEY `jobs_applicant_education_FK_1` (`applicant`),
  CONSTRAINT `jobs_applicant_education_FK` FOREIGN KEY (`country`) REFERENCES `COUNTRIES` (`ID`),
  CONSTRAINT `jobs_applicant_education_FK_1` FOREIGN KEY (`applicant`) REFERENCES `jobs_applicant` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


--
-- Table structure for table `jobs_application_status`
--

DROP TABLE IF EXISTS `jobs_application_status`;


CREATE TABLE `jobs_application_status` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `status` varchar(32) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;

--
-- Data for table `jobs_application_status`
--

LOCK TABLES `jobs_application_status` WRITE;
/*!40000 ALTER TABLE `jobs_application_status` DISABLE KEYS */;
INSERT INTO `jobs_application_status` VALUES (1,'Applied'),(2,'Approved'),(3,'Rejected'),(4,'Blocked'),(5,'Deleted');
/*!40000 ALTER TABLE `jobs_application_status` ENABLE KEYS */;
UNLOCK TABLES;


--
-- Table structure for table `jobs_application`
--

DROP TABLE IF EXISTS `jobs_application`;


CREATE TABLE `jobs_application` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `post` int(10) unsigned NOT NULL,
  `applicant` int(10) unsigned NOT NULL,
  `expected_salary` int(11) DEFAULT NULL,
  `currency` varchar(32) DEFAULT NULL,
  `status` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `jobs_application_FK` (`status`),
  KEY `jobs_application_FK_1` (`post`),
  KEY `jobs_application_FK_2` (`applicant`),
  CONSTRAINT `jobs_application_FK` FOREIGN KEY (`status`) REFERENCES `jobs_application_status` (`id`),
  CONSTRAINT `jobs_application_FK_1` FOREIGN KEY (`post`) REFERENCES `jobs_post` (`id`),
  CONSTRAINT `jobs_application_FK_2` FOREIGN KEY (`applicant`) REFERENCES `jobs_applicant` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
