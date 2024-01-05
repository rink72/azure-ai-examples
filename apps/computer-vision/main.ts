import { ComputerVisionClient } from "@azure/cognitiveservices-computervision";
import { DefaultAzureCredential } from "@azure/identity";
import { config } from "./config";
import { TokenCredentials } from "@azure/ms-rest-js";
import { imageToTextDemo } from "./demos/printedtext";

async function main()
{
    const visionToken = (await (new DefaultAzureCredential()
        .getToken("https://cognitiveservices.azure.com/")))
        .token;

    const visionClient = new ComputerVisionClient(
        new TokenCredentials(visionToken),
        config.cognitiveEndpoint);

    await imageToTextDemo(visionClient);

    // await describeImageDemo(visionClient);

    // await getThumbnailDemo(visionClient);

    // await brandDetectionDemo(visionClient);

    // await landmarkDetectionDemo(visionClient);
}

main();