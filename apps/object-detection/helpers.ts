import { TrainingAPIClient } from "@azure/cognitiveservices-customvision-training";
import { config } from "./config";
import { Iteration, Project, Tag } from "@azure/cognitiveservices-customvision-training/esm/models";
import * as fs from "fs/promises"

export async function createVisionProject(trainingClient: TrainingAPIClient): Promise<Project>
{
    const existingProject = (await trainingClient.getProjects())
        .find(p => p.name === config.projectName);

    if (existingProject)
    {
        console.log(`Project ${config.projectName} already exists`);

        return existingProject;
    }

    console.log(`Creating project ${config.projectName}`);

    const project = await trainingClient.createProject(config.projectName, { description: "AI custom vision study" });

    return project;
}

export async function removeExistingImages(trainingClient: TrainingAPIClient, projectId: string): Promise<void>
{
    console.log(`Deleting existing images for project ${projectId}`);

    const imageIds = (await trainingClient.getImages(projectId))
        .map(i => i.id);

    await trainingClient.deleteImages(projectId, imageIds);
}

export async function removeExistingTags(trainingClient: TrainingAPIClient, projectId: string): Promise<void>
{
    const tagIds = (await trainingClient.getTags(projectId))
        .map(t => t.id);

    for (const tagId of tagIds)
    {
        if (tagId)
        {
            console.log(`Deleting tag ${tagId}`);

            await trainingClient.deleteTag(projectId, tagId);
        }
    }

}

export async function uploadTrainingData(trainingClient: TrainingAPIClient, projectId: string): Promise<void>
{
    for (const tagName of config.objectTags)
    {
        const tag = await createImageTag(trainingClient, projectId, tagName);

        if (!tag.id)
        {
            throw new Error("Tag ID is required");
        }

        const tagSourcePath = `${config.trainingSourcePath}/${tagName}`;

        for (const fileName of (await fs.readdir(tagSourcePath)))
        {
            console.log(`Uploading ${fileName} to tag ${tagName}`);

            const file = await fs.readFile(`${tagSourcePath}/${fileName}`);

            await trainingClient.createImagesFromData(projectId, file, { tagIds: [tag.id] });
        }
    }
}

async function createImageTag(trainingClient: TrainingAPIClient, projectId: string, tagName: string): Promise<Tag>
{
    const existingTag = (await trainingClient.getTags(projectId))
        .find(t => t.name === tagName);

    if (existingTag)
    {
        console.log(`Tag ${tagName} already exists`);

        return existingTag;
    }

    console.log(`Creating tag ${tagName}`);

    const tag = await trainingClient.createTag(projectId, tagName);

    return tag;
}

export async function trainModel(trainingClient: TrainingAPIClient, projectId: string): Promise<void>
{
    console.log(`Training model for project ${projectId}`);

    await trainingClient.trainProject(projectId, { forceTrain: true, trainingType: "Regular" });

    let latestIteration = await getLastTrainedIteration(trainingClient, projectId);

    while (latestIteration.status === "Training")
    {
        console.log(`Training status: ${latestIteration.status}`);

        await new Promise(resolve => setTimeout(resolve, 5000));

        latestIteration = await getLastTrainedIteration(trainingClient, projectId);
    }

    console.log(`Training status: ${latestIteration.status}`);
}


// v3.3 of the API doesn't have an easy way to link a training invokation to the iteration
// so we're just grabbing the last trained iteration as this is a demo. Do not do this is a real
// application
async function getLastTrainedIteration(trainingClient: TrainingAPIClient, projectId: string): Promise<Iteration>
{
    const iterations = await trainingClient.getIterations(projectId);

    const lastTrainedIteration = iterations
        .sort((a, b) => new Date(b.trainedAt ?? "").getTime() - new Date(a.trainedAt ?? "").getTime())
        .shift();

    if (!lastTrainedIteration)
    {
        throw new Error("No completed iterations found");
    }

    return lastTrainedIteration;
}

export async function testImages(trainingClient: TrainingAPIClient, projectId: string): Promise<void>
{
    console.log(`Running model verification with test images`);

    const testSourcePath = `${config.testSourcePath}`;

    const latestIteration = await getLastTrainedIteration(trainingClient, projectId);

    for (const fileName of (await fs.readdir(testSourcePath)))
    {
        const file = await fs.readFile(`${testSourcePath}/${fileName}`);

        const results = await trainingClient.quickTestImage(projectId, file, { iterationId: latestIteration.id });

        console.log(`Results for ${fileName}`);

        if (results.predictions && results.predictions.length > 0)
        {
            for (const prediction of results.predictions)
            {
                console.log(`\t${prediction.tagName}: ${prediction.probability}`);
            }
        }
        else
        {
            console.log("\tNo predictions");
        }
    }
}