---
title: "백준 17822번: 원판 돌리기"
excerpt: "BFS 와 simulation"

toc: true
toc_sticky: true
toc_label: "LIST"

categories:
  - Problem
tags:
  - BFS
  - Simulation
last_modified_at: 2020-07-17
---
문제  
-----------  
반지름이 1, 2, ..., N인 원판이 크기가 작아지는 순으로 바닥에 놓여있고, 원판의 중심은 모두 같다.  
원판의 반지름이 i이면, 그 원판을 i번째 원판이라고 한다.  
각각의 원판에는 M개의 정수가 적혀있고, i번째 원판에 적힌 j번째 수의 위치는 (i, j)로 표현한다.  
수의 위치는 다음을 만족한다.  
* (i, 1)은 (i, 2), (i, M)과 인접  
* (i, M)은 (i, M-1), (i, 1)과 인접  
* (i, j)는 (i, j-1), (i, j+1)과 인접 (2 ≤ j ≤ M-1)  
* (1, j)는 (2, j)와 인접  
* (N, j)는 (N-1, j)와 인접  
* (i, j)는 (i-1, j), (i+1, j)와 인접 (2 ≤ i ≤ N-1)  


원판의 회전은 독립적으로 이루어진다. 예를 들어, 2번 원판이 회전할 경우 나머지 원판은 회전하지 않는다.  
아래 그림은 N=3, M=4인 기존 원판과 각 원판들을 회전시킨 후 변화된 원판의 모습이다.  
![원판 예제](https://yuksangeun.github.io/assets/images/BOJ17822/example1.PNG){: .align-center}  
![원판 예제](https://yuksangeun.github.io/assets/images/BOJ17822/example2.PNG){: .align-center}  


원판을 아래와 같은 방법으로 **총 T번 회전**시키려고 한다. 원판의 회전 방법은 미리 정해져 있고, i번째 회전할때 사용하는 변수는 xi, di, ki 이다.  
1. 번호가 xi의 배수인 원판을 di방향으로 ki칸 회전시킨다. di가 0인 경우 시계 방향, 1인 경우 반시계 방향을 의미한다.  
2. 원판에 수가 남아있으면, 인접하면서 수가 같은 것을 모두 찾는다.  
	1) 그러한 수가 있는 경우에는 원판에서 인접하면서 같은 수를 모두 지운다.  
	2) 없는 경우에는 원판에 적힌 수의 평균을 구하고, 평균보다 큰 수에서 1을 빼고, 작은 수에는 1을 더한다.  


원판을 T번 회전시킨 후 **원판에 적힌 수의 합**을 구해보자.  


> 참조  
> <https://www.acmicpc.net/problem/17822>

풀이  
-----------  
문제는 어렵지 않지만 구현 방식에서 조금 시간이 걸리 수 있는 문제이다.  


구현 시 2가지에 대해 생각해야 한다.  
1. 원판을 어떻게 저장할 것인지  
2. 회전 후 변화된 원판을 어떻게 저장할 것인지  


원판 저장하는 방법은 입력받는 방법과 같이 N*M 배열에 저장하면 된다.  
반지름이 가장 작은 원판이 0행, 그다음이 1행, ... 가장 큰 원판이 n-1행이 된다.  
인접 영역의 경우 배열로 저장한다면 각 칸의 상하좌우이며 각 칸과 인접하면서 같은 수를 찾을 때 이를 기억하고 bfs로 탐색한다.  
즉, 아래 그림과 같다.  
![원판 예제](https://yuksangeun.github.io/assets/images/BOJ17822/example3.PNG){: .align-center}  


원판을 배열에 저장했다면 이제 회전하는 방법에 대해 생각해야한다.  
k번 회전을 수행하기 위해서는 각 원판별 값을 이동시켜야 하기 때문에 기존 배열만으로 회전을 구현할 수 없다.  
따라서 새로운 n*m배열을 생성하였고 이름을 pos라 하자.  
기존 배열이 각 원판의 초기 위치별 값을 저장한 것이라면 pos배열은 이 값들의 원판에서의 위치를 저장하는 배열이다.  


pos배열을 통해 회전할 때마다 pos배열에서 실제값들의 위치 값을 변화하면 된다.  
즉, 아래 그림과 같다.  
![원판 예제](https://yuksangeun.github.io/assets/images/BOJ17822/example4.PNG){: .align-center}  
만약, 위 예제와 같이 회전 후 2번 원판의 2번째 위치에 있는 값을 찾고자 한다면 board[2][pos[2][2]]를 하면 된다.  


나머지 코드 구현은 문제에 나와있는 순서대로 구현하였으며 코드를 보며 이해할 수 있다.  


(문제를 푼 후 회전 후 값 저장하는 방법에 대해 찾아보니, 임시로 1차원 배열을 생성하여 값들을 옮긴 뒤 임시 배열의 값을 기존 배열로 이동시키는 방법을 봤다.)  


코드  
-----------  
``` c  
#include<stdio.h>
#include<queue>
using namespace std;

int n, m, t;	//원판 개수, 숫자 개수, 명령 수
int board[50][50], pos[50][50];	//원판 값 적힌 배열, 원판 자리에 매칭되는 값의 위치 적힌 배열
int sum = 0, cnt = 0;	//원판에 적힌 수의 합, 수의 개수

queue<pair<int, int>> qu;

int movR[4] = { -1, 1, 0, 0 };
int movC[4] = { 0, 0, -1, 1 };

int main() {
	scanf("%d %d %d", &n, &m, &t);
	for (int i = 0; i < n; i++) {
		for (int j = 0; j < m; j++) {
			scanf("%d", &board[i][j]);
			sum += board[i][j];
			pos[i][j] = j;
		}
	}
	cnt = n * m;
	while (t--) {
		int x, d, k;	//배수, 방향, 횟수
		scanf("%d %d %d", &x, &d, &k);
		if (d == 1) {	//반시계
			for (int i = x; i <= n; i += x) {
				for (int j = 0; j < m; j++)
					pos[i-1][j] = ((pos[i-1][j] + k) % m);
			}
		}
		else {	//시계
			for (int i = x; i <= n; i += x) {
				for (int j = 0; j < m; j++) {
					pos[i-1][j] = pos[i-1][j] - k;
					if (pos[i-1][j] < 0)
						pos[i-1][j] += m;
				}
			}
		}
		//인접 수 같은지 확인 - bfs
		bool flag = false;
		for (int i = 0; i < n; i++) {
			for (int j = 0; j < m; j++) {
				if (board[i][pos[i][j]] == -1) continue;
				int value = board[i][pos[i][j]];
				//bfs
				bool possible = false;
				qu.push({ i, j });
				board[i][pos[i][j]] = -1;
				while (!qu.empty()) {
					pair<int, int> here = qu.front();
					qu.pop();
					for (int mov = 0; mov < 4; mov++) {
						int newR = here.first + movR[mov];
						int newC = (m + here.second + movC[mov]) % m;
						if (newR < 0 || newR >= n) continue;
						if (board[newR][pos[newR][newC]] == value) {
							qu.push({ newR, newC });
							board[newR][pos[newR][newC]] = -1;
							possible = true;
							sum -= value;
							cnt--;
						}
					}
				}
				if (!possible)
					board[i][pos[i][j]] = value;
				else {
					flag = true;
					sum -= value;
					cnt--;
				}
			}
		}
		//없는 경우 평균 구해서 전체 수 조정
		if (!flag) {
			float avg = (float)sum / (float)cnt;
			for (int i = 0; i < n; i++) {
				for (int j = 0; j < m; j++) {
					if (board[i][j] == -1) continue;
					if ((float)board[i][j] > avg) {
						board[i][j]--;
						sum--;
					}
					else if ((float)board[i][j] < avg) {
						board[i][j]++;
						sum++;
					}
				}
			}
		}
	}
	printf("%d", sum);
}
```