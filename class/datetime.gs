'use strict'

class Datetime {

  /**
   * 指定のフォーマットで日時を文字列化する静的メソッド
   * @param {Date} d - Date オブジェクト 文字列型も可
   * @param {string} format - フォーマットする形式
   * @return {string} フォーマットされた文字列型の日時
   */
  static format(d = new Date(), format = 'yyyy年M月d日') {
    const date = new Date(d);
    const strDate = Utilities.formatDate(date, 'JST', format);
    return strDate;
  }

}