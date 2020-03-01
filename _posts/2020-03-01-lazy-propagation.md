---
title: "Lazy Propagation"
excerpt: "세그먼트 트리를 이용한 방법"

categories:
  - Algorithm
tags:
  - Tree
last_modified_at: 2020-03-01T16:09:00
---
이전에 **segment tree**에 대해 공부했다.  segment tree는 구간들의 정보를 저장하는 것으로 2개의 연산이 있다.  
1. update - 특정 인덱스의 값을 바꾸는 것  
2. query - 특정 구간의 정보(합 or 곱 or 최댓값)을 구하는 것  

추가로 **Lazy propagation**을 이용하면 **특정 구간 [a, b]에 값 c를 동시에 더하는** 연산도 가능하다.  

-----------  
특정 구간 [a, b]에 값 c를 더하는 연산을 기존에 공부했던 segment tree 내용으로 한다면, 구간 [a, b]에 포함된 모든 인덱스에 대해 각각 update 연산을 수행하여 c씩 더할 것이다.  
이 경우 구간 [a, b]에 포함된 인덱스 개수를 m이라 할 때, update연산은 O(logN)에 수행되므로 m번 반복하면 시간복잡도 **O(mlogN)**이 된다.  


하지만 lazy propagation을 이용할 경우 시간 복잡도 **O(logN)**만에 수행 가능하다.  

**방법**  
기존의 각 노드에 대응하는 구간 합 배열(tree)에 추가로 노드마다 값이 존재하는 lazy배열을 만든다.  
lazy 배열 - 이 노드의 영역 전체에 얼마만큼의 값을 더할 계획이 있다. 하지만 아직은 계획만 있을 뿐 실행은 안한다.(lazy의 이유)  

예를 들어, 구간[3, 4]에 6을 더하고자 하면 이 구간에 해당하는 lazy 값이 6이 된다.  즉 이노드 이하의 값들에는 6을 더할 것이라는 것을 뜻한다.  
언제까지 미룰 수 없으므로 한번더 이 노드를 만나면 그 자식으로 lazy를 미룬다.  이 과정을 propagation이라고 한다.  
계속 미루다가 리프 노드에 도달하면 더이상 미룰 수 없으므로 lazy를 흡수한다.  

구간 [2, 5] 부분합을 구하는 연산이 시행됐을 때, [3,4]구간을 마주치게 되고 이때 프로퍼게이션이 이루어진다.  
[3,4]구간에 도달한 경우 자신은 자식들에게 lazy를 미루고, 자신은 6을 그만큼 더한 셈 쳐서 값에 12를 더한다. 이는 자신이 포함하는 인덱스 개수인 2 * lazy값 6이다.  


**구현**  
기존 segment tree의 두 연산 update, query 의 일부분을 수정하고 propagation해주는 함수를 추가해 준다.  


그림을 통해 먼저 수행되는 것을 이해해보자.  
백준 문제 <10999번: 구간 합 구하기 2> 를 예시로 보자.  
<https://www.acmicpc.net/problem/10999>  

배열 arr[5] = {1, 2, 3, 4, 5}가 주어진다. 초기 lazy배열을 미룰 값들이 존재하지 않으므로 0이다.  
1. 구간[2, 3]에 6씩 더해보자. -> update함수 호출  
	- update(2, 3, 6, 1, 0, n-1); : 구간[2, 3]에 더할 값 6, 루트 노드 번호 1, 루트 노드의 구간 [0, n-1] 을 인자로 넘겨준다.  
2. n=5이므로 현재 노드의 구간 [0, 4]는 변경할 구간[2, 3]을 포함하고 있으므로 자식 노드로 들어간다.  
![구간 2_3](https://yuksangeun.github.io/assets/images/lazy_1_1.png){: .align-center}  
3. 2번의 왼쪽자식은 구간[0, 2]로 변경할 구간[2, 3]의 일부분을 포함하고 있다. 따라서 자식 노드로 들어간다. 
4. 2번의 오른쪽 노드 또한 자식으로 들어간다.  
5. 3번의 왼쪽자식은 구간[0, 1]로 변경할 구간을 벗어나므로 return해 준다. 4번의 오른쪽 자식 또한 범위를 벗어나므로 return한다.  
![구간 2_3](https://yuksangeun.github.io/assets/images/lazy_1_2.png){: .align-center}  
6. 3번의 오른쪽 자식과 4번의 왼쪽 자식은 변경 구간에 포함되므로 lazy배열 값에 6을 더해준다.  
![구간 2_3](https://yuksangeun.github.io/assets/images/lazy_1_3.png){: .align-center}  
7. lazy배열 값을 변경한 뒤, propagate함수를 호출하여 현재 노드에 lazy배열 값을 범위에 해당하는 원소 개수만큼 더해준뒤, 리프노드이므로 lazy값을 0으로 바꾼 후 반환해준다. (리프노드가 아닐 경우 자식노드들에게 lazy값을 넘겨준다.)  
8. 재귀함수를 거슬러 올라가면서 부모노드 = 자식노드의 합으로 바꿔주며 올라간다.  
![구간 2_3](https://yuksangeun.github.io/assets/images/lazy_1_4.png){: .align-center}  

-----------  
1. 구간[0, 2]에 -2 더하기 -> update함수 호출
	- update(0, 2, -2, 1, 0, n-1);  
2. 현재 노드의 구간 [0,4]는 변경할 구간[0, 2]를 포함하므로 자식노드를 호출한다.  
3. 2번의 오른쪽 자식은 구간[3, 4]로 범위를벗어나므로 return 한다.  
4. 2번의 왼쪽 자식은 구간[0, 2]로 변경 구간에 포함된다. 따라서 lazy배열 값을 -2로 변경하고 propagation을 호출한다.  
![구간 0_2](https://yuksangeun.github.io/assets/images/lazy_2_1.png){: .align-center}  
5. 구간[0,2]에는 0,1,2 총 3개의 원소가 있으므로 노드의 현재 값에 -2*3을 더해준 뒤, 리프노드가 아니므로 자식노드로 lazy값을 넘겨준 후 lazy값을 0으로 바꿔서 반환한다.  
![구간 0_2](https://yuksangeun.github.io/assets/images/lazy_2_2.png){: .align-center}  

-------------  
1. 구간[1, 4] 구간 합 구하기 -> query함수 호출
	- query(1, 4, 1, 0, n-1);  
2. 구간[0, 4]는 구하고자 하는 구간을 포함하므로 자식노드를 호출한다.  
3. 2번의 오른쪽 자식은 구간이 [3, 4]로 구간 [1, 4]에 포함되므로 자신의 값 15를 반환한다.  
4. 2번의 왼쪽 자식은 구간[0, 2]로 구간의 일부분을 포함하므로 자식노드를 호출한다.  
![구간 1_4](https://yuksangeun.github.io/assets/images/lazy_3_1.png){: .align-center}  
5. 4번의 왼쪽자식과 오른쪽 자식은 lazy값 -2를 가지고 있으므로 propagate함수를 호출하여 노드의 값을 바꿔준 후 자식노드가 존재한다며 lazy값을 자식에게 넘겨준다.  
6. 4번의 오른쪽 자식은 구간[2, 2]로 구간[1,4]에 포함되므로 노드의 값을 반환한다.  
![구간 1_4](https://yuksangeun.github.io/assets/images/lazy_3_2.png){: .align-center}  
7. 4번의 왼쪽자식은 구간[0,1]로 일부분이 포함되므로 자신의 자식을 또 호출한다.  
8. 7번의 두 자식은 모두 lazy값을 가지고 있으므로 propagate함수를 호출하여 노드 값을 변경해준다.  
8. 7번의 왼쪽자식은 구간[0,0]으로 구간을 벗어나므로 0을 반환하고, 오른쪽 자식은 구간에 포함되므로 자신의 값을 반환한다.  
![구간 1_4](https://yuksangeun.github.io/assets/images/lazy_3_3.png){: .align-center}  
9. 거슬러 올라가며 반환된 값들을 더하며 반환한다.  
![구간 1_4](https://yuksangeun.github.io/assets/images/lazy_3_4.png){: .align-center}  

코드  
------  
``` c  
#include<stdio.h>
using namespace std;

long long lazy[4000001], tree[4000001];
long long arr[1000001];
int n, m, k;	//수의 개수, 변경 수, 구간합 수

void propagate(int node, int nodeL, int nodeR) {
	tree[node] += lazy[node] * (nodeR - nodeL + 1);
	if (nodeL != nodeR) {	//리프노드가 아닐 경우
		lazy[node * 2] += lazy[node];
		lazy[node * 2 + 1] += lazy[node];
	}
	lazy[node] = 0;
}

void update(int L, int R, long long val, int node, int nodeL, int nodeR) {
	if (lazy[node] != 0) propagate(node, nodeL, nodeR);
	if (nodeL > R || nodeR < L) return ;
	if (nodeL >= L && nodeR <= R) {
		lazy[node] += val;
		propagate(node, nodeL, nodeR);
		return;
	}
	int mid = (nodeL + nodeR) / 2;
	update(L, R, val, node * 2, nodeL, mid);
	update(L, R, val, node * 2 + 1, mid + 1, nodeR);
	tree[node] = tree[node * 2] + tree[node * 2 + 1];
}

long long query(int L, int R, int node, int nodeL, int nodeR) {
	if (lazy[node] != 0) propagate(node, nodeL, nodeR);
	if (nodeL > R || nodeR < L) return 0;
	if (nodeL >= L && nodeR <= R) return tree[node];
	int mid = (nodeL + nodeR) / 2;
	return query(L, R, node * 2, nodeL, mid) + query(L, R, node * 2 + 1, mid + 1, nodeR);
}

int main() {
	scanf("%d %d %d", &n, &m, &k);
	for (int i = 0; i < n; i++) {
		scanf("%lld", &arr[i]);
		update(i, i, arr[i], 1, 0, n - 1);
	}
	m += k;
	while (m--) {
		int a, b, c;
		scanf("%d %d %d", &a, &b, &c);
		if (a == 1) {
			long long d;
			scanf("%lld", &d);
			update(b-1, c-1, d, 1, 0, n - 1);
		}
		else
			printf("%lld\n", query(b-1, c-1, 1, 0, n - 1));
	}
}
```