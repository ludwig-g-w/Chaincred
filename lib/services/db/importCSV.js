const fs = require("fs");
const csv = require("csv-parser");
const { PrismaClient } = require("./generated/client");
const prisma = new PrismaClient();

async function importCsv(filePath) {
  const records = [];

  fs.createReadStream(filePath)
    .pipe(csv())
    .on("data", async (row) => {
      const record = {
        title: row.title,
        image_url: row.image_url,
        description: row.description,
        location_coords: row.location_coords,
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

// Check if a file path is provided as a command-line argument
if (process.argv.length < 3) {
  console.log("Usage: node <script.js> <path_to_csv_file>");
  process.exit(1);
}

// The second command-line argument is the file path
const filePath = process.argv[2];

importCsv(filePath);
