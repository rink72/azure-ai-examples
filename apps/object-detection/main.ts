import { TrainingAPIClient } from "@azure/cognitiveservices-customvision-training";
import { config } from "./config";
import { DefaultAzureCredential } from "@azure/identity";
import { TokenCredentials } from "@azure/ms-rest-js";

async function main()
{
    const visionToken = (await (new DefaultAzureCredential()
        .getToken("https://cognitiveservices.azure.com/")))
        .token;

    const trainingClient = new TrainingAPIClient(
        new TokenCredentials(visionToken),
        config.cognitiveEndpoint);

    const domains = await trainingClient.createProject("test");

    console.log(domains);
}

main();