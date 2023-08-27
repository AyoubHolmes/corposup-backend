import { BadRequestException, HttpException, Injectable } from '@nestjs/common';
import { Storage } from '@google-cloud/storage';
import { Readable } from 'stream';

@Injectable()
export class GcpService {
  bucket = new Storage({
    keyFilename: process.env.CORPOSUP_GCP_KEY,
  }).bucket(process.env.PRODUCTS_BUCKET_NAME);

  createBucket() {
    return 'create bucket';
  }

  async uploadFile(
    file: Express.Multer.File,
    folderName?: string,
  ): Promise<string> {
    try {
      folderName;
      const { originalname } = file;

      const fileRef = this.bucket.file(originalname);
      const fileStream = new Readable();
      fileStream.push(file.buffer);
      fileStream.push(null);
      const fileUpload = fileRef.createWriteStream({
        metadata: {
          contentType: file.mimetype,
        },
      });
      return await new Promise<string>((resolve, reject) => {
        fileUpload.on('error', (error) => {
          throw error;
        });

        fileUpload.on('finish', () => {
          const imageUrl = `https://storage.googleapis.com/${process.env.PRODUCTS_BUCKET_NAME}/${originalname}`;
          resolve(imageUrl);
        });

        fileStream.pipe(fileUpload);
      });
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  async uploadMultipleFiles(
    files: Express.Multer.File[],
    folderName?: string,
  ): Promise<string[]> {
    const filesUrls: string[] = [];
    for (const file of files) {
      try {
        folderName;
        const { originalname } = file;

        const fileRef = this.bucket.file(originalname);
        const fileStream = new Readable();
        fileStream.push(file.buffer);
        fileStream.push(null);
        const fileUpload = fileRef.createWriteStream({
          metadata: {
            contentType: file.mimetype,
          },
        });
        await new Promise<void>((resolve, reject) => {
          fileUpload.on('error', (error) => {
            throw error;
          });

          fileUpload.on('finish', () => {
            const imageUrl = `https://storage.googleapis.com/${process.env.PRODUCTS_BUCKET_NAME}/${originalname}`;
            filesUrls.push(imageUrl);
            resolve();
          });

          fileStream.pipe(fileUpload);
        });
      } catch (err) {
        throw new BadRequestException(err);
      }
    }
    return filesUrls;
  }

  deleteFile() {
    return 'delete file';
  }
}
