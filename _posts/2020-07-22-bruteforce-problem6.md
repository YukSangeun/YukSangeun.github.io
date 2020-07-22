---
title: "백준 15686번: 치킨 배달"
excerpt: "bruteforce"

toc: true
toc_sticky: true
toc_label: "LIST"

categories:
  - Problem
tags:
  - Brute-force
last_modified_at: 2020-07-22
---
문제  
---------  
n*n 지도에 치킨집과 집들이 존재할때, 치킨집 중 최대 m개의 치킨집만을 남기려고한다.  


각각의 집과 가장 가까운 치킨집 사이의 거리를 **치킨 거리**라고 할 때,  
모든 집의 치킨 거리의 합인 **도시의 치킨 거리**의 값의 최소를 구하면 된다.  


즉, 최대 m개의 치킨집을 남겼을 때 도시의 치킨 거리값의 최소를 구하자.  


> 출처  
> <https://www.acmicpc.net/problem/15686>


풀이  
----------  
크게 어려움이 없는 문제이다.  
기존 많이 풀었던 brute force문제들과 마찬가지로 각 치킨집마다 유지할지 없앨지 따진 후 그때의 거리 합을 구하면 된다.  


처음 문제를 풀 때, 각각의 집에서 가장 가까운 치킨집 사이의 거리를 구하는 것에서 bfs를 써서 해결했었다.  
이렇게 하니 각 경우마다 bfs탐색시 최악 경우 O(n * n) time이 걸리게 되어 시간이 많이 걸리는 것을 알 수 있었고  
다른 방법으로 **처음에 각 치킨집과 집마다 거리를 모두 계산**하는 방식을 생각해냈다.  
이 경우 크기가 [house개수 * store개수] 인 배열을 만들어 각 경우마다 거리 구하는데 [house개수 * store개수] 만큼의 시간이 걸리는 것을 볼 수 있었고,  
이는 최악 경우 [100 * 13=1300]이 된다.  


bfs탐색과 미리 거리 배열을 만드는 방법을 볼 때, 확실히 미리 거리배열을 만드는 것이 더 적은 수행을 하는것을 알 수 있었으며 실제로 속도가 많이 향상됨을 봤다.  


(너무 bfs탐색으로 생각을 해서 오히려 시간이 더 많이 걸리도록 코드를 작성한 것 같다.)  


코드  
--------  
```  c++  
#include<stdio.h>
#include<queue>
using namespace std;

struct POS {
	int r;
	int c;
};

int n, m, res = 10e8, store_cnt = 0, house_cnt;
int map[50][50], dist[100][13];
POS chicken[13], house[100];
bool maintance[13];	//가게 유지 여부

int movR[4] = { -1, 1, 0, 0 };
int movC[4] = { 0, 0, -1, 1 };

void all_dist() {
	for (int i = 0; i < house_cnt; i++) {
		for (int j = 0; j < store_cnt; j++) {
			int a = chicken[j].r < house[i].r ? house[i].r - chicken[j].r : chicken[j].r - house[i].r;
			int b = chicken[j].c < house[i].c ? house[i].c - chicken[j].c : chicken[j].c - house[i].c;
			dist[i][j] = a + b;
		}
	}
}

void bfs() {
	int sum = 0;
	//집별 존재하는 가장 가까운 치킨집 구하기
	for (int i = 0; i < house_cnt; i++) {
		int tem = 10e8;
		for (int j = 0; j < store_cnt; j++) {
			if (!maintance[j]) continue;
			if (tem > dist[i][j]) tem = dist[i][j];
		}
		sum += tem;
	}
	if (sum < res) res = sum;
}

void func(int num, int total) {	//현재 가게번호, 현재까지 유지 가게 수
	if (num == store_cnt) {
		if (total == m)
			bfs();
		return;
	}
	//가게 유지할 경우
	maintance[num] = true;
	func(num + 1, total + 1);
	//유지하지 않을 경우
	maintance[num] = false;
	func(num + 1, total);
}

int main() {
	scanf("%d %d", &n, &m);
	for (int i = 0; i < n; i++) {
		for (int j = 0; j < n; j++) {
			scanf("%d", &map[i][j]);
			if (map[i][j] == 2) {
				chicken[store_cnt].r = i;
				chicken[store_cnt++].c = j;
			}
			else if (map[i][j] == 1) {
				house[house_cnt].r = i;
				house[house_cnt++].c = j;
			}
		}
	}
	all_dist();
	func(0, 0);
	printf("%d", res);
}
```  