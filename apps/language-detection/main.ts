import { TextAnalyticsClient } from "@azure/ai-text-analytics";
import { DefaultAzureCredential } from "@azure/identity";
import * as readline from "readline";

const endpoint = "https://rink72aistudy-cog.cognitiveservices.azure.com"

const questionPrompt = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

async function main()
{
    const tokenCredential = new DefaultAzureCredential()
    const client = new TextAnalyticsClient(endpoint, tokenCredential);

    let doLoop = true

    while (doLoop)
    {

        const answer: string = await new Promise(resolve =>
        {
            questionPrompt.question("Enter some text to identify the language: (Type exit to end the program) ", resolve)
        })

        if (answer.toLowerCase() === 'exit')
        {
            doLoop = false;
        }
        else
        {
            try
            {
                const result = (await client.detectLanguage([answer], ""))[0]

                if (result.error)
                {
                    console.error(`Encountered an error: ${result.error}`)
                }
                else
                {
                    console.log(`The language is ${result.primaryLanguage.name} with a confidence score of ${result.primaryLanguage.confidenceScore}`)
                }
            }
            catch (err)
            {
                console.error(`Encountered an error: ${(err as Error).message}`)
            }
        }
    }
}

main();