export interface IConfig
{
    cognitiveEndpoint: string;
    imageLocation: string;
    describeImages: string[],
    imageToTextImages: string[]
}

export const config: IConfig = {
    cognitiveEndpoint: "https://rink72aistudy-cog.cognitiveservices.azure.com",
    imageLocation: "./images/",
    describeImages: [
        "microsoft-linux.jpg",
        "wayne-gretzky.jpg"
    ],
    imageToTextImages: [
        "devend-printed-text.jpg",
        "nutrition-printed-text.jpg"
    ]
}