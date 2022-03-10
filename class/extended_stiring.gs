class ExtendedStiring {

  constructor() {

  }

  static convHankakuToZenkaku(str) {

    const string = typeof str === 'number' ? ExtendedStiring.instrComma(str) : str;
    const replaced = string.replace(/[0-9]/g, s => String.fromCharCode(s.charCodeAt(0) + 0xFEE0));
    return replaced;

  }

  static instrComma(number) {
    const string = number.toLocaleString('ja-JP');
    return string;

  }


}

function test_ExtendedStiring() {
  console.log(ExtendedStiring.convHankakuToZenkaku(555555));
  console.log(ExtendedStiring.convHankakuToZenkaku('あああ'));
  console.log(ExtendedStiring.instrComma(555555));
}