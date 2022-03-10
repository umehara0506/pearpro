'use strict'

class Datetime {

  /**
   * 日時に関するコンストラクタ
   * @constructor
   * @param {Date|string|number|...number} date - Date オブジェクトでインスタンス生成可能な引数
   */
  constructor(date = new Date()) {
    /** @type {Date} */
    this.date = new Date(date);
  }

  /**
   * コンストラクタの date オブジェクトを指定のフォーマットで文字列化するメソッド
   * @param {string} format - フォーマットする形式
   * @return {string} フォーマットされた文字列型の日時
   */
  toString(format = 'yyyy年M月d日') {
    const strDate = Datetime.format(this.date, format);
    return strDate;
  }

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