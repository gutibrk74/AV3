-- CreateTable
CREATE TABLE `Etapa` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,
    `dias` INTEGER NOT NULL,
    `responsavel` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `aeronaveId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Teste` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `tipo` VARCHAR(191) NOT NULL,
    `resultado` VARCHAR(191) NOT NULL,
    `observacoes` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `aeronaveId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Etapa` ADD CONSTRAINT `Etapa_aeronaveId_fkey` FOREIGN KEY (`aeronaveId`) REFERENCES `Aeronave`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Teste` ADD CONSTRAINT `Teste_aeronaveId_fkey` FOREIGN KEY (`aeronaveId`) REFERENCES `Aeronave`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
