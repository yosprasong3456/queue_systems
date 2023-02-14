-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 14, 2023 at 11:45 AM
-- Server version: 10.4.22-MariaDB
-- PHP Version: 8.1.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `opd_queue`
--

-- --------------------------------------------------------

--
-- Table structure for table `opd_queue_config`
--

CREATE TABLE `opd_queue_config` (
  `id` varchar(255) NOT NULL,
  `inactive` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `color_btn` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `opd_queue_config`
--

INSERT INTO `opd_queue_config` (`id`, `inactive`, `name`, `color_btn`) VALUES
('1', '1', 'ตรวจสุขภาพไม่มีนัด /ตรวจโรคทั่วไป / ทันตกรรม', '#FBE7C6'),
('2', '1', 'รับ - ส่งต่อ', '#b4f8c8'),
('3', '1', 'ตรวจสุขภาพมีนัดแล้ว ช่อง 3\n', '#A0E7E5'),
('4', '1', 'ตรวจสุขภาพมีนัดแล้ว ช่อง 4\n', '#FFAEBC'),
('77', '0', 'เสียงออก Dashboard', '#dddddd');

-- --------------------------------------------------------

--
-- Table structure for table `opd_queue_systems`
--

CREATE TABLE `opd_queue_systems` (
  `id` varchar(255) NOT NULL,
  `date` date NOT NULL,
  `time` time NOT NULL,
  `queue_no` varchar(255) NOT NULL,
  `status` varchar(255) NOT NULL,
  `queue_type` varchar(255) NOT NULL,
  `count` varchar(255) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `opd_queue_systems`
--

INSERT INTO `opd_queue_systems` (`id`, `date`, `time`, `queue_no`, `status`, `queue_type`, `count`) VALUES
('1676336519', '2023-02-14', '08:01:59', '1001', '1', '1', '0'),
('1676336543', '2023-02-14', '08:02:23', '1002', '1', '1', '0'),
('1676336573', '2023-02-14', '08:02:53', '2001', '1', '2', '0'),
('1676336617', '2023-02-14', '08:03:37', '3001', '0', '3', '0'),
('1676337599', '2023-02-14', '08:19:59', '1003', '0', '1', '0'),
('1676337625', '2023-02-14', '08:20:25', '1004', '0', '1', '0'),
('1676337657', '2023-02-14', '08:20:57', '1005', '0', '1', '0'),
('1676337679', '2023-02-14', '08:21:19', '1006', '0', '1', '0'),
('1676337688', '2023-02-14', '08:21:28', '1007', '0', '1', '0'),
('1676337754', '2023-02-14', '08:22:34', '1008', '0', '1', '0'),
('1676337760', '2023-02-14', '08:22:40', '2002', '0', '2', '0'),
('1676337765', '2023-02-14', '08:22:45', '3002', '0', '3', '0'),
('1676337768', '2023-02-14', '08:22:48', '1009', '0', '1', '0'),
('1676337772', '2023-02-14', '08:22:52', '1010', '0', '1', '0'),
('1676338808', '2023-02-14', '08:40:08', '1011', '0', '1', '0'),
('1676339591', '2023-02-14', '08:53:11', '1012', '0', '1', '0'),
('1676341655', '2023-02-14', '09:27:35', '1013', '0', '1', '0'),
('1676341711', '2023-02-14', '09:28:31', '2003', '0', '2', '0'),
('1676342861', '2023-02-14', '09:47:41', '1014', '0', '1', '0'),
('1676356902', '2023-02-14', '13:41:42', '1015', '0', '1', '0'),
('1676356916', '2023-02-14', '13:41:56', '2004', '0', '2', '0'),
('1676357448', '2023-02-14', '13:50:48', '4001', '0', '4', '0'),
('1676358803', '2023-02-14', '14:13:23', '2005', '0', '2', '0'),
('1676368806', '2023-02-14', '17:00:06', '1016', '0', '1', '0');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `opd_queue_config`
--
ALTER TABLE `opd_queue_config`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `opd_queue_systems`
--
ALTER TABLE `opd_queue_systems`
  ADD PRIMARY KEY (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
