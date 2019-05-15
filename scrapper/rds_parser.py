from bs4 import BeautifulSoup

def parse(table_rows):    
	course_list = []

	for idx, row in enumerate(table_rows):
		# skip the table headers
		if idx == 0:
			continue

		row_data = row.find_all('td')
		
		course_json = dict()
		course_json['index'] = idx
		course_json['name'] = row_data[1].string.strip()
		course_json['section'] = row_data[2].string.strip()
		course_json['faculty'] = row_data[3].string.strip()
		course_json['time'] = row_data[4].string.strip()
		course_json['room'] = row_data[5].string.strip()
		course_json['capacity_remaining'] = row_data[6].string.strip()

		course_list.append(course_json)

	return course_list
