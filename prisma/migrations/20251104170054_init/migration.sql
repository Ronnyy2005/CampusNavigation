-- CreateEnum
CREATE TYPE "EdgeType" AS ENUM ('road', 'corridor', 'stairs', 'ramp', 'lift', 'footpath');

-- CreateTable
CREATE TABLE "Node" (
    "id" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "lat" DOUBLE PRECISION NOT NULL,
    "lng" DOUBLE PRECISION NOT NULL,
    "type" TEXT,

    CONSTRAINT "Node_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Edge" (
    "id" SERIAL NOT NULL,
    "fromId" INTEGER NOT NULL,
    "toId" INTEGER NOT NULL,
    "type" TEXT NOT NULL,
    "bidirectional" BOOLEAN NOT NULL DEFAULT true,
    "accessible" BOOLEAN NOT NULL DEFAULT true,
    "lengthMeters" DOUBLE PRECISION NOT NULL,
    "pathCoords" JSONB NOT NULL,

    CONSTRAINT "Edge_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Node_code_key" ON "Node"("code");

-- AddForeignKey
ALTER TABLE "Edge" ADD CONSTRAINT "Edge_fromId_fkey" FOREIGN KEY ("fromId") REFERENCES "Node"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Edge" ADD CONSTRAINT "Edge_toId_fkey" FOREIGN KEY ("toId") REFERENCES "Node"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
