/*
 Navicat Premium Data Transfer

 Source Server         : 本地
 Source Server Type    : MySQL
 Source Server Version : 100507
 Source Schema         : growth

 Target Server Type    : MySQL
 Target Server Version : 100507
 File Encoding         : 65001

 Date: 08/03/2021 23:46:34
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for user_accounts
-- ----------------------------
DROP TABLE IF EXISTS `user_accounts`;
CREATE TABLE `user_accounts` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(10) unsigned NOT NULL COMMENT '用户 ID',
  `platform` int(10) unsigned NOT NULL COMMENT '平台',
  `index` varchar(255) COLLATE utf8mb4_bin DEFAULT NULL COMMENT '账号的唯一恒定索引，例如：uuid，address',
  `key` varchar(255) COLLATE utf8mb4_bin DEFAULT NULL COMMENT '用来进行身份验证的必要信息，如 password',
  `other` varchar(255) COLLATE utf8mb4_bin DEFAULT NULL COMMENT '其它辅助信息，如 username',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(255) COLLATE utf8mb4_bin DEFAULT NULL COMMENT '用户名，只有创作者需要这个字段，普通用户没有 username',
  `nickname` varchar(64) COLLATE utf8mb4_bin NOT NULL COMMENT '昵称',
  `avatar` varchar(255) COLLATE utf8mb4_bin DEFAULT NULL COMMENT '头像',
  `introduction` varchar(1024) COLLATE utf8mb4_bin DEFAULT NULL COMMENT '个人简介',
  `location` varchar(64) COLLATE utf8mb4_bin DEFAULT NULL COMMENT '地点',
  `website` varchar(255) COLLATE utf8mb4_bin DEFAULT NULL COMMENT '个人/乐队网站',
  `create_time` datetime NOT NULL COMMENT '注册时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin ROW_FORMAT=DYNAMIC;

SET FOREIGN_KEY_CHECKS = 1;
