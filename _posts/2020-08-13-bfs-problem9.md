---
title: "백준 2146번: 다리 만들기"
excerpt: "BFS"

toc: true
toc_sticky: true
toc_label: "LIST"

categories:
  - Problem
tags:
  - BFS
last_modified_at: 2020-08-13
---  
문제  
----------  
여러 섬으로 이루어진 나라가 있을 때, **한 섬과 다른 섬을 잇는 다리**를 하나 만들려고 한다.  
이때, **만들 수 있는 가장 짧은 다리**를 구하는 문제이다.  


n * n 지도가 존재할 때, 육지는 1, 바다는 0으로 표시한다.

> 출처  
> <https://www.acmicpc.net/problem/2146>


풀이  
----------  
bfs를 두번 이용하여 풀 수 있는 문제이다.  
1. 각 섬의 테두리를 찾을 때(섬 영역 찾기)  
2. 가장 짧은 다리 찾을 때(1에서 찾은 섬의 테두리를 이용)  

**1번**의 경우 간단하게 bfs알고리즘을 이용하여 각 섬의 테두리를 찾으면 된다.  
이때, 섬 구분을 해줘야 하므로 섬마다 번호를 붙여서 저장한다. (섬은 바다로 구분되며, 한번 탐색할 때 이동가능한 모든 육지가 같은 섬에 속한다.)  
bfs알고리즘을 사용하여 코드를 작성하고 **2번을 풀기 위해** 각 섬의 테두리를 저장하기 위한 area라는 queue를 생성하여 **육지 탐색시 바다와 인접한 구간을 모두 area에 넣는다**.  


**2번**의 경우 1번에서 찾은 모든 섬의 테두리를 저장한 큐 area를 사용하여 bfs를 수행한다.  
깊이별 탐색을 수행하며, 탐색 중 **다른 섬의 탐색 영역을 침범하게 되는 경우** 다리를 생성할 수 있는 것을 의미 **이 깊이에서 가장 짧은 다리를 찾을 수 있음**을 의미한다.
다른 섬의 탐색 영역을 침범하는 경우 **<현재 위치의 탐색 깊이 + 침범한 영역의 탐색 깊이>**를 계산하고 이런 모든 경우들을 비교해 가장 작은 값을 반환한다.


다음와 같이 수행되도록 코드를 구현하면 된다.  
![수행 이미지](https://yuksangeun.github.io/assets/images/bfs_problem9.PNG){: .align-center}  

위 문제의 답은 3이다.  


코드  
----------  
``` c++  
#include<stdio.h>
#include<queue>
using namespace std;

int n;
int map[100][100], bridge[100][100];	//섬표시, 다리길이 표시
int movR[4] = { -1, 1, 0, 0 };
int movC[4] = { 0, 0, -1, 1 };

queue<pair<int, int>> area;

void bfs(int r, int c, int island) {
	queue<pair<int, int>> qu;
	qu.push({ r, c });
	map[r][c] = island;
	while (!qu.empty()) {
		pair<int, int> here = qu.front();
		qu.pop();
		for (int i = 0; i < 4; i++) {
			int nr = here.first + movR[i];
			int nc = here.second + movC[i];
			if (nr < 0 || nr >= n || nc < 0 || nc >= n || map[nr][nc] < 0) continue;
			if (map[nr][nc] == 0) {
				bridge[nr][nc] = 1;
				map[nr][nc] = island;
				area.push({nr, nc});
				continue;
			}
			map[nr][nc] = island;
			qu.push({ nr, nc });
		}
	}
}

int bfsALL() {
	int ret=100000;
	bool flag = false;
	while (!flag) {
		int szz = area.size();
		while (szz--) {
			pair<int, int> here = area.front();
			area.pop();
			for (int i = 0; i < 4; i++) {
				int nr = here.first + movR[i];
				int nc = here.second + movC[i];
				if (nr < 0 || nr >= n || nc < 0 || nc >= n || map[nr][nc] == map[here.first][here.second]) continue;
				if (map[nr][nc] == 0) {	//아직 탐색하지 않은 영역인 경우
					area.push({ nr, nc });
					map[nr][nc] = map[here.first][here.second];
					bridge[nr][nc] = bridge[here.first][here.second] + 1;
				}
				else if(map[nr][nc] != map[here.first][here.second]) {	//다른 섬으로부터 뻗어나온 다리인 경우
					int tem = bridge[here.first][here.second] + bridge[nr][nc];
					if (tem < ret) ret = tem;
					flag = true;
				}
			}
		}
	}

	return ret;
}

int main() {
	scanf("%d", &n);
	for (int i = 0; i < n; i++) {
		for (int j = 0; j < n; j++)
			scanf("%d", &map[i][j]);
	}
	//섬 테두리 찾기
	int island = 0;
	for (int i = 0; i < n; i++) {
		for (int j = 0; j < n; j++) {
			if (map[i][j] <= 0) continue;
			island--;
			bfs(i, j, island);
		}
	}
	//가장 짧은 다리 찾기
	printf("%d", bfsALL());
}
```