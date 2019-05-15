from bs4 import BeautifulSoup

def scrape(rqst_obj):
	if rqst_obj.status_code == 200:
		soup = BeautifulSoup(rqst_obj.text, 'html.parser')
		table_rows = soup.find_all('tr')
	
	return table_rows
