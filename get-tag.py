import sys
import ast
import os
import yaml

def extract_tags(doc):
    striped_doc = doc.strip(" ")
    if striped_doc.startswith("---"):
        yaml_start = 3
        yaml_end = striped_doc.find('---', yaml_start)

        yaml_string = striped_doc[yaml_start:yaml_end]
        yaml_object = yaml.load(yaml_string, Loader=yaml.Loader)

        if 'tags' in yaml_object:
            return yaml_object['tags'].split(' ')
        
    return []

target_dir_list = ast.literal_eval(sys.argv[1])
tags = set()

for aDir in target_dir_list:
    for subDir in os.scandir(aDir):
        if subDir.is_dir() and subDir.name == '_posts':
            for doc_name in os.scandir(aDir+'/_posts'):
                with open(aDir+'/_posts/'+doc_name.name, 'r', encoding="utf-8") as f:
                    doc = f.read()
                    doc_tags = extract_tags(doc)
                    tags = set(doc_tags).union(tags)

yaml_string= yaml.dump(sorted(list(tags)), encoding='utf-8', allow_unicode=True)

with open('./_data/tags.yml', 'w', encoding="utf-8") as f:
    f.write(yaml_string.decode('utf-8'))