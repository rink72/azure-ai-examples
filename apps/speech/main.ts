import { SpeechConfig } from "microsoft-cognitiveservices-speech-sdk"
import { config } from "./config"
import { DefaultAzureCredential } from "@azure/identity";
import { recogniseSpeechFromFile } from "./helpers";

async function main()
{
    const cognitiveToken = (await (new DefaultAzureCredential()
        .getToken("https://cognitiveservices.azure.com/")))
        .token;

    const authorizationToken = `aad#${config.cognitiveServiceResourceId}#${cognitiveToken}`

    const speechConfig = SpeechConfig.fromAuthorizationToken(authorizationToken, config.cognitiveRegion);

    await recogniseSpeechFromFile(speechConfig, config.shortSpeechWavPath);

    await recogniseSpeechFromFile(speechConfig, config.mediumSpeechWavPath);

    await recogniseSpeechFromFile(speechConfig, config.longSpeechWavPath);

    speechConfig.close();
}

main()