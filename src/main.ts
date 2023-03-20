import fs from 'fs';

const regExpLink = /(.*)\[(.*)\]\((.*)\)/g;

function loopToTransformLinks(allWithoutLastSentence: string, lastSentence: string) {
  // TODO: create a loop to replace all the links in each iteration
  // considering that the link is the same.
  const textWithAnchor = '$1$2 [^1]';
  const anchorWithLink = '[^1]: $3';
  const transformedContent = allWithoutLastSentence.replace(regExpLink, textWithAnchor + lastSentence + '\n\n' + anchorWithLink);
  return transformedContent;
}

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

  const lastIndex = originalContent.lastIndexOf(')');
  const lastSentence = originalContent.slice(lastIndex + 1);
  const allWithoutLastSentence = originalContent.slice(0, lastIndex + 1);

  const transformedContent = loopToTransformLinks(allWithoutLastSentence, lastSentence);


  if (!fs.existsSync(transformedFile)) {
    fs.writeFileSync(transformedFile, transformedContent);
  }
};
