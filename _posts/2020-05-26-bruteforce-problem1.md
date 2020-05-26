---
title: "백준 13460번 구슬 탈출 2"
excerpt: "완전탐색, brute-force 문제"

toc: true
toc_sticky: true
toc_label: "LIST"

categories:
  - Problem
tags:
  - BFS
  - Brute-force
last_modified_at: 2020-05-27
---
문제  
-----------  
스타트링크에서 판매하는 어린이용 장난감 중에서 가장 인기가 많은 제품은 구슬 탈출이다. 구슬 탈출은 직사각형 보드에 빨간 구슬과 파란 구슬을 하나씩 넣은 다음, 빨간 구슬을 구멍을 통해 빼내는 게임이다.  


보드의 세로 크기는 N, 가로 크기는 M이고, 편의상 1×1크기의 칸으로 나누어져 있다. 가장 바깥 행과 열은 모두 막혀져 있고, 보드에는 구멍이 하나 있다. 빨간 구슬과 파란 구슬의 크기는 보드에서 1×1크기의 칸을 가득 채우는 사이즈이고, 각각 하나씩 들어가 있다. 게임의 목표는 빨간 구슬을 구멍을 통해서 빼내는 것이다. 이때, 파란 구슬이 구멍에 들어가면 안 된다.  


이때, 구슬을 손으로 건드릴 수는 없고, 중력을 이용해서 이리 저리 굴려야 한다. 왼쪽으로 기울이기, 오른쪽으로 기울이기, 위쪽으로 기울이기, 아래쪽으로 기울이기와 같은 네 가지 동작이 가능하다.  


각각의 동작에서 공은 동시에 움직인다. 빨간 구슬이 구멍에 빠지면 성공이지만, 파란 구슬이 구멍에 빠지면 실패이다. 빨간 구슬과 파란 구슬이 동시에 구멍에 빠져도 실패이다. 빨간 구슬과 파란 구슬은 동시에 같은 칸에 있을 수 없다. 또, 빨간 구슬과 파란 구슬의 크기는 한 칸을 모두 차지한다. 기울이는 동작을 그만하는 것은 더 이상 구슬이 움직이지 않을 때 까지이다.  


보드의 상태가 주어졌을 때, 최소 몇 번 만에 빨간 구슬을 구멍을 통해 빼낼 수 있는지 구하는 프로그램을 작성하시오.  

입력
-----------
첫 번째 줄에는 보드의 세로, 가로 크기를 의미하는 두 정수 N, M (3 ≤ N, M ≤ 10)이 주어진다. 다음 N개의 줄에 보드의 모양을 나타내는 길이 M의 문자열이 주어진다. 이 문자열은 '.', '#', 'O', 'R', 'B' 로 이루어져 있다. '.'은 빈 칸을 의미하고, '#'은 공이 이동할 수 없는 장애물 또는 벽을 의미하며, 'O'는 구멍의 위치를 의미한다. 'R'은 빨간 구슬의 위치, 'B'는 파란 구슬의 위치이다.  


입력되는 모든 보드의 가장자리에는 모두 '#'이 있다. 구멍의 개수는 한 개 이며, 빨간 구슬과 파란 구슬은 항상 1개가 주어진다.  


> 참조  
> <https://www.acmicpc.net/problem/13460>  

풀이
-----------
BFS와 완전탐색을 합친 느낌이다.  
**가능한 경우들을 다 생각해서 코드를 작성해야하므로 사소한 부분 때문에 틀릴 수 있는 문제.**  


생각하는데 오래걸려서 문제푸는데 많은 시간을 많이썼다..  
코드는 1시간반안에 완성했지만 같은 길 따라 움직이는 경우 코드 잘못작성해서 고치느라 1시간반정도 더 사용해서 성공했다.

코드  
-------------  

``` c  
#include<stdio.h>
#include<queue>
using namespace std;

int n, m;
char board[10][10];
queue<pair<pair<int, int>, int>> quR;	//((r, c), 방향)
queue<pair<int, int>> quB;	//(r, c)

int movR[4] = { 0, -1, 0, 1 };
int movC[4] = { -1, 0, 1, 0 };

int main() {
	scanf("%d %d", &n, &m);
	for (int i = 0; i < n; i++) {
		for (int j = 0; j < m; j++) {
			scanf(" %c", &board[i][j]);
			if (board[i][j] == 'R') {
				quR.push({ { i,j }, -1 });
			}
			else if (board[i][j] == 'B') {
				quB.push({ i, j });
			}
		}
	}
	//bfs탐색
	int cnt = 1;
	while (cnt <= 10 && !quR.empty()) {
		int size = quR.size();
		//printf("==%d\n", cnt);
		while (size--) {	//깊이별 탐색, 10번 이동을 세기위해
			pair<int, int> pR = quR.front().first;
			pair<int, int> pB = quB.front();
			int mR = quR.front().second;
			quR.pop();
			quB.pop();
			for (int i = 0; i < 4; i++) {	//4방향으로 이동
				bool fR = false, fB = false;	//구멍으로 탈출 가능한 경우 true
				int newX_A = pR.first, newY_A = pR.second, newX_B = pB.first, newY_B = pB.second;
				if (mR != -1 && ((mR+2)%4 == i || mR == i)) continue;	//반대 방향으로는 이동안함
				while (1) {	//Red에 대해
					newX_A += movR[i];
					newY_A += movC[i];
					if (board[newX_A][newY_A] == '#') {
						newX_A -= movR[i];
						newY_A -= movC[i];
						break;
					}
					else if (board[newX_A][newY_A] == 'O') {
						fR = true;
						break;
					}
				}
				while (1) {	//Blue에 대해
					newX_B += movR[i];
					newY_B += movC[i];
					if (board[newX_B][newY_B] == '#') {
						newX_B -= movR[i];
						newY_B -= movC[i];
						break;
					}
					else if (board[newX_B][newY_B] == 'O') {
						fB = true;
						break;
					}
				}
				if (fR == true) {
					if (fB == true) {	//동시에 탈출 가능한 경우
						continue;
					}
					else {	//Red만 탈출 가능한 경우 - 최소 이동 횟수
						printf("%d\n", cnt);
						return 0;
					}
				}
				else if (fB == true) {	//Blue만 탈출 가능한 경우
					continue;
				}
				if (newX_A == newX_B && newY_A == newY_B) {	//같은 길을 따라 움직일 경우 위치 조정해주기
					if (movR[i] == 0) {
						if (movC[i] == 1) {	//우
							if (pR.second < pB.second)
								newY_A -= 1;
							else
								newY_B -= 1;
						}
						else {	//movC[i] == -1 좌
							if (pR.second > pB.second)
								newY_A += 1;
							else
								newY_B += 1;
						}
					}
					else if (movR[i] == -1) {	//movC[i] == 0 상
						if (pR.first > pB.first)
							newX_A += 1;
						else
							newX_B += 1;
					}
					else {	//movR[i] == 1, movC[i] == 0 하
						if (pR.first < pB.first)
							newX_A -= 1;
						else
							newX_B -= 1;
					}
				}
				quR.push({ { newX_A, newY_A }, i });
				quB.push({ newX_B, newY_B });
			}
		}
		cnt++;
	}
	printf("-1\n");
}
```