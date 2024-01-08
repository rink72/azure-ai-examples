import { config } from "./config";
import { DefaultAzureCredential } from "@azure/identity";
import { BlobServiceClient } from "@azure/storage-blob";
import { getFileList } from "./files";
import { copyFileToBlobStorage } from "./azure";

async function main()
{
    const azureCredential = new DefaultAzureCredential();
    const blobClient = new BlobServiceClient(config.blobEndpoint, azureCredential)

    const trainingFileList = await getFileList(config.trainingSourcePath, ".tif");

    console.log(`Uploading ${trainingFileList.length} training files to blob storage`)

    await Promise.all(trainingFileList.map(async file => 
    {
        const fullFilePath = `${config.trainingSourcePath}/${file}`;

        await copyFileToBlobStorage(fullFilePath, blobClient, config.trainingContainerName);
    }));

    // const formClient = new DocumentAnalysisClient(
    //     config.cognitiveEndpoint,
    //     azureCredential
    // );

    // const adminClient = new DocumentModelAdministrationClient(
    //     config.cognitiveEndpoint,
    //     azureCredential
    // )
}

main();