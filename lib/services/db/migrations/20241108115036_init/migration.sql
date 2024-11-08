-- CreateTable
CREATE TABLE "Profile" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT,
    "image_url" TEXT,
    "description" TEXT,
    "location_coords" TEXT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME,
    "address" TEXT NOT NULL,
    "location_name" TEXT
);

-- CreateIndex
CREATE UNIQUE INDEX "Profile_address_key" ON "Profile"("address");
