---
title: "백준 17143번 낚시왕"
excerpt: " "

toc: true
toc_sticky: true
toc_label: "LIST"

categories:
  - Problem
tags:
  - Simulation
  - struct
last_modified_at: 2020-06-03
---
문제  
---------  
상어 낚시를 하는 곳을 크기가 RxC인 격자판으로 나타낸다.  
격자판의 각 칸은 (r, c)로 나타낼 수 있으며 r은 행, c는 열이다.  
각 칸에는 상어가 최대 한 마리 들어있을 수 있으며, 상어는 크기와 속도를 가진다.  
이때, 낚시왕이 잡은 상어 크기의 합을 구하는 문제이다.  


낚시는 각 초당 다음 순서로 발생하며, 낚시왕이 가장 오른쪽 열로 이동하면 이동을 멈춘다.  
1. 낚시왕이 오른쪽으로 한 칸 이동. (처음 위치는 1번열의 한 칸 왼쪽)  
2. 낚시왕이 있는 열에 있는 상어 중 땅과 제일 가까운 상어를 잡는다.  
3. 상어가 이동  


속도는 칸/초 단위를 가지며 상어가 1초 동안 이동시 다음과 같은 경우가 발생 할 수 있다.  
1. 기존 방향으로 잘 이동  
2. 이동중 격자판의 경계를 넘는 경우 -> 방향을 반대로 바꿔 속력을 유지한채 이동  
3. 이동 완료한 칸에 다른 상어 존재 -> 크기가 더 큰 상어만이 살아남음

>출처  
><https://www.acmicpc.net/problem/17143>  

풀이  
------------  
각 상어별 속력, 방향, 크기와 같은 정보가 존재하기 때문에 이를 한꺼번에 저장하기 위해 **구조체**를 이용한다.  
격자판의 각 칸에 상어가 없는 칸은 NULL이 저장되고 상어가 있다면 상어 구조체의 주소가 저장된다.  


1초당 발생하는 순서에 맞게 코드를 구현하면 된다.  

구현하며 약간 어려웠던 점은  
1. 상어가 이동시 격자판의 경계를 넘는 경우 방향 바꾸는 부분 -> 상어가 1초동안 이동할 때 방향을 여러번 바꿀 수 있는 것을 생각하지 못했었다.  
2. 상어가 이동된 후 위치에 상어정보를 저장 시 이동과 정보저장을 한번에 하려고 한 점  
-> 모든 상어가 이동된 위치 정보를 따로 queue에 저장 후, 이동이 완료되면 queue에 저장된 값을 격자판에 저장해야 한다.  
-> 이동과 정보저장을 같이하게 될 경우 아직 이동되지 않은 상어값이 사라지거나 같은 상어에 대해 이동이 여러번 발생할 수 있다.  


다른 사람들의 코드를 보니 상어를 저장하는 배열을 따로 만들어 격자판에는 상어 배열의 각 인덱스만을 저장시켰다.  
이렇게 할 경우 상어의 이동과 정보저장을 동시에 할 수 있게 되어 시간을 절약할 수 있다고 생각한다.  

코드  
--------  
``` c  
#include<stdio.h>
#include<queue>
using namespace std;

struct Fish {
	int v;	//속력
	int direct;	//방향
	int size;	//크기
	Fish(int s, int d, int z) {
		if (d == 1) direct = 0;
		else if (d == 2) direct = 2;
		else if (d == 3) direct = 3;
		else direct = 1;
		v = s;
		size = z;
	}
};

int R, C, m;
Fish* board[100][100];
queue<pair<pair<int, int>, Fish*>> qu;	//물고기 있는 칸 저장

int main() {
	int sum = 0;
	scanf("%d %d %d", &R, &C, &m);
	while (m--) {
		int r, c, s, d, z;	// (r, s) , 속력, 방향, 크기
		scanf("%d %d %d %d %d", &r, &c, &s, &d, &z);
		Fish* fish = new Fish(s, d, z);
		board[r - 1][c - 1] = fish;
	}
	for (int i = 0; i < C; i++) {
		for (int j = 0; j < R; j++) {
			if (board[j][i] == NULL) continue;
			Fish* fish = board[j][i];
			sum += fish->size;
			board[j][i] = NULL;
			delete fish;
			break;
		}
		for (int c = 0; c < C; c++) {
			for (int r = 0; r < R; r++)
				if (board[r][c] != NULL) qu.push({ { r, c }, board[r][c] });
		}
		int sz = qu.size();
		while (sz--) {
			pair<int, int> here = qu.front().first;
			Fish* fish = qu.front().second;
			qu.pop();
			board[here.first][here.second] = NULL;
			int vTemp = fish->v;
			while (vTemp > 0) {	//이동해야할 칸의 개수
				if (fish->direct == 0) {	//상
					if (here.first - vTemp < 0) {
						vTemp -= here.first;
						here.first = 0;
						fish->direct = (fish->direct + 2) % 4;
					}
					else {
						here.first -= vTemp;
						vTemp = 0;
					}
				}
				else if (fish->direct == 2) {	//하
					if (here.first + vTemp >= R) {
						vTemp -= (R - 1 - here.first);
						here.first = R - 1;
						fish->direct = (fish->direct + 2) % 4;
					}
					else {
						here.first += vTemp;
						vTemp = 0;
					}
				}
				else if (fish->direct == 1) {	//좌
					if (here.second - vTemp < 0) {
						vTemp -= here.second;
						here.second = 0;
						fish->direct = (fish->direct + 2) % 4;
					}
					else {
						here.second -= vTemp;
						vTemp = 0;
					}
				}
				else {	//우
					if (here.second + vTemp >= C) {
						vTemp -= (C - 1 - here.second);
						here.second = C - 1;
						fish->direct = (fish->direct + 2) % 4;
					}
					else {
						here.second += vTemp;
						vTemp = 0;
					}
				}
			}
			qu.push({ here, fish });
		}
		while (!qu.empty()) {	//1초후 물고기들 위치에 맞게 board에 배치
			pair<int, int> here = qu.front().first;
			Fish* fish = qu.front().second;
			qu.pop();
			if (board[here.first][here.second] != NULL) {
				Fish* temp = board[here.first][here.second];
				if (temp->size < fish->size) {
					board[here.first][here.second] = fish;
					delete temp;
				}
				else {
					delete fish;
				}
			}
			else
				board[here.first][here.second] = fish;
		}
	}
	printf("%d", sum);
}
```