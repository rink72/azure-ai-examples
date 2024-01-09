export interface IConfig
{
    cognitiveEndpoint: string
    blobEndpoint: string
    trainingSourcePath: string
    testSourcePath: string
    trainingContainerName: string
    sasLifetimeInMilliseconds: number
    customModelId: string
}

export const config: IConfig = {
    cognitiveEndpoint: "https://rink72aistudy-cog.cognitiveservices.azure.com",
    blobEndpoint: "https://rink72aistudysa.blob.core.windows.net",
    trainingSourcePath: "./images/train",
    testSourcePath: "./images/test",
    trainingContainerName: "form-recogniser-training",
    sasLifetimeInMilliseconds: 3600000,
    customModelId: "my-custom-model"
}