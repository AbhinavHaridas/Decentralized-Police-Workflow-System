-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 06, 2023 at 09:17 PM
-- Server version: 10.4.21-MariaDB
-- PHP Version: 8.0.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `dpws`
--

-- --------------------------------------------------------

--
-- Table structure for table `crime_type`
--

CREATE TABLE `crime_type` (
  `id` int(11) NOT NULL,
  `crime_name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `crime_type`
--

INSERT INTO `crime_type` (`id`, `crime_name`) VALUES
(1, 'Murder'),
(2, 'Attempt to commit murder'),
(3, 'Dacoity'),
(4, 'Robbery(Excluding Chain Snatching)'),
(5, 'Robbery- Chain Snatching'),
(6, 'Extortion'),
(7, 'House Break in,Burglary,Theft'),
(8, 'Thefts'),
(9, 'Motor Vehicle Thefts'),
(10, 'Hurt'),
(11, 'Riots'),
(12, 'Rape'),
(13, 'Molestation'),
(14, 'Other');

-- --------------------------------------------------------

--
-- Table structure for table `department`
--

CREATE TABLE `department` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `department`
--

INSERT INTO `department` (`id`, `name`) VALUES
(1, 'Crime Investigation '),
(2, 'Cyber Security'),
(3, 'Forensics'),
(4, 'Anti Narcotics'),
(5, 'Internal Affairs');

-- --------------------------------------------------------

--
-- Table structure for table `evidences`
--

CREATE TABLE `evidences` (
  `id` int(11) NOT NULL,
  `fir_id` int(11) NOT NULL,
  `evidence` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `evidences`
--

INSERT INTO `evidences` (`id`, `fir_id`, `evidence`) VALUES
(1, 1, 'JHMS Flop CD');

-- --------------------------------------------------------

--
-- Table structure for table `firs`
--

CREATE TABLE `firs` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `assigned_officer_id` int(11) NOT NULL,
  `date_of_offence` date NOT NULL DEFAULT current_timestamp(),
  `place_of_offence` varchar(255) NOT NULL,
  `transaction_id` varchar(255) NOT NULL,
  `status` int(2) NOT NULL DEFAULT 0 COMMENT '"-1 - Rejected\r\n0 - Pending\r\n1 - Accepted"',
  `zonal_code` int(11) NOT NULL,
  `crime_type` int(5) NOT NULL,
  `ipc_section` varchar(255) NOT NULL,
  `suspect_details` varchar(255) NOT NULL,
  `fir_contents` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `firs`
--

INSERT INTO `firs` (`id`, `user_id`, `assigned_officer_id`, `date_of_offence`, `place_of_offence`, `transaction_id`, `status`, `zonal_code`, `crime_type`, `ipc_section`, `suspect_details`, `fir_contents`) VALUES
(1, 1, 1, '2021-08-02', 'Mumbai', 'ifhewonfdmfwejbk', 0, 29, 11, '420', 'hakloda', 'A flop actor came and attacked me demanding for hit films'),
(2, 1, 1, '2021-08-01', 'Mumbai', 'ertrertbfdfs', -1, 29, 11, '420', 'hakloda', 'I rejected this fir just like he was rejected by hit movies');

-- --------------------------------------------------------

--
-- Table structure for table `officers`
--

CREATE TABLE `officers` (
  `id` int(11) NOT NULL,
  `full_name` varchar(255) NOT NULL,
  `dob` date NOT NULL,
  `contact` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `city` varchar(255) NOT NULL,
  `zonal_code` int(11) NOT NULL,
  `rank` varchar(255) NOT NULL,
  `status` int(2) NOT NULL DEFAULT 1 COMMENT '"0- Inactive\r\n1- Active"',
  `password` varchar(255) NOT NULL,
  `department_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `officers`
--

INSERT INTO `officers` (`id`, `full_name`, `dob`, `contact`, `email`, `city`, `zonal_code`, `rank`, `status`, `password`, `department_id`) VALUES
(1, 'Chulbul Pandey', '1965-11-02', '9023456789', 'beingdabangg@gmail.com', 'Mumbai', 29, 'DCP', 1, '$2b$10$IvoN1IJ9Ky31jrAClJKFaeBfJLY1dwlcaege3JYhj5Xd2rZw7ssR6', 3);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `full_name` varchar(255) NOT NULL,
  `dob` date NOT NULL,
  `contact` varchar(255) NOT NULL,
  `nationality` varchar(255) NOT NULL DEFAULT 'Indian',
  `email` varchar(255) NOT NULL,
  `city` varchar(255) NOT NULL,
  `state` varchar(255) NOT NULL,
  `country` varchar(255) NOT NULL DEFAULT 'India',
  `passport_no` varchar(255) NOT NULL,
  `date_of_issue` date NOT NULL,
  `place_of_issue` varchar(255) NOT NULL,
  `occupation` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `pincode` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `full_name`, `dob`, `contact`, `nationality`, `email`, `city`, `state`, `country`, `passport_no`, `date_of_issue`, `place_of_issue`, `occupation`, `address`, `pincode`) VALUES
(1, 'Salman Khan', '1965-12-27', '9023456788', 'Indian', 'beinghuman@gmail.com', 'Mumbai', 'Maharashtra', 'India', '32325rrr32', '2023-09-01', 'India', 'Actor', 'Galaxy Apartments, Bandra', '400055');

-- --------------------------------------------------------

--
-- Table structure for table `zone`
--

CREATE TABLE `zone` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `zone`
--

INSERT INTO `zone` (`id`, `name`) VALUES
(1, 'Colaba'),
(2, 'Cuffe Parade'),
(3, 'Azad Maidan'),
(4, 'M.R.A.Marg'),
(5, 'Dongri'),
(6, 'Sir JJ Marg'),
(7, 'Marine Drive'),
(8, 'Pydhonie'),
(9, 'L.T. Marg'),
(10, 'V.P.Road'),
(11, 'Dr.D.B. MArg'),
(12, 'GamDevi'),
(13, 'Malabar Hill'),
(14, 'Yellow Gate'),
(15, 'Wadala'),
(16, 'Sewree'),
(17, 'Tardeo'),
(18, 'Nagpada'),
(19, 'Agripada'),
(20, 'Byculla'),
(21, 'Worli'),
(22, 'N.M.Joshi Marg'),
(23, 'Bhoiwada'),
(24, 'KalaChowki'),
(25, 'Matunga'),
(26, 'R.A.K. Marg'),
(27, 'Sion'),
(28, 'Antop Hill'),
(29, 'Wadala Truck Terminal'),
(30, 'Dadar'),
(31, 'Shivaji Park'),
(32, 'Mahim'),
(33, 'Shahu Marg'),
(34, 'Kurla'),
(35, 'Vinod Bhave Marg'),
(36, 'Dharavi'),
(37, 'Chembur'),
(38, 'Nehru Nagar'),
(39, 'trombay'),
(40, 'R.C.F'),
(41, 'Deonar'),
(42, 'Shivaji Nagar'),
(43, 'Tilak Nagar'),
(44, 'Chunabhatti'),
(45, 'Mankhrud'),
(46, 'Govandi'),
(47, 'GhatKopar'),
(48, 'PantNagar'),
(49, 'Vikhroli'),
(50, 'KanjurMarg'),
(51, 'Navghar'),
(52, 'Bhandup'),
(53, 'Mulund'),
(54, 'ParkSite'),
(55, 'Vakola'),
(56, 'VileParle'),
(57, 'Kherwadi'),
(58, 'B.K.C.'),
(59, 'Nirmal Nagar'),
(60, 'Sahar'),
(61, 'Airport'),
(62, 'Bandra'),
(63, 'Khar'),
(64, 'SantaCruz'),
(65, 'Juhu'),
(66, 'D.N.Nagar'),
(67, 'Versova'),
(68, 'Oshiwara'),
(69, 'Amboli'),
(70, 'Megawadi'),
(71, 'sakinaka'),
(72, 'Powai'),
(73, 'MIDC'),
(74, 'Andheri'),
(75, 'Jogeshwari'),
(76, 'Bangur nagar'),
(77, 'Goregoan'),
(78, 'Malad'),
(79, 'Malvani'),
(80, 'Borivali'),
(81, 'kandivali'),
(82, 'Charkop'),
(83, 'M.H.B. Colony'),
(84, 'Gorai'),
(85, 'Vanrai'),
(86, 'Dindoshi'),
(87, 'kurar'),
(88, 'Samta Nagar'),
(89, 'Kasturba Marg'),
(90, 'DahiSar'),
(91, 'Aarey');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `crime_type`
--
ALTER TABLE `crime_type`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `department`
--
ALTER TABLE `department`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `evidences`
--
ALTER TABLE `evidences`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `firs`
--
ALTER TABLE `firs`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `officers`
--
ALTER TABLE `officers`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `zone`
--
ALTER TABLE `zone`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `crime_type`
--
ALTER TABLE `crime_type`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `department`
--
ALTER TABLE `department`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `evidences`
--
ALTER TABLE `evidences`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `firs`
--
ALTER TABLE `firs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `officers`
--
ALTER TABLE `officers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `zone`
--
ALTER TABLE `zone`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=92;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
