---
title: "백준 12851번 숨바꼭질 2"
excerpt: "BFS 알고리즘을 사용한 문제"

toc: true
toc_sticky: true
toc_label: "LIST"

categories:
  - Problem
tags:
  - BFS
  - graph
last_modified_at: 2020-04-16
---
문제  
-----------  
수빈이는 동생과 숨바꼭질을 하고 있다. 수빈이는 현재 점 N(0 ≤ N ≤ 100,000)에 있고, 동생은 점 K(0 ≤ K ≤ 100,000)에 있다. 수빈이는 걷거나 순간이동을 할 수 있다. 만약, 수빈이의 위치가 X일 때 걷는다면 1초 후에 X-1 또는 X+1로 이동하게 된다. 순간이동을 하는 경우에는 1초 후에 2*X의 위치로 이동하게 된다.  
수빈이와 동생의 위치가 주어졌을 때, 수빈이가 동생을 찾을 수 있는 가장 빠른 시간이 몇 초 후인지 그리고, 가장 빠른 시간으로 찾는 방법이 몇 가지 인지 구하는 프로그램을 작성하시오.

입력
-----------
첫 번째 줄에 수빈이가 있는 위치 N과 동생이 있는 위치 K가 주어진다. N과 K는 정수이다.  

> 참조  
> <https://www.acmicpc.net/problem/12851>  

풀이1
-----------
너비 우선 탐색 과정 중 n에서 k로 가는 경로를 저장하는 방법을 이용하는 풀이이다.  
따라서 bfs()와 path() 두가지 함수를 이용한다.  
bfs()함수를 통해 경로를 탐색하고 이후 path()함수를 통해 탐색한 경로를 역순으로 훑으며 경우를 센다.  


**주의사항**  
1. n에서 k로 가는 모든 경로를 찾아야 하므로 visited 배열에 단순 방문여부를 표시할 경우 틀린다.  그러므로 visited배열에는 현재 위치에 도달 했을 때 시간을 저장시킨다.  
2. 현재시간이 t일 때, 위치 a에 방문하기 위한 조건은 visited[a]의 값이 0이거나(최초 방문) 같은 visited[a]의 값이 t인 경우(같은 시간대에 이전에 다른 경로를 통해 방문)이다.  
3. 현재 위치 here에서 3가지 경우 here+1, here-1, here*2가 존재하며, 모두 수행하는 연산이 틀리므로 3가지 중 같은 값이 존재하더라도 모두 다른 경우로 생각해야 한다.  

코드1  
-------------  

``` c  
#include<stdio.h>
#include<vector>
#include<queue>
#include<algorithm>
using namespace std;

int n, k;
int time=0, cnt=0;	//출력될 결과값들(시간, 경우 수)
vector<int> visited;	//방문여부
vector<vector<int>> parent;	//이전 노드를 저장

void path(int here) {
	if (here == n) cnt++;
	else {
		for (int next : parent[here]) {
			path(next);
		}
	}
}

void bfs() {
	queue<int> qu;
	bool flag = false;	//k에 도달 시 true로 바뀜 , 탐색 종료
	if (n == k) {
		flag = true;
	}
	visited[n] = 1;
	qu.push(n);
	while (!flag) {
		int sz = qu.size();
		while (sz--) {	//같은 시간대에 위치한 노드들 탐색
			int here = qu.front();
			qu.pop();
			//이동 here-1, here+1, here*2
			int next = here - 1;
			if (next >= 0 && (visited[next] == 0 || visited[next] == time+2)) {
				if (visited[next] == 0) {	//최초 방문일 경우만 qu에 넣는다.
					visited[next] = time + 2;
					qu.push(next);
				}
				parent[next].push_back(here);
				if (next == k && flag == false)
					flag = true;
			}
			next = here + 1;
			if (next <= k && (visited[next] == 0 || visited[next] == time + 2)) {
				if (visited[next] == 0) {
					visited[next] = time + 2;
					qu.push(next);
				}
				parent[next].push_back(here);
				if (next == k && flag == false)
					flag = true;
			}
			next = here * 2;
			if (next < k*2 && next <= 100000 && (visited[next] == 0 || visited[next] == time + 2)) {
				if (visited[next] == 0) {
					visited[next] = time + 2;
					qu.push(next);
				}
				parent[next].push_back(here);
				if (next == k && flag == false)
					flag = true;
			}
		}
		time++;
	}

	path(k);
}

int main() {
	scanf("%d %d", &n, &k);
	int maxx = max(n, k);
	maxx = maxx <= 100000 ? maxx * 2 : 100000;
	visited.resize(maxx + 1);
	parent.resize(maxx + 1);
	bfs();
	printf("%d\n%d", time, cnt);
}
```

풀이2
-----------
풀이1에 경우 path()함수를 통해 가능한 경로를 탐색하기 위해 따로 parent 벡터를 사용하므로 용량이 더 많이 사용된다.  
또한 bfs()탐색 후 path()함수를 탐색해야하므로 시간이 많이 걸린다.  
풀이2는 시간과 공간을 좀 더 절약할 수 있는 방법이다.  


bfs()함수 하나만을 가지고 문제를 해결한다.  탐색시 두가지의 배열 visited[], cnt[]를 사용하며, visited[]배열에 해당 위치에 도달 시 시간을 저장하고 cnt[]배열에 해당 위치에 도달 할 수 있는 가능 경우의 개수를 저장한다.  
기본적인 탐색은 풀이1의 bfs()함수와 동일하며, 위치 b에서 a로 이동할 때 a를 최초 접근하거나 같은 시간대에 방문된 위치를 접근하는 경우 cnt[a]에 cnt[b]값을 더하는 코드가 존재한다.  
즉, 다음 위치로 갈 수 있는 경우들을 누적해서 cnt배열에 저장한다.

코드2  
-------------  

``` c  
#include<stdio.h>
#include<queue>
using namespace std;

int visited[100001], cnt[100001];
int n, k;

void bfs() {
	queue<int> qu;	// 위치
	visited[n] = cnt[n] = 1;
	int time = 1;
	bool flag = false;
	if (k == n) flag = true;
	qu.push(n);
	while (!flag) {
		int sz = qu.size();
		while (sz--) {
			int here = qu.front();
			qu.pop();
			//이동
			if (here - 1 >= 0) {
				if (visited[here - 1] == 0) {
					qu.push(here - 1);
					visited[here - 1] = time + 1;
					cnt[here - 1] += cnt[here];	//here까지 올 수 있는 모든 경우의 수를 here-1에 갈 수 있는 경우에 더한다.
				}
				else if (visited[here - 1] == time + 1)
					cnt[here - 1] += cnt[here];
				if (here - 1 == k && flag == false) flag = true;
			}
			if (here + 1 <= k){
				if (visited[here + 1] == 0) {
					qu.push(here + 1);
					visited[here + 1] = time + 1;
					cnt[here + 1] += cnt[here];
				}
				else if (visited[here + 1] == time + 1)
					cnt[here + 1] += cnt[here];
				if (here + 1 == k && flag == false) flag = true;
			}
			if (here < k && here * 2 < 100001){
				if (visited[here * 2] == 0) {
					qu.push(here * 2);
					visited[here * 2] = time + 1;
					cnt[here * 2] += cnt[here];
				}
				else if (visited[here * 2] == time + 1)
					cnt[here * 2] += cnt[here];
				if (here * 2 == k && flag == false) flag = true;
			}
		}
		time++;
	}
}

int main() {
	scanf("%d %d", &n, &k);
	if (n >= k)
		printf("%d\n1", n - k);
	else {
		bfs();
		printf("%d\n%d", visited[k]-1, cnt[k]);
	}
}
```