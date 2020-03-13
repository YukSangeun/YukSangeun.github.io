---
title: "백준 6549번: 히스토그램에서 가장 큰 직사각형"
excerpt: "segment tree를 이용하는 문제"

toc: true
toc_sticky: true
toc_label: "LIST"

categories:
  - Problem
tags:
  - Tree
last_modified_at: 2020-03-05T03:43:00
---
문제  
--------  
히스토그램은 직사각형 여러 개가 아래쪽으로 정렬되어 있는 도형이다. 각 직사각형은 같은 너비를 가지고 있지만, 높이는 서로 다를 수도 있다. 예를 들어, 왼쪽 그림은 높이가 2, 1, 4, 5, 1, 3, 3이고 너비가 1인 직사각형으로 이루어진 히스토그램이다.  
(그림은 해당 페이지에 들어가서 볼 것)  
히스토그램에서 가장 넓이가 큰 직사각형을 구하는 프로그램을 작성하시오.  

입력  
--------  
입력은 테스트 케이스 여러 개로 이루어져 있다. 각 테스트 케이스는 한 줄로 이루어져 있고, 직사각형의 수 n이 가장 처음으로 주어진다. (1 ≤ n ≤ 100,000) 그 다음 n개의 정수 h1, ..., hn (0 ≤ hi ≤ 1,000,000,000)가 주어진다. 이 숫자들은 히스토그램에 있는 직사각형의 높이이며, 왼쪽부터 오른쪽까지 순서대로 주어진다. 모든 직사각형의 너비는 1이고, 입력의 마지막 줄에는 0이 하나 주어진다.  


> 출처  
> <https://www.acmicpc.net/problem/6549>  

풀이  
--------  
직사각형의 수가 n이고 높이가 모두 주어졌을 때, 가장 넓이가 큰 직사각형을 구하기 위해서 **높이가 작은 순서부터 높이를 점차 키워나가며 넓이를 계산**해 나가면 된다.  
예시를 들어 설명한다면,  
n=7, height[2, 1, 4, 5, 1, 3, 3] 가 입력으로 주어진다 하자.  
1. 높이가 작은 순서로 위치를 뽑는다면, 먼저 height[2] = 1로 높이가 가장 낮다.  
초기 구간이 [1,7]이고, 높이가 height[2] = 1일 때 넓이는 1*(7-1+1)=7이 된다.(maxx에 저장)  
2. 그리고 이 위치(2)를 기준으로 구간을 [1, 1] / [3, 7] 로 나눈다.  
3. 구간 [1, 1]일 때는 직사각형 개수가 1개이므로 높이가 넓이가 된다. 따라서 [1, 1]일때 넓이는 height[1]=2(maxx값과 비교해서 더 큰 값을 maxx에 저장)    
4. 구간 [3, 7]일 때, 이 구간에서 가장 작은 높이는 height[5] = 1이다.  이때 넓이는 1*(7-3+1)=5로 maxx와 비교하여 저장한 뒤 구간을 이 위치(5)를 기준으로 양옆으로 나눈다. [3, 4] / [6, 7]  
5. 4번에서 했던 것과 마찬가지로 나뉜 구간에 대해서 가장 작은 높이를 구하고 이를 통해 넓이를 구해 maxx와 비교 후 또 다시 구간을 나눌 수 있다면 구간을 나누는 것을 반복한다.  
6. 더이상 구간을 나눌 수 없을 때 까지 반복하면 maxx에는 가장 넓이가 큰 직사각형의 넓이가 저장된다.  

* 구간[a,b]에서 최소 높이를 구하는 것을 좀 더 빠르게 하기 위해 segment tree를 이용하여 구간별로 높이의 최솟값을 저장시켜논다.  
* 위 예제에서 구간이 나뉘는 순서는  
	- [1, 7] -> [1, 1] / [3, 7] 
	- [3, 7] -> [3, 4] / [6, 7] 
	- [3, 4] -> [4, 4]
	- [6, 7] -> [7, 7]
 

코드  
--------  
``` c  
#include<stdio.h>
#include<queue>
using namespace std;

int n;
int arr[100001], seg[400001];
//구간별 최소값의 위치 저장
void update(int node, int nodeL, int nodeR) {
	if (nodeL == nodeR) {
		seg[node] = nodeL;
		return;
	}
	int mid = (nodeL + nodeR) / 2;
	update(node * 2, nodeL, mid);
	update(node * 2 + 1, mid + 1, nodeR);
	seg[node] = arr[seg[node * 2]] <= arr[seg[node * 2 + 1]] ? seg[node * 2] : seg[node * 2 + 1];
}

//현재 구간에서 최소값의 위치 반환
int query(int L, int R, int node, int nodeL, int nodeR) {
	if (nodeL > R || nodeR < L) return -1;
	if (nodeL >= L && nodeR <= R) return seg[node];
	int mid = (nodeL + nodeR) / 2;
	int left = query(L, R, node * 2, nodeL, mid);
	int right = query(L, R, node * 2 + 1, mid + 1, nodeR);
	if (left == -1) return right;
	if (right == -1) return left;
	if (arr[left] <= arr[right]) return left;
	return right;
}

int main() {
	queue<pair< int, int>> qu;	//{L, R} 구간 저장
	scanf("%d", &n);
	while (n != 0) {
		long long maxx = 0;
		for (int i = 0; i < n; i++)
			scanf("%d", &arr[i]);
		update(1, 0, n - 1);
		qu.push({ 0, n - 1 });	//나눠진 구간들을 qu에 저장
		while (!qu.empty()) {
			pair<int, int> pa = qu.front();
			long long tem;
			qu.pop();
			if (pa.first > pa.second) continue;	//불가능 구간
			if (pa.first == pa.second) tem = (long long)arr[pa.first];	//구간에 속한 인수 개수가 1개일 경우 높이가 넓이가 됨
			else {
				int pos = query(pa.first, pa.second, 1, 0, n - 1);
				tem = (long long)arr[pos] * (pa.second - pa.first + 1);	//높이 arr[pos]일때의 너비
				qu.push({ pa.first, pos - 1 });
				qu.push({ pos + 1, pa.second });
			}
			maxx = maxx < tem ? tem : maxx;
		}
		printf("%lld\n", maxx);

		scanf("%d", &n);
	}
}
```