---
title: "백준 17140번: 이차원 배열과 연산"
excerpt: "simualtion"

toc: true
toc_sticky: true
toc_label: "LIST"

categories:
  - Problem
tags:
  - Simulation  
  - sort
last_modified_at: 2020-07-23
---
문제  
---------  
초기 크기가 3 * 3인 배열 A가 주어질 때, 1초가 지날때마다 배열에 연산이 적용된다.  
* R 연산: 배열 A의 모든 행에 대해서 정렬을 수행. 행의 개수 ≥ 열의 개수인 경우에 적용  
* C 연산: 배열 A의 모든 열에 대해서 정렬을 수행. 행의 개수 < 열의 개수인 경우에 적용  

한 행 또는 열에 있는 수를 정렬하는 방법은 다음과 같다.  
1. 각 행 또는 열에 각각의 수가 몇 번 나왔는지 확인한다.  
2. 수의 등장 횟수가 커지는 순으로, 그러한 것이 여러가지면 수가 커지는 순으로 정렬한다.  
3. 배열 A에 정렬된 결과를 다시 넣는다. 이때, 수와 등장 횟수를 모두 넣으며, 순서는 수가 먼저이다.  

예를 들어, [3, 1, 1]에는 3이 1번, 1가 2번 등장한다. 따라서, 정렬된 결과는 [3, 1, 1, 2]가 된다.  
다시 이 배열에는 3이 1번, 1이 2번, 2가 1번 등장한다. 다시 정렬하면 [2, 1, 3, 1, 1, 2]가 된다.  


정렬된 결과를 배열에 넣으면 행 또는 열의 크기가 달라질 수 있으며, 행 또는 열의 크기가 커진 곳에는 0이 채워진다.  
수 정렬시, 0은 무시한다.  
또한, 행 또는 열의 크기가 100을 넘는 경우 처음 100개를 제외한 나머지는 버린다.  


배열 A에 들어있는 수와 r, c, k가 주어졌을 때, **A[r][c]에 들어있는 값이 k**가 되기 위한 **최소 시간**을 구하자.  


> 출처  
> <https://www.acmicpc.net/problem/17140>  

풀이  
----------  
문제에 나와있는 순서대로 코드를 작성하면 된다. 크게 어렵지는 않지만 배열을 늘리고 정렬시키는 등 부분을 구현할 때 머리가 좀 멍해졌다.  
이 문제에서 **포인트**는 **정렬**이다.  
c++ STL인 sort()함수를 사용하여 정렬부분을 구현하면 되는데, 이때 **비교함수**를 구현해줘야 한다.  


비교함수 구현 부분에서 오류를 경험하긴 했지만 잘 해결하고 풀 수 있었고,  
이부분에 대해서는 아래 링크를 통해 오류 부분을 볼 수 있다.  
sort함수 사용할 때 주의할 점에 대해 알게 된 문제이다.  


코드  
----------  
```c++  
#include<stdio.h>
#include<algorithm>
using namespace std;

struct PAIR {	//숫자와 해당 숫자가 나온 횟수
	int val = 0;
	int cnt = 0;
};

int r, c, k, res = 1, r_sz = 3, c_sz = 3;
int arr[101][101], num_cnt;
PAIR _count[101];

bool compare(PAIR a, PAIR b) {
	//횟수가 0인 부분은 모두 뒤로 가게 설정
	if (a.cnt != 0 && b.cnt == 0) return true;
	if (b.cnt != 0 && a.cnt == 0) return false;	//횟수 0이면 맨 뒤로 보내기
	if (a.cnt != b.cnt)	//횟수로 오름차순
		return a.cnt < b.cnt;
	else //숫자로 오름차순
		return a.val < b.val;
}

int main() {
	scanf("%d %d %d", &r, &c, &k);
	for (int i = 0; i < 3; i++) {
		for (int j = 0; j < 3; j++)
			scanf("%d", &arr[i][j]);
	}
	if (arr[r - 1][c - 1] == k) {
		printf("0");
		return 0;
	}
	while (res <= 100) {
		if (r_sz >= c_sz) {	//R연산
			int tem_col = c_sz;
			for (int i = 0; i < r_sz; i++) {
				//나온 숫자에 대한 횟수 저장 배열 초기화
				for (int i = 1; i <= 100; i++) {
					_count[i].cnt = 0;
					_count[i].val = i;
				}
				// 횟수 세기
				num_cnt = 0;	//각 행 또는 열에서 나온 숫자 개수
				for (int j = 0; j < c_sz; j++) {
					if (arr[i][j] == 0) continue;
					if (_count[arr[i][j]].cnt == 0)
						num_cnt++;
					_count[arr[i][j]].cnt++;
				}
				//결과 정렬시키기
				sort(_count + 1, _count + 101, compare);
				//정렬된 값 배열 A에 다시 넣기
				int j = 0;
				for (int l = 1; l <= num_cnt; l++) {
					arr[i][j++] = _count[l].val;
					arr[i][j++] = _count[l].cnt;
					if (j >= 100) {
						j = 100;
						break;
					}
				}
				for (; j < c_sz; j++) arr[i][j] = 0;
				if (tem_col < j) tem_col = j;
			}
			c_sz = tem_col;	//변경된 열의 크기 저장
		}
		else {	//C연산
			int tem_row = r_sz;
			for (int i = 0; i < c_sz; i++) {
				//나온 숫자에 대한 횟수 저장 배열 초기화
				for (int i = 1; i <= 100; i++) {
					_count[i].cnt = 0;
					_count[i].val = i;
				}
				num_cnt = 0;
				for (int j = 0; j < r_sz; j++) {
					if (arr[j][i] == 0) continue;
					if (_count[arr[j][i]].cnt == 0)
						num_cnt++;
					_count[arr[j][i]].cnt++;
				}
				//결과 정렬시키기
				sort(_count + 1, _count + 101, compare);
				//정렬된 값 배열 A에 다시 넣기
				int j = 0;
				for (int l = 1; l <= num_cnt; l++) {
					arr[j++][i] = _count[l].val;
					arr[j++][i] = _count[l].cnt;
					if (j >= 100) {
						j = 100;
						break;
					}
				}
				for (; j < r_sz; j++) arr[j][i] = 0;
				if (tem_row < j) tem_row = j;
			}
			r_sz = tem_row;
		}
		if (arr[r - 1][c - 1] == k) break;
		res++;
	}
	if (res > 100) res = -1;
	printf("%d", res);
}
```  