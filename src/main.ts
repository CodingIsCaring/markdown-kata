import fs from 'fs';

const regExpLink = /\[(.*?)\]\((.*?)\)/g;
export const linksToFootnotes = (originalFile: string, transformedFile: string) => {
  if (!fs.existsSync(originalFile)) {
    throw new Error(`The file ${originalFile} does not exist`);
  }

  const originalContent = fs.readFileSync(originalFile).toString();
  if (originalContent === '') {
    throw new Error(`The file ${originalFile} is empty`);
  }

  if (!regExpLink.test(originalContent)) {
    fs.writeFileSync(transformedFile, originalContent);
  }

  const transformedContent = originalContent.replace(regExpLink, '$1 [^anchor1]\n\n[^anchor1]: $2');

  if (!fs.existsSync(transformedFile)) {
    fs.writeFileSync(transformedFile, transformedContent);
  }
};
