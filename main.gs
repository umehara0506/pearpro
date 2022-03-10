function main() {

  const formatSheet = new FormatSheet();
  const dataSheet = new DataSheet();
  const dicts = dataSheet.getPdfDicts();

  dicts.forEach(dict => {
    // console.log([...dict])

    const tags = TAGS.map(tag => new Tag(dict, tag.NAME));
    console.log(tags);

    const copiedSheet = formatSheet.copy();
    tags.forEach(tag => copiedSheet.replaceAllText(tag.before, tag.after));
    copiedSheet.createPdf(dict.get('契約先名（乙）'));

    // copiedSheet.delete();
    
  });


  // copy() {
  //   const newSheet = this.sheet.copyTo(SS);
  //   return new FormatSheet(newSheet);;
  // }

  // replaceAllText(sheet, before, after) {
  //   const textFinder = sheet.createTextFinder(before);
  //   textFinder.replaceAllWith(after);
  //   return new FormatSheet(sheet);
  // }

  // createPdf(sheet) {
  //   return new FormatSheet(sheet);
  // }

  // delete() {



  // console.log(dicts[0]);

  // dicts.forEach(dict => console.log(dict.get('契約先名（乙）')));

  // HEADRES.forEach(header => new Tag(header));


}
