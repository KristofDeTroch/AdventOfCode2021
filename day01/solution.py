import os

file = open('day01/input.txt')
data = file.readlines()
file.close
count = 0
for i in range(len(data)):
  if int(data[i])>int(data[i-3]):
    count += 1

print(count)