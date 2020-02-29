---
title: "Segment Tree(세그먼트 트리)"
excerpt: "각 노드가 구간, 혹은 구간의 정보를 저장하고 있는 자료구조"

categories:
  - Algorithm
tags:
  - Tree
last_modified_at: 2020-02-29T16:09:00
---
(공부한 내용을 기반으로 정리 용도로 작성한 글이므로 잘못된 부분이 있을 수 있습니다.)  
한 배열(ex. A)의 부분 정보를 트리구조에 저장함으로서 O(logN)의 속도로 A 배열의 부분 정보를 빠르게 구할 수 있다.  
이때, 부분 정보는 합 or 최댓값 or 최솟값 등 문제에 따라 다르다.  

트리에 저장하는 방식을 예를 들어 살펴보자.  
배열 A의 크기가 10이고 값이 아래와 같이 존재할 때, 트리의 리프 노드들에는 배열의 해당 위치 값이 저장되고 부모 노드에는 자식 노드들의 합이 저장된다.  
이때 [a, b]는 범위를 나타낸다. (배열 A의 a번째 값부터 b번째 값의 합)  

![A배열의 구간합을 segment tree 로 보인 그림](https://yuksangeun.github.io/assets/images/segmentTree_ex.png){: .align-center}  

**부분정보를 트리구조에 저장하는 이유:**  
예를 들어, A[2]+A[3]+A[4]를 구하고자 할 때 간단하게 그냥 더하면 된다. 하지만 A[2]의 값을 변경할 때마다 구간[2,4]의 합을 구하라 한다고하자. A[2]를 변경하는 횟수를 m, 구간의 합을 구하는데 걸리는 시간이 n이라 하면, 총 **O(mn)**이라는 시간복잡도가 나온다.  
세그먼트 트리를 이용해서 값이 변경할 때마다 부분합을 저장한다고 하면, **O(MlogN)**이라는 시간복잡도가 나오므로 더 빠르게 구할 수 있다.  


**트리 구조**(binary tree 형태)  
부모 노드 - 자식 노드들 값의 합  
리프 노드 - 배열의 각 요소들  
A배열 크기가 N일 때, 리프 노드의 개수: N, 트리의 높이 H: logN(절반씩 쪼개면서 들어가므로)  


트리는 배열을 이용하여 노드들을 관리한다. 즉, 트리배열의 크기: 2^(H+1)  
인덱스는 루트부터 0, 같은 깊이 왼쪽 노드부터 순서대로 번호 붙이기.  
부모와 자식노드의 인덱스 관계: 부모 a, 왼쪽자식 2*a+1, 오른쪽자식 2*a+2


**주의**  
위 경우는 포화이진트리일 때를 말한것 (n=2^k) , 포화이진트리가 아닐 경우 H=ceil(logN)  
간단하게 배열 크기를 4*n으로 넉넉하게 잡아도 된다.  

Segment Tree - init  
----------------  
초기 상태의 트리 생성 - update에서 같이해줘도 된다.  


Segment Tree - update
----------------  
배열A의 특정 인덱스의 값이 변경될때마다, 트리배열에서 바껴야하는 노드들 값들을 변경해준다.  O(logN)  
``` c  
//배열A에서 값 변경할 index, 변경 값, segment tree의 node 번호, 현재 구간[L, R]  
int update(int pos, int val, int node, int nodeL, int nodeR){
	//경우1: 변경할 index를 포함하지 않는 node는 기존 값 반환  
	if(pos < nodeL || pos > nodeR) return tree[node];
	//경우2: 리프 노드일 경우 노드에 변경값을 저장
	if(nodeL == nodeR)  return tree[node] = val;  
	//경우3: 변경할 index를 포함하는 큰 구간을 가진 node인 경우 자식으로 들어감  
	int mid = (nodeL + nodeR)/2;
	return tree[node] = update(pos, val, node*2+1, nodeL, mid) + update(pos, val, node*2+2, mid+1, nodeR);  
```  
예를 들어 설명해 보자.  
배열 A[10]={1, 3, 2, 5, 4, 0, 7, 2, 1, 1} 가 주어질 때, A[2]의 값을 -1로 변경하고자 한다. 이 경우 update함수를 호출한다.  
![A배열이 변경된 경우](https://yuksangeun.github.io/assets/images/segment_tree_update1.png){: .align-center}  
1. update(2, -1, 0, 0, 9) 함수를 호출 : 변경할 인덱스와 값, 탐색 시작할 노드(루트노드), 구간[0,9] 을 파라미터로 보내며, **항상 탐색은 루트 노드부터 시작한다**.  
2. 구간 [0, 9]는 인덱스 인덱스 2를 포함하고 있고 현재 노드는 리프노드가 아니므로 자식노드(left, right)를 호출한다.  
3. 이때, 오른쪽 자식은 구간이 [5, 9]로 인덱스 2를 포함하고 있지 않는다. 따라서 해당사항이 없으므로 기존 값을 반환한다.  
![A배열이 변경된 경우](https://yuksangeun.github.io/assets/images/segment_tree_update2.png){: .align-center}  
4. 왼쪽 자식은 구간이 [0, 4]로 인덱스 2를 포함하며, 리프노드가 아니므로 자신의 자식노드를 호출한다.  
5. 4번 노드의 오른쪽 자식은 구간이 [3, 4]로 인덱스 2를 포함하지 않는다. 따라서 기존 값을 반환한다.  
![A배열이 변경된 경우](https://yuksangeun.github.io/assets/images/segment_tree_update3.png){: .align-center}  
6. 4번 노드의 왼쪽 자식은 구간이 [0,2]로 인덱스 2를 포함하고 리프노드가 아니므로 자식노드를 호출한다.  
7. 6번 노드의 왼쪽 자식은 구간이 [0,1]로 인덱스 2를 포함하지 않으므로 기존값을 반환한다. 반면 오른쪽 자식은 [2,2]로 인덱스 2를 포함하고 구간의 시작과 끝이 같으므로 리프노드 임을 알 수 있다.  
8. 리프노드일 경우 값을 해당 노드의 값을 변경하고 하는 값 -1로 변경하고 변경된 값을 반환한다.  
![A배열이 변경된 경우](https://yuksangeun.github.io/assets/images/segment_tree_update4.png){: .align-center}  
9. 부모노드들은 자식노드들로 부터 반환된 값을 더하여 더한 값으로 값을 변경한다.  
10. 인덱스 2를 포함한 모든 tree노드들의 값들이 변경된 것을 알 수 있다.  
![A배열이 변경된 경우](https://yuksangeun.github.io/assets/images/segment_tree_update5.png){: .align-center}  

Segment Tree - query  
----------------  
원하는 구간에 대한 정보를 요청하여 가져온다. O(logN)  
``` c  
//찾고자 하는 구간[L, R], segment tree의 node번호, 현재 노드의 구간정보[nodeL, nodeR]  
int query(int L, int R, int node, int nodeL, int nodeR){
	//경우1: 현재 노드의 구간이 찾고자 하는 구간을 벗어난 경우 - 해당 없으므로 0 반환
	if(R < nodeL || nodeR < L) return 0;
	//경우2: 현재 노드의 구간이 찾고자 하는 구간에 포함된 경우 - 값 반환
	if(L <= nodeL && nodeR <= R) return tree[node];
	//경우3: 현재 노드의 구간이 일부분이라도 찾고자 하는 구간을 포함하고 있는 경우 - 자식 노드로 들어감
	int mid = (nodeL + nodeR)/2;
	return sum(L, R, node*2+1, nodeL, mid) + sum(L, R, node*2+2, mid+1, nodeR);
```  
예를 들어 설명해 보자.  
배열 A[10]={1, 3, 2, 5, 4, 0, 7, 2, 1, 1} 가 주어질 때, 구간 [2, 4]의 합을 구하자. 이 경우 query함수를 호출한다.  
![부분합 질의](https://yuksangeun.github.io/assets/images/segment_tree_query1.PNG){: .align-center}  
1. query(2, 4, 0, 0, 9) 함수를 호출 : 찾고자 하는 구간[2,4], 탐색 시작할 노드(루트노드), 구간[0,9] 을 파라미터로 보내며, **항상 탐색은 루트 노드부터 시작한다**.  
2. 구간 [0, 9]는 구간[2,4]를 포함하고 있으므로(구간[2,4]에 포함된 상태가 아님) 자식노드(left, right)를 호출한다.  
3. 이때, 오른쪽 자식은 구간이 [5, 9]로 구간[2,4]를 벗어난 구간이다. 따라서 해당사항이 없으므로 0을 반환한다.  
![부분합 질의](https://yuksangeun.github.io/assets/images/segment_tree_query2.png){: .align-center}  
4. 왼쪽 자식은 구간이 [0, 4]로 구간[2,4]를 포함하며, 리프노드가 아니므로 자신의 자식노드를 호출한다.  
5. 4번 노드의 오른쪽 자식은 구간이 [3, 4]로 구간[2,4]에 속해있다. 따라서 자신의 노드 값을 반환한다.    
![부분합 질의](https://yuksangeun.github.io/assets/images/segment_tree_query3.png){: .align-center}  
6. 4번 노드의 왼쪽 자식은 구간이 [0,2]로 구간[2,4]에서 **일부분을 포함하고 있으므로** 자식노드를 호출한다.  
7. 6번 노드의 왼쪽 자식은 구간이 [0,1]로 구간[2,4]를 벗어나므로 0을 반환한다. 반면 오른쪽 자식은 [2,2]로 구간[2,4]에 속해 있으므로 자신의 노드 값을 반환한다.  
![부분합 질의](https://yuksangeun.github.io/assets/images/segment_tree_query4.png){: .align-center}  
9. 부모노드들은 자식노드들로 부터 반환된 값을 더하여 그 값을 반환한다.  
10. 구간[2,4]의 합이 11임을 알 수 있다.  
![부분합 질의](https://yuksangeun.github.io/assets/images/segment_tree_query5.png){: .align-center}  

<https://www.acmicpc.net/problem/2042>
