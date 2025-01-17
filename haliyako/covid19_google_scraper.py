import re
import random
import threading
from datetime import datetime
from flask import request, render_template, flash, redirect, url_for, json, jsonify

import time
from bs4 import BeautifulSoup
from requests import Response

from haliyako.models import  News
from haliyako import db
import requests

def kenya_covid19_news():

    # no_go = ['Helpnetsecurity.com','The American Conservative','Rawstory.com','Kidsactivitiesblog.com',
    #          'Antiwar.com','Freemalaysiatoday.com','Ndtv.com','Itsecuritynews.info']
    #
    #
    # url = ('http://newsapi.org/v2/everything?'
    #        'q=corona AND (covid OR africa) &'
    #        'from=2020-04-20&'
    #        'language=en&'
    #        'sortBy=popularity&'
    #        'pageSize=100&'
    #        'apiKey=b0a5dd1ecdb54bb5af6906abba48431a')
    #
    # response: Response = requests.get(url)
    # news =  response.json().get("articles")
    # for n in news:
    #     source = n["source"]["name"]
    #     if source not in no_go:
    #         title = n["title"]
    #         new = News.query.filter(News.title == title).first()
    #         if new is None and n["urlToImage"] is not None and n["content"] is not None:
    #             new = News(title=title, body=n["content"], source=n["source"]["name"],
    #                        image_link=n["urlToImage"], news_link=n["url"], date=n["publishedAt"], likes=0, dislikes=0)
    #             db.session.add(new)
    #             db.session.commit()

    # kenyans = []
    # stars = []
    # news = []
    # for i in range(3):
    #     news += scrap_voa(i)
    # for i in range(4):
    #     kenyans += scrap_kenyans(i)
    #     if len(kenyans) > 13:
    #         break
    #
    # for i in range(4):
    #     stars += scrap_star(i)
    #     if len(stars) > 13:
    #         break
    #
    # news += scrap_aljazeera()
    # shortln = 0
    # longln = 0
    # if len(kenyans) < len(stars):
    #     shortln = len(kenyans)
    #     longln = len(stars)
    # else:
    #     shortln = len(stars)
    #     longln = len(kenyans)
    # i = 0
    # for i in range(shortln):
    #     news.append(kenyans[i])
    #     news.append(stars[i])
    # for j in range(i, longln):
    #     if len(kenyans) < len(stars):
    #         news.append(stars[j])
    #     else:
    #         news.append(kenyans[j])
    news_star = []
    for i in range(1,4):
        news_star = scrap_star(i) + news_star
        if len(news_star) > 20:
            break

    news_kenyans = []
    for i in range(1, 4):
        news_kenyans = scrap_kenyans(i) + news_kenyans
        if len(news_kenyans) > 20:
            break

    news_voa = []
    for i in range(0, 4):
        news_voa = scrap_voa(i) + news_voa
        if len(news_voa) > 20:
            break
    news = scrap_aljazeera()
    print("aljazeera complyet", len(news_star), len(news_kenyans), len(news_voa))
    news = news + news_star + news_kenyans + news_voa

    print("scrap complete  ")
    # for n in news:
    #     new = News.query.filter(News.title.contains(n["title"])).first()
    #     new1 = News.query.filter(News.body.contains(n["body"])).first()
    #
    #     if new is None and new1 is None and check_db_req(n):
    #         new = News(title=n["title"], body=n["body"], source=n["source"],
    #                    image_link=n["image_link"], news_link=n["news_link"], date=n["date"], likes=0, dislikes=0,
    #                    filter=n["filter"])
    #         db.session.add(new)
    #         db.session.commit()
    #
    #
    # numNews = News.query.count() - 1000
    # if numNews >= 0:
    #     oldNews = News.query.order_by(News.id).limit(numNews).all()
    #     for n in oldNews:
    #         db.session.delete(n)
    #         db.session.commit()
    #

    return news

def add_db(n):
    new = News.query.filter(News.title.contains(n["title"])).first()
    new1 = News.query.filter(News.body.contains(n["body"])).first()

    if new is None and new1 is None and check_db_req(n):
        new = News(title=n["title"], body=n["body"], source=n["source"],
                   image_link=n["image_link"], news_link=n["news_link"], date=n["date"], likes=0, dislikes=0,
                   filter=n["filter"])
        db.session.add(new)
        db.session.commit()




def scrap_voa(i):
    print("Getting news voa")
    news_list = []
    url = "https://www.voanews.com/africa?date=&to=&page=" + str(i)
    source = requests.get(url).text
    soup = BeautifulSoup(source, 'lxml')
    topics = soup.find('div', class_="grid vertical-list vertical-list--")
    for t in topics.find_all('div', class_="col-1 vertical-list__item vertical-list__item--"):
        try:
            img = t.find("img")
            image_link = img["src"].strip()
            body = img["alt"].strip()
            teaser_title = t.find("a", class_="teaser__title-link")
            title = teaser_title["title"].strip()
            news_link = "https://www.voanews.com" + teaser_title["href"].strip()
            body = t.find("div", class_= "teaser__text").text.strip() + " ." + body.strip()
            news_list.append({
                "title": title,
                "image_link": image_link,
                "news_link": news_link,
                "body": body,
                "date": "",
                "source": "voa",
                "filter": "africa"

            })
        except:
            print("video")

    print("got news: voa")

    return news_list

def scrap_star(i):
    print("Getting news star  " + str(i))
    news_list = []
    url = "https://www.the-star.co.ke/covid-19/?limit=30&page=" + str(i) + "&partial=true"
    source = requests.get(url).text
    source = re.sub("\\\*", "", source)
    source = source[11:]
    source = source[:len(source)-2]
    sections = source.split("section-article section-article-")
    for j in range(1, len(sections)):
        s = sections[j]
        img_body = s.split("article-content col")
        img_div = img_body[0]
        body_div = img_body[1]
        href_s = body_div.split("a href=")[1]
        h3_s = href_s.split("<h3 ")
        news_link = "https://www.the-star.co.ke" + h3_s[0].split('"')[1].strip()
        h3_p = h3_s[1].split("</h3>")
        title = h3_p[0].split("card-title>")[1].strip()
        body = h3_p[1].split("</p>")[0].split("synopsis>")[1].strip()
        image_link = "https://" + img_div.split("data-background-image=")[1].split("data-background-position")[0].split('"')[1][2:].strip()
        news_list.append({
            "title": title,
            "image_link": image_link,
            "news_link": news_link,
            "body": body,
            "date": "12/12/1212",
            "source": "the-star",
            "filter": "kenya"
        })
    print("got News star")
    return news_list
def getTextContent():
    url = "https://www.aljazeera.com/topics/events/coronavirus-outbreak.html"
    source = requests.get(url).text
    if source == '':
        print("source is empty")
        threading.Timer(180, getTextContent).start()
    else:
        return source

def scrap_aljazeera():
    news_list = []
    print("gettting news: aljazeera")
    url = "https://www.aljazeera.com/topics/events/coronavirus-outbreak.html"
    source = requests.get(url, timeout=60).text
    #source = getTextContent()
    soup = BeautifulSoup(source, 'lxml')
    topics = soup.find('div', class_="topics-sec-block")
    for t in topics.find_all('div', class_="row topics-sec-item default-style"):
        title = t.find("h2").text
        time = t.find("time").text
        body = t.find("p", class_="topics-sec-item-p").text
        img_div = t.find("div", class_="col-sm-5 topics-sec-item-img")
        news_link = "https://www.aljazeera.com/" + img_div.find("a", class_="centered-video-icon")["href"]
        image_link = "https://www.aljazeera.com/" + img_div.find("img", class_="img-responsive lazy")["data-src"]
        source = "aljazeera"
        date = getAljazeeraTime(time)
        news_list.append({
            "title": title.strip(),
            "image_link": image_link.strip(),
            "news_link": news_link.strip(),
            "body": body.strip(),
            "date": date,
            "source": source,
            "filter": "world"

        })

    print("got news: aljazeera")

    return news_list

def scrap_kenyans(i):
    news_list = []
    print("gettting news: Kenyans ", i)
    url = "https://www.kenyans.co.ke/news?wrapper_format=html&page=" + str(i)
    source = requests.get(url, timeout=60).text
    soup = BeautifulSoup(source, 'lxml')
    list_news = soup.find_all('li', class_="news-list-story clearfix")
    for i, new in enumerate(list_news):
        news_link = "https://www.kenyans.co.ke" + new.find('div', class_='news-image').find("a")["href"]
        image_link = "https://www.kenyans.co.ke" + new.find('div', class_="news-image").find("img")['data-src']
        title = new.find("h2").text
        body = new.find('div', class_='news-body').text
        clock = new.find('span', class_='backlink-date').text
        news_list.append({
            "title": title.strip(),
            "image_link": image_link.strip(),
            "news_link": news_link.strip(),
            "body": body.strip(),
            "date": getKenyansTime(clock),
            "source": "Kenyans",
            "filter": "kenya"
        })
        if i +2 == len(list_news):
            break
    print("got news:Kenyans")

    return news_list

def getKenyansTime(time):
    arr = time.split(" ")
    day = arr[0]
    month = arr[1]
    year = arr[2]
    time = arr[4]
    months_dict = [{
        "January": "1",
        "February": "2",
        "March": "3",
        "April": "4",
        "May": "5",
        "June": "6",
        "July": "7",
        "August": "8",
        "September": "9",
        "October": "10",
        "November": "11",
        "December": "12"
    }]
    month = months_dict[0].get(month)
    date = day + "/" + month + '/' + year + " " + time
    return date

def getAljazeeraTime(time):
    arr = time.split(" ")
    day = arr[0]
    month = arr[1]
    year = arr[2]
    time = arr[3]
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
    date = day + "/" + month + '/' + year + " " + time
    return date

def scrap_standard(i):
    news_list = []
    print("gettting news standard ", i)
    url = "https://www.standardmedia.co.ke/home/author_loadmore/topic/coronavirus/" + str(i)
    source = ""
    try:
        source = requests.get(url, timeout=60).text
    except:
        print("error from getting standard")

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
                "source": "Standard",
                "filter" : "kenya"
            })

    # print(requests.get(news_list[0].get("news_link"), timeout=60).text)
    for n in news_list:
        page = ""
        try:
            page = requests.get(n.get("news_link"), timeout=60).text
        except:
            continue
        soup_cont = BeautifulSoup(page, 'lxml')
        article_body = soup_cont.find("div", class_="article-body")
        try:
            clock = article_body.find("ul", class_="article-meta").find("li").text
            body = article_body.text
            body = body.split("SEE ALSO:")[0].split("+0300")[1]
            body = body.strip("\n")
            body = body.replace("\n", " ")
            arr_body = body.split(".")
            body = arr_body[0] + "."
            body = body.strip(" ")
            clock = clock.strip(" ")
            comb = standard_get_date_author(clock)
            n["body"] = body
            n["date"] = comb[1]
            n["source"] = "Standard"

        except:
            x=0

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