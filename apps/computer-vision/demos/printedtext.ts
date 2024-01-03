import { ComputerVisionClient } from "@azure/cognitiveservices-computervision";
import { config } from "../config";
import * as fs from "fs";

export async function imageToTextDemo(client: ComputerVisionClient)
{
    for (const imageName of config.imageToTextImages)
    {
        const imagePath = `${config.imageLocation}${imageName}`;
        const imageData = fs.readFileSync(imagePath);

        const result = await client.recognizePrintedTextInStream(true, imageData);

        console.log('--------------------------------------------------')
        console.log(`Recognized text from ${imageName}:`);
        console.log('--------------------------------------------------')

        result.regions?.forEach(region =>
        {
            region.lines?.forEach(line =>
            {
                const lineText = line.words?.map(word => word.text).join(" ");
                console.log(lineText);
            });
        });

        console.log('')
        console.log('')
        console.log('')
        console.log('')
        console.log('')
    }
}