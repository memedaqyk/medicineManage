import requests
from requests.exceptions import RequestException
from bs4 import BeautifulSoup
from multiprocessing import Pool

# 请求头,以便能够访问到登录后的页面
tianYanHeaders = {
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
    'Accept-Encoding': 'gzip, deflate, br',
    'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8',
    'Connection': 'keep-alive',
    'Cookie': 'aliyungf_tc=AQAAAJxaE2mkRwAAUbEccMNQJ8bBc7xa; csrfToken=YemloY_mi4wy_ar6jgquGxlV; TYCID=2e61e5e03d3c11e889f6b9d4683ecb1d; undefined=2e61e5e03d3c11e889f6b9d4683ecb1d; ssuid=6594947316; Hm_lvt_e92c8d65d92d534b0fc290df538b4758=1523418934; RTYCID=e20f410fc7b94fea8c54c5ebeaab150f; tyc-user-info=%257B%2522token%2522%253A%2522eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxODMyNjEzMTQ0NiIsImlhdCI6MTUyMzQxOTk2OSwiZXhwIjoxNTM4OTcxOTY5fQ.OR64z_D2LRbDHzFePsLp8r5lA9VhmkAg0b8IRmag6sYnjfj6gpQ6vUHvdKbeUeTEGcp-zvpQCPf1sU-rq2D1qw%2522%252C%2522integrity%2522%253A%25220%2525%2522%252C%2522state%2522%253A%25220%2522%252C%2522redPoint%2522%253A%25220%2522%252C%2522vipManager%2522%253A%25220%2522%252C%2522vnum%2522%253A%25220%2522%252C%2522onum%2522%253A%25220%2522%252C%2522mobile%2522%253A%252218326131446%2522%257D; auth_token=eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxODMyNjEzMTQ0NiIsImlhdCI6MTUyMzQxOTk2OSwiZXhwIjoxNTM4OTcxOTY5fQ.OR64z_D2LRbDHzFePsLp8r5lA9VhmkAg0b8IRmag6sYnjfj6gpQ6vUHvdKbeUeTEGcp-zvpQCPf1sU-rq2D1qw; Hm_lpvt_e92c8d65d92d534b0fc290df538b4758=1523421329',
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 Safari/537.36'
}

# 获得页面的html
def get_one_page(url):
    try:
        response = requests.get(url, headers=tianYanHeaders)
        if response.status_code == 200:
            return response.text
        return None
    except RequestException:
        return None

# 解析首页
def parse_one_page(html):
    try:
        soup = BeautifulSoup(html, 'lxml')
        res = soup.select('.search_right_item.ml10 a')[0].attrs['href']
        return res
    except:
        return None

# 解析地址页面
def parse_other_page(html, loc):
    try:
        soup = BeautifulSoup(html, 'lxml')
        location1 = soup.select('.in-block.vertical-top .in-block.overflow-width.vertical-top')[0].attrs['title']
        location2 = soup.select('.in-block.vertical-top .in-block.overflow-width.vertical-top')[1].attrs['title']
        if location2 == loc:
            return location1
        return location2
        # com = soup.select('.position-rel .f18.in-block.vertival-middle.sec-c2')[0].get_text()


    except:
        return None

def write_to_file(id, searthLoc, location):
    with open('result.txt', 'a', encoding='utf-8') as f:
        f.write(id + " " + location + " " + searthLoc)
        f.write('\n')
        f.close()

def main(idAndLocation):
    id = str(idAndLocation).split(" ")[0]
    location = str(idAndLocation).split(" ")[1]
    url = 'https://www.tianyancha.com/search?key=' + str(location)
    html = get_one_page(url)
    # print(html)
    otherUrl = parse_one_page(html)
    # print(otherUrl)
    otherHtml = get_one_page(otherUrl)
    # print(otherHtml)
    searthLoc = parse_other_page(otherHtml, location)
    if searthLoc:
        write_to_file(id, searthLoc, location)
        print(searthLoc)
        return
    with open('err.txt', 'a', encoding='utf-8') as f:
        f.write(id + " " +location + '\n')


if __name__ == '__main__':
    company = []
    with open('company.txt', 'r', encoding='utf-8') as f:
        for item in f.readlines():
            company.append(item.strip('\n'))
        f.close()
    pool = Pool()
    pool.map(main, [item for item in company])
