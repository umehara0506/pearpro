class FormatSheet {

  constructor(sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET.PDF_FORMAT.NAME)) {
    this.sheet = sheet;
  }

  replaceAllText(before, after) {
    const textFinder = this.sheet.createTextFinder(before);
    textFinder.replaceAllWith(after);
  }

}


'use strict'

function myFunction_20220310_210609() {

  const sheet = new FormatSheet();
  sheet.replaceText('仕様書', 'hoge');



}