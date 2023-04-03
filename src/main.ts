import fs from 'fs';

function addAnchor(item: string, result: string, index: number) {
  if (item.includes('[')) {
    return result + item.replace('[', '') + `[^${index}]`;
  }
  return result;
}

function addLinkToFootnotes(links: string, index: number, url: string) {
  return links + '\n' + `[^${index}]` + ': ' + url;
}

function getRemainingText(contentSplit: string[]) {
  let lastContentIndex = contentSplit.length - 1;
  const lastIndex = contentSplit[lastContentIndex].lastIndexOf(')');
  return contentSplit[lastContentIndex].slice(lastIndex + 1);
}

const transform = (contentSplit: string[]) => {
  let result = '';
  let links = '';
  let index = 1;

  const lastSentence = getRemainingText(contentSplit);

  contentSplit.forEach((item) => {
    if (item.includes(')')) {
      const url = item.split(')')[0];
      const remainingText = item.split(')')[1];
      if (!links.includes(url)) {
        links = addLinkToFootnotes(links, index, url);
        result = addAnchor(remainingText, result, index);
        //  TODO REVIEW WHEN/HOW TO INCREASE INDEX ONLY WHEN IT IS REQUIRED
        //  FIX test: should add multiple footnotes if there are multiple links in the original file
        //  without breaking the other tests
        index++;
      }
      return;
    }
    result = addAnchor(item, result, index);
  });
  return result + lastSentence + '\n' + links;
};

export const linksToFootnotes = (originalFile: string, transformedFile: string) => {
  if (!fs.existsSync(originalFile)) {
    throw new Error(`The file ${originalFile} does not exist`);
  }

  const originalContent = fs.readFileSync(originalFile).toString();
  if (originalContent === '') {
    throw new Error(`The file ${originalFile} is empty`);
  }

  const contentSplit = originalContent.split('](');
  if (contentSplit.length === 1) {
    fs.writeFileSync(transformedFile, originalContent);
    return;
  }

  const transformedContent = transform(contentSplit);
  fs.writeFileSync(transformedFile, transformedContent);
};
