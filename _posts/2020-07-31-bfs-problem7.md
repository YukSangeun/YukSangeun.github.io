---
title: "백준 19238번: 스타트 택시"
excerpt: "BFS"

toc: true
toc_sticky: true
toc_label: "LIST"

categories:
  - Problem
tags:
  - BFS
last_modified_at: 2020-07-31
---
문제  
----------  
n * n크기의 격자가 존재할 때, 택시 기사 최백준이 M명의 승객을 태우는 문제이다.  
초기 연료양이 주어지며 승객을 태우기 위해 이동 중 또는 목적지에 이동 직전에 연료가 떨어진다면 그 날의 업무가 끝난다.  
즉, 주어진 m명의 승객을 모두 이동시키거나 연료의 양이 다 떨어질 경우 영업이 종료된다.  


최백준은 현 택시 위치에서 최단 거리에 위치한 승객들 중 우선순위에 의해 한명을 태우며  
목적지까지 이동할 경우 소모한 연료의 양이 특정 양만큼 채워지게 된다.  


모든 승객을 성공적으로 데려다줄 수 있는지 알아내고, **데려다줄 수 있을 경우 최종적으로 남는 연료의 양을 출력**하는 프로그램을 작성하자.  

> 출처  
> <https://www.acmicpc.net/problem/19238>  


풀이  
-----------  
**2020 상반기 삼성 코딩테스트 2문제 중 한 문제**로 나왔던 문제이다.  
그때는 1시간 남은 시점에서 빠르게 풀었어야 했는데 결국 못풀었던 문제.. 오늘은 1시간 12분 걸렸는데... 더 빨리 풀어야겠다.  


그당시 문제 접근을 잘못해서 남은 시간 중 절반을 날렸다.  


이 문제는 **bfs를 두번 사용**해서 구현하면 되는 문제이다.  
1. 현 택시 위치에서 최단 거리에 위치한 사람 찾을 때(그때 이부분을 단순 거리 계산으로 해버림 - 벽을 생각 못함)  
2. 사람을 태운 후 목적지까지 이동할 때  


문제 구현시 큰 어려움은 없지만, 몇가지 **주의해야하는 점**이 있다.  
1. 연료의 양을 승객을 태울 때와 목적지까지 이동할 때 모두 확인  
2. 벽에 가로막혀 어떠한 승객도 태울 수 없는 경우 주의  
3. 택시 위치를 잊지 않고 이동시켜 주기  


이외에는 큰 어려움 없으며 조건문과 bfs문을 잘 활용해서 풀면 된다.  

코드  
---------  
``` c++  
#include<stdio.h>
#include<queue>
#include<algorithm>
#include<vector>
using namespace std;

struct POS {
	int r;
	int c;
	void init(int a, int b) {
		r = a;
		c = b;
	}
};

int n, m, oil, visited[20][20], vi = 0;
POS texi, guest[401];	//택시위치, 도착지 위치
int map[20][20];	//벽 -1, 빈공간 0, 손님위치 1~

int movR[4] = { -1, 1, 0, 0 };
int movC[4] = { 0, 0, -1, 1 };

bool compare(pair<int, int> a, pair<int, int> b) {
	if (a.first != b.first)
		return a.first < b.first;
	else
		return a.second < b.second;
}

bool find() {
	vi++;
	queue<pair<int, int>> qu;
	vector<pair<int, int>> vt;	//최단거리 손님 저장
	if (map[texi.r][texi.c] > 0) return true;
	//bfs탐색
	int cnt = 0;
	visited[texi.r][texi.c] = vi;
	qu.push({ texi.r, texi.c });
	while (vt.empty() && !qu.empty()) {
		int sz = qu.size();
		while (sz--) {
			pair<int, int> here = qu.front();
			qu.pop();
			for (int i = 0; i < 4; i++) {
				int newR = here.first + movR[i];
				int newC = here.second + movC[i];
				if (newR < 0 || newR >= n || newC < 0 || newC >= n) continue;
				if (visited[newR][newC] == vi || map[newR][newC] == -1) continue;
				visited[newR][newC] = vi;
				if (map[newR][newC] > 0)
					vt.push_back({ newR, newC });
				else {
					qu.push({ newR, newC });
				}
			}
		}
		cnt++;
	}
	//이동 가능 위치 없으면
	if (vt.empty() && qu.empty()) return false;
	//이동 불가능하면 false반환
	if (oil - cnt <= 0) return false;
	//이동 가능경우 최단거리 손님들 정렬 후 맨 앞사람 선택, 택시 위치 이동 후 true
	sort(vt.begin(), vt.end(), compare);
	texi.init(vt[0].first, vt[0].second);
	oil -= cnt;
	return true;
}

int main() {
	scanf("%d %d %d", &n, &m, &oil);
	for (int i = 0; i < n; i++) {
		for (int j = 0; j < n; j++) {
			scanf("%d", &map[i][j]);
			map[i][j] *= -1;
		}
	}
	scanf("%d %d", &texi.r, &texi.c);
	texi.r -= 1;
	texi.c -= 1;
	for (int i = 1; i <= m; i++) {
		int a, b, c, d;
		scanf("%d %d %d %d", &a, &b, &c, &d);
		map[a - 1][b - 1] = i;
		guest[i].init(c - 1, d - 1);
	}
	while (m--) {
		//택시와 가까운 위치 찾기1
		if (find()) {
			int peo = map[texi.r][texi.c];
			map[texi.r][texi.c] = 0;
			//목적지로 이동
			queue<pair<int, int>> qu;
			vi++;
			qu.push({ texi.r, texi.c });
			visited[texi.r][texi.c] = vi;
			bool flag = false;
			int cnt = 0;
			while (!flag) {
				int sz = qu.size();
				while (sz--) {
					pair<int, int> here = qu.front();
					qu.pop();
					for (int i = 0; i < 4; i++) {
						int newR = here.first + movR[i];
						int newC = here.second + movC[i];
						if (newR < 0 || newR >= n || newC < 0 || newC >= n) continue;
						if (visited[newR][newC] == vi || map[newR][newC] == -1) continue;
						if (newR == guest[peo].r && newC == guest[peo].c) {
							flag = true;
							break;
						}
						visited[newR][newC] = vi;
						qu.push({ newR, newC });
					}
					if (flag) break;
				}
				cnt++;
				if (oil == cnt) break;
			}
			if (flag){	//도착지까지 갈 수 있는 경우
				oil += cnt;
				texi.init(guest[peo].r, guest[peo].c);
			}
			else {	//갈 수 없는 경우
				printf("-1");
				return 0;
			}
		}
		else {
			printf("-1");
			return 0;
		}
	}
	printf("%d", oil);
}
```  

