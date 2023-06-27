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
        'script',
        'category',
        'tag',
        'about'
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
# print(category_tree)

yaml_string= yaml.dump(category_tree, encoding='utf-8', allow_unicode=True)
# print(yaml_string.decode('utf-8'))

with open('./_data/category_structure.yml', 'w', encoding="utf-8") as f:
    f.write(yaml_string.decode('utf-8'))

def generate_category_md(object):
    category_name = object['name']
    subcategory_list = object['subcategory']
    result = '---\n'
    result += 'title: "카테고리: ' + category_name + '"'
    result += '\n'
    result += 'layout: category'
    result += '\n'
    result += 'category_name: "' + category_name + '"'
    result += '\n'
    subcatstring = ' '.join(subcategory_list)
    if subcatstring == '':
        subcatstring = '[]'
    result += 'subcategories: '+ subcatstring
    result += '\n'
    result += '---\n'

    return result

scan_queue = []
scan_list = []
for aDir in category_tree[0]['subcategory']:
    scan_queue.append("./"+aDir)
    scan_list.append("./"+aDir)

while len(scan_queue) != 0:
    targetPath = scan_queue.pop(0)
    dirName = targetPath.split("/")[-1]
    # isPostDir = targetPath.split("/")[-1] == '_posts'
    # parentDir = targetPath.split("/")[-2]
    with open(targetPath+'/index.md', 'w', encoding="utf-8") as f:
        doc = generate_category_md(category_tree[index_of_name(category_tree, dirName)])
        f.write(doc)

    for aDir in category_tree[index_of_name(category_tree, dirName)]['subcategory']:
        scan_queue.append(targetPath+'/'+aDir)
        scan_list.append(targetPath+'/'+aDir)

print(scan_list)