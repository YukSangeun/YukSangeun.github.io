---
title: "백준 3653번: 영화 수집"
excerpt: "segment tree를 이용하는 문제"

categories:
  - Problem
tags:
  - Tree
last_modified_at: 2020-03-03T02:40:00
---
문제  
-------  
상근이는 영화 DVD 수집가이다. 상근이는 그의 DVD 콜렉션을 쌓아 보관한다.  
보고 싶은 영화가 있을 때는, DVD의 위치를 찾은 다음 쌓아놓은 콜렉션이 무너지지 않게 조심스럽게 DVD를 뺀다. 영화를 다 본 이후에는 가장 위에 놓는다.  
상근이는 DVD가 매우 많기 때문에, 영화의 위치를 찾는데 시간이 너무 오래 걸린다. 각 DVD의 위치는, 찾으려는 DVD의 위에 있는 영화의 개수만 알면 쉽게 구할 수 있다. 각 영화는 DVD 표지에 붙어있는 숫자로 쉽게 구별할 수 있다.  
각 영화의 위치를 기록하는 프로그램을 작성하시오. 상근이가 영화를 한 편 볼 때마다 그 DVD의 위에 몇 개의 DVD가 있었는지를 구해야 한다.  

입력  
-------  
첫째 줄에 테스트 케이스의 개수가 주어진다. 테스트 케이스의 개수는 100개를 넘지 않는다.  
각 테스트 케이스의 첫째 줄에는 상근이가 가지고 있는 영화의 수 n과 보려고 하는 영화의 수 m이 주어진다. (1 ≤ n, m ≤ 100,000) 둘째 줄에는 보려고 하는 영화의 번호가 순서대로 주어진다.  
영화의 번호는 1부터 n까지 이며, 가장 처음에 영화가 쌓여진 순서는 1부터 증가하는 순서이다. 가장 위에 있는 영화의 번호는 1이다.  

> 출처  
> <https://www.acmicpc.net/problem/3653>  

풀이  
-------  
초기 접근할 때, n개의 배열을 선언해서 i번째 순위에 있는 dvd를 배열A[i]에 저장하는 방식을 이용했다.  
이렇게 접근할 경우 dvd를 하나 꺼내게 되면 배열을 매번 업데이트 시켜줘야하기 때문에 제출시 시간초과가 발생했다.  
그래서 다르게 접근한 방법이 바로 **영화i가 몇번째 순위에 있는지를 배열 A[i]에 저장하는 것**이다. (순위는 값이 클수록 순위가 높게 지정했다. 즉 첫번째 영화의 순위가 n, 마지막 영화의 순위가 1)  
또한 **영화i를 꺼내게 되면** 이 영화의 순위를 n으로 바꾸고 다른 영화들의 순위들을 하나씩 뒤로 미는것이 아니라 **새로운 더 높은 값을 영화의 순위로 지정해줬다.**  
즉, n개의 영화가 존재하고 3번 영화를 꺼낼 경우 3번 영화의 순위는 n이 아니라 n+1로 변경되는 것이다. 이렇게 하면 배열의 모든 값을 업데이트 시킬 필요없이 해당 영화의 위치만 업데이트하면 되므로 시간을 절약할 수 있다.  
또한 segment tree는 크기를 4*(n+m)으로 지정하고 이때 리프 노드들은 순위값이 영화에 할당됐는지(1) 안됐는지를(0) 나타낸다.  
**segment tree에는 구간합을 저장하며 이는 k번 영화 앞으로 몇개의 영화가 존재하는지를 의미**한다.  

코드  
------- 
``` c  
#include<stdio.h>
using namespace std;

int n, m;
int arr[100001];	//arr[i] : i번 영화의 순위값
int seg[800001];	//4*(n+m) 구간 합을 저장

int update(int pos, int val, int node, int nodeL, int nodeR) { //구간합
	if (nodeL > pos || nodeR < pos) return seg[node];
	if (nodeL == nodeR) return seg[node] = val;
	int mid = (nodeL + nodeR) / 2;
	seg[node] = update(pos, val, node * 2, nodeL, mid) + update(pos, val, node * 2 + 1, mid + 1, nodeR);
	return seg[node];
}

int query(int L, int R, int node, int nodeL, int nodeR) {	//k번 영화앞으로 몇개의 영화가 존재하는지를 의미하는 구간의 합을 return
	if (nodeL > R || nodeR <= L) return 0;
	if (nodeL > L&& nodeR <= R) return seg[node];
	int mid = (nodeL + nodeR) / 2;
	return query(L, R, node * 2, nodeL, mid) + query(L, R, node * 2 + 1, mid + 1, nodeR);
}

int main() {
	int tc;
	scanf("%d", &tc);
	while (tc--) {
		int order = 1;
		scanf("%d %d", &n, &m);
		for (int i = 1; i <= 4 * (n + m); i++) seg[i] = 0;
		arr[0] = n + 1;	//arr배열에 순서 넣기 편하게 하기 위해 넣어놓은 값(큰 의미 없음)
		while (order <= n) {	//order번 영화의 순서를 저장하기.  (순서는 값이 클수록 순위가 높음을 의미)
			arr[order] = arr[order - 1] - 1;
			update(order, 1, 1, 1, n + m);
			order++;
		}
		for (int i = 0; i < m; i++) {
			int val;
			scanf("%d", &val);
			printf("%d ", query(arr[val], order - 1, 1, 1, n + m));
			//val번 영화에 기존에 부여된 순위값을 해제하고 새로운 순위값 order를 부여
			update(arr[val], 0, 1, 1, n + m);
			update(order, 1, 1, 1, n + m);
			arr[val] = order;
			order++;	//다음에 꺼낼 경우 맨 앞을 의미하는 새로운 순위값
		}
		printf("\n");
	}
}
```