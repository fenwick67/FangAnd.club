var allFiles = ['style.css','script.js','reader.js','index.html','/'];

var bookTitles = ['The Call of the Wild','White Fang'];
bookTitles.forEach(function(n){
  var n = encodeURIComponent(n);
  allFiles.push('./books/txt/'+n+'.txt');
  allFiles.push('./books/mobi/'+n+'.mobi');
  allFiles.push('./books/html/'+n+'.html');
});

if (module){  
  module.exports = { bookTitles, allFiles};
}
