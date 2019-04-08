-- phpMyAdmin SQL Dump
-- version 4.7.7
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Apr 08, 2019 at 10:34 AM
-- Server version: 10.1.30-MariaDB
-- PHP Version: 5.6.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `todo`
--

-- --------------------------------------------------------

--
-- Table structure for table `task`
--

CREATE TABLE `task` (
  `id` int(11) NOT NULL,
  `text` varchar(150) NOT NULL,
  `created_by` varchar(16) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `task`
--

INSERT INTO `task` (`id`, `text`, `created_by`) VALUES
(32, 'Again some task 11111', 'gopal'),
(33, 'Again some task hahahahhuffu', 'gopal'),
(34, 'Again some task', 'gopal'),
(35, 'Task jug jjgjgj', 'gopal'),
(37, 'Some new task here edited', 'bavani'),
(39, 'Hcjdkco', '28'),
(40, 'Diet', 'karthi'),
(41, 'Exercis\n', 'karthi'),
(42, 'Run', 'karthi'),
(43, 'Some text skska. Anakajanan', '28');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` varchar(16) NOT NULL,
  `password` varchar(256) NOT NULL,
  `name` varchar(32) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `password`, `name`) VALUES
('28', '$2b$10$ihtdzl78QnZ1ww/D48Z0T.WzL8u0llFmcY2VyCVJFOK3JWO68OVAO', 'Karthik'),
('bavani', '$2b$10$j8lkYvCh5w/BsrK4UoAimO/gn7wmV6e5getzWCApw1PKrDAN9Dwa6', 'Bavani'),
('chaman', '$2b$10$yYlM5/QVII4As7ZIyHzgBOQtbUMghRyzwIgIIiH45aUgt9iy5YM5K', 'Chaman'),
('gopal', '$2b$10$dQIUp2w/JyK.ECgzFfAWgePL80lBVl6tlV8knZxSYVZ7.zgp1uYpy', 'Gopalakrishnan V'),
('karthi', '$2b$10$zcDIbsYqrYmM5ycqlW.RKe62pgYmochSRkyLkiW9f4kK3xGzjIsL6', 'Karthikeyan'),
('random', '$2b$10$W.tnstnVfB485a8a/82tmOWa5bJDvnh.9XWB8Yhq8PPNAwDQQDJbu', 'Random'),
('svbala99', '$2b$10$JyhMQqCzUtT4t/C0UAPh/unf0uUMNHlQG5a1fghu3v2RI3MUuY2hm', 'Balamurugan V');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `task`
--
ALTER TABLE `task`
  ADD PRIMARY KEY (`id`),
  ADD KEY `constraint_created_by` (`created_by`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `task`
--
ALTER TABLE `task`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=44;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `task`
--
ALTER TABLE `task`
  ADD CONSTRAINT `constraint_created_by` FOREIGN KEY (`created_by`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
