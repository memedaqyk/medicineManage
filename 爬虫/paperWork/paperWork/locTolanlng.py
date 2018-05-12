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
    with open('result.txt', 'r', encoding='utf-8') as f:
        for item in f.readlines():
            id = item.split(' ')[0]
            companyName = item.split(' ')[1]
            loc = item.split(' ')[2]
            res = search(loc)
            try:
                res = re.search('(31.*?,11.*?) .*?', res).group(1)
                coor.append([id, companyName, loc, res])
            except:
                coor2.append([id, companyName, loc])

    with open('coor.txt', 'a', encoding='utf-8') as f:
        for item in coor:
            f.write(str(item) + '\n')

    with open('coorErr.txt', 'a', encoding='utf-8') as f:
        for item in coor2:
            f.write(str(item) + '\n')

def main():
    readAndWrite()
    brower.close()

if __name__ == '__main__':
    main()




