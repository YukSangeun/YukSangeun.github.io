---
title: "백준 1786번: 찾기"
excerpt: "KMP 알고리즘을 이용한 문제"

toc: true
toc_sticky: true
toc_label: "LIST"

categories:
  - Problem
tags:
  - String
  - KMP
last_modified_at: 2020-03-23T02:53:00
---
문제  
-------  
백준 <https://www.acmicpc.net/problem/1786>  

입력  
-------  
첫째 줄에 문자열 T가, 둘째 줄에 문자열 P가 주어진다. 문자열 내에 공백이 포함되어 있을 수도 있음에 유의한다. 물론 공백도 하나의 문자로 인정된다. T와 P의 길이 n, m은 1이상 100만 이하이다.  

> 참조  
> <https://www.acmicpc.net/problem/1162>  

풀이  
--------  
기본적인 KMP알고리즘을 이용한 문제이다.  

코드  
----------  
``` c  
#include<stdio.h>
#include<vector>
using namespace std;

char T[1000001], P[1000001];
vector<int> res;	//T에서 P가 나타나는 위치 저장
int pi[1000001]; //failure function

int main() {
	int m = 0, n = 0;	//문자열 P, T의 문자 개수

	while (1) {
		scanf("%c", &T[n]);
		if (T[n] == '\n') break;
		n++;
	}
	while (1) {
		scanf("%c", &P[m]);
		if (P[m] == '\n') break;
		m++;
	}

	//failure function
	for (int i = 1, j = 0; i < m; i++) {
		while (j > 0 && P[i] != P[j]) j = pi[j - 1];
		if (P[i] == P[j]) {
			pi[i] = j + 1;
			j++;
		}
	}
	//kmp
	for (int i = 0, j = 0; i < n; i++) {
		while (j > 0 && T[i] != P[j]) j = pi[j - 1];
		if (T[i] == P[j]) {
			if (j == m - 1) {
				res.push_back(i - m + 2);	//문자시작 위치 저장(문자는 1번부터 시작)
				j = pi[j];
			}
			else
				j++;
		}
	}

	printf("%d\n", res.size());
	for (auto val : res)
		printf("%d ", val);
}
```