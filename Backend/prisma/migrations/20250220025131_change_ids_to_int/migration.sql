/*
  Warnings:

  - The primary key for the `issue` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `issue_id` on the `issue` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `projectId` on the `issue` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `reportedById` on the `issue` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - The primary key for the `notification` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `notification_id` on the `notification` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `userId` on the `notification` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - The primary key for the `project` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `project_id` on the `project` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `createdById` on the `project` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - The primary key for the `task` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `task_id` on the `task` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `projectId` on the `task` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `assignedToId` on the `task` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - The primary key for the `user` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `userId` on the `user` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.

*/
-- DropForeignKey
ALTER TABLE `issue` DROP FOREIGN KEY `Issue_projectId_fkey`;

-- DropForeignKey
ALTER TABLE `issue` DROP FOREIGN KEY `Issue_reportedById_fkey`;

-- DropForeignKey
ALTER TABLE `notification` DROP FOREIGN KEY `Notification_userId_fkey`;

-- DropForeignKey
ALTER TABLE `project` DROP FOREIGN KEY `Project_createdById_fkey`;

-- DropForeignKey
ALTER TABLE `task` DROP FOREIGN KEY `Task_assignedToId_fkey`;

-- DropForeignKey
ALTER TABLE `task` DROP FOREIGN KEY `Task_projectId_fkey`;

-- DropIndex
DROP INDEX `Issue_projectId_fkey` ON `issue`;

-- DropIndex
DROP INDEX `Issue_reportedById_fkey` ON `issue`;

-- DropIndex
DROP INDEX `Notification_userId_fkey` ON `notification`;

-- DropIndex
DROP INDEX `Project_createdById_fkey` ON `project`;

-- DropIndex
DROP INDEX `Task_assignedToId_fkey` ON `task`;

-- DropIndex
DROP INDEX `Task_projectId_fkey` ON `task`;

-- AlterTable
ALTER TABLE `issue` DROP PRIMARY KEY,
    MODIFY `issue_id` INTEGER NOT NULL AUTO_INCREMENT,
    MODIFY `projectId` INTEGER NOT NULL,
    MODIFY `reportedById` INTEGER NOT NULL,
    ADD PRIMARY KEY (`issue_id`);

-- AlterTable
ALTER TABLE `notification` DROP PRIMARY KEY,
    MODIFY `notification_id` INTEGER NOT NULL AUTO_INCREMENT,
    MODIFY `userId` INTEGER NOT NULL,
    ADD PRIMARY KEY (`notification_id`);

-- AlterTable
ALTER TABLE `project` DROP PRIMARY KEY,
    MODIFY `project_id` INTEGER NOT NULL AUTO_INCREMENT,
    MODIFY `createdById` INTEGER NOT NULL,
    ADD PRIMARY KEY (`project_id`);

-- AlterTable
ALTER TABLE `task` DROP PRIMARY KEY,
    MODIFY `task_id` INTEGER NOT NULL AUTO_INCREMENT,
    MODIFY `projectId` INTEGER NOT NULL,
    MODIFY `assignedToId` INTEGER NULL,
    ADD PRIMARY KEY (`task_id`);

-- AlterTable
ALTER TABLE `user` DROP PRIMARY KEY,
    MODIFY `userId` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`userId`);

-- AddForeignKey
ALTER TABLE `Project` ADD CONSTRAINT `Project_createdById_fkey` FOREIGN KEY (`createdById`) REFERENCES `User`(`userId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Task` ADD CONSTRAINT `Task_projectId_fkey` FOREIGN KEY (`projectId`) REFERENCES `Project`(`project_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Task` ADD CONSTRAINT `Task_assignedToId_fkey` FOREIGN KEY (`assignedToId`) REFERENCES `User`(`userId`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Issue` ADD CONSTRAINT `Issue_projectId_fkey` FOREIGN KEY (`projectId`) REFERENCES `Project`(`project_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Issue` ADD CONSTRAINT `Issue_reportedById_fkey` FOREIGN KEY (`reportedById`) REFERENCES `User`(`userId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Notification` ADD CONSTRAINT `Notification_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`userId`) ON DELETE RESTRICT ON UPDATE CASCADE;
