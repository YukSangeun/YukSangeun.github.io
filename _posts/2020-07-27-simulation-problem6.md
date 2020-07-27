---
title: "백준 15685번: 드래곤 커브"
excerpt: "simualtion"

toc: true
toc_sticky: true
toc_label: "LIST"

categories:
  - Problem
tags:
  - Simulation  
last_modified_at: 2020-07-27
---
문제  
---------  
드래곤 커브는 다음과 같은 세 가지 속성으로 이루어져 있으며, 이차원 좌표 평면 위에서 정의된다. 좌표 평면의 x축은 → 방향, y축은 ↓ 방향이다.  
1. 시작 점  
2. 시작 방향  
3. 세대  

각 세대별 모양이 다르며, K(K > 1)세대 드래곤 커브는 K-1세대 드래곤 커브를 끝 점을 기준으로 90도 시계 방향 회전 시킨 다음, 그것을 끝 점에 붙인 것이다.  
(각 세대별 모양에 대한 성보는 출처를 통해 보기)  


크기가 100 * 100인 격자 위에 드래곤 커브가 N개 존재한다. 이때, 크기가 **1 * 1인 정사각형의 네 꼭짓점이 모두 드래곤 커브의 일부인 정사각형의 개수**를 구하는 프로그램을 구현하자.  


> 출처  
> <https://www.acmicpc.net/problem/15685>

풀이  
---------  
N개의 드래곤 커브에 대한 정보가 주어질 때, 격자 위에 드래곤 커브의 모양을 표시하기 위해 **각 세대별 드래곤 커브의 모양**을 계산해야 한다.  


입력에서 주어지는 방향 정보를 이용해 세대별 드래곤 커브의 모양을 계산해보자.  
* 0: →  
* 1: ↑  
* 2: ←  
* 3: ↓  

이때, 시작 점은 (0,0)기준이며, 시작 방향은 → 이다.  
그림과 같은 방식으로 드래곤 커브의 모양을 나타낼 수 있고 계산할 수 있다.  
이때, 각 모양별 꼬리부분부터 다음부분에 연결되기 때문에 코드 구현 시 꼬리부분부터 연결을 시작해야 한다.  
![드래곤 커브 세대별 모양](https://yuksangeun.github.io/assets/images/simulation_problem6.PNG){: .align-center}  


입력으로 주어지는 세대가 0~10세대이므로 미리 10세대까지 모양을 계산해 놓는다.  
모양이 세대별 앞부분이 같고 뒤에 추가되는 것이기 때문에 **shape** 벡터에 10세대때의 모양을 계산해서 넣고,  
각 세대별 shape벡터에서 끊어읽어야 하는 부분을 저장하는 배열 **shape_g**을 만들어 값을 저장해준다.  


이후 부분은 자유롭게 구현.  


코드  
---------  
``` c++  
#include<stdio.h>
#include<vector>
using namespace std;

struct DRAGON {
	int r;	//시작 점
	int c;
	int d;	//시작 방향
	int g;	//세대
};

int n;
bool board[101][101];
vector<int> shape;
int shape_g[11];	//세대별 길이
DRAGON dragon[20];

int movR[4] = { 0, -1, 0, 1 };
int movC[4] = { 1, 0, -1, 0 };

void init() {	//0~10세대의 이동방향 표시
	shape.push_back(0);
	shape_g[0] = 1;
	//1세대 ~ 10세대
	for (int i = 1; i <= 10; i++) {
		int sz = shape_g[i - 1];
		for (int j = sz-1; j >= 0; j--) {
			shape.push_back((shape[j] + 1) % 4);
		}
		shape_g[i] = shape.size();
	}
}

int main() {
	scanf("%d", &n);
	for (int i = 0; i < n; i++) {
		scanf("%d %d %d %d", &dragon[i].c, &dragon[i].r, &dragon[i].d, &dragon[i].g);
	}
	init();
	//드래곤 격자에 표시
	for (int i = 0; i < n; i++) {
		int here_r = dragon[i].r;
		int here_c = dragon[i].c;
		board[here_r][here_c] = true;
		for (int j = 0; j < shape_g[dragon[i].g]; j++) {
			here_r += movR[(shape[j]+dragon[i].d)%4];
			here_c += movC[(shape[j]+dragon[i].d)%4];
			board[here_r][here_c] = true;
		}
	}
	//격자 확인
	int res = 0;
	for (int i = 0; i < 100; i++) {
		for (int j = 0; j < 100; j++) {
			if (board[i][j] && board[i + 1][j] && board[i][j + 1] && board[i + 1][j + 1])
				res++;
		}
	}
	printf("%d", res);
}
```