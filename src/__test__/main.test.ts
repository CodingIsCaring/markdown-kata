import fs from 'fs';
import { linksToFootnotes } from '../main';

const originalFile = 'originalFile.md';
const transformedFile = 'transformedFile.md';

const resetFiles = () => {
  fs.unlinkSync(originalFile);
  fs.unlinkSync(transformedFile);
};

describe('linkToFootnote', () => {

  it('should add multiple footnotes if there are multiple links in the original file', () => {
    fs.writeFileSync(originalFile, '[this book](https://codigosostenible.com) and some other text and some [other](https://www.twitch.tv/codingiscaring) text line.');

    linksToFootnotes(originalFile, transformedFile);

    const actualText = fs.readFileSync(transformedFile).toString();
    const expectedText = 'this book [^1] and some other text and some other [^2] text line.\n' +
      '\n' +
      '[^1]: https://codigosostenible.com\n' +
      '[^2]: https://www.twitch.tv/codingiscaring';
    expect(actualText).toEqual(expectedText);
    resetFiles();
  });

  it('should display an error if the original file does not exist', () => {
    const nonExistentFile = 'nonexistentFile.md';

    expect(() => linksToFootnotes(nonExistentFile, transformedFile))
      .toThrowError(`The file ${nonExistentFile} does not exist`);
  });

  it('should create the transformed file if it does not exist', () => {
    fs.writeFileSync(originalFile, '[visible text link](url)');

    linksToFootnotes(originalFile, transformedFile);

    expect(fs.existsSync(transformedFile)).toBe(true);
    resetFiles();
  });

  it('should display an error if the original file is empty', () => {
    fs.writeFileSync(originalFile, '');

    expect(() => linksToFootnotes(originalFile, transformedFile))
      .toThrowError(`The file ${originalFile} is empty`);
  });

  it('should write the original content if it does not contain any links', () => {
    fs.writeFileSync(originalFile, 'text without links');

    linksToFootnotes(originalFile, transformedFile);

    const actualText = fs.readFileSync(transformedFile).toString();
    expect(actualText).toBe('text without links');
    resetFiles();
  });

  it('should transform a file with just one link', () => {
    fs.writeFileSync(originalFile, 'Hello this is the streaming of [codingIsCaring](https://www.twitch.tv/codingiscaring)');

    linksToFootnotes(originalFile, transformedFile);

    const actualText = fs.readFileSync(transformedFile).toString();
    const expectedText = 'Hello this is the streaming of codingIsCaring [^1]\n' +
      '\n' +
      '[^1]: https://www.twitch.tv/codingiscaring';
    expect(actualText).toEqual(expectedText);
    resetFiles();
  });

  it('should transform a file with just one link surrounded by text', () => {
    fs.writeFileSync(originalFile, 'Hello this is the streaming of [codingIsCaring](https://www.twitch.tv/codingiscaring) we are working with Pili');

    linksToFootnotes(originalFile, transformedFile);

    const actualText = fs.readFileSync(transformedFile).toString();
    const expectedText = 'Hello this is the streaming of codingIsCaring [^1] we are working with Pili\n' +
      '\n' +
      '[^1]: https://www.twitch.tv/codingiscaring';

    expect(actualText).toEqual(expectedText);
    resetFiles();
  });

  it('should add only one footnote if there is a link in the original file more than once', () => {
    fs.writeFileSync(originalFile, '[this streaming](https://www.twitch.tv/codingiscaring) and some other text and some [other](https://www.twitch.tv/codingiscaring)');

    linksToFootnotes(originalFile, transformedFile);

    const actualText = fs.readFileSync(transformedFile).toString();
    const expectedText = 'this streaming [^1] and some other text and some other [^1]\n' +
      '\n' +
      '[^1]: https://www.twitch.tv/codingiscaring';
    expect(actualText).toEqual(expectedText);
    resetFiles();
  });

});
