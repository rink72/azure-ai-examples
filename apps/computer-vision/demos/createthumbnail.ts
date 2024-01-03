import { config } from "../config";
import { ComputerVisionClient } from "@azure/cognitiveservices-computervision";
import * as fs from "fs";

export async function getThumbnailDemo(client: ComputerVisionClient)
{
    for (const imageName of config.thumbnailImages)
    {
        const imagePath = `${config.imageLocation}/${imageName}`;
        const thumbnailPath = `${config.imageLocation}/${imageName}-thumbnail.jpg`;
        const imageData = fs.readFileSync(imagePath);

        const result = await client.generateThumbnailInStream(100, 100, imageData, { smartCropping: true });

        const thumbnailData = await result.readableStreamBody?.read();

        if (thumbnailData)
        {
            fs.writeFileSync(thumbnailPath, thumbnailData);
        }
    }
}