/*

the goal here is to create a HTML2+, JS optional,
w3m compatible ebook viewer / downloader

service worker to follow

*/

navigator.serviceWorker.register('serviceworker.js', {
  scope: '/'
});
