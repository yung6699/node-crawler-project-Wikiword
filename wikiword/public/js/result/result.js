document.addEventListener('DOMContentLoaded', () => {

  eventSetting();

  getJSONData({port: 12000, type: 'news',pageNum:1}, (item) => {
    return `<div class="news"><a class="news-title" href="${item.link}">${item.title}</a>
                     <news-description>${item.description}</news-description>
                     <news-date>${newDateForm(now - new Date(item.pubDate).getTime())}</news-date>
                     </div>`;
  });


  getJSONData({port: 12000, type: 'book',pageNum:1}, (item) => {
    return `<div class="book"><a class="book-title" href="${item.link}">${item.title}</a>
            <img src="${item.image}"/><book-description>${item.description}</book-description>
            <book-date>${item.pubdate.replace(/(\d{4})(\d{2})(\d{2})/, "$1-$2-$3").replace(/-/g, "-")}</book-date></div>`;
  });


  getJSONData({port: 13000, type:'youtube',pageNum:''}, (item) => {
    return `<div class="youtube"><a class="youtube-title" href='https://www.youtube.com/watch?v=${item.video_id}'>
            <img src="${item.thumbnail}"/><youtube-title>${item.title}</youtube-title></a>
            <youtube-date>${newDateForm(now - new Date(item.pubDate).getTime())}</youtube-date></div>`;
  });

  getJSONData({port: 14000, type:'twitter'}, (item) => {
      return `<div class="twitter"><img src="${item.profile_image_url}"/>
              <twitter-text>${item.text}</twitter-text>
              <twitter-name>${item.name}</twitter-name>
              <twitter-date>${newDateForm(now - new Date(item.pubDate).getTime())}</twitter-date></div>`;
  });


  getJSONData({port: 16000, type:'dbpia',pageNum:1}, (item) => {
   return `<div class="dbpia"><a class="dbpia-title" href="${item.link_url}">${item.title}</a>
           <dbpia-pages>${item.pages}</dbpia-pages>
           <dbpia-date>${newDateForm(now - new Date(item.pubDate).getTime())}</dbpia-date></div>`;
  });

})