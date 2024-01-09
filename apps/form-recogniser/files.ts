import * as fs from 'fs';

export async function getFileList(directoryPath: string, filter: string)
{
    const files = await fs.promises.readdir(directoryPath);

    return files.filter(f => f.endsWith(filter));
}