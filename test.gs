

function createPdf(sheet = SS.getActiveSheet(), fileName = 'test') {

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
    gid: sheet.getSheetId()    // シート ID を指定 (省略する場合、すべてのシートをダウンロード)
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




/**
 * PDFを作成してドライブへ保存
 * 設定情報はsetting.gs
 * 
 * @parames {SpreadsheetApp.SpreadSheet} spreadSheetId - スプレッドシートID
 * @parames {SpreadsheetApp.Sheet} shtId - シートID
 * @parames {String} fileName - ファイル名
 */
function exportAsPDF(spreadSheetId = '18Qk4x6L0uqrJ4H0pgD43bxsv3Cxbh_o-umg5_p0aOxY', shtId = '338191277', fileName = 'test.pdf') {

  const folder = DriveApp.getFolderById(FOLDER.PDF_CRETAED.ID);
  const url = 'https://docs.google.com/spreadsheets/d/' + spreadSheetId + '/export?';
  const opts = {
    exportFormat: 'pdf',      // ファイル形式の指定 pdf / csv / xls / xlsx
    format: 'pdf',      // ファイル形式の指定 pdf / csv / xls / xlsx
    // size: 'A4',       // 用紙サイズの指定 legal / letter / A4
    // portrait: 'true',     // true → 縦向き、false → 横向き
    // fitw: 'true',     // 幅を用紙に合わせるか
    // sheetnames: 'false',    // シート名を PDF 上部に表示するか
    // printtitle: 'false',    // スプレッドシート名を PDF 上部に表示するか
    // pagenumbers: 'false',    // ページ番号の有無
    // gridlines: 'false',    // グリッドラインの表示有無
    // fzr: 'false',    // 固定行の表示有無
    // range: SHEET.PDF_FORMAT.RANGE,  // 対象範囲「%3A」 = : (コロン)  
    gid: shtId    // シート ID を指定 (省略する場合、すべてのシートをダウンロード)
  };

  const urlExt = [];
  for (optName in opts) {
    urlExt.push(optName + '=' + opts[optName]);
  }

  const options = urlExt.join('&');

  console.log(options);
  console.log(url);
  const token = ScriptApp.getOAuthToken();
  const response = UrlFetchApp.fetch(url + options, {
    headers: {
      'Authorization': 'Bearer ' + token
    }
  });

  const time = Utilities.formatDate(new Date(), 'JST', 'HH:mm:ss');
  const blob = response.getBlob().setName(fileName + '_' + time + '_' + '.pdf');
  folder.createFile(blob);  //　PDFを指定したフォルダに保存

}