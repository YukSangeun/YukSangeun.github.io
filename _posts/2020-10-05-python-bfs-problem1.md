---
title: "[프로그래머스]깊이/너비 우선 탐색: 타겟 넘버"
excerpt: "파이썬을 이용한 BFS(list vs deque) / dfs 연습"

toc: true
toc_sticky: true
toc_label: "LIST"

categories:
  - Problem
tags:
  - BFS
  - DFS
  - Python
last_modified_at: 2020-10-05
---

## 문제

> <https://programmers.co.kr/learn/courses/30/lessons/43165?language=python3#>



## 풀이  

파이썬을 이용해 BFS, DFS 문제를 해결했다.



**코드 확인시 포이트**

bfs경우 queue 사용시 list를 이용한 방법과 deque를 이용한 방법이 존재한다.

queue의 LIFO 방식을 위해 

1. list를 사용할 경우 시간복잡도
   1. append : O(1)
   2. pop(0) : O(n)  // 이경우 그냥 pop()을 하게되면 맨 뒤에 원소가 pop된다.
2. deque를 사용한 경우 시간복잡도
   1. append : O(1)
   2. popleft() : O(1)



**deque를 사용할 경우 collections 라이브러리를 import해야한다**



## 코드

```python
import collections

def dfs(numbers, pos, target, sumV):
    ret = 0
    if len(numbers) == pos:
        if sumV == target:
            return 1
        return 0
    
    ret += dfs(numbers, pos+1, target, sumV+numbers[pos])
    ret += dfs(numbers, pos+1, target, sumV-numbers[pos])
    
    return ret

def bfs(numbers, target):
    ret = 0
    dep = 0
    queue = list()
    visit = [[0] * 2001 for i in range(len(numbers)+1)]
    queue.append(0)
    visit[0][1000] = 1
    while dep < len(numbers):
        sz = len(queue)
        while sz :
            here = queue.pop(0)
            new = here + numbers[dep]
            if visit[dep+1][new+1000] == 0:
                queue.append(new)
            visit[dep+1][new+1000] += visit[dep][here+1000]
            new = here - numbers[dep]
            if visit[dep+1][new+1000] == 0:
                queue.append(new)
            visit[dep+1][new+1000] += visit[dep][here+1000]
            sz -= 1
        dep += 1
    
    return visit[dep][target+1000]

def bfs_deque(numbers, target):
    ret = 0
    dep = 0
    queue = collections.deque()
    visit = [[0] * 2001 for i in range(len(numbers)+1)]
    queue.append(0)
    visit[0][1000] = 1
    while dep < len(numbers):
        sz = len(queue)
        while sz :
            here = queue.popleft()
            new = here + numbers[dep]
            if visit[dep+1][new+1000] == 0:
                queue.append(new)
            visit[dep+1][new+1000] += visit[dep][here+1000]
            new = here - numbers[dep]
            if visit[dep+1][new+1000] == 0:
                queue.append(new)
            visit[dep+1][new+1000] += visit[dep][here+1000]
            sz -= 1
        dep += 1
    
    return visit[dep][target+1000]

def solution(numbers, target):
    #answer = dfs(numbers, 0, target, 0)
    #answer = bfs(numbers, target)
    answer = bfs_deque(numbers, target)
    return answer
```

