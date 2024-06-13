/*
  Warnings:

  - A unique constraint covering the columns `[hora_entrada]` on the table `dias` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[hora_saida_almoco]` on the table `dias` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[hora_entrada_almoco]` on the table `dias` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[hora_saida]` on the table `dias` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `dias_hora_entrada_key` ON `dias`(`hora_entrada`);

-- CreateIndex
CREATE UNIQUE INDEX `dias_hora_saida_almoco_key` ON `dias`(`hora_saida_almoco`);

-- CreateIndex
CREATE UNIQUE INDEX `dias_hora_entrada_almoco_key` ON `dias`(`hora_entrada_almoco`);

-- CreateIndex
CREATE UNIQUE INDEX `dias_hora_saida_key` ON `dias`(`hora_saida`);
