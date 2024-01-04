import { ComputerVisionClient } from "@azure/cognitiveservices-computervision";
import { config } from "../config";
import * as fs from "fs";

export async function describeImageDemo(client: ComputerVisionClient)
{
    for (const imageName of config.describeImages)
    {
        const imagePath = `${config.imageLocation}/${imageName}`;
        const imageData = fs.readFileSync(imagePath);

        const tagsResult = await client.tagImageInStream(imageData);
        const describeResult = await client.describeImageInStream(imageData, {});

        console.log('--------------------------------------------------')
        console.log(`Description of ${imageName}:`);
        console.log('--------------------------------------------------')

        const tagList = tagsResult.tags?.map(tag => tag.name);

        console.log(tagList);
        describeResult.captions?.forEach(caption => console.log(caption.text));

        console.log('')
        console.log('')
    }
}