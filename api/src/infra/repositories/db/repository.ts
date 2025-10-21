import { Client } from "pg";
import type { DBRepository } from "../../../core/repositories/db/repository";
import type { LoggerRepository } from "../../../core/repositories/logger/repository";
import type { StoreData } from "../../controllers/http/store/types/requests";

interface DBRepositoryDeps {
	logger: LoggerRepository;
}

export const make = async (deps: DBRepositoryDeps): DBRepository => {
	const { logger } = deps;

	// Define your PostgreSQL connection config
	const client = new Client({
		host: "localhost",
		port: 5432,
		user: "myuser",
		password: "mypassword",
		database: "mydatabase",
	});

	// define create table query
	const createTableQuery = `
  CREATE TABLE IF NOT EXISTS ads (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    type VARCHAR(20) NOT NULL CHECK (type IN ('Rent', 'Buy', 'Exchange', 'Donation')),
    area TEXT NOT NULL,
    amount NUMERIC(10, 2) NOT NULL CHECK (amount >= 0),
    description TEXT,
    place_id TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );
  `;

	// define insert query
	const insertQuery = `
    INSERT INTO ads (title, type, area, amount, description, place_id)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *;
  `;

	// define select all ads query
	const selectAllAdsQuery = `
    SELECT * FROM ads;
  `;

	try {
		// Connect to the database
		logger.info("Connecting to the database...");
		await client.connect();
		// Create table
		logger.info("Creating table...");
		await client.query(createTableQuery);
		logger.info("Database initialized successfully");
	} catch (error) {
		logger.error(`Error on init db: ${error.message}`);
		throw error;
	}

	const storeAd = async (ad: StoreData): Promise<void> => {
		// try to store ad
		try {
			logger.info("Storing ad...");
			const result = await client.query(insertQuery, [
				ad.title,
				ad.type,
				ad.area,
				ad.amount,
				ad.description,
				ad.placeId,
			]);
			logger.info(`Ad inserted: ${result.rows[0]}`);
		} catch (error) {
			// handle error
			logger.error(`Error inserting ad: ${error.message}`);
			throw error;
		}
	};

	const getAllAds = async (): Promise<any[]> => {
		// try to get all ads
		try {
			logger.info("Fetching ads...");
			const result = await client.query(selectAllAdsQuery);
			return result.rows;
		} catch (error) {
			// handle error
			logger.error(`Error fetching ads: ${error.message}`);
			throw error;
		}
	};

	return { storeAd, getAllAds };
};
