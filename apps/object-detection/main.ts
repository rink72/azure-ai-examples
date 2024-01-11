import { TrainingAPIClient } from "@azure/cognitiveservices-customvision-training";
import { config } from "./config";
import { DefaultAzureCredential } from "@azure/identity";
import { TokenCredentials } from "@azure/ms-rest-js";
import { createVisionProject, removeExistingImages, removeExistingTags, testImages, trainModel, uploadTrainingData } from "./helpers";

async function main()
{
    const visionToken = (await (new DefaultAzureCredential()
        .getToken("https://cognitiveservices.azure.com/")))
        .token;

    const trainingClient = new TrainingAPIClient(
        new TokenCredentials(visionToken),
        config.cognitiveEndpoint);

    const project = await createVisionProject(trainingClient);

    if (!project.id)
    {
        throw new Error("Project ID is required");
    }

    await removeExistingImages(trainingClient, project.id);

    await removeExistingTags(trainingClient, project.id)

    await uploadTrainingData(trainingClient, project.id);

    await trainModel(trainingClient, project.id)

    await testImages(trainingClient, project.id);
}

main();