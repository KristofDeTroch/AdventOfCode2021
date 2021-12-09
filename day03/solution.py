import os

file = open('day03/input.txt')
data = file.readlines()
file.close
size = 12

gen = data
for j in range(size):
  pos = []
  neg = []
  for i in range(len(gen)): 
    if gen[i][j]=='0':
      neg.append(gen[i])
    else:
      pos.append(gen[i])

    
  gen = pos if len(pos) >= len(neg)  else  neg
print(gen)

scrub = data
for j in range(size):
  pos = []
  neg = []
  for i in range(len(scrub)): 
    if scrub[i][j]=='0':
      neg.append(scrub[i])
    else:
      pos.append(scrub[i])
  if (len(pos) == 1):
    scrub = pos
    break
  if (len(neg) == 1):
    scrub = neg
    break
  scrub = pos if  len(pos) < len(neg) else  neg


print(scrub)


