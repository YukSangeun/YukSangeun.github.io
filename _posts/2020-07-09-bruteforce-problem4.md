---
title: "백준 17471번 게리맨더링"
excerpt: "bfs+bruteforce"

toc: true
toc_sticky: true
toc_label: "LIST"

categories:
  - Problem
tags:
  - BFS
  - Brute-force
last_modified_at: 2020-07-09
---
문제  
---------  
백준시가 N개의 구역으로 나누어져 있고, 구역은 1번부터 N번까지 번호가 매겨져 있다.  
구역을 두 개의 선거구로 나눠야 하고, 각 구역은 두 선거구 중 하나에 포함되어야 한다.  
선거구는 구역을 적어도 하나 포함해야 하고, 한 선거구에 포함되어 있는 구역은 모두 연결되어야 한다.  
구역 A에서 인접한 구역을 통해서 구역 B로 갈 수 있을 때, 두 구역은 연결되어 있다고 한다. 중간에 통하는 인접한 구역은 0개 이상이어야 하고, 모두 같은 선거구에 포함된 구역이어야 한다.  


자세한 문제설명은 아래 링크를 참조  

>출처  
><https://www.acmicpc.net/problem/17471>  

풀이  
------------  
1. 초기생각  
dfs로 연결된 노드를 탐색하면 탐색되지 않는 구역과 탐색된 구역으로 나뉘게 된다.  
즉, 2개의 구역으로 분리되므로 탐색되지 않는 구역에 대해 bfs를 수행해 서로 연결되어 있는지 확인 후 인구 차이를 계산하면 된다고 생각했다.  
**하지만** dfs탐색 시 확인하지 못하는 몇몇 경우가 발생한다는 것을 발견했으며, 생각해본 다른 탐색방법들도 마찬가지라는 생각을 가지게 됐다.  


2. 최종생각  
구역이 최대 10개밖에 존재하지 않기 때문에 구역들을 2개의 선거구로 나눌 모든 경우를 고려시 2^10 = 1024로 짧은 시간에 가능하다는 생각을 했다.  
이에 **func()함수**에서 구역들을 2개의 선거구로 나눈 뒤,  
각 선거구별 **bfs()함수**를 수행해 선거구에 포함된 영역이 모두 연결되어 있는지 확인한다.  


코드  
--------  
``` c  
#include<stdio.h>
#include<vector>
#include<queue>
using namespace std;

int num = 0, cnt[3], a, b;	//bfs탐색시 visited배열에 체크할 번호(매번 초기화안하려고), 선거구에 포함된 구역 수, 각 선거구 인원수 a, b  
int n, pp[10], minn;	//구역 수, 인구 수, 인원차 최소
int guyeok[10], visited[10];	//각 구역별 선거구 정보, bfs함수에서 사용 배열
vector<vector<int>> vt;

/*
선거구1에 포함된 구역들이 모두 연결된지 확인 -> 연결되면 선거구2도 확인 -> 연결안되면 바로 return -> 선거구2 연결확인후 return
연결 확인방법: bfs로 탐색하며 cnt[]값을 감소시킴, 모든 구역을 탐색했다면 cnt[]값은 0이된다. 아닐 경우 cnt[]값은 1이상
*/
bool bfs() {
	int tem = guyeok[0];
	a = 0, b = 0;
	queue<int> qu;
	cnt[0] = cnt[tem];	//구역0이 포함된 선거구 확인
	visited[0] = num;
	qu.push(0);
	a += pp[0];
	cnt[0]--;
	while (!qu.empty()) {
		int here = qu.front();
		qu.pop();
		for (int next : vt[here]) {
			if (visited[next] == num || guyeok[next] != tem) continue;
			cnt[0]--;
			a += pp[next];
			visited[next] = num;
			qu.push(next);
		}
	}
	if (cnt[0] > 0) return false;
	for (int i = 1; i < n; i++) {	//구역0과 선거구가 다른 구역 찾기
		if (guyeok[i] != tem) {
			tem = i;
			break;
		}
	}
	visited[tem] = num;	//찾은 구역을 포함한 선거구 확인
	qu.push(tem);
	b += pp[tem];
	tem = guyeok[tem];
	cnt[0] = cnt[tem]-1;
	while (!qu.empty()) {
		int here = qu.front();
		qu.pop();
		for (int next : vt[here]) {
			if (visited[next] == num || guyeok[next] != tem) continue;
			cnt[0]--;
			b += pp[next];
			visited[next] = num;
			qu.push(next);
		}
	}
	if (cnt[0] > 0) return false;
	return true;	//두 선거구가 모두 조건을 만족하면 true반환
}

/*
선거구 나누는 모든 조합 확인하기 - 재귀함수
*/
void func(int pos) {
	if (pos == n) {
		if (cnt[1] != 0 && cnt[2] != 0) {		//모든 구역의 선거구 나눈 후 각 선거구에 포함된 구역이 1이상이어야함
			num++;
			if (bfs()) {
				int tem = a < b ? b - a : a - b;
				if (minn > tem)
					minn = tem;
			}
		}
		return;
	}
	if (minn == 0) return;
	guyeok[pos] = 1;
	cnt[1]++;
	func(pos + 1);
	cnt[1]--;
	guyeok[pos] = 2;
	cnt[2]++;
	func(pos + 1);
	cnt[2]--;
}

int main() {
	scanf("%d", &n);
	for (int i = 0; i < n; i++) {
		scanf("%d", &pp[i]);
	}
	vt.resize(n + 1);
	for (int i = 0; i < n; i++) {
		int a;
		scanf("%d", &a);
		while (a--) {
			int b;
			scanf("%d", &b);
			vt[i].push_back(b - 1);
		}
	}
	minn = 10000;
	guyeok[0] = 1;	//구역0을 선거구1로 지정한 것과 2로 지정한 것은 결과 같음
	cnt[1]++;
	func(1);
	if (minn == 10000) minn = -1;
	printf("%d", minn);
}
```