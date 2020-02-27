---
title: "백준 1162번: 도로포장"
excerpt: "다익스트라 알고리즘을 이용한 문제"

categories:
  - Problem
tags:
  - Dijkstra
  - graph
last_modified_at: 2020-02-24T23:12:00
---
문제  
-------  
준영이는 매일 서울에서 포천까지 출퇴근을 한다. 하지만 잠이 많은 준영이는 늦잠을 자 포천에 늦게 도착하기 일쑤다. 돈이 많은 준영이는 고민 끝에 K개의 도로를 포장하여 서울에서 포천까지 가는 시간을 단축하려 한다.  
문제는 N개의 도시가 주어지고 그 사이 도로들과 이 도로를 통과할 때 걸리는 시간이 주어졌을 때 최소 시간이 걸리도록 하는 K개의 이하의 도로를 포장하는 것이다. 여기서 도로를 포장하게 되면 도로를 지나는데 걸리는 시간이 0이라 하자.  
또한 편의상 서울은 1번 도시, 포천은 N번 도시라 하고 1번에서 N번까지 항상 갈 수 있는 데이터만 주어진다.  

입력  
-------  
첫 줄에는 도시의 수 N(1 ≤ N ≤ 10,000)과 도로의 수 M(1 ≤ M ≤ 50,000)과 포장할 도로의 수 K(1 ≤ K ≤ 20)가 공백으로 구분되어 주어진다.  
M개의 줄에 대해 도로를 연결짓는 두 도시와 도로를 통과하는데 걸리는 시간이 주어진다. 도로들은 양방향 도로이며, 걸리는 시간은 1,000,000보다 작거나 같은 자연수이다.  

> 참조  
> <https://www.acmicpc.net/problem/1162>  

풀이  
--------  
문제의 큰 틀은 서울(1번 도시)에서 포천(N번 도시)으로 갈 수 있는 여러 경우 중 최소 시간을 구하는 문제이다.  
따라서 이 문제는 **dijkstra algorithm**을 이용하는 문제이다.  
이 문제에서 한가지 주의할 점은 **K개 이하의 도로를 포장할 수 있으며, 포장할 경우 그 도로로 이동하는데 0시간이 걸린다**는 점이다.  
즉, 탐색시 도로를 포장하여 다른 도시로 이동할 경우와 포장하지 않고 다른 도시로 이동할 경우를 둘 다 봐야한다.  


**point**  
현재 노드까지의 최소 시간을 저장하는 time배열을 **이차원 배열**로 설정한다.  
time[a][b]: a번 도시까지 b개의 도로를 포장하여 이동한 경우 최소 시간  

**이차원 배열로 설정한 이유:**  
예를 들어 설명해 보자. time배열을 1차원 배열로 설정한다면 단순하게 time[a]:a번도시까지 이동하는데 걸린 최소 시간을 저장하게 된다.(도로 포장 0~k개 경우들 중 최소 시간)  
포장 가능 개수가 1, 도시 개수 3, 도시 정보가 1--(2)--2--(5)--3 (괄호안에 있는게 두 도시간 거리를 뜻함.) 이라 하자.   
1->2 이동할 경우 도로를 포장하면 걸리는 시간 0, 포장하지 않을 경우 걸리는 시간 2가 된다. 그러므로 time[2]는 0이 저장 되고 포장된 도로는 1개가 된다.  
2->3 이동할 경우 이전에 time[2]는 0, 포장도로 1개 였으므로 2-3도로를 포장할 수 없다(포장 가능 개수 1). 따라서 time[3]은 5가 되어 3까지 이동하는데 걸리는 최소 시간은 5 이다.   
하지만 이는 답이 아니다. 왜냐하면 1-2도로를 포장하지 않고 2-3도로를 포장할 경우 3까지 이동하는데 걸리는 최소 시간이 2가 되어 우리가 구한 답보다 더 작은 값을 얻을 수 있기 때문이다.  
즉 각 도시까지 이동하는데 걸리는 최소 시간을 포장 개수 별로 나눠서 저장하지 않을 경우 위와 같이 올바른 최소 시간을 구할 수 없게 된다.  

코드  
----------  
``` c  
#include<stdio.h>
#include<vector>
#include<queue>
using namespace std;

int n, m, k;	//노드, 간선, 포장 개수
vector<vector<pair<int, int>>> adj;
long long dp[10000][21]; //dp[a][b]: 도시 a에 도달하기 까지 포장도로가 b개 존재할 경우 최소 시간

long long dijkstra() {
	priority_queue<pair<pair<long long, int>, int>> pq;	//-시간, 포장개수, 노드
	dp[0][0] = 0;
	pq.push({ {0,0}, 0 });
	while (!pq.empty()) {
		int here = pq.top().second;
		long long cost = -pq.top().first.first;
		int cnt = pq.top().first.second;
		pq.pop();
		if (here == n - 1) return cost;
		if (dp[here][cnt] < cost) continue;
		for (auto next : adj[here]) {
			//here - next 도로 포장 할 경우
			if (cnt+1<=k && dp[next.first][cnt+1] > cost) {
				dp[next.first][cnt+1] = cost;
				pq.push({ {-cost, cnt+1}, next.first });
			}
			//here - next 도로 포장 안할 경우
			long long nextC = cost + (long long)next.second;
			if (dp[next.first][cnt] > nextC) {
				dp[next.first][cnt] = nextC;
				pq.push({ {-nextC, cnt}, next.first });
			}
		}
	}
}

int main() {
	scanf("%d %d %d", &n, &m, &k);
	adj.resize(n);
	while (m--) {
		int a, b, c;
		scanf("%d %d %d", &a, &b, &c);
		adj[a - 1].push_back({ b - 1,c });
		adj[b - 1].push_back({ a - 1, c });
	}
	for (int i = 0; i < n; i++) {
		for (int j = 0; j <= k; j++)
			dp[i][j] = 10e10;
	}
	printf("%lld", dijkstra());
}
```