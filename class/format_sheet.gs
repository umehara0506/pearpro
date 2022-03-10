class FormatSheet {

  constructor(sheet = SS.getSheetByName(SHEET.PDF_FORMAT.NAME)) {
    this.sheet = sheet;
  }


  copy() {
    const newSheet = this.sheet.copyTo(SS);
    return new FormatSheet(newSheet);;
  }

  replaceAllText(sheet, before, after) {
    const textFinder = sheet.createTextFinder(before);
    textFinder.replaceAllWith(after);
    return new FormatSheet(sheet);
  }

  createPdf(sheet) {
    return new FormatSheet(sheet);
  }

  delete() {

  }
  

}


'use strict'

function myFunction_20220310_210609() {

  const sheet = new FormatSheet();
  sheet.replaceText('仕様書', 'hoge');



}