-- CreateTable
CREATE TABLE "Ticket" (
    "id" SERIAL NOT NULL,
    "shopName" TEXT NOT NULL,
    "safetyIssue" TEXT NOT NULL,
    "prodTarget" INTEGER NOT NULL,
    "prodActual" INTEGER NOT NULL,
    "affectedDnTime" TEXT NOT NULL,
    "grossDnTime" TEXT NOT NULL,
    "majorBreakdown" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Ticket_pkey" PRIMARY KEY ("id")
);
