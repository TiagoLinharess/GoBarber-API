import fs from 'fs';
import path from 'path';
import aws, { S3 } from 'aws-sdk';
import uploadConfig from '@config/upload';
import IStorageProvider from '../models/IStorageProvider';

class DiskStorageProvider implements IStorageProvider {
    private client: S3;

    constructor() {
        this.client = new aws.S3({
            region: 'us-east-2',
        })
    }
    public async saveFile(file: string): Promise<string> {
        const originalPath = path.resolve(uploadConfig.tpmFolder, file);

        const fileContent = await fs.promises.readFile(originalPath, {
            encoding: 'utf-8',
        });

        this.client.putObject({
            Bucket: 'appgobarber1',
            Key: file,
            ACL: 'public-read',
            Body: fileContent, 
        }).promise();

        return file;
    }

    public async deleteFile(file: string): Promise<void> {
        const filePath = path.resolve(uploadConfig.uploadsFolder, file);

        try {
            await fs.promises.stat(filePath);
        } catch {
            return;
        }

        await fs.promises.unlink(filePath);
    }
}

export default DiskStorageProvider;