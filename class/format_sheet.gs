class FormatSheet {

  constructor(sheet = SS.getSheetByName(SHEET.PDF_FORMAT.NAME)) {
    this.sheet = sheet;
  }


  copy() {
    const newSheet = this.sheet.copyTo(SS);
    return new FormatSheet(newSheet);;
  }

  replaceAllText(before, after) {
    console.log(before, after);
    const textFinder = this.sheet.createTextFinder(before);
    textFinder.replaceAllWith(after);
    return this;
  }

  createPdf(fileName) {

    const folder = DriveApp.getFolderById(FOLDER.PDF_CRETAED.ID);
    const url = 'https://docs.google.com/spreadsheets/d/' + SS.getId() + '/export?';
    const opts = {
      exportFormat: 'pdf',      // ファイル形式の指定 pdf / csv / xls / xlsx
      format: 'pdf',      // ファイル形式の指定 pdf / csv / xls / xlsx
      size: 'A4',       // 用紙サイズの指定 legal / letter / A4
      portrait: 'true',     // true → 縦向き、false → 横向き
      fitw: 'true',     // 幅を用紙に合わせるか
      sheetnames: 'false',    // シート名を PDF 上部に表示するか
      printtitle: 'false',    // スプレッドシート名を PDF 上部に表示するか
      pagenumbers: 'false',    // ページ番号の有無
      gridlines: 'false',    // グリッドラインの表示有無
      fzr: 'false',    // 固定行の表示有無
      range: SHEET.PDF_FORMAT.RANGE,  // 対象範囲「%3A」 = : (コロン)  
      gid: this.sheet.getSheetId()    // シート ID を指定 (省略する場合、すべてのシートをダウンロード)
    };

    const urlExt = [];
    for (const optName in opts) {
      urlExt.push(optName + '=' + opts[optName]);
    }

    const options = urlExt.join('&');

    // console.log(options);
    const token = ScriptApp.getOAuthToken();
    console.log('url', url);
    const response = UrlFetchApp.fetch(url + options, {
      headers: {
        'Authorization': 'Bearer ' + token,
        'muteHttpExceptions': true
      }
    });

    const time = Utilities.formatDate(new Date(), 'JST', 'HH:mm:ss');
    // const blob = response.getBlob().setName(fileName + '_' + time + '_' + '.pdf');
    const blob = response.getBlob().setName(fileName);
    folder.createFile(blob);  //　PDFを指定したフォルダに保存
  }

  delete() {

  }


}


'use strict'

function myFunction_20220310_210609() {

  const sheet = new FormatSheet();
  sheet.replaceText('仕様書', 'hoge');



}