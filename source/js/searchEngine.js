
document.querySelector("body > header > div > div.nav-main.container.container--flex > div.m_search > form").addEventListener('submit',engine=>{
    const keyword =document.querySelector("body > header > div > div.nav-main.container.container--flex > div.m_search > form > input").value
    switch (SEARCH_SERVICE) { 
        case "baidu":
            window.open("https://www.baidu.com/s?wd=" + keyword+"site:"+window.location.host)
            break;
        case "google":
            window.open("https://www.google.com/search?q=" + keyword+"site:"+window.location.host)
            break;
        case "bing":
            window.open("https://www.bing.com/search?q=" + keyword+"site:"+window.location.host)
            break;
        case "yahoo":
            window.open("https://search.yahoo.com/search?p=" + keyword+"site:"+window.location.host)
            break;
        case "sougou":
            window.open("https://www.sogou.com/web?query=" + keyword+"site:"+window.location.host)
            break;

    }
})
