var locals = {"bookTitles":["The Call of the Wild","White Fang"],"allFiles":["style.css","script.js","reader.js","index.html","/","./books/txt/The%20Call%20of%20the%20Wild.txt","./books/mobi/The%20Call%20of%20the%20Wild.mobi","./books/html/The%20Call%20of%20the%20Wild.html","./books/txt/White%20Fang.txt","./books/mobi/White%20Fang.mobi","./books/html/White%20Fang.html"]};

var urls = locals.allFiles; // this will be taken care of by concatting
var CACHE = 'cache-and-update';

self.addEventListener('install', function(evt) {
  console.log('The service worker is being installed.');
  evt.waitUntil(precache());
});

self.addEventListener('fetch', function(evt) {
  console.log('The service worker is serving the asset.');
  evt.respondWith(fromCache(evt.request));
  evt.waitUntil(update(evt.request));
});

function precache() {
  console.log('the service worker is precaching')
  return caches.open(CACHE).then(function (cache) {
    return cache.addAll(urls);
  });
}

self.addEventListener('message',function(e){
  if(e.data.method == 'cache'){
    addToCache(e.data.urls).then(function(){
      console.log('saved em')
      e.ports[0].postMessage({method:'saved',urls:e.data.urls,title:e.data.title})
    })
  }else{
    console.log('idk what to do with this: ')
    console.log(e)
  }
})

function addToCache(urls){
  console.log('adding '+urls.length+' to cache')
  return caches.open(CACHE).then(function (cache) {
    return cache.addAll(urls);
  });
}

function fromCache(request) {
  return caches.open(CACHE).then(function (cache) {
    return cache.match(request).then(function (matching) {
      return matching || Promise.reject('no-match');
    });
  });
}

function update(request) {
  return caches.open(CACHE).then(function (cache) {
    return fetch(request).then(function (response) {
      return cache.put(request, response);
    });
  });
}
