window.addEventListener('DOMContentLoaded', function() {
function search(engine) { 
    const keyword =document.querySelector("body > header > div > div.nav-main.container.container--flex > div.m_search > form > input").value
    switch (engine) { 
        case "baidu":
            window.open("https://www.baidu.com/s?wd=" + keyword)
            break;
        case "google":
            window.open("https://www.google.com/search?q=" + keyword)
            break;
        case "bing":
            window.open("https://www.bing.com/search?q=" + keyword)
            break;
        case "yahoo":
            window.open("https://search.yahoo.com/search?p=" + keyword)
            break;
        case "so":
            window.open("https://www.sogou.com/web?query=" + keyword)
            break;

    }
    return false;
}
}, false);