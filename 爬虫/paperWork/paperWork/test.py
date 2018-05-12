import re

from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import TimeoutException
from time import sleep

brower = webdriver.Chrome()

wait = WebDriverWait(brower, 10)

def search(loc):
    try:
        brower.get('http://www.gpsspg.com/maps.htm')
        input = wait.until(
            EC.presence_of_element_located((By.CSS_SELECTOR, '#s_t'))
        )
        submit = wait.until(EC.element_to_be_clickable((By.CSS_SELECTOR, '#s_btn')))
        input.send_keys(loc)
        submit.click()
        sleep(0.3)
        coor = wait.until(EC.presence_of_element_located((By.CSS_SELECTOR, '#curr_xy')))
        return coor.text
    except TimeoutException:
        return search()

def readAndWrite():
    coor = []
    coor2 = []
    loc = ''
    with open('coorErr.txt', 'r', encoding='utf-8') as f:
        for item in f.readlines():
            res = re.search("\['(.*?)', '(.*?)', '(.*?)'\]", item, re.S)
            id = res.group(1)
            company = res.group(2)
            loc = res.group(3)
            res = search(loc)
            try:
                res = re.search('(31.*?,11.*?) .*?', res).group(1)
                coor.append([id, company, loc, res])
            except:
                coor2.append([id, company, loc])

    with open('coor2.txt', 'a', encoding='utf-8') as f:
        for item in coor:
            f.write(str(item) + '\n')

    with open('coorErr2.txt', 'a', encoding='utf-8') as f:
        for item in coor2:
            f.write(str(item) + '\n')

def main():
    readAndWrite()
    brower.close()

if __name__ == '__main__':
    main()

