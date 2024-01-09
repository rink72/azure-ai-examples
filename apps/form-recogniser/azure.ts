import { BlobServiceClient, ContainerSASPermissions, SASProtocol, generateBlobSASQueryParameters } from "@azure/storage-blob";
import * as fs from "fs";
import { config } from "./config";

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

export async function checkContainerExists(blobClient: BlobServiceClient, containerName: string)
{
    const containerClient = blobClient.getContainerClient(containerName);

    const containerExists = await containerClient.exists();

    if (!containerExists)
    {
        await containerClient.create();
    }
}

export async function getBlobList(blobClient: BlobServiceClient, containerName: string)
{
    const containerClient = blobClient.getContainerClient(containerName);

    const blobs = [];

    for await (const blob of containerClient.listBlobsFlat())
    {
        blobs.push(blob);
    }

    return blobs;
}

export async function createContainerSasUrl(blobClient: BlobServiceClient, containerName: string)
{
    const containerClient = blobClient.getContainerClient(containerName);

    const delegationKey = await blobClient.getUserDelegationKey(new Date(), new Date(new Date().valueOf() + config.sasLifetimeInMilliseconds));

    const permissions = new ContainerSASPermissions();
    permissions.read = true;
    permissions.list = true;
    permissions.write = true;

    const sasQueryParameters = generateBlobSASQueryParameters(
        {
            containerName: containerName,
            permissions: permissions,
            startsOn: new Date(),
            expiresOn: new Date(new Date().valueOf() + config.sasLifetimeInMilliseconds),
            protocol: SASProtocol.Https
        },
        delegationKey,
        blobClient.accountName
    ).toString();

    const sasUrl = `${containerClient.url}?${sasQueryParameters}`;

    return sasUrl;
}