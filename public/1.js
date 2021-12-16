// 🌰
var book = {
  title: 'Professional JavaScript',
  authors: ['Nicholas C. Zakas'],
  edition: 3,
  year: 2011
}
// var jsonText = JSON.stringify(book, null)  //全选
// var jsonText = JSON.stringify(book, null, "--")
var jsonText = JSON.stringify(book, ['title', 'edition'], 2)
original_download(jsonText, 'demo.json')
