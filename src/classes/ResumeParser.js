const parseIt = require("../utils/parseIt");

class ResumeParser {
  constructor(filePath, mimeType) {
    if (!filePath) {
      throw new Error("A file path or URL is required");
    }
    if (typeof filePath === "string" && (filePath.startsWith("http") || filePath.startsWith("https"))) {
      this.type = "url";
    } else if (typeof filePath === "object") {
      this.type = mimeType;
    } else {
      this.type = "file";
    }

    this.path = filePath;
    this.data = null;
  }

  parseToJSON() {
    return new Promise((resolve, reject) => {
      if (this.data) return resolve(this.data);
      parseIt.parseToJSON(this.path, this.type, (file, error) => {
        if (error) {
          return reject(error);
        }
        this.data = file;
        return resolve(file);
      });
    });
  }

  parseToFile(outputPath) {
    return new Promise((resolve, reject) => {
      if (!outputPath) {
        reject("Missing ouput path");
      }
      parseIt.parseToFile(this.path, this.type, outputPath, (file, error) => {
        if (error) {
          return reject(error);
        }
        this.data = file;
        return resolve(file);
      });
    });
  }
}

module.exports = ResumeParser;
