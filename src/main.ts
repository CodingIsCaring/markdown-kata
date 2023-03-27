import fs from 'fs';

const transform = (contentSplit: string[]) => {
  let result = '';
  let links = '';
  let index = 1;

  contentSplit.forEach(item => {
    const anchorLink = `[^${index}]`;
    if (item.includes('[')) {
      result = result + item.replace('[', '') + anchorLink;
    }

    if (item.includes(')')) {
      //TODO change itemSplit to a better name.
      // ItemSplit[0] is the link and itemSplit[1] is the text after the link
      const itemSplit = item.split(')');
      links = links + '\n' + anchorLink + ': ' + itemSplit[0];
      if (itemSplit[1]) {
        result = result + itemSplit[1];
      }
      index++;
    }
  });

  // TODO: 3 test fails
  return result + '\n' + links;
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
  console.log(47, transformedContent);
  fs.writeFileSync(transformedFile, transformedContent);
};
