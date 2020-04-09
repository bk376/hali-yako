from bs4 import BeautifulSoup
import requests


def kenya_covid19_news():
    news_list = []

    source = requests.get('https://news.google.com/search?q=covid-19&hl=en-KE&gl=KE&ceid=KE%3Aen').text
    soup = BeautifulSoup(source, 'lxml')
    # print(soup.prettify())
    news = soup.find('div', class_='lBwEZb BL5WZb xP6mwf')

    # limit news to first 20
    for some_news in soup.find_all('div', class_="NiLAwe y6IFtc R7GTQ keNKEd j7vNaf nID9nc", limit=20):
        content = some_news.find('a', class_="DY5T1d")
        title = content.text

        date_posted = some_news.find('time', class_="WW6dff uQIVzc Sksgp").text

        news_link = content['href']
        news_link = news_link.split("?")[0]
        news_link = "https://news.google.com" + news_link[1:]

        # get news from actual site
        news_text = requests.get(news_link).text
        news_source = BeautifulSoup(news_text, 'lxml')
        # print(f"news source: {news_source}")

        try:
            image = some_news.find('img', class_="tvs3Id QwxBBf")['src']
        except Exception as e:
            image = None

        news_list.append({
            "title": title,
            "date_posted": date_posted,
            "image_link": image,
            "news_link": news_link
        })

        # print(f"collected stuff: {news_list}")

    return news_list