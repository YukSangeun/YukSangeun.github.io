---
title: "백준 4354번: 문자열 제곱"
excerpt: "KMP 알고리즘을 관련 문제 - failure function"

toc: true
toc_sticky: true
toc_label: "LIST"

categories:
  - Problem
tags:
  - String
  - KMP
last_modified_at: 2020-03-25T17:53:00
---
문제  
-------  
알파벳 소문자로 이루어진 두 문자열 a와 b가 주어졌을 때, a*b는 두 문자열을 이어붙이는 것을 뜻한다. 예를 들어, a="abc", b="def"일 때, a*b="abcdef"이다.  
이러한 이어 붙이는 것을 곱셈으로 생각한다면, 음이 아닌 정수의 제곱도 정의할 수 있다.  
- a^0 = "" (빈 문자열)  
- a^(n+1) = a*(a^n)  

문자열 s가 주어졌을 때, 어떤 문자열 a에 대해서 s=a^n을 만족하는 가장 큰 n을 찾는 프로그램을 작성하시오.  


입력  
-------  
입력은 여러 개의 테스트 케이스로 이루어져 있다. 각각의 테스트 케이스는 s를 포함한 한 줄로 이루어져 있다. s의 길이는 적어도 1이며, 백만글자를 넘지 않는다. 마지막 테스트 케이스의 다음 줄은 마침표이다.  

> 참조  
> <https://www.acmicpc.net/problem/4354>  

풀이1  
--------  
KMP알고리즘에서 failure function만을 가지고 풀 수 있는 문제이다.  
예를 들어, S = "ababab"라는 문자열이 주어진다 하자.  
문자열S에 대해 failure function을 구한 뒤 pi[5]를 보면 pi[5]=4이다. 즉 문자열S의 전체 길이를 봤을 때 앞,뒤 공통 부분이 "abab"라는 것을 알 수 있다.  
이 "abab"는 문자열 S에서 최대 중복되는 문자열이고 이 길이는 4이다. 따라서 최소 중복되는 문자열의 길이는 6(전체길이)-4(최대 중복되는 문자열 길이)=2가 되고 "ab"이다.  
이 최소 중복되는 문자열 길이로 문자열 A의 길이를 나눴을 때 나머지가 0이 나오면 문자열 a = "ab"라는 뜻이다. 나머지가 0이 아닐 경우 문자열 a = S가 된다. 


비슷한 느낌으로 풀 수 있는 문제는 <https://www.acmicpc.net/problem/1305>이다.  

코드1  
----------  
``` c  
#include<stdio.h>
using namespace std;

char str[1000001];
int pi[1000001];

int main() {
	while (1) {
		int n = 1, len;
		scanf("%s", str);
		if (str[0] == '.' && str[1] == '\0') break;
		//failure function
		for (int i = 1, j = 0; str[i] != '\0'; i++) {
			while (j > 0 && str[i] != str[j]) j = pi[j - 1];
			if (str[i] == str[j]) {
				pi[i] = ++j;
			}
			n++;	//문자열 길이 구하기 위해
		}
		len = n - pi[n - 1];	//최소 중복될 문자열 길이
		if (n % len == 0)
			printf("%d\n", n / len);
		else printf("1\n");
		for (int i = 1; i < n; i++) pi[i] = 0;
	}
}
```

풀이2  
--------  
failure function을 조금 변형시켜 푼 방법이며 이 경우 pi배열을 사용하지 않고 풀 수 있기 때문에 공간복잡도 면에서 [풀이1]보다 좋다.  
이 방법은 주어지는 문자열 S를 위치1부터 탐색한다. 초기 a의 길이를 1로 두고(반복되는 문자열의 길이) 문자열 S와 매칭되는 지를 검사한다.  
만약 매칭이 되면 다음 위치로 넘어가면서 내가 정한 a로 문자열 S를 다 반복할 수 있는지를 본다.  
만약 매칭이 안되는 부분에 도달한다면 반복되는 문자열 a를 문자열 s의 0~(현재위치-1)까지로 변경한 뒤 현재 위치부터 문자열 a의 처음 위치0과 비교 시작한다.  
이를 반복하며 문자열 s의 마지막에 도달하면 탐색을 종료한다. 만약에 문자열 s의 마지막에 도달했지만 문자열 a의 탐색 위치가 0으로 돌아와 있지 않을 경우 문자열 a로 문자열 s를 반복할 수 없다는 뜻이 되므로 문자열 a를 s로 바꾼다.  

코드2  
----------  
``` c  
#include<stdio.h>
using namespace std;

char str[1000001];

int main() {
	while (1) {
		int n = 1, len = 1;
		scanf("%s", str);
		if (str[0] == '.') break;
		int j=0;
		for (int i = 1; str[i] != '\0'; i++) {
			while (j > 0 && str[i] != str[j]) {
				len = i;
				j = 0;	
				n = 1;
			}
			if (str[i] == str[j]) {
				j++;
				if (j == len) {	//마지막까지 다 본 경우 다시 a의 문자열 처음부터 보기
					j = 0;
					n++;
				}
			}
			else {
				len = i + 1;
				n = 1;
			}
		}
		if (j != 0) n = 1;

		printf("%d\n", n);
	}
}
```