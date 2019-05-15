import json
import os

def write_data_to_db(course_list):
	db_path = os.path.abspath('data.json')
	database = open(db_path, 'w')
	json.dump(course_list, database)
	database.close()