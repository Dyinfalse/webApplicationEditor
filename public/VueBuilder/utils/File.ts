import Base from "./Base";

const fs: any = require('fs');

export default class File extends Base {
    /**
     * 拷贝文件
     */
    copy(src: string, dir: string): boolean {
        try {
            fs.writeFileSync(dir,fs.readFileSync(src));
            return true;
        } catch (e: any) {
            this.logger.error('文件拷贝失败: ' + src, e);
            return false;
        }
    }   
    /**
     * 删除文件
     */
    delete(path: string): boolean {
        try {
            let files: Array<string> = [];
            if(fs.existsSync(path)){
                files = fs.readdirSync(path);
                files.forEach((file) => {
                    let curPath = path + "/" + file;
                    if(fs.statSync(curPath).isDirectory()){
                        this.delete(curPath);
                    } else {
                        fs.unlinkSync(curPath);
                    }
                });
            }
            return true;
        } catch (e: any) {
            this.logger.error('文件拷贝失败: ' + path, e);
            return false;
        }
    }
}