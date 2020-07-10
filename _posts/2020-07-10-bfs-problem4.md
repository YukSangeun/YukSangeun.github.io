---
title: "백준 1938번: 통나무 옮기기"
excerpt: "BFS 알고리즘을 사용한 문제"

toc: true
toc_sticky: true
toc_label: "LIST"

categories:
  - Problem
tags:
  - BFS
  - DFS
last_modified_at: 2020-07-10
---
문제  
-----------  
n*n 평지에서 통나무 BBB를 밀거나 회전시켜 EEE의 위치로 옮기는 작업을 하는 문제이다.  
지형에서 0은 아무 것도 없음, 1은 나무 존재를 의미한다.  
초기 입력으로 주어지는 BBB가 길이 3인 통나무의 위치를 의미, EEE는 길이 3인 통나무를 옮길 위치를 의미한다.  


이때, **BBB에서 EEE로 최소 동작 횟수**를 구하면 된다.  


통나무 움직이는 방법은 총 5가지 존재한다.  
1. U : 통나무를 위로 한 칸  
2. D : 통나무를 아래로 한 칸  
3. L : 통나무를 왼쪽으로 한 칸  
4. R : 통나무를 오른쪽으로 한 칸  
5. T : 중심점을 중심으로 90도 회전  


> 참조  
> <https://www.acmicpc.net/problem/1938>

풀이  
-----------  
1. **길이 3인 통나무 위치 저장 방법**  
통나무는 평지에서 3칸을 차지하게 된다.  
이때, 3칸의 위치를 모두 저장하는 것보다 **중심점의 위치와 방향(가로, 세로)** 정보를 저장하여 통나무 위치를 좀 더 효과적으로 관리할 수 있다.  
2. **BBB에서 EEE로 옮기는 방법**  
통나무를 움직이는 방법이 총 5가지 존재하기 때문에 각 위치마다 5가지 경우로 나눠서 탐색해나가야 한다.  
이때, 주의할 점은 **1.옮길 위치가 평지를 벗어나는지**와 **2.이전에 탐색한 위치로 이동하는지**이다.  
2를 주의해야하는 이유는 이전에 탐색한 위치로 다시 가게될 경우 탐색시 사이클이 발생되어 프로그램이 종료되지 않을 수 있기 때문이다.  
따라서 이전 위치로 이동되지 않도록 하기 위해 **위치P에 통나무가 위치했었는지를 체크하는 배열**을 만들어야 한다. 통나무 방향이 한 위치에서 가로방향, 세로방향이 있으므로 2가지에 대해 배열이 존재해야 한다.  

	코드 작성시 2가지 방법이 존재한다. (bfs와 dfs)  
	1) dfs경우 재귀를 이용한 방법으로 bfs코드의 일부를 수정하면 된다. 이때, bfs와 차이점은 dfs는 깊이우선탐색으로 **최소 이동 횟수를 구하기 위해서는** 위치P에 통나무가 위치했었는지 여부를 체크하는 것이 아닌 **위치P까지 이동한 횟수를 저장**시켜야 한다.  
	따라서 코드 진행 시, 위치P에 도착했을 때 현재 횟수가 저장된 횟수보다 값이 작은지를 확인 후 작다면 탐색을 진행한다.  
	2) bfs경우 아래 코드로 작성해놨다.  
	위에서 말한것과 같이 위치P에 위치했었는지 여부를 체크하여 진행하면 된다.  


초기 dfs로 코드를 구현했었고 이후 bfs로 시도해본 결과 bfs가 시간이 더 절약되는 것을 확인했다.  


기본 bfs문제들과 달리 이동시 확인해야하는 범위 체크가 통나무의 방향과 움직이는 방법별로 다르기 때문에 좀 더 복잡한 문제였다.  
때문에 코드 구현 시 코드가 복잡해지고 틀리는 곳이 많아져 수정이 번거로웠다.  
이와 같은 조건이 복잡한 문제들을 풀때마다 시간을 많이 할애하고 더 많이 오류가 발생하므로 비슷한 유형 문제들의 연습이 많이 필요한 것 같다.  


(약 1시간 50분 소요)  


코드  
-----------
```c  
#include<stdio.h>
#include<queue>
using namespace std;

int n, res = 10e8;
char map[50][50];
bool visited[50][50][2];	//가로방문0, 세로방문1 - 각 지점 이동 여부

int movR[9] = { -1, -1, -1, 0, 1, 1, 1, 0, -1 };	//움직일 때 범위 체크할 부분
int movC[9] = { -1, 0, 1, 1, 1, 0, -1, -1, -1 };

void func(int r, int c, int dir, int pos) {	//중심위치 r, c, 방향(가로1, 세로2), 이전 동작
	int cnt = 0;
	queue<pair<pair<int, int>, int>> qu;	// 중심위치 r, c, 방향(가로1, 세로2)
	qu.push({ {r, c}, dir });
	visited[r][c][dir - 1] = true;
	while (!qu.empty()) {
		int sz = qu.size();
		while (sz--) {
			r = qu.front().first.first;
			c = qu.front().first.second;
			dir = qu.front().second;
			qu.pop();
			if (dir == 1) {	//가로
				if (map[r][c] == 'E' && map[r][c - 1] == 'E' && map[r][c + 1] == 'E') {
					if (cnt < res) res = cnt;
					continue;
				}
				if (r != 0 && !visited[r - 1][c][dir - 1]) {	//U
					bool flag = false;
					for (int i = 0; i < 3; i++) {
						if (map[r + movR[i]][c + movC[i]] == '1') {
							flag = true;
							break;
						}
					}
					if (!flag) {
						visited[r - 1][c][dir - 1] = true;
						qu.push({ {r - 1, c}, dir });
					}
				}
				if (r != n - 1 && !visited[r + 1][c][dir - 1]) {	//D
					bool flag = false;
					for (int i = 4; i < 7; i++) {
						if (map[r + movR[i]][c + movC[i]] == '1') {
							flag = true;
							break;
						}
					}
					if (!flag) {
						visited[r + 1][c][dir - 1] = true;
						qu.push({ {r + 1, c}, dir });
					}
				}
				if (c - 2 >= 0 && !visited[r][c - 1][dir - 1] && map[r][c - 2] != '1') {	//L
					visited[r][c - 1][dir - 1] = true;
					qu.push({ {r, c - 1}, dir });
				}
				if (c + 2 < n && !visited[r][c + 1][dir - 1] && map[r][c + 2] != '1') {	//R
					visited[r][c + 1][dir - 1] = true;
					qu.push({ {r, c + 1}, dir });
				}
				if (r != n - 1 && r != 0 && !visited[r][c][1]) {	//T
					bool flag = false;
					for (int i = 0; i < 3; i++) {
						if (map[r + movR[i]][c + movC[i]] == '1') {
							flag = true;
							break;
						}
					}
					if (!flag) {
						for (int i = 4; i < 7; i++) {
							if (map[r + movR[i]][c + movC[i]] == '1') {
								flag = true;
								break;
							}
						}
					}
					if (!flag) {
						visited[r][c][1] = true;
						qu.push({ {r, c}, 2 });
					}
				}
			}
			else {	//세로
				if (map[r][c] == 'E' && map[r - 1][c] == 'E' && map[r + 1][c] == 'E') {
					if (cnt < res) res = cnt;
					continue;
				}
				if (r - 2 >= 0 && !visited[r - 1][c][dir - 1] && map[r - 2][c] != '1') {	//U
					visited[r - 1][c][dir - 1] = true;
					qu.push({ {r - 1, c}, dir });
				}
				if (r + 2 < n && !visited[r + 1][c][dir - 1] && map[r + 2][c] != '1') {	//D
					visited[r + 1][c][dir - 1] = true;
					qu.push({ {r + 1, c}, dir });
				}
				if (c != 0 && !visited[r][c - 1][dir - 1]) {	//L
					bool flag = false;
					for (int i = 6; i < 9; i++) {
						if (map[r + movR[i]][c + movC[i]] == '1') {
							flag = true;
							break;
						}
					}
					if (!flag) {
						visited[r][c - 1][dir - 1] = true;
						qu.push({ {r, c - 1}, dir });
					}
				}
				if (c != n - 1 && !visited[r][c + 1][dir - 1]) {	//R
					bool flag = false;
					for (int i = 2; i < 5; i++) {
						if (map[r + movR[i]][c + movC[i]] == '1') {
							flag = true;
							break;
						}
					}
					if (!flag) {
						visited[r][c + 1][dir - 1] = true;
						qu.push({ {r, c + 1}, dir });
					}
				}
				if (c != 0 && c != n - 1 && !visited[r][c][0]) {	//T
					bool flag = false;
					for (int i = 2; i < 5; i++) {
						if (map[r + movR[i]][c + movC[i]] == '1') {
							flag = true;
							break;
						}
					}
					if (!flag) {
						for (int i = 6; i < 9; i++) {
							if (map[r + movR[i]][c + movC[i]] == '1') {
								flag = true;
								break;
							}
						}
					}
					if (!flag) {
						visited[r][c][0] = true;
						qu.push({ {r, c}, 1 });
					}
				}
			}
		}
		cnt++;
	}
}

int main() {
	int r, c;
	scanf("%d", &n);
	for (int i = 0; i < n; i++) {
		for (int j = 0; j < n; j++) {
			scanf(" %c", &map[i][j]);
			if (map[i][j] == 'B') {
				r = i;
				c = j;
			}
		}
	}
	//통나무 중심부위와 방향 찾아 func함수 호출
	if (map[r - 1][c] == 'B')
		func(r - 1, c, 2, 5);
	else if (map[r + 1][c] == 'B')
		func(r + 1, c, 2, 5);
	else if (map[r][c - 1] == 'B')
		func(r, c - 1, 1, 5);
	else if (map[r][c + 1] == 'B')
		func(r, c + 1, 1, 5);

	if (res == 10e8) res = 0;
	printf("%d", res);
}

```