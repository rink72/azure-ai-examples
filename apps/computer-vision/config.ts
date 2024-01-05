export interface IConfig
{
    cognitiveEndpoint: string
    imageLocation: string
    describeImages: string[]
    imageToTextImages: string[]
    thumbnailImages: string[]
    brandImages: string[]
    landmarkImages: string[]
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
    ],
    brandImages: [
        "microsoft-linux.jpg",
        "famous-brands.png",
        "nike.webp",
        "logo-redesign.webp",
        "suzuki.jpg"
    ],
    landmarkImages: [
        "saddledome.jpg",
        "eiffel-tower.jpg",
        "great-wall.jpg",
        "kremlin.jpg",
        "sphinx.jpg"
    ]
}