---
title: "[모의 SW 역량 테스트] 원자 소멸 시뮬레이션"
excerpt: "SWEA문제"

toc: true
toc_sticky: true
toc_label: "LIST"

categories:
  - Problem
tags:
  - Simulation
  - struct
  - sort
last_modified_at: 2020-06-06
---
문제  
--------  
xy좌표 위에 N개의 원자들이 존재한다.  
원자들은 고유의 움직이는 방향과 에너지가 존재하며, 1초에 1만큼의 거리를 이동한다.  


원자들이 2차원 평면에서 이동하며 두 개 이상의 원자가 충돌할 경우 충돌한 원자들은 각자 보유한 에너지를 모두 방출하고 소멸된다.  


N개의 원자들의 [x, y] 위치, 이동 방향, 보유 에너지가 주어질 때  
**원자들이 소멸되면서 방출하는 에너지의 총합**을 구하는 프로그램을 작성하면 된다.  


>출처  
><https://www.acmicpc.net/problem/17143>  

풀이  
--------  
원자들이 이동하면서 충돌하는 것을 어떻게 해결할 것인지가 문제였다.  
원자들의 충돌을 구현하는 방법에는 2가지 정도가 있다.  
1. 1초씩 모든 원자들을 이동시키며 충돌 경우를 찾기  
2. 모든 원자쌍들을 비교하며 충돌 경우를 찾기  


처음 문제를 해결할 때 1번 경우를 생각하여 문제를 해결하였고 다른 사람의 코드를 참고하여 2번으로 문제를 다시 풀었다.  
결론적으로 1번의 경우 1초씩 원자들을 이동시키며 충돌을 찾을 때 불필요한 비교를 하는 경우가 존재하며 1칸씩 이동을 해야하므로 시간이 2번에 비해 오래걸린다.  
2번의 경우 초기 모든 원자쌍들을 비교하여 충돌되는 쌍들을 찾기 때문에 원자의 이동을 표현할 좌표배열이 필요 없으며 메모리와 시간면에서 더 좋다.  


**1번 방법**  
원자들의 이동을 나타내기 위해 좌표배열이 필요하다.  
좌표의 범위가 -1000<= x, y <=1000 으로 음수가 포함되기 때문에 배열에 저장할 때는 +1000을 해서 위치를 저장한다.  
또한 입력받은 좌표에서 최대 x,y값과 최소 x,y값을 찾는다. 원자가 이 범위를 벗어난다면 충돌이 발생하지 않으므로 충돌이 발생하지 않는 원자 찾을 때 사용된다.  
좌표를 2차원 배열로 바꿔서 생각할 때 **주의할 점**은 배열은 상으로 이동하려면 행-1을 해야하지만 좌표는 상으로 이동하려면 y+1을 하는 것이다. 즉, **좌표에서 '상'은 배열입장에서 '하'이고 '하'는 '상'**이된다. (거꾸로 봐야함)  
[참고] 0.5초, 1.5초와 같은 .5초들이 일직선상에서 충돌하는 경우 발생할 수 있으며 배열을 1초단위로 만들 경우 .5초들의 이동후 위치를 표시할 수 없다.  이에 배열의 크기를 2배로 해서 잡기도 한다.  
본인은 이동전에 충돌 경우를 찾기 때문에 배열의 크기를 기본으로 지정했다.  


위와 같은 점들을 생각하며 배열을 만들고 입력을 받는다.  
이후 전체 원자들이 이동 불가능하게 될 때까지 while문을 반복한다.  
1. 이동 가능 원자인 경우 0.5초 후와 1초 후 충돌 발생할 것을 확인한다.  
2. 0.5초 후에 충돌 발생할 거라면 halfsec queue에 충돌쌍을 저장하고 다음 원자를 반복  
3. 0.5초 후에 없다면 1초후를 확인 후 존재할 경우 sec queue에 충돌쌍을 저장하고 다음 원자를 반복  
4. **주의할 점** 충돌쌍을 찾았다고 해서 바로 이 원자쌍을 이동 불가능 원자로 설정하면 안된다. -> 만약 찾은게 1초경우고 더 나중에 0.5초에 충돌 경우를 찾을 수도 있기 때문.  
5. 모든 원자들에 대해 충돌쌍을 찾았다면 halfsec과 sec에 저장된 쌍들에서 **실제로 충돌발생해서 사라지는 경우** 찾고 이동 불가능으로 설정한다.  
6. 이후 원자들의 이동위치를 배열에 저장하고 다시 1번부터 수행한다.  


모든 원자들이 이동 불가능해지면 충돌 발생된 원자들이 방출한 에너지 값의 합을 구해서 출력한다.  


구현을 할 때 생각해야하는 것이 많아서 수정을 엄청 많이 했고 수정이 안된 부분들을 찾느라 시간을 많이써서 성공했다.  
코드 길이, 시간, 메모리 모두 많이 쓴 방법이다.  


**2번 방법**  
1번에 비해 아주 구현이 간단하다.  
모든 원자쌍을 비교해서 충돌쌍을 찾아 queue에 집어 넣어 시간에 대해 오름차순으로 정렬시킨 후, 실제 충돌발생을 찾으면 된다.  


시간에 따른 위치 이동을 하지 않아도 되기때문에 위치 표시할 배열을 만들지 않아도 된다. 즉, 1번에서 했던 고민들을 하지 않아도 된다.  
충돌이 발생할 경우는  
1. 같은 선상에 존재하면서 방향이 서로 반대이고 상,하라면 [상방향의 y좌표 < 하뱡향의 y좌표]와 같은 조건을 만족  
2. 같은 선상이 아닐 경우, 원자의 위치 지점에서 방향에 맞게 선을 그었을 때 만나는 지점이 존재해야 하고 [x값의 차 == y값의 차]를 만족  


구현 시 생각할 부분이 많지 않아서 괜찮았다. 다만, 정렬할 때 비교함수를 만들어야하는데 많이 해보지 않아서 어려움이 있었다.  
이것 이외에는 1번에 비해 아주 성능이 좋은 방법이었다.  


코드1  
--------  
``` c  
#include<stdio.h>
#include<vector>
#include<queue>
using namespace std;

struct Node {
	int x;	//가로
	int y;	//세로
	int dir;	//이동방향
	int energy;	//에너지
	bool use = false;	//충돌 발생하면 false
};

vector<Node> atom;
int board[2001][2001];	//[y][x]
int n, sum;
float time[1001];	//각 원자들의 충돌 시간적기

int movY[4] = { 1, -1, 0, 0 };	//상, 하, 좌, 우
int movX[4] = { 0, 0, -1, 1 };

int main() {
	int tc;
	Node node;
	atom.resize(1001);
	scanf("%d", &tc);
	for (int t = 1; t <= tc; t++) {
		int maxY = -1000, maxX = -1000, minY = 1000, minX = 1000;
		sum = 0;
		scanf("%d", &n);
		for (int i = 1; i <= n; i++) {
			scanf("%d %d %d %d", &atom[i].x, &atom[i].y, &atom[i].dir, &atom[i].energy);
			if(atom[i].x < minX) minX = atom[i].x;
			if(atom[i].x > maxX) maxX = atom[i].x;
			if (atom[i].y < minY) minY = atom[i].y;
			if (atom[i].y > maxY) maxY = atom[i].y;
			atom[i].x += 1000;
			atom[i].y += 1000;
			atom[i].use = true;
			time[i] = 0;
			board[atom[i].y][atom[i].x] = i;
		}
		maxY += 1000;
		maxX += 1000;
		minY += 1000;
		minX += 1000;

		int cnt = 1;	//board에 저장할 값
		atom[0].energy = 0;	//이동 불가능한 원자들 개수
		queue<pair<int, int>> halfsec, sec;
		while (atom[0].energy < n) {
			for (int i = 1; i <= n; i++) {
				Node here = atom[i];
				if (here.use == false) continue;
				board[here.y][here.x] = 0;	//이미 주변 탐색 했으므로 다른 노드가 현 노드를 탐색하지 않아도 된다.
				if (here.dir == 0) {	//상
					//0.5초 확인
					if (here.y < maxY && board[here.y + 1][here.x] != 0 && atom[board[here.y + 1][here.x]].dir == 1) {
						halfsec.push({ i, board[here.y + 1][here.x] });
					}
					//0.5초일 때 없으면, 1초 확인
					else {
						if (here.y < maxY&& here.x > minX&& board[here.y + 1][here.x - 1] != 0 && atom[board[here.y + 1][here.x - 1]].dir == 3) {
							sec.push({ i, board[here.y + 1][here.x - 1] });
						}
						if (here.y < maxY&& here.x < maxX && board[here.y + 1][here.x + 1] != 0 && atom[board[here.y + 1][here.x + 1]].dir == 2) {
							sec.push({ i, board[here.y + 1][here.x + 1] });
						}
						if (here.y < maxY - 1 && board[here.y + 2][here.x] != 0 && atom[board[here.y + 2][here.x]].dir == 1) {
							sec.push({ i, board[here.y + 2][here.x] });
						}
					}
				}
				else if (here.dir == 1) {	//하
					if (here.y > minY&& board[here.y - 1][here.x] != 0 && atom[board[here.y - 1][here.x]].dir == 0) {
						halfsec.push({ i, board[here.y - 1][here.x] });
					}
					else {
						if (here.y > minY&& here.x > minX&& board[here.y - 1][here.x - 1] != 0 && atom[board[here.y - 1][here.x - 1]].dir == 3) {
							sec.push({ i, board[here.y - 1][here.x-1] });
						}
						if (here.y > minY&& here.x < maxX && board[here.y - 1][here.x + 1] != 0 && atom[board[here.y - 1][here.x + 1]].dir == 2) {
							sec.push({ i, board[here.y - 1][here.x + 1] });
						}
						if (here.y > minY + 1 && board[here.y - 2][here.x] != 0 && atom[board[here.y - 2][here.x]].dir == 0) {
							sec.push({ i, board[here.y - 2][here.x] });
						}
					}
				}
				else if (here.dir == 2) {	//좌
					if (here.x > minX&& board[here.y][here.x - 1] != 0 && atom[board[here.y][here.x - 1]].dir == 3) {
						halfsec.push({ i, board[here.y][here.x - 1] });
					}
					else {
						if (here.y < maxY && here.x > minX&& board[here.y + 1][here.x - 1] != 0 && atom[board[here.y + 1][here.x - 1]].dir == 1) {
							sec.push({ i, board[here.y + 1][here.x - 1] });
						}
						if (here.y > minY&& here.x > minX&& board[here.y - 1][here.x - 1] != 0 && atom[board[here.y - 1][here.x - 1]].dir == 0) {
							sec.push({ i, board[here.y - 1][here.x - 1] });
						}
						if (here.x > minX + 1 && board[here.y][here.x - 2] != 0 && atom[board[here.y][here.x - 2]].dir == 3) {
							sec.push({ i, board[here.y][here.x - 2] });
						}
					}
				}
				else {	//우
					if (here.x < maxX && board[here.y][here.x + 1] != 0 && atom[board[here.y][here.x + 1]].dir == 2) {
						halfsec.push({ i, board[here.y][here.x + 1] });
					}
					else {
						if (here.y < maxY && here.x < maxX && board[here.y + 1][here.x + 1] != 0 && atom[board[here.y + 1][here.x + 1]].dir == 1) {
							sec.push({ i, board[here.y + 1][here.x + 1] });
						}
						if (here.y > minY&& here.x < maxX && board[here.y - 1][here.x + 1] != 0 && atom[board[here.y - 1][here.x + 1]].dir == 0) {
							sec.push({ i, board[here.y - 1][here.x + 1] });
						}
						if (here.x < maxX - 1 && board[here.y][here.x + 2] != 0 && atom[board[here.y][here.x + 2]].dir == 2) {
							sec.push({ i, board[here.y][here.x + 2] });
						}
					}
				}
			}
			//halfsec과 sec에서 값 꺼내면서 더 짧은 시간에 충돌된 것들 구하기
			while (!halfsec.empty()) {
				pair<int, int> here = halfsec.front();
				halfsec.pop();
				time[here.first] = cnt - 0.5;
				time[here.second] = cnt - 0.5;
				atom[here.first].use = atom[here.second].use = false;
			}
			while (!sec.empty()) {
				pair<int, int> here = sec.front();
				sec.pop();
				if (time[here.first] == cnt-0.5 || time[here.second] == cnt-0.5) continue;
				time[here.first] = time[here.second] = cnt;
				atom[here.first].use = atom[here.second].use = false;
			}
			//원자들의 이동위치 저장
			atom[0].energy = 0;
			for (int i = 1; i <= n; i++) {
				if (atom[i].use == false) {
					atom[0].energy++;
					continue;
				}
				int y = atom[i].y + movY[atom[i].dir];
				int x = atom[i].x + movX[atom[i].dir];
				if (atom[i].dir < 2 && (y >= maxY || y <= minY)) {	//상 or 하
					atom[i].use = false;
					atom[0].energy++;
				}
				else if (atom[i].dir >= 2 && (x >= maxX || x <= minX)) {	//좌 or 우
					atom[i].use = false;
					atom[0].energy++;
				}
				else {
					atom[i].x = x;
					atom[i].y = y;
					board[y][x] = i;
				}
			}
			cnt++;
		}
		for (int i = 1; i <= n; i++) {
			if (time[i] > 0)
				sum += atom[i].energy;
		}

		printf("#%d %d\n", t, sum);
	}
}
```  

코드2  
--------  
``` c  
#include<iostream>
#include<vector>
#include<queue>
#include<algorithm>
using namespace std;

struct Atom {
	int x;
	int y;
	int dir;	//상, 하, 좌, 우
	int k;
};

struct Conf {
	float tt;
	int first;
	int second;
	void func(float a, int b, int c) {
		tt = a;
		first = b;
		second = c;
	}
};

Conf time_[1000010];	// 시간에 대해 내림차순
Atom atom[1000];
float conflict[1000];
int n, sum;

bool cmp(Conf a, Conf b) {
	return a.tt < b.tt;
}


int main() {
	int T;
	scanf("%d", &T);
	for (int tc = 1; tc <= T; tc++) {
		int cnt = 0;
		sum = 0;
		scanf("%d", &n);
		for (int i = 0; i < n; i++) {
			scanf("%d %d %d %d", &atom[i].x, &atom[i].y, &atom[i].dir, &atom[i].k);
			conflict[i] = 5000;
		}
		//충돌 가능한 위치에 존재하는 애들 쌍 만들기
		for (int i = 0; i < n; i++) {
			for (int j = i + 1; j < n; j++) {
				if (atom[i].dir == atom[j].dir) continue;	//진행방향 같으면 충돌 없으므로
				if (atom[i].dir == 0) {	//상
					float tem = atom[j].y - atom[i].y;
					if (tem < 0) continue;
					if (atom[j].dir == 1 && atom[j].x == atom[i].x && atom[j].y > atom[i].y) {
						time_[cnt++].func(tem / 2, i, j);
					}
					else if (atom[j].dir == 2 && tem == (atom[j].x - atom[i].x)) {
						time_[cnt++].func(tem, i, j);
					}
					else if (atom[j].dir == 3 && tem == (atom[i].x - atom[j].x)) {
						time_[cnt++].func(tem, i, j);
					}
				}
				else if (atom[i].dir == 1) {	//하
					float tem = atom[i].y - atom[j].y;
					if (tem < 0) continue;
					if (atom[j].dir == 0 && atom[j].x == atom[i].x && atom[i].y > atom[j].y) {
						time_[cnt++].func(tem / 2, i, j);
					}
					else if (atom[j].dir == 2 && tem == (atom[j].x - atom[i].x))
						time_[cnt++].func(tem, i, j);
					else if (atom[j].dir == 3 && tem == (atom[i].x - atom[j].x))
						time_[cnt++].func(tem, i, j);
				}
				else if (atom[i].dir == 2) {	//좌
					float tem = atom[i].x - atom[j].x;
					if (tem < 0) continue;
					if (atom[j].dir == 3 && atom[j].y == atom[i].y && atom[i].x > atom[j].x)
						time_[cnt++].func(tem / 2, i, j);
					else if (atom[j].dir == 0 && tem == (atom[i].y - atom[j].y))
						time_[cnt++].func(tem, i, j);
					else if (atom[j].dir == 1 && tem == (atom[j].y - atom[i].y))
						time_[cnt++].func(tem, i, j);
				}
				else {	//우
					float tem = atom[j].x - atom[i].x;
					if (tem < 0) continue;
					if (atom[j].dir == 2 && atom[j].y == atom[i].y && atom[j].x > atom[i].x)
						time_[cnt++].func(tem / 2, i, j);
					else if (atom[j].dir == 0 && tem == (atom[i].y - atom[j].y))
						time_[cnt++].func(tem, i, j);
					else if (atom[j].dir == 1 && tem == (atom[j].y - atom[i].y))
						time_[cnt++].func(tem, i, j);
				}
			}
		}
		//충돌 에너지 합 구하기
		sort(time_, time_ + cnt, cmp);
		for (int i = 0; i < cnt; i++) {
			Conf here = time_[i];
			if (conflict[here.first] >= here.tt && conflict[here.second] >= here.tt)
				conflict[here.first] = conflict[here.second] = here.tt;
		}
		for (int i = 0; i < n; i++) {
			if (conflict[i] == 5000) continue;
			sum += atom[i].k;
		}

		printf("#%d %d\n", tc, sum);
	}
}
```
