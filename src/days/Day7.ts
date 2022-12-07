import { Day, Output } from "../Day";

interface File {
  size: number;
}

interface Folder {
  size: number;
  files: Map<string, File>;
  folders: Map<string, Folder>;
  parent?: Folder;
}

interface Root extends Folder {
  parent?: never;
}

export class Day7 extends Day {
  constructor() {
    super("Day7");
  }

  private parseInput(input: string): Root {
    const root: Root = {
      size: 0,
      files: new Map<string, File>(),
      folders: new Map<string, Folder>(),
    };
    let currentFolder: Root | Folder | undefined = undefined;
    input.split("\n").forEach((line) => {
      if (line.startsWith("$ cd /")) {
        currentFolder = root;
      } else if (line.startsWith("$ cd ..")) {
        currentFolder = currentFolder?.parent;
      } else if (line.startsWith("$ cd ")) {
        const name = line.split(" ")[2];
        currentFolder = currentFolder?.folders.get(name);
      } else if (line.startsWith("$ ls")) {
        // Do nothing ... for now
      } else if (line.startsWith("dir")) {
        const name = line.split(" ")[1];
        const folder: Folder = {
          size: 0,
          files: new Map<string, File>(),
          folders: new Map<string, Folder>(),
          parent: currentFolder,
        };
        currentFolder?.folders.set(name, folder);
      } else {
        const sizeAndName = line.split(" ");
        const size = parseInt(sizeAndName[0]);
        const name = sizeAndName[1];
        const file: File = {
          size: size,
        };
        currentFolder?.files.set(name, file);
        // After a file has been added, add its size to it's parent.
        let parent = currentFolder;
        while (parent != undefined) {
          parent.size += size;
          parent = parent.parent;
        }
      }
    });
    return root;
  }

  getSmallFolders(folder: Folder, size: number): Folder[] {
    let folders: Folder[] = [];
    folder.folders.forEach((child) => {
      folders = folders.concat(this.getSmallFolders(child, size));
    });

    if (folder.size <= size) {
      folders.push(folder);
    }
    return folders;
  }

  getLargeFolders(folder: Folder, size: number): Folder[] {
    let folders: Folder[] = [];
    folder.folders.forEach((child) => {
      folders = folders.concat(this.getLargeFolders(child, size));
    });

    if (folder.size >= size) {
      folders.push(folder);
    }
    return folders;
  }

  public async solvePartOne(input: string): Output {
    const root = this.parseInput(input);
    const folders = this.getSmallFolders(root, 100000);
    return folders.reduce((total, folder) => total + folder.size, 0);
  }

  public async solvePartTwo(input: string): Output {
    const root = this.parseInput(input);
    const totalSize = 70000000;
    const requiredFree = 30000000;
    const currentFree = totalSize - root.size;
    const folders = this.getLargeFolders(root, requiredFree - currentFree);
    return Math.min(...folders.map((folder) => folder.size));
  }
}
