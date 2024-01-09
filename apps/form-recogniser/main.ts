import { config } from "./config";
import { DefaultAzureCredential } from "@azure/identity";
import { BlobServiceClient } from "@azure/storage-blob";
import { analyzeDocuments, uploadTrainingData } from "./helpers";
import { DocumentAnalysisClient } from "@azure/ai-form-recognizer";

async function main()
{
    const azureCredential = new DefaultAzureCredential();
    const blobClient = new BlobServiceClient(config.blobEndpoint, azureCredential);

    // How to create admin client
    // const modelAdminClient = new DocumentModelAdministrationClient(config.cognitiveEndpoint, azureCredential);

    const analysisClient = new DocumentAnalysisClient(
        config.cognitiveEndpoint,
        azureCredential
    );

    await uploadTrainingData(blobClient);

    // await trainDocumentModel(blobClient, modelAdminClient);

    await analyzeDocuments(analysisClient);
}

main();