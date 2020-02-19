---
title: "Parametric Search"
excerpt: "binary search를 응용한 탐색 방법"


categories:
  - Algorithm
tags:
  - Binary Search
last_modified_at: 2020-02-18T12:59:00
---
Binary Search를 응용한 방법이며, 기본적인 탐색 방법은 Binary Search와 비슷하다.


**차이** 

|알고리즘|탐색범위|수행|   
|:---:|:---|:---|  
|binary search | 배열 값들을 기준으로 탐색 | mid값과의 일치여부로 판단|  
|parametric search | 실수 범위에서 이진탐색 | 비교함수 사용하여 판단|  

parametric search은 주로 내가 원하는 조건을 만족하는 가장 알맞은 값을 특정한 오차범위 이내에서 알고자 할 때 사용한다.  
ex) y = x^2 + x + 1라는 식이 주어질 때, 1<x<10, y = 5인 경우에 해당하는 x를 구해라.  
이때 비교함수는 **5 = x^2 + x + 1**이 되며 x범위에 대해 식에 값을 넣어 5보다 큰지, 작은지 여부를 따지며 x를 찾는다.  


Parametric search의 경우는 일반적인 구현이 없고 문제에 따라 비교함수를 적절히 만들어야 한다.  
**주의**: mid값 구할 때 (+)에서 오버플로우 발생하지 않도록 long long 자료형을 이용하자  

예제 (백준 2805번 나무자르기)
---------

		  #include<stdio.h>
		  #include<vector>
		  using namespace std;
		  /*
		  [start - 조건을 만족하는 최대 높이, end - 조건을 불만족하는 최소 높이]
		  sum - mid로 나무들 절단 후 가져갈 총 길이 합
		  sum >= m : 높이 mid에서 조건 만족하므로 start = mid
		  sum < m : 높이 mid에서 조건 불만족하므로 end = mid
		  (start, end) 사이에 중간값 없을 경우 start값이 답 
		  */
		  
		  int func(vector<int> tree, int start, int end, int m) {	//나무 높이 정보, 시작범위, 끝 범위
		       while (end - start > 1) {	//범위가 (start, start+1)이전까지
		       int mid = (start + end) / 2;
		       long long sum = 0;
		       //분리된 나무 총 길이
		       for (int i = 0; i < tree.size(); i++)
		            sum += ((tree[i] - mid) > 0 ? tree[i] - mid : 0);
		       if (sum >= m)	//mid로 m 이상의 길이 가져갈 수 있음
		            start = mid;
		       else //mid로 m 이상의 길이 가져갈 수 없음
		            end = mid;
		       }
		       return start;
		  }
		  
		  int main() {
		       int n, m;	//나무의 수, 가져가고 싶은 나무 길이
		       int maxT = 0;	//최대 나무 높이(초기 범위 지정시 사용)
		       vector<int> tree;
		  
		       scanf("%d %d", &n, &m);
		       tree.resize(n);
		       for (int i = 0; i < n; i++) {
		            scanf("%d", &tree[i]);
		       if (maxT < tree[i])	maxT = tree[i];
		       }
		       printf("%d", func(tree, 0, maxT, m));
		  }

> 참고  
> https://palyoung.tistory.com/40  
> https://m.blog.naver.com/PostView.nhn?blogId=kks227&logNo=220777333252&referrerCode=0&searchKeyword=binary%20search
