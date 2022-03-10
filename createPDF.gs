function createPDF() {

  const ss = SpreadsheetApp.getActiveSpreadsheet();

  const sht = ss.getSheetByName(SHEET.DATE.NAME);
  let values = sht.getDataRange().getValues()
  const header = values.shift();
  values = values.filter(record => record[0]);
  console.log({ values, header });

  /** ほしいカラムの設定 */
  const CHANGE_COLUMNS = {
    getIndex(propertyName) {
      return this[propertyName]['index'];
    },
    '契約先名（乙）': {
      range: 'C11',
      index: null,
      makeText(record) { return record[this.index] }
    },
    '業務内容': {
      range: 'D13',
      index: null,
      makeText(record) { return record[this.index] }
    },
    '受託開始期間': {
      range: 'D14',
      index: null,
      makeText(record) {
        const date = Utilities.formatDate(record[this.index], 'JST', 'yyyy年M月d日');
        const zenkakuDate = convHankakuToZenkaku_(date);
        return zenkakuDate;
      }
    },
    '受託終了期間': {
      range: 'D14',
      index: null,
      makeText(record) {
        const date = Utilities.formatDate(record[this.index], 'JST', 'yyyy年M月d日');
        const zenkakuDate = convHankakuToZenkaku_(date);
        return zenkakuDate;
      }
    },
    '委託費(合計)': {
      range: 'D15',
      index: null,
      makeText(record) { return record[this.index] }
    },

    '委託費': {
      range: 'D15',
      index: null,
      makeText(record) {
        let text = '';

        const startDate = new Date(record[CHANGE_COLUMNS.getIndex('受託開始期間')]);
        const endDate = new Date(record[CHANGE_COLUMNS.getIndex('受託終了期間')]);

        const contractMonths = endDate.getMonth() - startDate.getMonth();

        let unitPrice = record[CHANGE_COLUMNS.getIndex('委託費(月額)')];
        unitPrice = convHankakuToZenkaku_(unitPrice);

        // 契約月数分のfor分を回して、テキストを作成
        for (let i = 0; i <= contractMonths; i++) {
          const month = new Date(
            startDate.getFullYear(),
            startDate.getMonth() + i,
            1);
          let contractMonth = Utilities.formatDate(month, 'JST', 'yyyy年M月');
          contractMonth = convHankakuToZenkaku_(contractMonth);

          if (i !== 0) text += '\n';
          text += `${contractMonth}：${unitPrice}円（税抜）`;
        }

        if (record[CHANGE_COLUMNS.getIndex('出張手当')] === true) {
          text += '\n\n※通勤交通費・営業交通費に関しては、別途実費支給とする。';
        };

        return text;
      }
    },
    '委託費(月額)': {
      range: null,
      index: null,
    },
    '出張手当': {
      range: null,
      index: null,
    },

    '作業場所': {
      range: 'D17',
      index: null,
      makeText(record) {
        let text = '１．';

        const workingPlace1 = record[CHANGE_COLUMNS.getIndex('勤務地1')];
        text += workingPlace1

        const workingPlace2 = record[CHANGE_COLUMNS.getIndex('勤務地2')];
        if (workingPlace2) {
          text += '\n２．';
          text += workingPlace2;
        }
      }
    },
    '勤務地1': {
      range: null,
      index: null,
    },
    '勤務地2': {
      range: null,
      index: null,
    },

    '貸与物': {
      range: 'D18',
      index: null,
      makeText(record) { return record[this.index] }
    },

    '業務遂行時間': {
      range: 'D19',
      index: null,
      makeText(record) { return record[this.index] }
    },

    'その他諸条件': {
      range: 'D20',
      index: null,
      makeText(record) {

        let startDate = new Date(record[CHANGE_COLUMNS.getIndex('受託開始期間')]);
        startDate = Utilities.formatDate(startDate, 'JST', 'yyyy年M月');
        startDate = convHankakuToZenkaku_(startDate);

        let endDate = new Date(record[CHANGE_COLUMNS.getIndex('受託終了期間')]);
        endDate = Utilities.formatDate(endDate, 'JST', 'yyyy年M月');
        endDate = convHankakuToZenkaku_(endDate);

        const text = `${startDate}～${endDate}`;
        return text;
      }
    },

    'その他諸条件へ変更': {
      range: null,
      index: null,
      makeText(record) {

        let text = '';

        const unitPrime = record[CHANGE_COLUMNS.getIndex('委託費(月額)')];

        if (unitPrime === 400000) {
          text = '■超過単価：●,●●●円 \n■控除単価：●,●●●円 ';
        }

        if (unitPrime === 450000) {
          text = '■超過単価：●,●●●円 \n■控除単価：●,●●●円 ';
        }

        return text;
      }
    },
  };

  /** indexプロパティをここで追加 */
  for (const key in CHANGE_COLUMNS) {
    CHANGE_COLUMNS[key]['index'] = header.indexOf(key);
  }

  console.log({ CHANGE_COLUMNS });
  const formatSht = ss.getSheetByName(SHEET.PDFFORMAT.NAME);

  
  for (const record of values) {
    const copyiedSht = formatSht.copyTo(ss);

    // 1record毎にFormatのタグを変更していく
    for (const key in CHANGE_COLUMNS) {

      /** getIndexメソッドとrangeプロパティが空白の場合はスキップ */
      if (key === 'getIndex') continue;
      if (CHANGE_COLUMNS[key]['range'] === null) continue;

      /** makeTextメソッドで置換内容のテキストデータを作成 */
      const chengeValue = CHANGE_COLUMNS[key].makeText(record);

      /** rangeプロパティからのRangeからデータ取得して、{{tag}}の内容を置換 */
      const chageText = copyiedSht.getRange(CHANGE_COLUMNS[key]['range']).getValue();
      const changedText = chageText.replace(`{{${key}}}`, chengeValue);

      console.log(`{{${key}}}`, chengeValue);
      copyiedSht.getRange(CHANGE_COLUMNS[key]['range']).setValue(changedText);

    }

    /** オプションで残す行を設定 */
    if (record[CHANGE_COLUMNS['その他諸条件へ変更']['index']] === false) {
      copyiedSht.deleteRow(20);
    }

    if (record[CHANGE_COLUMNS['その他諸条件へ変更']['index']] === true) {
      copyiedSht.deleteRow(19);
    }

    console.log(CHANGE_COLUMNS);

    /** PDF作成に必要なスプレッドシートID、シートID、ファイル名を作成 */
    const spreadSheetId = ss.getId();
    const copyiedShtId = copyiedSht.getSheetId();
    const fileName = record[CHANGE_COLUMNS['契約先名（乙）']['index']];
    exportAsPDF_(spreadSheetId, copyiedShtId, fileName);


    /** PDF作成後にコピーしたシートの削除 */
    ss.deleteSheet(copyiedSht);
  }

  /** チェックボックスの削除 */
  sht.getRange('A:A').getValues().flat().forEach((val, index) => {
    if (val === true) sht.getRange(index + 1, 1).removeCheckboxes();
  });
}

/**
 * PDFを作成してドライブへ保存
 * 設定情報はsetting.gs
 * 
 * @parames {SpreadsheetApp.SpreadSheet} spreadSheetId - スプレッドシートID
 * @parames {SpreadsheetApp.Sheet} shtId - シートID
 * @parames {String} fileName - ファイル名
 */
function exportAsPDF_(spreadSheetId, shtId, fileName) {

  const folder = DriveApp.getFolderById(FOLDER.PDF_CRETAED.ID);
  const url = 'https://docs.google.com/spreadsheets/d/' + spreadSheetId + '/export?';
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
    range: SHEET.PDFFORMAT.RANGE,  // 対象範囲「%3A」 = : (コロン)  
    gid: shtId    // シート ID を指定 (省略する場合、すべてのシートをダウンロード)
  };

  const urlExt = [];
  for (optName in opts) {
    urlExt.push(optName + '=' + opts[optName]);
  }

  const options = urlExt.join('&');

  console.log(options);
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


/** 半角⇒全角変換 */
function convHankakuToZenkaku_(str) {

  if (typeof str === 'number') {
    str = str.toString();
    str = instrComma_(str);
  }

  return str.replace(/[0-9]/g, function (s) {
    return String.fromCharCode(s.charCodeAt(0) + 0xFEE0);
  });

}

/** 数値データにカンマを追加
 * (例)1000000 ⇒ 1,000,000
 * 
 * @params {String} str - カンマを入れたいテキスト
 * @return {String} カンマを入れたテキスト
 */
function instrComma_(str) {
  const length = str.length;

  const ary = str.split('');

  for (let i = 3; i < length; i = i + 3) {
    insertIndex = length - i;
    ary.splice(insertIndex, 0, '，');
    console.log(i);
  }

  const commaInseted = ary.join('');
  console.log({ commaInseted })
  return commaInseted;
}