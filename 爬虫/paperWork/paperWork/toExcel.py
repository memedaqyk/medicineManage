import xlsxwriter
import re

workbook = xlsxwriter.Workbook('demo.xlsx')
worksheet = workbook.add_worksheet()

worksheet.set_column('A:A', 6)
with open('coor.txt', 'r', encoding='utf-8') as f:
    i = 0
    for item in f.readlines():
        res = re.search("\['(.*?)', '(.*?)', '(.*?)', '(.*?),(.*?)'\]", item, re.S)
        id = res.group(1)
        company = res.group(2)
        location = res.group(3).strip("\n")
        latitude = res.group(4)
        longitude = res.group(5)
        worksheet.write(i,0, id)
        worksheet.write(i,1, company)
        worksheet.write(i,2, location)
        worksheet.write(i,3, latitude)
        worksheet.write(i,4, longitude)
        i = i + 1
