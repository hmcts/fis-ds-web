
import ymlTranspiler from 'js-yaml';
import FileSystem from 'fs/promises';
import pathGuide from 'path';

export class ResourceReader {


    async Loader(filePath : string) : Promise<any> {
        filePath  = '../../resources/'+filePath;
    try {
        return ymlTranspiler.load(
            await FileSystem.readFile(pathGuide.resolve(__dirname, filePath), {
              encoding: 'utf-8',
            })
          );
        
    } catch (exception) {
        throw exception;
        
    }
       
    }


}