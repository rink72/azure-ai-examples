import { ComputerVisionClient } from "@azure/cognitiveservices-computervision";
import { config } from "../config";
import * as fs from "fs";

// Brand detection does not appear to work very well.
// In some of the example images, it only picks up some
// brands and not others.  In other images, it picks up
// no brands at all.

export async function brandDetectionDemo(client: ComputerVisionClient)
{
    for (const imageName of config.brandImages)
    {
        const imagePath = `${config.imageLocation}/${imageName}`;
        const imageData = fs.readFileSync(imagePath);

        const result = await client.analyzeImageInStream(imageData, { visualFeatures: ["Brands"] });

        console.log('--------------------------------------------------')
        console.log(`Recognized brands from ${imageName}:`);
        console.log('--------------------------------------------------')

        result.brands?.forEach(brand =>
        {
            console.log(brand.name);
        });
    }
}