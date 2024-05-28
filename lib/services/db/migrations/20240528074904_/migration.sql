-- CreateTable
CREATE TABLE "Profile" (
    "id" SERIAL NOT NULL,
    "title" TEXT,
    "image_url" TEXT,
    "description" TEXT,
    "location_coords" TEXT,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ,
    "address" TEXT NOT NULL,
    "location_name" TEXT,

    CONSTRAINT "Profile_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Profile_address_key" ON "Profile"("address");
