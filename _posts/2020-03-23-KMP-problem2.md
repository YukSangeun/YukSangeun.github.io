---
title: "백준 1701번: 찾기"
excerpt: "KMP 알고리즘을 관련 문제 - failure function"

toc: true
toc_sticky: true
toc_label: "LIST"

categories:
  - Problem
tags:
  - String
  - KMP
last_modified_at: 2020-03-23T17:53:00
---
문제  
-------  
Cubelover는 프로그래밍 언어 Whitespace의 코딩을 도와주는 언어인 Cubelang을 만들었다. Cubelang을 이용해 코딩을 하다보니, 점점 이 언어에 맞는 새로운 에디터가 필요하게 되었다. 오랜 시간 고생한 끝에 새로운 에디터를 만들게 되었고, 그 에디터의 이름은 Cubeditor이다.  
텍스트 에디터는 찾기 기능을 지원한다. 대부분의 에디터는 찾으려고 하는 문자열이 단 한 번만 나와도 찾는다. Cubelover는 이 기능은 Cubelang에 부적합하다고 생각했다. Cubelang에서 필요한 기능은 어떤 문자열 내에서 부분 문자열이 두 번 이상 나오는 문자열을 찾는 기능이다. 이때, 두 부분 문자열은 겹쳐도 된다.  
예를 들어, abcdabc에서 abc는 두 번 나오기 때문에 검색이 가능하지만, abcd는 한 번 나오기 때문에 검색이 되지를 않는다.  
이렇게 어떤 문자열에서 두 번 이상 나오는 부분 문자열은 매우 많을 수도 있다. 이러한 부분 문자열 중에서 가장 길이가 긴 것을 구하는 프로그램을 작성하시오.  
예를 들어, abcabcabc에서 abc는 세 번 나오기 때문에 검색할 수 있다. 또, abcabc도 두 번 나오기 때문에 검색할 수 있다. 하지만, abcabca는 한 번 나오기 때문에 검색할 수 없다. 따라서, 두 번 이상 나오는 부분 문자열 중에서 가장 긴 것은 abcabc이기 때문에, 이 문자열이 답이 된다.  

입력  
-------  
첫째 줄에 문자열이 주어진다. 문자열의 길이는 최대 5,000이고, 문자열은 모두 소문자로만 이루어져 있다.  

> 참조  
> <https://www.acmicpc.net/problem/1701>  

풀이  
--------  
KMP알고리즘에서 설명한 것처럼 failure function함수만을 이용하여 해결 할 수 있는 문제이다.   

코드  
----------  
``` c  
#include<stdio.h>
#include<vector>
using namespace std;

char P[5001];
int pi[5001]; //failure function

int main() {
	int m = 0;	//문자열 P의 문자 개수
	int res = 0;

	while (1) {
		scanf("%c", &P[m]);
		if (P[m] == '\n') break;
		m++;
	}

	for (int st = 0; st < m-1; st++) {
		for (int i = 1; i < m; i++) pi[i] = st;
		//failure function
		for (int i = st+1, j = st; i < m; i++) {
			while (j > st&& P[i] != P[j]) j = pi[j - 1];
			if (P[i] == P[j]) {
				pi[i] = j + 1;
				j++;
				if (res < j - st)
					res = j - st;
			}
		}
	}

	printf("%d\n", res);
}
```