---
title: "백준 1103번: 게임"
excerpt: "dfs + dp"

toc: true
toc_sticky: true
toc_label: "LIST"

categories:
  - Problem
tags:
  - DFS
  - DP
last_modified_at: 2020-08-30
--- 
문제  
--------  
형택이는 1부터 9까지의 숫자와, 구멍이 있는 직사각형 보드에서 재밌는 게임을 한다.  


일단 보드의 가장 왼쪽 위에 동전을 하나 올려놓는다. 그 다음에 다음과 같이 동전을 움직인다.  
1. 동전이 있는 곳에 쓰여 있는 숫자 X를 본다.  
2. 위, 아래, 왼쪽, 오른쪽 방향 중에 한가지를 고른다.  
3. 동전을 위에서 고른 방향으로 X만큼 움직인다. 이때, 중간에 있는 구멍은 무시한다.  


만약 동전이 구멍에 빠지거나, 보드에 바깥으로 나간다면 게임은 종료된다.  


보드의 상태가 주어졌을 때, 형택이가 **최대 몇 번 동전을 움직일 수 있는지** 구하는 프로그램을 작성하자.  


++) 만약 형택이가 동전을 무한번 움직일 수 있다면 -1을 출력한다.  

> 출처  
> <https://www.acmicpc.net/problem/1103>  

풀이  
--------  
먼저, 문제를 읽고나면 형택이가 움직인 횟수를 구하기 위해 **탐색**을 해야하며 탐색시 **cycle이 발생하는 것을 체크**해줘야 한다는 것을 알 수 있다.  
위 두가지 이유로 **DFS**를 이용하여 코드를 작성한다.  


만약, BFS로 탐색을 수행할 경우 각 경로별 움직인 횟수는 알 수 있지만 경로마다 존재하는 cycle을 찾기가 어렵다.  


**DFS를 이용한 방법**의 동작을 알아보자.  
1. board값을 입력받으며, 구멍인 경우 -1값을 저장한다.  
2. dfs수행 - 항상 (0, 0)에서 시작
3. 파라미터로 받은 현재 위치가 구멍이면 더이상 탐색하지 않고 return  
4. 현재 위치가 움직일 수 있는 위치라면 상, 하, 좌, 우에 대해 탐색 시작  
	1) 만약, 다음 위치가 보드를 벗어날 경우 continue  
	2) 만약, 다음 위치가 이미 방문된 경우 cycle이므로 바로 return -1  
	3) 재귀함수에서 -1을 반환받는 경우 탐색 종료 - 무한번 움직일 수 있는 경우 찾은 것이므로  
	4) -1이 아닌 값을 반환받으면 호출된 재귀함수들 중 값이 가장 큰 값을 찾는다.  
5. 각 경로마다 cycle을 확인해야하므로 재귀함수 종료시 visit값을 0으로 바꾼 뒤 4-3에서 찾은 값을 반환  


위와 같이 기본 dfs탐색과 방식이 비슷하며, 차이점은 **재귀함수 호출될때마다 현재 위치가 구멍인지 확인**하고 **다음 위치를 찾을 때 cycle여부 확인** 또한 **경로마다 cycle을 찾아야하므로 visit값 0으로 바꾸기**이다.  


**하지만**, 위와 같이 작성한 후 제출을 하면 시간초과가 발생한다.  
아마도 각 경로마다 cycle을 확인한다고 재귀함수 종료할 때마다 visit값을 0으로 바꿔주기 때문에 중복적으로 탐색하는 구간이 많은 것이 원인같다.  
이를 보완하기 위한 방법으로 DP를 추가사용했다.  


**DP사용**을 추가한 방법에 대해 알아보자.  
1. 각 경로마다 겹치는 위치가 존재할 수 있으며 겹치는 위치에서 다음 탐색하는 경우는 똑같다.  
2. 즉, 위치가 겹치면 탐색경로도 겹치기 때문에 중복 탐색이 발생한다. 이에 들어가는 시간을 축소하자.  
3. **dp에 각 위치에서 최대 이동할 수 있는 횟수를 저장**한다.  
4. dp에 값이 있는 경우 더이상 탐색하지 않고 **현재 횟수dep에 dp값을 더하여 return**한다.  


**주의**  
작성시 했던 실수 중 한가지가 dp를 visit배열로 이용해서 탐색을 진행해도 될 것이라고 생각한 부분이다.  
왜냐하면 dp배열을 이용해 방문여부까지 확인할 수 있기 있다고 생각했기 때문이다.  
이때, cycle을 검사하고 있었다는 사실을 빼고 생각했던 것 같다.  


dp와 visit배열을 따로 설정해야하는 이유:  
**각 경로마다 방문여부를 검사할 때 dp로 확인할 경우 이전 경로에서 방문된 곳이라면 현재 경로에서 방문하기도 전에 dp에 값이 저장된다.**  
**따라서 cycle을 확인할 때 현재에서 방문한게 아닌데 방문표시가 존재하므로 cycle이 발생했다고 결과가 나올 수 있다.**  
**그러므로 cycle을 위해서 방문배열을 따로 설정해야 한다.**  


+) 너무 탐색문제 위주로 문제를 풀다보니 dp오 같은 다른 알고리즘을 섞어 사용해야하는 경우들을 생각하지 못하는 것 같다.  
좀더 열린 생각으로 생각할 수 있기를!!  

코드  
--------  
``` c  
#include<stdio.h>
#include<algorithm>
using namespace std;

struct POS {
	int r;
	int c;
};

int n, m;
int board[50][50], dp[50][50];
bool visit[50][50];

POS mov[4] = { {-1, 0}, {1, 0}, {0, -1}, {0, 1} };


int dfs(POS par, int dep) {	//return값이 -1이면 탐색 종료 - 무한번 가능하다는뜻
	if (board[par.r][par.c] == -1) return dep - 1;	//구멍에 빠지는 경우 종료
	if (dp[par.r][par.c] > -1) return dep + dp[par.r][par.c];		//dp에 값 존재하면 현재횟수와 더해서 반환
	visit[par.r][par.c] = true;
	dp[par.r][par.c] = dep;
	int ret = dep;
	for (int i = 0; i < 4; i++) {
		POS next = { par.r + board[par.r][par.c] * mov[i].r, par.c + board[par.r][par.c] * mov[i].c };
		if (next.r < 0 || next.r >= n || next.c < 0 || next.c >= m) continue;
		if (visit[next.r][next.c]) return -1;	//싸이클 발생
		int res = dfs(next, dep + 1);
		if (res == -1) return res;
		ret = max(ret, res);
	}
	dp[par.r][par.c] = ret - dep;
	visit[par.r][par.c] = false;	//다른 경로에서 싸이클 확인해야하므로
	return ret;
}

int main() {
	scanf("%d %d", &n, &m);
	for (int i = 0; i < n; i++) {
		for (int j = 0; j < m; j++) {
			char a;
			scanf(" %c", &a);
			if (a == 'H') board[i][j] = -1;
			else board[i][j] = a - '0';
			dp[i][j] = -1;
		}
	}
	printf("%d", dfs({ 0, 0 }, 1));
}
```