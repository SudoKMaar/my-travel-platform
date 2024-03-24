export function removeHtmlTags(inputString: string) {
  const htmlTagsRegex = /<[^>]*>/g;
  const stringWithoutHtml = inputString.replace(htmlTagsRegex, "");
  return stringWithoutHtml;
}
