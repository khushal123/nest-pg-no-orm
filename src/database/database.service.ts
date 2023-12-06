import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { Pool, QueryResult } from 'pg';
import { queries } from './constants';

@Injectable()
export class DatabaseService implements OnModuleInit, OnModuleDestroy {
    private pool: Pool;

    constructor() {
        this.pool = new Pool(); // Creates a new pool instance
    }

    async onModuleInit(): Promise<void> {
        try {
            await this.pool.connect(); // Connect the pool
            console.log('Database connected');
            this.pool.on('error', (err, client) => {
                console.error('Unexpected error on idle client', err)
                process.exit(-1)
            })
            await this.createTablesIFNotExists()
        } catch (err) {
            console.error('Database connection error:', err);
        }
    }

    async createTablesIFNotExists(): Promise<void> {
        try {
            for (const query of queries) {
                await this.pool.query(query)
            }
        } catch (error) {
            throw error
        }
    }

    async onModuleDestroy(): Promise<void> {
        await this.pool.end(); // Close the pool
        console.log('Database connection pool closed');
    }

    async query(queryText: string, params?: any[]): Promise<QueryResult> {
        const client = await this.pool.connect();
        try {
            return await client.query(queryText, params);
        } catch (error) {
            throw error
        } finally {
            client.release();
        }
    }
}
