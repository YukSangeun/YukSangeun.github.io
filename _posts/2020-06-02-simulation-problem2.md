---
title: "백준 16235번 나무 재테크"
excerpt: " "

toc: true
toc_sticky: true
toc_label: "LIST"

categories:
  - Problem
tags:
  - Simulation
last_modified_at: 2020-06-02
---
문제  
--------  
NxN크기의 땅에 m개의 나무를 심어 k년 후 살아남은 나무의 수를 출력하는 문제이다.  
각 칸에 여러 그루의 나무가 존재할 수 있으며, 초기 입력으로 주어지는 나무의 위치는 모두 서로 다르다.  

이 나무는 사계절을 보내며, 아래와 같은 과정을 반복한다.  
1. 봄  
나무가 자신의 나이만큼 해당 칸에 있는 양분을 먹고, 나이가 1 증가한다. 각 칸에 여러 개의 나무가 있다면, 나이가 어린 나무부터 양분을 먹고 땅의 양분이 부족해 흡수할 수 없는 나무는 즉시 죽는다.  
2. 여름  
봄에 죽은 나무가 나무가 있던 칸에 양분으로 추가된다. 추가되는 양분은 죽은 나무의 나이를 2로 나눈 값이다.  
3. 가을  
나이가 5의 배수인 나무들이 인접한 8개의 칸으로 번식하며 생기는 나무들의 나이는 1이 된다.  
4. 겨울  
S2D2가 땅을 돌아다니면서 땅에 양분을 추가한다.  


**초기 양분은 모든 칸에 5만큼 들어있다.**  


더 자세한 설명은 아래 링크를 통해 보자.  

>출처  
><https://www.acmicpc.net/problem/16235>  

풀이  
--------  
제한 시간이 0.3초로 짧다. 따라서 효율적으로 코드를 구현하지 않으면 **시간 초과**에 걸리게 된다.  
실제로 구현 시 여러 방식으로 생각을 했지만 많은 시간 초과가 발생하였고 질문 검색란에서 힌트를 얻어 해결할 수 있었다.  


초기 내가 생각했던 방식은 벡터를 이용해 각 땅에 존재하는 나무들을 모두 저장하는 방식이었다.  
즉, [1][1]에 나이가 1, 1, 2, 3인 나무가 존재한다면 4개의 나무를 모두 저장하는 것이다.  
하지만! 생각하지 못한 것이 k=1000년이고 양분이 충분하게 주어질 경우 번식이 활발하게 이루어져서 존재하는 나무의 개수가 "엄청" 많아진다는 것이다.  
만약 내가 초기 방법으로 코드를 구현할 경우 각 나무마다 4계절을 수행하게 될 것이고 이 과정을 모든 나무에 수행할 경우 많은 시간이 소요된다.  


시간초과를 해결하기 위해 모든 나무를 따로 생각하는 것이 아닌 **나이가 같은 나무들을 묶어**서 생각하는 방식으로 구현했다.  
예를 들어, [1][1]에 나이가 1, 1, 2, 3인 나무가 존재한다면 **나이가 1인 나무 2개, 2인 나무 1개, 3인 나무 1개** 이러한 방식으로 저장하는 것이다.  
나무가 가질 수 있는 최대 나이는 1010이므로 각 칸마다 1~1010나이를 가지는 나무 개수에 관한 정보를 벡터를 이용해 저장한다.  
이렇게 함으로써 나이가 같은 나무들은 모두 한번에 계산이 가능해지기 때문에 나무의 개수가 엄청 많아지더라도 소요 시간에 큰 영향을 주지 않는다.  

다음과 같은 방법으로 시간초과를 해결할 수 있었다.  
만약 생각을 바로 저런식으로 했다면 쉽게 구현할 수 있었을 것 같지만 그렇지 않다면 힘든 문제가 될 문제이다.  


코드  
----------  
``` c  
#include<stdio.h>
#include<queue>
#include<vector>
using namespace std;

int n, m, k;
int board[10][10], treat[10][10];
vector<int> tree[10][10];

int movR[8] = { -1, -1, -1, 0, 0, 1, 1, 1 };
int movC[8] = { -1, 0, 1, -1, 1, -1, 0, 1 };

int main() {
	scanf("%d %d %d", &n, &m, &k);
	for (int i = 0; i < n; i++) {
		for (int j = 0; j < n; j++) {
			scanf("%d", &treat[i][j]);
			board[i][j] = 5;
			tree[i][j].resize(1011);
		}
	}
	for (int i = 0; i < m; i++) {
		int x, y, z;
		scanf("%d %d %d", &x, &y, &z);
		tree[x - 1][y - 1][z] = 1;	//이 위치에 나이가 z인 나무가 1개 존재
		tree[x - 1][y - 1][0] = 1;	//이 위치에 존재하는 나무의 개수
	}
	queue<pair<pair<int, int>, int>> qu;	//번식할 나무들 저장 {x, y}, 개수
	while (k--) {
		//봄, 여름, 겨울
		for (int i = 0; i < n; i++) {
			for (int j = 0; j < n; j++) {
				if (tree[i][j][0] == 0) {	//나무 없을 경우
					board[i][j] += treat[i][j];
					continue;
				}
				int prev = 0;	//이전 나이 나무들의 개수 (나이 한살 더 먹기전)
				int sum = 0;
				for (int a = 1, b = tree[i][j][0]; b >= 0; a++) {
					if (tree[i][j][a] == 0) {
						tree[i][j][a] = prev;
						prev = 0;
						if (b == 0) break;
						continue;	//나이가 a인 나무 없음
					}
					int q = board[i][j] / a;	//양분 줄 수 있는 나무 개수
					if (tree[i][j][a] < q) q = tree[i][j][a];
					board[i][j] -= (q * a);	//양분 주고 남은 값
					sum += (tree[i][j][a] - q) * (a / 2);	//죽은 나무들의 양분/2를 땅이 흡수
					tree[i][j][0] -= (tree[i][j][a] - q);
					b -= tree[i][j][a];
					m -= (tree[i][j][a] - q);
					tree[i][j][a] = prev;
					prev = q;

					if (q != 0 && (a + 1) % 5 == 0)
						qu.push({ { i, j }, q });
				}
				board[i][j] += (treat[i][j] + sum);
			}
		}
		//가을
		while (!qu.empty()) {
			pair<int, int> here = qu.front().first;
			int cnt = qu.front().second;
			qu.pop();
			for (int i = 0; i < 8; i++) {
				int newR = here.first + movR[i];
				int newC = here.second + movC[i];
				if (newR < 0 || newR >= n || newC < 0 || newC >= n) continue;
				m += cnt;
				tree[newR][newC][1] += cnt;
				tree[newR][newC][0] += cnt;
			}
		}
	}
	printf("%d", m);
}
```