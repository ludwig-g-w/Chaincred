const fs = require("fs");
const csv = require("csv-parser");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function importCsv(filePath) {
  const records = [];

  fs.createReadStream(filePath)
    .pipe(csv())
    .on("data", (row) => {
      // Convert CSV row to Prisma record format
      const record = {
        title: row.title,
        image_url: row.image_url,
        description: row.description,
        location_coords: row.location_coords,
        // Parse timestamps if they're in a recognizable format
        created_at: new Date(row.created_at),
        updated_at: row.updated_at ? new Date(row.updated_at) : null,
        address: row.address,
        location_name: row.location_name,
      };
      records.push(record);
    })
    .on("end", async () => {
      console.log(
        `CSV file successfully processed with ${records.length} records. Starting import...`
      );

      // Use transaction to import all records
      try {
        await prisma.$transaction(
          records.map((record) => prisma.profile.create({ data: record }))
        );
        console.log("All records have been imported successfully.");
      } catch (error) {
        console.error("Error during import:", error);
      } finally {
        await prisma.$disconnect();
      }
    });
}

importCsv("./profiles_rows.csv");
