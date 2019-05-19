import json
import requests
api_url_base = 'https://stats.nba.com/stats/playercareerstats?LeagueID=&PerMode=Totals&PlayerID=2544'
headers = {'Content-Type': 'application/json' }
            # 'Authorization': 'Bearer {0}'.format(api_token)}

def get_nba_scores_by_date():
    api_url = format(api_url_base)
    response = requests.get(api_url, headers=headers)
    if response.status_code == 200:
        return json.loads(response.content.decode('utf-8'))
    else:
        return None

account_info = get_nba_scores_by_date()
if account_info is not None:
    print("Here's your info: ")
    for k, v in account_info['account'].items():
        print(format(k, v))
else:
    print('[!] Request Failed')