import requests

def get_content_obj_from_rds():
    return requests.get('https://rds2.northsouth.edu/index.php/common/showofferedcourses')