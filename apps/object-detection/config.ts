export interface IConfig
{
    cognitiveEndpoint: string
    trainingSourcePath: string
    testSourcePath: string
}

export const config: IConfig = {
    cognitiveEndpoint: "https://rink72aistudy-cog.cognitiveservices.azure.com",
    trainingSourcePath: "./images/train",
    testSourcePath: "./images/test"
}