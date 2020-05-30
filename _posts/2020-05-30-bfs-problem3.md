---
title: "백준 14502번 연구소"
excerpt: "브루트 포스와 bfs를 이용한 문제"

toc: true
toc_sticky: true
toc_label: "LIST"

categories:
  - Problem
tags:
  - BFS
  - brute-force
last_modified_at: 2020-05-30
---
문제  
--------  
연구소에 3개의 벽을 세워 연구소내에 퍼지는 바이러스로부터 안전한 영역의 최대 크기를 구하는 문제이다.  


문제의 자세한 내용은 아래의 링크를 통해 볼 수 있다.  

>출처  
><https://www.acmicpc.net/problem/14502>  

풀이  
------------  
연구소내에 초기 바이러스 위치, 벽의 위치를 표시하기 위해 map배열을 사용한다.  
문제와 마찬가지로 0은 빈칸, 1은 벽, 2는 바이러스가 있는 위치를 나타낸다.  
수행 방법은 빈칸 중 벽 3개를 설치할 모든 위치 경우의 수들에 대해 탐색하며 매 경우 바이러스 퍼짐에 따름 안전영역의 크기를 계산한다.  


1. 벽 설치  
**벽 3개를 설치할 방법에 대해서는 모든 경우를 다 해봐야 한다**는 점에서 **완전탐색**을 수행한다.  
이때, 빈칸의 위치를 쉽게 파악하기 위해 지도정보를 입력받을 때 빈칸인 경우 따로 blank배열에 위치를 저장한다.  
이렇게 하면 벽을 설치할 빈칸을 찾을 때 지도 전체를 다 탐색하지 않아도 된다.  
2. 안전 영역크기 계산  
벽 3개가 모두 설치되면 **bfs**를 사용하여 바이러스를 퍼트린다.  
변수에 바이러스가 퍼지기 전 안전영역의 개수를 저장한 뒤, 탐색을 하며 바이러스가 퍼질때마다 변수값을 1씩 감소시킨다.  
최종 탐색을 모두 마치면 이 변수에 저장된 값이 이 경우에 대한 안전 영역 크기가 된다.  


**후기** - 초기 코드를 수행했을 때 72ms 정도 걸렸다. 수행시간을 줄이기 위한 방법을 찾던 중 bfs함수에서 각 칸의 탐색유무를 표시하기 위한 visited배열에 대해 bfs를 탐색할 때마다 항상 초기화를 해줘야 한다는 것을 발견했다.  
벽 3개를 만들 경우가 많다면 매번 visited를 초기화 해주는 것에서 시간이 많이 걸릴 것이라 생각이 들었고 초기화 시키지 않는 방법을 찾았다.  
**각 경우마다 visited배열에 표시될 값을 다르게 한다**면 초기화를 해주지 않아도 된다는 것을 발견하여 구현을 했고 수행 결과 36ms가 걸렸다.  
이 방법을 통해 기존 수행시간의 절반을 절약할 수 있었다.  

코드  
----------  
``` c  
#include<stdio.h>
#include<queue>
using namespace std;

int n, m, maxx = 0;
int map[8][8], visited[8][8];
vector<pair<int, int>> blank, fire;	//빈 칸 위치, 불 위치

int movR[4] = { 0, 0, -1, 1 };
int movC[4] = { -1, 1, 0, 0 };

void bfs(int chk) {
	int cnt = blank.size() - 3; // 벽만든 빈칸 3개 제외
	queue<pair<int, int>> qu;
	for (int i = 0; i < fire.size(); i++) {
		qu.push(fire[i]);
		visited[fire[i].first][fire[i].second] = chk;
	}
	while (!qu.empty()) {
		pair<int, int> here = qu.front();
		qu.pop();
		for (int i = 0; i < 4; i++) {	//상, 하, 좌, 우
			pair<int, int> next = { here.first + movR[i], here.second + movC[i] };
			if (next.first < 0 || next.first >= n || next.second < 0 || next.second >= m) continue;
			if (visited[next.first][next.second] != chk && map[next.first][next.second] == 0) {
				visited[next.first][next.second] = chk;
				cnt--;	//안전 영역 줄어듬
				if (cnt <= maxx) return;    //안전영역의 현 최대개수보다 작으면 더이상 무의미
				qu.push(next);
			}
		}
	}

	if (cnt > maxx) maxx = cnt;
}

int main() {
	scanf("%d %d", &n, &m);
	for (int i = 0; i < n; i++) {
		for (int j = 0; j < m; j++) {
			scanf("%d", &map[i][j]);
			if (map[i][j] == 0) blank.push_back({ i, j });
			else if (map[i][j] == 2) fire.push_back({ i, j });
		}
	}
	//벽 3개 설치
	int chk = 1;	//bfs함수에서 각 칸의 탐색여부 표시할 때 사용
	for (int i = 0; i < blank.size(); i++) {
		map[blank[i].first][blank[i].second] = 1;
		for (int j = i + 1; j < blank.size(); j++) {
			map[blank[j].first][blank[j].second] = 1;
			for (int k = j + 1; k < blank.size(); k++) {
				map[blank[k].first][blank[k].second] = 1;
				//bfs
				bfs(chk++);
				map[blank[k].first][blank[k].second] = 0;
			}
			map[blank[j].first][blank[j].second] = 0;
		}
		map[blank[i].first][blank[i].second] = 0;
	}
	printf("%d", maxx);
}
```  