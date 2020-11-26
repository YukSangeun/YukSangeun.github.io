---
title: "백준 4195번: 친구 네트워크"
excerpt: "union-find 알고리즘을 이용한 문제"

toc: true
toc_sticky: true
toc_label: "LIST"

categories:
  - Problem
tags:
  - UnionFind
last_modified_at: 2020-11-26
---

## 문제

민혁이는 소셜 네트워크 사이트에서 친구를 만드는 것을 좋아하는 친구이다. 우표를 모으는 취미가 있듯이, 민혁이는 소셜 네트워크 사이트에서 친구를 모으는 것이 취미이다.

어떤 사이트의 친구 관계가 생긴 순서대로 주어졌을 때, 두 사람의 친구 네트워크에 몇 명이 있는지 구하는 프로그램을 작성하시오.

친구 네트워크란 친구 관계만으로 이동할 수 있는 사이를 말한다.



> 출처
>
> <https://www.acmicpc.net/problem/4195>



## 입력

첫째 줄에 테스트 케이스의 개수가 주어진다. 각 테스트 케이스의 첫째 줄에는 친구 관계의 수 F가 주어지며, 이 값은 100,000을 넘지 않는다. 다음 F개의 줄에는 친구 관계가 생긴 순서대로 주어진다. 친구 관계는 두 사용자의 아이디로 이루어져 있으며, 알파벳 대문자 또는 소문자로만 이루어진 길이 20 이하의 문자열이다.



## 풀이

친구 관계의 수 F만큼 입력을 받으며 친구 그룹을 형성하는 문제이다.

즉, **그룹을 형성**해야 하고 **어느 그룹에 속해있는지**를 알아야 한다.



때문에 **Union-Find** 알고리즘을 사용해 문제를 해결하면 된다.



하지만, 기존 union-find 알고리즘을 사용해 문제를 해결하려고 하다보니 걸리는 부분이 있다.

바로 입력되는 값이 숫자가 아니라 문자열이라는점이다.

때문에 **map**자료구조를 이용해 입력받은 문자열을 숫자와 매칭하는 작업을 해준다.



1. map을 통한 문자열과 고유의 숫자를 매칭
2. union-find알고리즘을 수행할 경우 숫자를 이용 (set배열)

다음과 같은 방식으로 수행된다.



또 한가지. 신경써야 하는 부분은 입력 받을 때마다 같은 그룹에 몇명이 존재하는지를 출력해야 한다는 점이다.

이를 위해 매칭된 숫자로 이루어진 set배열에 group 정보가 담긴 값과 group 인원수를 담는 값을 함께 저장한다.

인원수 경우 group리더만 정확한 값이 포함되어 있다.



## 코드

``` c++
#include<iostream>
#include<string>
#include<map>
using namespace std;

typedef struct{
    int group;
    int cnt=1;
}info;

map<string, int> net;    //이름-번호 매칭
int testCase, relation;
info set[200001];	//번호 당 속한 그룹 정보 저장 / 리더 경우 cnt에 전체 그룹의 인원 수 저장됨
int peo;	//이름에 번호 붙일 때 사용

int find(int str){	//str이 속한 집합의 리더 찾기
    if(str == set[str].group){
        return str;
    }
    
    return set[str].group = find(set[str].group);
}

int union_(int a, int b){	//a와 b가 속한 그룹 합하고 그룹인원 return
    int ret=0;	//합해진 그룹의 크기
    a = find(a);
    b = find(b);
    if(a != b){
        ret = set[a].cnt + set[b].cnt;
        if(set[a].cnt > set[b].cnt){	//그룹의 크기가 던 큰 그룹에 합하기
            set[a].cnt = ret;
            set[b].group = a;
        }
        else{
            set[b].cnt = ret;
            set[a].group = b;
        }
    }
    else ret = set[a].cnt;
    return ret;
}

int main(){
    scanf("%d", &testCase);
    for(int i=0; i<testCase; i++){
        peo = 0;	//사람마다 번호 붙이기
        scanf("%d", &relation);
        while(relation--){	//a, b 두 사람의 그룹 합치고 친구 네트워크 인원 수 출력
            char a[21], b[21];
            scanf("%s %s", &a, &b);
            if(net.find(a) == net.end()) {	//처음 입력받는 사람 경우 map에 새로 생성
                set[peo] = {peo, 1};
                net.insert({a, peo++});
            }
            if(net.find(b) == net.end()){
                set[peo] = {peo, 1};
                net.insert({b, peo++});
            }
            printf("%d\n", union_(net[a], net[b]));
        }
        net.clear();
    }
}
```



