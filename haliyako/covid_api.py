import requests


def current_covid19_numbers():
    response = requests.get(
        'https://covid-193.p.rapidapi.com/statistics',
        headers={
            "x-rapidapi-host": "covid-193.p.rapidapi.com",
            "x-rapidapi-key": "71cb7b3ddfmsh80e8f3198c7f55cp1d3ac2jsnaec98be05790"
        }
    )

    json_response = response.json()
    res = json_response.get("response")
    return res
