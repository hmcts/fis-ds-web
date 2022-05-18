import FileSystem from 'fs/promises';
import pathGuide from 'path';

import ymlTranspiler from 'js-yaml';

export class ResourceReader {
  async Loader(filePath: string): Promise<any> {
    filePath = '../../resources/' + filePath;
    return ymlTranspiler.load(
      await FileSystem.readFile(pathGuide.resolve(__dirname, filePath), {
        encoding: 'utf-8',
      })
    );
  }
}
