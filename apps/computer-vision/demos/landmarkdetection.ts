import { ComputerVisionClient } from "@azure/cognitiveservices-computervision";
import { config } from "../config";
import * as fs from "fs";

export async function landmarkDetectionDemo(client: ComputerVisionClient)
{
    for (const imageName of config.landmarkImages)
    {
        const imagePath = `${config.imageLocation}/${imageName}`;
        const imageData = fs.readFileSync(imagePath);

        const result = await client.analyzeImageInStream(imageData, { details: ["Landmarks"] });

        console.log('--------------------------------------------------')
        console.log(`Recognized landmarks from ${imageName}:`);
        console.log('--------------------------------------------------')

        result.categories?.forEach(category =>
        {
            console.log(category.detail?.landmarks?.map(landmark => landmark.name).join(", "));
        });
    }
}