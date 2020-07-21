---
title: "백준 15683번: 감시"
excerpt: "bruteforce"

toc: true
toc_sticky: true
toc_label: "LIST"

categories:
  - Problem
tags:
  - Brute-force
last_modified_at: 2020-07-21
---
문제  
---------  
N*M크기의 직사각형으로 이루어진 사무실에 k개의 CCTV가 존재한다.  
CCTV의 종류는 총 4가지로  
* 1번: 한 쪽 방향 감시  
* 2번: 두 방향 감시, 방향이 서로 반대방향  
* 3번: 두 방향 감시, 방향이 직각방향  
* 4번: 세 방향 감시  
* 5번: 모든 방향 감시  
가 있다.  


이때, CCTV의 방향을 90도씩 회전해가며 방향을 적절히 정해, 사가 지대의 최소 크기를 구하고자 한다.  


> 출처  
> <https://www.acmicpc.net/problem/15683>


풀이  
---------  
브루트포스 문제로 모든 CCTV에 대해 가능한 방향별 경우를 재귀함수로 확인 후, 경우별로 사각 지대의 개수를 구하면 된다.  
각 경우별 사각지대의 개수를 구할 때마다 최소값인지를 비교하면 된다.  


이 문제에서 고민했던 부분은 **CCTV종류별로 확인할 방향을 어떻게 저장**할 것인가 이다.  


상, 하, 좌, 우 네 방향에 대해 각각 상-0, 우-1, 하-2, 좌-3으로 번호를 매칭시켰다.  
그 다음으로 CCTV를 90도씩 회전시켰을 때 확인 방향을 생각해 보았으며 아래 표와 같다.  

|CCTV종류|시작방향 ->|0|1|2|3|  
|---|---|---|---|---|---|  
|1번| |(0)|(1)|(2)|(3)|
|2번| |(0,2)|(1,2)| - | - |  
|3번| |(0,1)|(1,2)|(2,3)|(3,0|  
|4번| |(0,1,2)|(1,2,3)|(2,3,0)|(3,0,1)|  
|5번| |(0,1,2,3)| - | - | - |  


다음 표와 같으며, 이에 90도 회전했을 때 확인할 수 있는 방향에 대한 정보를 다음과 같은 방식으로 저장했다.  
**(시작방향, 현재방향에 더할 값, 더하기 횟수)**  
* 시작방향: 경우별로 0, 1, 2, 3  
* 더할 값: 1번(0), 2번(2), 3번(1), 4번(1), 5번(1)  
* 횟수: 1번(0), 2번(1), 3번(1), 4번(2), 5번(3)  

예를 들어, 확인할 수 있는 방향 정보가 (1, 1, 2) 라고 하면,  
시작 방향이 1번이므로, 1씩 총 2번 더하여 총 확인 가능한 방향은 1,2,3번 방향이 된다.  
이는 4번 종류의 카메라를 의미하고 확인 가능한 방향이 하,좌,우임을 의미한다.  


이때, 아래 코드에서는 시작방향부터 for문으로 확인하기 위해 시작방향 이전값을 시작방향에 저장하고, 횟수도 +1하여 저장했다.  
작동원리는 같다.  


(탐색 시 bfs를 이용하려 했지만 queue를 사용해 push, pop을 해서 그런지 시간이 2배정도 더 걸렸다.  )

코드  
---------  
``` c++  
#include<stdio.h>
#include<vector>
#include<queue>
using namespace std;

int n, m, k, total, res = 64, vi = 0;
int board[8][8], visited[8][8];
vector<pair<int, int>> cctv_pos;
vector<pair<pair<int, int>, int>> cctv_case;	//시작방향, 더할 수, 횟수

int movR[4] = { -1, 0, 1, 0 };
int movC[4] = { 0, 1, 0, -1 };	//상, 우, 하, 좌

void func(int ca) {
	if (ca == k) {	//사각지대 확인
		queue < pair<pair<int, int>, int>> qu;
		int blank = total;
		vi++;
		for (int i = 0; i < k; i++) {
			int dir = cctv_case[i].first.first;
			for (int j = 0; j < cctv_case[i].second; j++) {
				dir = (dir + cctv_case[i].first.second) % 4;
				int newR = cctv_pos[i].first + movR[dir];
				int newC = cctv_pos[i].second + movC[dir];
				while (newR >= 0 && newR < n && newC >= 0 && newC < m && board[newR][newC] != 6) {
					if (visited[newR][newC] != vi && board[newR][newC] == 0) blank--;
					visited[newR][newC] = vi;
					newR += movR[dir];
					newC += movC[dir];
				}
			}
		}
		if (blank < res) res = blank;
		return;
	}
	if (board[cctv_pos[ca].first][cctv_pos[ca].second] == 1) {
		for (int i = 0; i < 4; i++) {
			cctv_case[ca] = { {i, 0}, 1 };
			func(ca + 1);
		}
	}
	else if (board[cctv_pos[ca].first][cctv_pos[ca].second] == 2) {
		for (int i = 0; i < 2; i++) {
			cctv_case[ca] = { {i - 2, 2}, 2 };
			func(ca + 1);
		}
	}
	else if (board[cctv_pos[ca].first][cctv_pos[ca].second] == 3) {
		for (int i = 0; i < 4; i++) {
			cctv_case[ca] = { {i - 1, 1}, 2 };
			func(ca + 1);
		}
	}
	else if (board[cctv_pos[ca].first][cctv_pos[ca].second] == 4) {
		for (int i = 0; i < 4; i++) {
			cctv_case[ca] = { {i - 1, 1}, 3 };
			func(ca + 1);
		}
	}
	else {	//board[cctv_pos[ca].first][cctv_pos[ca].second] == 5
		cctv_case[ca] = { {-1, 1}, 4 };
		func(ca + 1);
	}
}

int main() {
	scanf("%d %d", &n, &m);
	k = 0;
	cctv_case.resize(9);
	for (int i = 0; i < n; i++) {
		for (int j = 0; j < m; j++) {
			scanf("%d", &board[i][j]);
			if (board[i][j] > 0 && board[i][j] < 6)
				cctv_pos.push_back({ i, j });
			else if (board[i][j] == 0) total++;
		}
	}
	k = cctv_pos.size();
	func(0);
	printf("%d", res);
}
```