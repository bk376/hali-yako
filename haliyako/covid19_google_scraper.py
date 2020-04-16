from bs4 import BeautifulSoup
from haliyako.models import  News
from haliyako import db
import requests


def kenya_covid19_news():
    print("gettting news")
    news = scrap_standard()
    print("scrap complete  ", len(news))
    for n in news:
        new = News.query.filter(News.title == n["title"]).first()
        if new is None:
            new = News(title=n["title"], body=n["body"], source=n["source"],
                       image_link=n["image_link"], news_link=n["news_link"], date=n["date"], likes=0)
            db.session.add(new)
            db.session.commit()

    print("got news")
    return "success"
def scrap_kenyans():
    news_list = []
    print("gettting news")
    url = "https://www.kenyans.co.ke/news?wrapper_format=html&page=0"
    source = requests.get(url, timeout=60).text
    soup = BeautifulSoup(source, 'lxml')
    for new in soup.find_all('li', class_="news-list-story clearfix"):
        news_link = "https://www.kenyans.co.ke" + new.find('div', class_='news-image').find("a")["href"]
        image_link = "https://www.kenyans.co.ke" + new.find('div', class_="news-image").find("img")['data-src']
        title = new.find("h2").text
        body = new.find('div', class_='news-body').text
        clock = new.find('span', class_='backlink-date').text
        print(news_link, "\n", image_link, "\n", title, "\n", body, "\n", clock, "\n")
        news_list.append({
            "title": title,
            "image_link": image_link,
            "news_link": news_link,
            "body": body,
            "date": clock,
            "source": ""
        })

    print("got news")
    return news_list


def scrap_standard():
    news_list = []
    print("gettting news")
    url = "https://www.standardmedia.co.ke/home/author_loadmore/topic/coronavirus/2"
    source = requests.get(url, timeout=60).text
    soup = BeautifulSoup(source, 'lxml')
    for card in soup.find_all('div', class_="card-group row"):
        for col in card.find_all('div', class_='col-12 col-md-6 col-lg-3'):
            img_div = col.find('div', class_='author-img')
            link_style = img_div.find("a").find("div")['style']
            image_link = getImgLink(link_style)
            title = col.find('h6').find("a").text.split("\n")[1]
            news_link = col.find('h6').find("a")['href']
            # print(news_link)
            news_list.append({
                "title": title,
                "image_link": image_link,
                "news_link": news_link,
                "body": "",
                "date": "",
                "source": "standard"
            })

    # print(requests.get(news_list[0].get("news_link"), timeout=60).text)
    for n in news_list:
        page = requests.get(n.get("news_link"), timeout=60).text
        soup_cont = BeautifulSoup(page, 'lxml')
        article_body = soup_cont.find("div", class_="article-body")
        try:
            clock = article_body.find("ul", class_="article-meta").find("li").text
            body = article_body.text
            body = body.split("SEE ALSO:")[0].split("+0300")[1]
            body = body.strip("\n")
            body = body.replace("\n", " ")
            body = body[:300]
            body = body.strip(" ")
            clock = clock.strip(" ")
            comb = standard_get_date_author(clock)
            n["body"] = body
            n["date"] = comb[1]
            n["source"] = comb[0]

        except:
            print("An exception occurred")

    return news_list

def standard_get_date_author(clock):
    arr = clock.split(" ")
    time = arr[len(arr)-3]
    year = arr[len(arr)-4]
    month = arr[len(arr)-5]
    day = arr[len(arr)-6]
    months_dict = [{
        "Jan": "1",
        "Feb": "2",
        "Mar": "3",
        "Apr": "4",
        "May": "5",
        "Jun": "6",
        "Jul": "7",
        "Aug": "8",
        "Sep": "9",
        "Oct": "10",
        "Nov": "11",
        "Dec": "12"
    }]
    month = months_dict[0].get(month)
    day = day[:2]
    if not day[1].isdigit:
        day = day[:1]
    date = day+"/"+month+'/'+year + " " + time
    author = ""
    for i,a in enumerate(arr):
        if i < len(arr)-6:
            author += a + " "
    return [author, date]

def getImgLink(div):
    arr = div.split(" ")
    link = arr[1][4:-2]

    return link