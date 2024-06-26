-- CreateTable
CREATE TABLE `funcionarios` (
    `id` VARCHAR(191) NOT NULL,
    `nome` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `senha` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `funcionarios_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `meses` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `mes_ano` VARCHAR(191) NOT NULL,
    `saldo_mes` INTEGER NULL,
    `funcionarioId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `dias` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `hora_entrada` DATETIME(3) NULL,
    `hora_saida_almoco` DATETIME(3) NULL,
    `hora_entrada_almoco` DATETIME(3) NULL,
    `hora_saida` DATETIME(3) NULL,
    `tempo_trabalhado` INTEGER NULL,
    `saldo_dia` INTEGER NULL,
    `mes_id` INTEGER NOT NULL,
    `funcionario_id` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `meses` ADD CONSTRAINT `meses_funcionarioId_fkey` FOREIGN KEY (`funcionarioId`) REFERENCES `funcionarios`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `dias` ADD CONSTRAINT `dias_mes_id_fkey` FOREIGN KEY (`mes_id`) REFERENCES `meses`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `dias` ADD CONSTRAINT `dias_funcionario_id_fkey` FOREIGN KEY (`funcionario_id`) REFERENCES `funcionarios`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
