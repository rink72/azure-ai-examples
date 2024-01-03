import { ComputerVisionClient } from "@azure/cognitiveservices-computervision";
import { imageToTextDemo } from "./demos/printedtext";
import { DefaultAzureCredential } from "@azure/identity";
import { config } from "./config";
import { TokenCredentials } from "@azure/ms-rest-js";
import { describeImageDemo } from "./demos/describeimage";

async function main()
{
    const visionToken = (await (new DefaultAzureCredential()
        .getToken("https://cognitiveservices.azure.com/")))
        .token;

    const visionClient = new ComputerVisionClient(
        new TokenCredentials(visionToken),
        config.cognitiveEndpoint);

    await imageToTextDemo(visionClient);

    await describeImageDemo(visionClient);
}

main();