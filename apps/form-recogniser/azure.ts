import { BlobServiceClient } from "@azure/storage-blob";
import * as fs from "fs";

export async function copyFileToBlobStorage(filePath: string, blobClient: BlobServiceClient, containerName: string)
{
    const blobName = filePath.split('/').pop();

    if (!blobName)
    {
        throw new Error(`Unable to determine blob name from file path ${filePath}`);
    }

    const containerClient = blobClient.getContainerClient(containerName);
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);

    const fileData = fs.readFileSync(filePath);

    await blockBlobClient.uploadData(fileData);
}