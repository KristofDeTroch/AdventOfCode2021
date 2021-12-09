import os

file = open('day02/input.txt')
data = file.readlines()
file.close
aim = 0
horizontal = 0
vertical = 0
for i in range(len(data)):
  stringList = data[i].split()
  if stringList[0] == 'forward':
    horizontal += int(stringList[1])
    vertical += int(stringList[1])*aim
  elif stringList[0] == 'down':
    aim += int(stringList[1])
  elif stringList[0] == 'up':
    aim -= int(stringList[1])
      

print(vertical*horizontal)