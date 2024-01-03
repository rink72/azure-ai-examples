export interface IConfig
{
    cognitiveEndpoint: string;
    imageLocation: string;
    describeImages: string[],
    imageToTextImages: string[],
    thumbnailImages: string[]
}

export const config: IConfig = {
    cognitiveEndpoint: "https://rink72aistudy-cog.cognitiveservices.azure.com",
    imageLocation: "./images",
    describeImages: [
        "microsoft-linux.jpg",
        "wayne-gretzky.jpg",
        "hockey-image.jpg"
    ],
    imageToTextImages: [
        "devend-printed-text.jpg",
        "nutrition-printed-text.jpg"
    ],
    thumbnailImages: [
        "wayne-gretzky.jpg",
        "hockey-image.jpg"
    ]
}