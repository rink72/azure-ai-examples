export interface IConfig
{
    cognitiveEndpoint: string
    blobEndpoint: string
    trainingSourcePath: string
    trainingContainerName: string
}

export const config: IConfig = {
    cognitiveEndpoint: "https://rink72aistudy-cog.cognitiveservices.azure.com",
    blobEndpoint: "https://rink72aistudysa.blob.core.windows.net",
    trainingSourcePath: "./images/train",
    trainingContainerName: "form-recogniser-training"
}