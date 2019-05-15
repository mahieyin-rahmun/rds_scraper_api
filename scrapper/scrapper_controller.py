import get_content as gc
import rds_parser as p
import scrapper as s
import dump as d

def main():
    rqst_obj = gc.get_content_obj_from_rds()
    raw_data = s.scrape(rqst_obj)
    dict_data = p.parse(raw_data)
    d.write_data_to_db(dict_data)    

main()