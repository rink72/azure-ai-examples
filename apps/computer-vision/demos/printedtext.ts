import { ComputerVisionClient } from "@azure/cognitiveservices-computervision";
import { config } from "../config";
import * as fs from "fs";

export async function imageToTextDemo(client: ComputerVisionClient)
{
    for (const imageName of config.imageToTextImages)
    {
        const imagePath = `${config.imageLocation}/${imageName}`;
        const imageData = fs.readFileSync(imagePath);

        const readRequest = await client.readInStream(imageData);

        const resultGuid = getOperationGuid(readRequest.operationLocation);

        if (!resultGuid)
        {
            continue;
        }

        const result = await waitForOperation(client, resultGuid);

        console.log('--------------------------------------------------')
        console.log(`Recognized text from ${imageName}:`);
        console.log('--------------------------------------------------')

        if (!result.analyzeResult)
        {
            console.warn('No analyze result found.');

            continue;
        }

        for (const page of result.analyzeResult.readResults)
        {
            console.log('')
            console.log(`Page ${page.page}:`)
            console.log('')

            if (!page.lines)
            {
                continue;
            }

            for (const line of page.lines)
            {
                console.log(line.text);
            }
        }

        console.log('')
        console.log('')
        console.log('')
        console.log('')
        console.log('')
    }
}

async function waitForOperation(client: ComputerVisionClient, operationGuid: string)
{
    let result = await client.getReadResult(operationGuid);

    const maxRetries = 30;
    let currentAttempt = 0;

    while (result.status === 'notStarted' || result.status === 'running')
    {
        currentAttempt++;

        if (currentAttempt >= maxRetries)
        {
            throw new Error(`Operation ${operationGuid} timed out.`);
        }

        await new Promise(resolve => setTimeout(resolve, 1000));

        result = await client.getReadResult(operationGuid);
    }

    return result;
}

function getOperationGuid(url: string): string
{
    const parts = url.split('/');
    const guid = parts[parts.length - 1];

    return guid;
}