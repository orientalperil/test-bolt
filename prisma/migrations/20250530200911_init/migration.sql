-- CreateTable
CREATE TABLE "Pokemon" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "pokemonPhoto" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "height" TEXT NOT NULL,
    "weight" TEXT NOT NULL,
    "maleGenderRatio" TEXT NOT NULL,
    "femaleGenderRatio" TEXT NOT NULL,
    "abilities" TEXT NOT NULL,
    "eggGroups" TEXT NOT NULL,
    "evolutions" TEXT NOT NULL,
    "evolutionPhoto" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Pokemon_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Pokemon_name_idx" ON "Pokemon"("name");
