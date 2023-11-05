/*
  Warnings:

  - Added the required column `name` to the `notifications` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_notifications" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "emailFrom" TEXT NOT NULL,
    "emailTo" TEXT NOT NULL,
    "subject" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "statusEmail" TEXT NOT NULL DEFAULT 'SENT'
);
INSERT INTO "new_notifications" ("emailFrom", "emailTo", "id", "statusEmail", "subject", "userId") SELECT "emailFrom", "emailTo", "id", "statusEmail", "subject", "userId" FROM "notifications";
DROP TABLE "notifications";
ALTER TABLE "new_notifications" RENAME TO "notifications";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
