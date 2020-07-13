---
title: "백준 9328번: 열쇠"
excerpt: "BFS 알고리즘을 사용한 문제"

toc: true
toc_sticky: true
toc_label: "LIST"

categories:
  - Problem
tags:
  - BFS
last_modified_at: 2020-07-13
---
문제  
-----------  
1층 건물에서 p개의 문서가 존재할 때, **가져올 수 있는 문서의 최대 개수**를 구하는 프로그램을 작성해야한다.  


건물의 문은 모두 잠겨있기 때문에, 문을 열려면 열쇠가 필요하다.  
상근이는 일부 열쇠를 이미 가지고 있고, 일부 열쇠는 빌딩의 바닥에 놓여져 있다.  

> 참조  
> <https://www.acmicpc.net/problem/9328>

풀이  
-----------  
간단한 bfs문제로 생각하면 해결하기가 조금 어렵다.  
이문제에서 **포인트**는 **문이 모두 잠겨있으며, 매칭되는 열쇠가 존재한다**이다.  
즉, 탐색과정에서 열쇠를 획득할때마다 매칭되는 문이 열리게 되고 문 너머를 탐색할 수 있어야한다.  


만약, 기존 bfs풀이대로 코드를 작성할 경우 키 획득전에 문을 열 수 없어 넘어간 문이 있다면 그 문으로 다시 이동할 수 없기 때문에 틀린 코드가 된다.  
따라서 열쇠를 획득했을 때 **어떻게 매칭되는 문으로 되돌아갈 것인지**가 중요하다.  


이 문제에 대해 생각했던 순서를 보면  
1. 이전 영역으로 돌아 갈 수 있게 하자 -> 탐색이 종료되지 않을 수 있다.  
2. 과거에 탐색했을 때 보유 키 상황과 현재 보유 키 상황이 다르면 그 영역 다시 탐색할 수 있게 하자 -> 가능한 생각이었지만 열쇠 획득 후 다시 탐색해야 하는 구간 중 되돌아가지 못하는 곳이 발생 (예제1)  
3. (최종) 탐색 과정에서 키가 존재하지 않아 **열지 못한 문을 따로 저장하는 queue(stop)**를 만들자. -> 키 획득할 때마다 stop에서 가능한 문을 탐색 queue로 옮기면 된다.  


지금 생각해보면 바로 3번을 생각해낼 수 있을 것 같지만 풀 때는 너무 헤맸던 문제..  
총 2시간이 걸렸다. 2번 구현하고 잘못된 점 생각하면서 시간이 오래 걸렸는데 바로 3번방식으로 했다면 1시간이내에 풀지 않았을까 싶다.  


역시 다양한 문제를 풀어봐야하나보다..  

코드  
-----------
```c  
#include<stdio.h>
#include<queue>
using namespace std;

int h, w, paper, res;
char map[100][100];
int visited[100][100], key[27];	//bfs탐색시 방문여부, 보유키 현황

int movC[4] = { 0, 0, -1, 1 };	//상, 하, 좌, 우
int movR[4] = { -1, 1, 0, 0 };

queue<pair<int, int>> qu, stop;	//탐색시 사용, 열쇠없어 대기 중인 문

void bfs(int num) {
	pair<int, int> here;
	int sz = qu.size();
	//(탐색전 준비)외각에서 건물로 들어갈 수 있는 위치들 중 들어갈 수 없는 '문' 거르기
	while (sz--) {
		here = qu.front();
		qu.pop();
		if (map[here.first][here.second] >= 'A' && map[here.first][here.second] <= 'Z') {	//문
			int tem = map[here.first][here.second] - 'A';
			if (key[tem] != num) {	//키 없으면 대기 queue로 push
				stop.push(here);
				continue;
			}
		}
		visited[here.first][here.second] = num;
		qu.push(here);
	}
	//bfs 탐색 시작
	while (!qu.empty()) {
		if (paper == 0) break;	//모든 문서 찾으면 탐색 종료
		here = qu.front();
		qu.pop();
		for (int i = 0; i < 4; i++) {
			int nexR = here.first + movR[i];
			int nexC = here.second + movC[i];
			if (nexR < 0 || nexR >= h || nexC < 0 || nexC >= w || map[nexR][nexC] == '*' || visited[nexR][nexC] == num) continue;
			if (map[nexR][nexC] >= 'a' && map[nexR][nexC] <= 'z') {	//키
				int tem = map[nexR][nexC] - 'a';
				key[tem] = num;
				//새로 추가된 키에 대해 열 수 있는 대기 문이 존재한다면 qu에 push
				sz = stop.size();
				while (sz--) {
					pair<int, int> pa = stop.front();
					stop.pop();
					if (map[pa.first][pa.second] - 'A' == tem) {
						visited[pa.first][pa.second] = num;
						qu.push(pa);
					}
					else
						stop.push(pa);
				}
			}
			else if (map[nexR][nexC] >= 'A' && map[nexR][nexC] <= 'Z') {	//문
				int tem = map[nexR][nexC] - 'A';
				if (key[tem] != num) {
					stop.push({ nexR, nexC });
					continue;
				}
			}
			else if (map[nexR][nexC] == '$') {
				paper--;
				res++;
				//	printf("==%d %d\n", nexR, nexC);
			}
			visited[nexR][nexC] = num;
			qu.push({ nexR, nexC });
		}
	}
}

int main() {
	int tc;
	scanf("%d", &tc);
	for (int t = 1; t <= tc; t++) {
		paper = res = 0;
		scanf("%d %d", &h, &w);
		for (int i = 0; i < h; i++) {
			for (int j = 0; j < w; j++) {
				scanf(" %c", &map[i][j]);
				//외각에서 입구 존재 확인 - 각 경우(열쇠, 문서)마다 상황처리후 qu에 넣기
				if (i == 0 || i == h - 1 || j == 0 || j == w - 1) {
					if (map[i][j] != '*') {
						qu.push({ i, j });
						if (map[i][j] >= 'a' && map[i][j] <= 'z') {	//열쇠
							int tem = map[i][j] - 'a';
							key[tem] = t;
						}
					}
					if (map[i][j] == '$') res++;	//외각에 문서 위치할 때
				}
				else
					if (map[i][j] == '$') paper++;
			}
		}
		char st[27];
		scanf(" %s", st);
		for (int i = 0; st[i] != '0' && st[i] != '\0'; i++)
			key[st[i] - 'a'] = t;
		bfs(t);
		printf("%d\n", res);
		while (!qu.empty())
			qu.pop();
		while (!stop.empty())
			stop.pop();
	}
}
```