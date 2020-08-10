---
title: "백준 1194번: 달이 차오른다, 가자."
excerpt: "BFS"

toc: true
toc_sticky: true
toc_label: "LIST"

categories:
  - Problem
tags:
  - BFS
last_modified_at: 2020-08-10
---
문제  
----------  
직사각형 모양의 미로를 탈출하는데 걸리는 **이동 횟수의 최소값**을 구하는 문제이다.  


미로는 다음과 같이 구성되어져있다.  
* 빈 곳 : 언제나 이동할 수 있다. ('.‘로 표시됨)  
* 벽 : 절대 이동할 수 없다. (‘#’)  
* 열쇠 : 언제나 이동할 수 있다. 이 곳에 처음 들어가면 열쇠를 집는다. (a - f)  
* 문 : 대응하는 열쇠가 있을 때만 이동할 수 있다. (A - F)  
* 민식이의 현재 위치 : 빈 곳이고, 민식이가 현재 서 있는 곳이다. (숫자 0)  
* 출구 : 달이 차오르기 때문에, 민식이가 가야하는 곳이다. 이 곳에 오면 미로를 탈출한다. (숫자 1)  


한 번의 움직임은 현재 위치에서 수평이나 수직으로 한 칸 이동하는 것이다.  

> 출처  
> <https://www.acmicpc.net/problem/1194>  

풀이  
---------  
**[백준 9328번: 열쇠](https://yuksangeun.github.io/problem/bfs-problem5)**와 비슷한 방식으로 bfs알고리즘을 이용한 문제이다.  


공통적으로 주의할 점은 **문과 각 문에 매칭되는 열쇠**가 존재한다는 점이다.  


두 문제의 차이점은,  
* '열쇠' 경우: 지도에 존재하는 문서들 중 얻을 수 있는 최대 문서를 찾는 것이기 때문에 **이동 횟수는 중요하지 않다.** 따라서 이동하며 열쇠가 없어 열지 못한 문들의 정보를 저장한 뒤, 열쇠를 찾은 후 해당 문들을 열어 탐색queue에 넣어주면 된다.  
* '달이 차오른다' 경우: **이동 횟수**가 중요하다. 따라서 단순하게 bfs로 어떤 경로든 열쇠를 찾으면 문을 개방하는 방식으로 할 경우 이동횟수가 고려되지 않기 때문에 불가능하다.  


위 문제는 bfs를 이용하되, 각 탐색 경로마다 **찾은 열쇠의 종류가 다르므로** 각 칸에 방문여부에 따라 탐색하는 것이 아닌 **각 칸에 같은 열쇠 종류로 이전에 방문했었는지 유무**를 확인해야 한다.  


열쇠의 종류가 a~f로 총 6개로 총 64개의 열쇠조합이 가능하다. 따라서 visited함수를 3차원 배열로 만들어 풀면 가능하다. visited[행][열][열쇠조합]  
이때, 열쇠조합은 bit를 이용하면 된다.  


즉, **풀이 순서**는 다음과 같다.  
1. 미로를 입력받으면서 출발점을 찾는다.  
2. 출발점으로부터 bfs탐색을 시작한다.  
	1) 열쇠를 얻는 순간 다시 모든 곳을 탐색할 수 있어야하므로 visited를 행, 열, key에 대해 삼차원 배열로 선언한다.   
	2) 이동가능한 위치인 경우 visited배열을 통해 현 위치에 현재 key정보를 이용해서 이전에 방문했던 곳인지 확인 후, 아니라면 visited배열 값을 업데이트하고 queue에 {key, 행, 열}정보를 넣는다.  
	2) 열쇠를 주우면 OR연산을 통해 소지한 열쇠를 업데이트하고 2)방식으로 수행한다.    
	3) 잠긴문에 도달하면 AND연산을 통해 가진 열쇠를 이용해 문을 열 수 있는지 파악한 후, 이동이 가능하다면 2)방식으로 수행한다.  
3. 도착점에 도달하면 여태까지 움직인 거리를 반환한다.  
4. 도착점에 도달하지 못하면 -1을 반환한다.  


+) 이전에 왔던 곳을 어떻게 다시 탐색해야하는지에 대해 고민을 많이 했던 문제이다. 단순 모든 곳을 탐색가능하게 한다면 queue에 너무 많은 데이터가 쌓여 메모리 초과가 발생하기때문에 조금 어려웠다.  

코드  
---------  
``` c++  
#include<stdio.h>
#include<queue>
using namespace std;

int n, m, res = -1;
char map[50][50];	//미로 정보
bool visited[50][50][64];	//bfs탐색시 이용 {행, 열, 키}
queue<pair<int, pair<int, int>>> qu;	//bfs탐색시 이용 {키, 행, 열}
int key;

int movR[4] = { -1, 1, 0, 0 };
int movC[4] = { 0, 0, -1, 1 };

void bfs() {
	int time = 1;	//이동 횟수
	while (!qu.empty()) {
		int sz = qu.size();
		while (sz--) {
			int tem = qu.front().first;
			pair<int, int> here = qu.front().second;
			qu.pop();
			for (int i = 0; i < 4; i++) {
				int nr = here.first + movR[i];
				int nc = here.second + movC[i];
				if (nr < 0 || nr >= n || nc < 0 || nc >= m || map[nr][nc] == '#') continue;	//이동 불가능 지역경우 pass
				if (map[nr][nc] == '1') {	//도착점이면 반환
					res = time;
					return;
				}
                			if(visited[nr][nc][tem]) continue;		//{nr, nc}위치에 tem이라는 키상태로 이전에 방문한 적이 있으면 pass
				if (map[nr][nc] >= 'A' && map[nr][nc] <= 'F' && (tem & 1 << (map[nr][nc] - 'A')) == 0) continue;	//해당 문에 매칭되는 key없으면 pass
				int tt;	//qu에 넣을 key정보 저장
				if (map[nr][nc] >= 'a' && map[nr][nc] <= 'f' && (tem & 1 << (map[nr][nc] - 'a')) == 0) {	//열쇠 있는 곳이라면 key정보 업데이트
					tt = tem | 1 << (map[nr][nc] - 'a');
				}
				else {	//이미 획득한 열쇠이거나 빈공간이라면 key정보 유지
					tt = tem;
				}
                			if(!visited[nr][nc][tt]){		//{nr, nc}에 tt라는 키상태로 이전에 방문한 적이 없다면, visited갱신 및 qu에 넣기
					visited[nr][nc][tt] = true;
				    	qu.push({ tt, { nr, nc } });
               			 }
			}
		}
		time++;
	}
}

int main() {
	scanf("%d %d", &n, &m);
	for (int i = 0; i < n; i++) {
		for (int j = 0; j < m; j++) {
			scanf(" %c", &map[i][j]);
			if (map[i][j] == '0') {
				qu.push({ 0,{ i, j } });
                			visited[i][j][0] = true;
			}
		}
	}
	bfs();
	printf("%d", res);
}
```  