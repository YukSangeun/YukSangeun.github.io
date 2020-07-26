---
title: "백준 14891번: 톱니바퀴"
excerpt: "simualtion"

toc: true
toc_sticky: true
toc_label: "LIST"

categories:
  - Problem
tags:
  - Simulation  
last_modified_at: 2020-07-26
---
문제  
---------  
총 8개의 톱니를 가지고 있는 톱니바퀴 4개가 일렬로 놓여져 있다.  
각 톱니는 N극 또는 S극을 나타내고 톱니바퀴는 왼쪽부터 1, 2, 3, 4번으로 번호가 매겨져 있다.  


톱니바퀴를 총 K번 회전시키려고 할 때, 최종 톱니바퀴의 상태를 구하자.  


톱니바퀴의 회전은 한 칸을 기준으로 하며, 시계 방향과 반시계 방향이 있다.  
또한, 톱니바퀴가 회전할 때, 서로 맞닿은 극에 따라서 옆에 있는 톱니바퀴를 회전시킬 수도, 회전시키지 않을 수도 있다.  


톱니바퀴 A를 회전할 때, 그 옆에 있는 톱니바퀴 B와   
* 서로 맞닿은 톱니의 극이 다르면, B는 A가 회전한 방향과 반대방향으로 회전  
* 서로 맞닿은 톱니의 극이 같으면, B는 회전하지 않는다.  

> 출처  
> <https://www.acmicpc.net/problem/14891>  

풀이  
---------  
이 문제는  
1. 톱니바퀴를 회전시킬 때 배열 값 이동  
2. 회전 시, 양 쪽으로 연쇄적으로 회전  


에 대해 신경써야한다.  


1. **톱니바퀴 회전시 배열 값 이동**  
톱니바퀴를 회전시킬 때, 배열 값을 이동시키면 시간이 더 오래걸린다.  
때문에 배열 값을 시계, 반시계 방향으로 이동시키는 것이 아닌, **맞닿은 위치 번호를 저장하는 2개의 변수(left, right)를 지정**해 회전시 이 값들을 변경하면 된다.  
이렇게 하면, 배열 값은 유지된 채로 맞닿은 위치의 번호를 변경시키며 해당 위치의 배열 값으로 바로 연결시킬 수 있다.  


2. **회전 시, 양쪽으로 연쇄적 회전**  
이 부분을 구현할 때 좀 시간이 많이 걸렸다.  
재귀로 구현을 했다면 좀 더 쉽게 했을 것 같은데, while문으로 완성하다 보니 왼쪽 톱니들 확인 후 오른쪽 톱니를 확인할 때 이전 값들을 복원해줘야 하는 등 신경쓸 부분이 많았다.  
그래서 구현시 좀 많이 수정했다.  
톱니바퀴 A를 회전 시킨 후, 양쪽으로 맞닿은 부분을 확인할 때 **왼쪽부분들과 오른쪽 부분들 각각에 대해 회전여부를 확인**해줘야 한다.  


(문제에 대해 초기 구현 시 구체적힌 계획을 세우고 시뮬레이션 후 코딩하는 것에 대해 더 신경써야할 것 같다.)  

코드  
--------  
``` c++  
#include<stdio.h>
using namespace std;

struct BLOCK {
	int left = 6;	//왼쪽 맞닿은 부분 위치
	int right = 2;	//오른쪽 맞닿은 부분 위치
	char value[9];	//톱니들
};

int k, res = 0;
BLOCK block[4];

int main() {
	for (int i = 0; i < 4; i++) {
		scanf(" %s ", block[i].value);
	}
	scanf("%d", &k);
	while (k--) {
		int a, b;
		scanf("%d %d", &a, &b);	//톱니 번호, 회전 방향(시계 1, 반시계 -1)
		a = a - 1;
		b = b + 1; //시계 2, 반시계 0
		int tem_right = block[a].right;	//다음 톱니와 맞닿은 부분 비교시 회전 전 값과 비교하기 위해, 회전 전 값 저장
		int tem_left = block[a].left;
		//회전 시키기
		if (b == 2) {	//시계
			block[a].right = block[a].right == 0 ? 7 : block[a].right - 1;
			block[a].left = block[a].left == 0 ? 7 : block[a].left - 1;
		}
		else {	//반시계
			block[a].right = (block[a].right + 1) % 8;
			block[a].left = (block[a].left + 1) % 8;
		}
		//left 확인 - 왼쪽영역 모두 확인
		int tem_a = a, tem_b = b;
		while (1) {
			if (a == 0) break;
			if (block[a].value[tem_left] == block[a - 1].value[block[a - 1].right]) break;
			b = (b + 2) % 4;
			a--;
			tem_left = block[a].left;
			if (b == 2) {	//시계
				block[a].right = block[a].right == 0 ? 7 : block[a].right - 1;
				block[a].left = block[a].left == 0 ? 7 : block[a].left - 1;
			}
			else {	//반시계
				block[a].right = (block[a].right + 1) % 8;
				block[a].left = (block[a].left + 1) % 8;
			}
		}
		//right 확인
		a = tem_a;
		b = tem_b;
		while (1) {
			if (a == 3) break;
			if (block[a].value[tem_right] == block[a + 1].value[block[a + 1].left]) break;
			b = (b + 2) % 4;
			a++;
			tem_right = block[a].right;
			if (b == 2) {	//시계
				block[a].right = block[a].right == 0 ? 7 : block[a].right - 1;
				block[a].left = block[a].left == 0 ? 7 : block[a].left - 1;
			}
			else {	//반시계
				block[a].right = (block[a].right + 1) % 8;
				block[a].left = (block[a].left + 1) % 8;
			}
		}
	}
	//12시방향 톱니 N극인지 확인
	for (int i = 0; i < 4; i++) {
		int clock = (block[i].left + 2) % 8;
		if (block[i].value[clock] == '1')
			res += (1 << i);
	}
	printf("%d", res);
}
```  