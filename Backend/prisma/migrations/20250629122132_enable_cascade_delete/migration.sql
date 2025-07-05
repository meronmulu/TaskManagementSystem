-- DropForeignKey
ALTER TABLE `issue` DROP FOREIGN KEY `Issue_projectId_fkey`;

-- DropForeignKey
ALTER TABLE `issue` DROP FOREIGN KEY `Issue_reportedById_fkey`;

-- DropIndex
DROP INDEX `Issue_projectId_fkey` ON `issue`;

-- DropIndex
DROP INDEX `Issue_reportedById_fkey` ON `issue`;

-- AddForeignKey
ALTER TABLE `Issue` ADD CONSTRAINT `Issue_projectId_fkey` FOREIGN KEY (`projectId`) REFERENCES `Project`(`project_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Issue` ADD CONSTRAINT `Issue_reportedById_fkey` FOREIGN KEY (`reportedById`) REFERENCES `User`(`userId`) ON DELETE CASCADE ON UPDATE CASCADE;
