---
title: "백준 15684번 사다리 조작"
excerpt: " "

toc: true
toc_sticky: true
toc_label: "LIST"

categories:
  - Problem
tags:
  - Brute-force
last_modified_at: 2020-05-30
---
문제  
--------  
N개의 세로선과 M개의 가로선으로 이루어진 초기 사다리에 가로선을 0개이상 추가하여 사다리 게임 수행 시 시작점과 도착점이 같은 세로선상에 위치하도록 만든는 게임이다.  
이때, 시작점과 도착점이 같은 세로선상에 위치하도록 만들기 위해 **추가하는 최소 가로선의 개수**를 구해야 한다.  


문제의 자세한 내용은 아래의 링크를 통해 볼 수 있다.  

>출처  
><https://www.acmicpc.net/problem/15684>  

풀이  
------------  
이 문제의 출력을 보면 **사다리를 최대 3개 배치 가능**함을 알 수 있다.  
즉, 3개의 이하의 가로선 배치할 모든 경우를 살펴보며 그때마다 사다리 게임을 진행하여 조건을 만족하는지 보면 된다.  
재귀함수를 사용하여 3개이하의 가로선를 배치시키고 각 가로선을 배치시킬때마다 사다리 게임을 진행한다.  
이때 만약 2개의 가로선을 배치시키고 사다리 게임의 조건을 만족하는 경우 더이상 2개이상의 가로선을 배치시키는 경우를 탐색하지 않아도 된다.  
(추가하는 최소 가로선의 개수를 구하는 것이기 때문에 2개일 때 가능경우를 봤다면 더 최소일 때 가능경우(1개이하)만 탐색하면 되기 때문)  


3개이하의 가로선을 배치시킬 때 중복된 경우를 탐색하지 않기 위해 다음 가로선 추가시 탐색시작할 위치를 함수 인자로 같이 전달한다.  
(이렇게 안할 경우 시간초과가 발생한다. 시간 줄일 방법 찾던 중 이부분 때문에 시간초과 발생하는 사람이 많았다.)  


사다리 게임 진행 시 이동과 출발점, 마지막점 같은지 유무를 판단하기 위해 아래와 같이 배열을 만들었다.  
만약 세로선의 개수 N, 가로선 놓을 수 있는 위치가 H라면 배열의 크기는 [H][2*N]이 된다.  
![board배열에 저장될 위치 정보](https://yuksangeun.github.io/assets/images/bruteforce_problem2.PNG){: .align-center}  

다른 방법을 찾아보니 가로선에 대해서만 배열을 만들어 사용하는 사람들이 많았다.  
이렇게 할 경우 사다리 게임 진행해 출발점, 마지막점을 어떻게 확인하는지는 생각해보지 않았으나 가로선 정보만 저장한다면 배열 크기를 줄일 수 있을 것 같다.  


정답률이 20프로 정도이지만 어렵지 않은 문제였다. 많은 사람들이 경우 탐색부분에서 시간초과로 틀린 case가 많은 것 같다.  

코드  
----------  
``` c  
#include<stdio.h>
using namespace std;

int n, m, h;	//세로, 배치개수, 가로
bool board[30][20];	// 가로h , 세로n
int minn = 4;	// 최대 추가 가능한 가로선이 3개이므로

bool path(int i) {	//사다리 게임 진행. 출발점 i와 도착점 c가 같은지를 확인한다.
	int r = 0, c = i;
	while (r < h) {
		if (c>1 && board[r][c - 1] == 1)
			c = c - 2;
		else if (c<2*n-3 && board[r][c + 1] == 1)
			c = c + 2;
		r = r + 1;
	}
	if (i == c) return true;
	return false;
}

void func(int cnt, int r, int c) {
	//여기서 가능한 경우 사다리 더이상 추가 암하고 minn갱신
	bool flag;
	for (int i = 0; i < 2 * n - 1; i = i + 2) {
		flag = path(i);
		if (!flag) break;	//불가능경우 중단하고 사다리추가
	}
	if (flag) minn = cnt - 1;
	if (minn <= cnt) return;
	//사다리 추가
	for (; r >= 0; r--) {
		for (; c < 2 * n - 1; c = c + 2) {
			if (board[r][c] == 1) continue;
			if (c > 1 && board[r][c - 2] == 1) continue;
			if (c < 2 * n - 3 && board[r][c + 2] == 1) continue;
			board[r][c] = 1;	//사다리 추가
			func(cnt + 1, r, c + 2);
			board[r][c] = 0;
			if (minn <= cnt) return;
		}
		c = 1;
	}
}

int main() {
	scanf("%d %d %d", &n, &m, &h);
	while (m--) {
		int a, b;
		scanf("%d %d", &a, &b);
		board[a - 1][(b - 1) * 2 + 1] = 1;
	}
	for (int i = 0; i < 2 * n - 1; i = i + 2) {	//각 세로줄은 모두 연결되어있음
		for (int j = 0; j < h; j++)
			board[j][i] = 1;
	}
	func(1, h-1, 1);

	if (minn == 4)
		printf("-1");
	else
		printf("%d", minn);
}
```  