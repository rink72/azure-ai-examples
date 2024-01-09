import { BlobServiceClient } from "@azure/storage-blob";
import { checkContainerExists, copyFileToBlobStorage, createContainerSasUrl } from "./azure";
import { config } from "./config";
import { getFileList } from "./files";
import { DocumentAnalysisClient, DocumentModelAdministrationClient, DocumentModelBuildMode, DocumentModelDetails } from "@azure/ai-form-recognizer";
import * as fs from "fs";

export async function uploadTrainingData(blobClient: BlobServiceClient)
{
    const trainingFileList = await getFileList(config.trainingSourcePath, ".tiff");

    console.log(`Uploading ${trainingFileList.length} training files to blob storage`)

    await checkContainerExists(blobClient, config.trainingContainerName);

    await Promise.all(trainingFileList.map(async file => 
    {
        const fullFilePath = `${config.trainingSourcePath}/${file}`;

        await copyFileToBlobStorage(fullFilePath, blobClient, config.trainingContainerName);
    }));
}

export async function trainDocumentModel(blobClient: BlobServiceClient, modelClient: DocumentModelAdministrationClient): Promise<DocumentModelDetails>
{
    console.log(`Training model: ${config.customModelId}`);

    const sasUrl = await createContainerSasUrl(blobClient, config.trainingContainerName);

    // This isn't working properly for some reason. It will always return an error
    // about no training data found. I've tried using the same SAS URL in the
    // browser and it works fine. I've also used the Document Intelligence studio
    // and it can pull the images correctly as well.
    // I've left this here as a reference and will continue to try to get it working.
    // I'm wondering if it's because I'm creating the SAS url with a user delegation
    // rather than access key but I'm not sure.
    //
    // Because of this I'm not going to implement a custom classifier either
    const poller = await modelClient.beginBuildDocumentModel(
        config.customModelId,
        { azureBlobSource: { containerUrl: `${sasUrl}`, prefix: 'train/' } },
        DocumentModelBuildMode.Template
    );

    const modelDetails = await poller.pollUntilDone();

    console.log(`Model trained: ${modelDetails.modelId}`);

    return modelDetails;
}

export async function analyzeDocuments(analysisClient: DocumentAnalysisClient)
{
    const fileList = await getFileList(config.testSourcePath, ".tiff");

    for (const file of fileList)
    {
        const imagePath = `${config.testSourcePath}/${file}`;
        const imageData = fs.readFileSync(imagePath);

        const poller = await analysisClient.beginAnalyzeDocument("prebuilt-invoice", imageData);

        const result = await poller.pollUntilDone();

        console.log('--------------------------------------------------')
        console.log(`Results for ${file}:`);
        console.log('--------------------------------------------------')

        console.log(`Page count: ${result.pages?.length}`);

        console.log('')

        // Take result.tables and build a table of the data

        if (result.tables)
        {
            for (const table of result.tables)
            {
                console.log('')

                const tableData = transformToTable(table);

                console.table(tableData);

                console.log('')
            }
        }
    }
}

function transformToTable(data: { rowCount: number, columnCount: number, cells: Array<{ columnIndex: number, rowIndex: number, content: string }> }): any[]
{
    const { rowCount, columnCount, cells } = data;
    const tableData = [];

    for (let i = 0; i < rowCount; i++)
    {
        const row: { [key: number]: string } = {};

        for (let j = 0; j < columnCount; j++)
        {
            // Find the cell that matches the current row and column
            const cell = cells.find((c) => c.rowIndex === i && c.columnIndex === j);

            if (cell)
            {
                row[j] = cell.content;
            }
        }
        tableData.push(row);
    }

    return tableData;
}
