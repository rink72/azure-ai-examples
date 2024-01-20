export interface IConfig
{
    cognitiveEndpoint: string
    cognitiveServiceResourceId: string
    cognitiveRegion: string
    shortSpeechWavPath: string
    mediumSpeechWavPath: string
    longSpeechWavPath: string
}

export const config: IConfig = {
    cognitiveEndpoint: "https://rink72aistudy-cog.cognitiveservices.azure.com",
    cognitiveServiceResourceId: process.env.COGNITIVE_SERVICE_RESOURCEID ?? "",
    cognitiveRegion: "eastus",
    shortSpeechWavPath: "./audio/short-speech.wav",
    mediumSpeechWavPath: "./audio/medium-speech.wav",
    longSpeechWavPath: "./audio/long-speech.wav"
}