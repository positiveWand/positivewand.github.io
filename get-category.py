import os
import yaml

exclude_rule = {
    'startswith': [
        '.',
        '_'
    ],
    'blacklist': [
        'assets',
        'css',
        'script'
    ]
}

category_tree = [
    {
        'name': 'home',
        'subcategory': [],
    }
]

def index_of_name(list, name):
    index = 0
    for aItem in list:
        if aItem['name'] == name:
            return index
        index = index + 1
    return -1

def scanDir(targetDir, path):
    scan_queue = []
    if path != ".":
        category_tree.append(
            {
                'name': targetDir,
                'subcategory': []
            }
        )
    for aItem in os.scandir(path):
        next = False
        if aItem.is_dir():
            for startString in exclude_rule['startswith']:
                if aItem.name.startswith(startString):
                    next = True
                    break
            if next:
                continue
            for blackItem in exclude_rule['blacklist']:
                if aItem.name == blackItem:
                    next = True
                    break
            if next:
                continue

            scan_queue.append(aItem.name)
            if path == '.':
                category_tree[index_of_name(category_tree, "home")]["subcategory"].append(aItem.name)
            else:
                category_tree[index_of_name(category_tree, targetDir)]["subcategory"].append(aItem.name)
    # if len(scan_queue) != 0:
    #     category_tree[index_of_name(category_tree, targetDir)]["leaf"] = False
    # else:
    #     category_tree[index_of_name(category_tree, targetDir)]["leaf"] = True
    for aDir in scan_queue:
        scanDir(aDir, path+"/"+aDir)

scanDir(".", ".")
print(category_tree)

yaml_string= yaml.dump(category_tree, encoding='utf-8', allow_unicode=True)
print(yaml_string.decode('utf-8'))

with open('./_data/category_structure.yml', 'w', encoding="utf-8") as f:
    f.write(yaml_string.decode('utf-8'))