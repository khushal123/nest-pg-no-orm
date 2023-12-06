export const queries = [
    `CREATE TABLE IF NOT EXISTS manufacturer (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL
    );`,

    `CREATE TABLE IF NOT EXISTS equipment (
        id SERIAL PRIMARY KEY,
        model VARCHAR(100) NOT NULL,
        serial_number VARCHAR(100) UNIQUE NOT NULL
    );`,

    `CREATE TABLE IF NOT EXISTS equipment_manufacturer (
        id SERIAL PRIMARY KEY,
        equipment_id INTEGER NOT NULL,
        manufacturer_id INTEGER NOT NULL,
        FOREIGN KEY (equipment_id) REFERENCES equipment(id) ON DELETE CASCADE,
        FOREIGN KEY (manufacturer_id) REFERENCES manufacturer(id) ON DELETE CASCADE
    );`
]

