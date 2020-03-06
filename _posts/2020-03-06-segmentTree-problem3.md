---
title: "백준 5419번: 북서풍"
excerpt: "segment tree를 이용하는 문제 + 좌표압축"

categories:
  - Problem
tags:
  - Tree
last_modified_at: 2020-03-06T02:18:00
---
문제  
-------  
강한 북서풍이 불고 있다. 이 뜻은 동쪽과 남쪽 사이의 모든 방향으로 항해할 수 있다는 뜻이다. 북쪽이나 서쪽으로 항해하는 것은 불가능하다.  
작은 섬이 여러 개 있는 바다가 있다. 섬은 좌표 평면의 한 점으로 나타낼 수 있다. y 좌표가 증가하는 방향은 북쪽, x좌표가 증가하는 방향은 동쪽이다. 북서풍을 타고 항해할 수 있는 섬의 쌍의 수를 구하는 프로그램을 작성하시오.  

입력  
-------  
첫째 줄에 테스트 케이스의 개수가 주어진다.  
각 테스트 케이스의 첫째 줄에는 섬의 수 n (1 ≤ n ≤ 75000)이 주어진다. 다음 n개 줄에는 각 섬의 좌표 xi, yi가 주어진다. 두 섬의 좌표가 같은 경우는 없다. (-109 ≤ xi, yi ≤ 109)  

> 출처  
> <https://www.acmicpc.net/problem/5419>  

풀이1  
--------  
처음 생각했던 방법은 **섬A에서 북서풍 바람으로 이동할 수 있는 다른 섬들의 개수**를 구하는 것이였다.  
섬의 정보를 arr배열에 pair형태로 저장을 한 뒤, x좌표에 대해 오름차순, y좌표에 대해 내림차순이 되도록 정렬했다.  
섬 A에서 북서풍 바람으로 이동할 수 있는 **다른 섬들의 좌표는 (x+a, y-b) (a,b >= 0 정수 , a의 좌표(x,y) )형태**이므로 위와 같이 정렬시,  
현재 섬이 k일때 **k+1~n에 위치한 섬들 중 k의 y좌표값보다 작거나 같은 y좌표 값을 가진 섬들의 개수**를 세면 된다.  


이런 방식을 사용할 경우 segment tree에 구간별(이때 구간은 섬의 번호) 섬의 y좌표들을 저장하여 query()함수에서 원하는 구간에 들어가 lower_bound함수를 사용해 개수를 return 하면 된다.   


TLE가 나오지는 않았지만 메모리와 시간에서 성능이 좋지 않은 방법이였다.  
이유: segment tree에 구간별 섬의 y좌표들을 다 넣는 방식을 사용하여 메모리가 많이 소모 됐으며, 구간탐색을 한번 할 때 lower_bound()함수를 여러번 사용하게 될 수 있어 시간이 조금 많이 소모 된다.  

풀이2  
--------  
위 방식보다 더 괜찮은 풀이를 찾던 중 **좌표압축**방법을 사용하는 풀이를 알게됐고, 이는 segment tree에서 사용된다.  
풀이1 에서 현재 섬이 k일 때 k+1~n에 위치한 섬들 중 k의 y좌표값보다 작거나 같은 y좌표 값을 가진 섬들의 개수를 세는 방식을 사용했는데 이를 좌표압축을 이용하여 할 수 있다.  
segment tree에서 구간별 정보는 구간[a, b]일 때 posY배열에서 순위 a~b에 해당하는 y좌표들에 위치한 섬들의 개수이다.  
(현재 섬에서 이동할 수 있는 섬들의 개수를 세는 방식을 이용했지만 거꾸로 현재 섬으로 이동할 수 있는 다른 섬들의 개수를 세는 방식으로 해도 상관없다.)  


**좌표압축**  
1. 모든 섬의 y좌표들을 벡터posY에 넣는다. 이때 중복되는 y값은 제거하고 오름차순으로 정렬한다.  
2. 현재 섬의 y좌표값이 posY에서 몇번째 위치에 있는지 찾는다. (위치 p)  
3. 이때 섬은 배열 arr에 맨 마지막에 위치한 섬부터 본다.  
4. posY는 오름차순으로 정렬했으므로 posY배열 0~p위치에는 현재 섬의 y좌표보다 작거나 같은 값들이 저장되어 있다.  
5. segment tree에서 구간 [0,p] 에 해당하는 값을 찾아 반환하면 이 값이 현재 섬에서 갈 수 있는 다른 섬들의 개수가 된다.  
6. update함수를 이용해 위치p를 포함하는 구간에 1을 추가한다.  
7. 이를 반복  

코드(풀이2)  
--------  
``` c
#include<stdio.h>
#include<algorithm>
#include<vector>
#include<math.h>
using namespace std;
//섬 a에서 북서풍 바람을 타고 갈 수 있는 다른 섬의 개수를 찾는 방식을 이용
int seg[262150];
pair<int, int> arr[75000];	//{x좌표, -y좌표}
int n;

void init(int node, int nodeL, int nodeR) {
	seg[node] = 0;
	if(nodeL == nodeR) return;
	int mid = (nodeL + nodeR) / 2;
	init(node * 2, nodeL, mid);
	init(node * 2 + 1, mid + 1, nodeR);
}

int update(int pos, int node, int nodeL, int nodeR) {	//검사한 좌표의 y좌표에 해당하는 위치값을 증가
	if (nodeL > pos || nodeR < pos) return seg[node];
	if (nodeL == nodeR) {
		return ++seg[node];
	}
	int mid = (nodeL + nodeR) / 2;
	return seg[node] = update(pos, node * 2, nodeL, mid) + update(pos, node * 2 + 1, mid + 1, nodeR);
}

long query(int L, int R, int node, int nodeL, int nodeR) {	//구간[L, R]에서 존재하는 좌표 개수
	if (nodeL > R || nodeR < L) return 0;
	if (nodeL >= L && nodeR <= R) return seg[node];
	int mid = (nodeL + nodeR) / 2;
	return query(L, R, node * 2, nodeL, mid) + query(L, R, node * 2 + 1, mid + 1, nodeR);
}

int main() {
	int tc;
	scanf("%d", &tc);
	while (tc--) {
		vector<int> posY;	//좌표압축 을 이용
		long long res = 0;
		scanf("%d", &n);
		for (int i = 0; i < n; i++) {
			scanf("%d %d", &arr[i].first, &arr[i].second);
			posY.push_back(arr[i].second);
			arr[i].second *= -1;	//1차로 x에 대해 오름차순, 2차로 y에 대해 내림차순 할 것 이므로
		}
		sort(arr, arr + n);
		sort(posY.begin(), posY.end());	//y좌표 오름차순 정렬
		posY.erase(unique(posY.begin(), posY.end()), posY.end());	//y좌표 중복 제거
		init(1, 0, posY.size()-1);
		for (int i = n-1; i >= 0; i--) {	//각 좌표에서 y가 감소하는 방향인 섬의 개수 찾기
			long pos = lower_bound(posY.begin(), posY.end(), -arr[i].second) - posY.begin();	//현 y좌표의 순위 찾기
			res += (long long)query(0, pos, 1, 0, posY.size()-1);
			update(pos, 1, 0, posY.size()-1);
		}
		printf("%lld\n", res);
	}
}
```