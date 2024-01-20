import { AudioConfig, CancellationReason, ResultReason, SpeechConfig, SpeechRecognizer } from "microsoft-cognitiveservices-speech-sdk";
import * as fs from "fs";

export async function recogniseSpeechFromFile(speechConfig: SpeechConfig, filePath: string): Promise<void>
{
    const audioConfig = AudioConfig.fromWavFileInput(
        fs.readFileSync(filePath)
    );

    await recogniseSpeech(speechConfig, audioConfig);
}

// This should theoretically work, but I'm wondering if there is some issue
// with the speech SDK and MacOS. I've checked microphone permissions and
// they seem to be enabled. I'm leaving this here for reference and maybe
// to look at later
export async function recogniseSpeechFromMicrophone(speechConfig: SpeechConfig): Promise<void>
{
    const audioConfig = AudioConfig.fromDefaultMicrophoneInput();

    await recogniseSpeech(speechConfig, audioConfig, true);
}

async function recogniseSpeech(speechConfig: SpeechConfig, audioConfig: AudioConfig, showInProgress?: boolean): Promise<void>
{
    const speechRecognizer = new SpeechRecognizer(speechConfig, audioConfig);
    let sessionRunning = true;

    if (showInProgress)
    {
        speechRecognizer.recognizing = (s, e) =>
        {
            if (e.result.reason == ResultReason.RecognizingSpeech)
            {
                console.log(e.result.text);
            }
        };
    }

    speechRecognizer.recognized = (s, e) =>
    {
        if (e.result.reason == ResultReason.RecognizedSpeech)
        {
            console.log(e.result.text);
        }
        else if (e.result.reason == ResultReason.NoMatch)
        {
            console.log("NOMATCH: Speech could not be recognized.");
        }
    };

    speechRecognizer.canceled = (s, e) =>
    {
        if (e.reason == CancellationReason.Error)
        {
            console.log(`Error: ${e.errorDetails}`);
        }

        sessionRunning = false;

        speechRecognizer.stopContinuousRecognitionAsync();
        speechRecognizer.close();
    };

    speechRecognizer.sessionStopped = () =>
    {
        sessionRunning = false;

        speechRecognizer.stopContinuousRecognitionAsync();
        speechRecognizer.close();
    };

    speechRecognizer.startContinuousRecognitionAsync();


    while (sessionRunning)
    {
        await new Promise(resolve => setTimeout(resolve, 5000));
    }
}