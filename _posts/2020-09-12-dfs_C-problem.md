---
title: "11724번: 연결 요소의 개수"
excerpt: "c언어로 dfs, bfs탐색구현"

toc: true
toc_sticky: true
toc_label: "LIST"

categories:
  - C
tags:
  - queue
  - vector
  - malloc  
  - calloc  
  - realloc  
last_modified_at: 2020-09-12
---  
DFS  
---------  
이중벡터 만드는 법 참고  


**코드**  
``` c  
#include<stdio.h>
#include<stdlib.h>
#include<stdbool.h>

typedef struct {
    int value;
}Elem;

typedef struct {
    int lastOfVector;
    int vtSize;
} VecInfo;

Elem** vector;
VecInfo* vecinfo;
int n, m;
bool visit[1000];

void vectorFull(int nn) {
    vecinfo[nn].vtSize *= 2;
    vector[nn] = realloc(vector[nn], sizeof(Elem) * vecinfo[nn].vtSize);
}

void push_back(int nn, Elem em) {
    if (vecinfo[nn].lastOfVector >= vecinfo[nn].vtSize-1) vectorFull(nn);
    vector[nn][++vecinfo[nn].lastOfVector] = em;
}

//dfs
void dfs(int st) {
    visit[st] = true;
    for (int i = 0; i <= vecinfo[st].lastOfVector; i++) {
        if (visit[vector[st][i].value] == true) continue;
        visit[vector[st][i].value] = true;
        dfs(vector[st][i].value);
    }
}

int main() {
    int answer = 0;
    scanf("%d %d", &n, &m);
    vector = (Elem**)malloc(sizeof(Elem*) * n);
    vecinfo = (VecInfo*)malloc(sizeof(VecInfo) * n);
    for (int i = 0; i < n; i++) {
        vecinfo[i].lastOfVector = -1;
        vecinfo[i].vtSize = 1;
        vector[i] = (Elem*)malloc(sizeof(Elem));
    }
    while (m--) {
        int a, b;
        scanf("%d %d", &a, &b);
        push_back(a - 1, (Elem) { b - 1 });
        push_back(b - 1, (Elem) { a - 1 });
    }
    for (int i = 0; i < n; i++) {
        if (visit[i] == true) continue;
        dfs(i);
        answer++;
    }
    printf("%d", answer);
}
```  

BFS  
--------  
queue구현해 사용하기  

``` c  
#include<stdio.h>
#include<stdlib.h>
#include<stdbool.h>
//bfs

typedef struct {    //vector
    int value;
}ELEM;

typedef struct {    //vector
    int lastOfVector;
    int vtSize;
}VecInfo;

typedef struct _NODE{    //linked list
    int value;
    struct _NODE* next;
}NODE;

typedef struct {    //linked list
    NODE* head;
    NODE* tail;
    int size;
}LIST;

ELEM** vector;
VecInfo* vecinfo;
LIST* queue;
int n, m, answer = 0;
bool visit[1000];

void vectorFull(int nn) {
    vecinfo[nn].vtSize *= 2;
    vector[nn] = realloc(vector[nn], sizeof(ELEM) * vecinfo[nn].vtSize);
}

void push_back(int nn, ELEM em) {
    if (vecinfo[nn].lastOfVector >= vecinfo[nn].vtSize - 1) vectorFull(nn);
    vector[nn][++vecinfo[nn].lastOfVector] = em;
}

void init_queue() {
    queue = (LIST*)malloc(sizeof(LIST));
    queue->head = (NODE*)malloc(sizeof(NODE));
    queue->tail = (NODE*)malloc(sizeof(NODE));
    queue->size = 0;
    queue->head->next = queue->tail;
    queue->tail->next = NULL;
}

bool empty() {
    if (queue->size == 0) return true;
    return false;
}

void push(int val) {    //tail에 넣기
    NODE* tem = (NODE*)malloc(sizeof(NODE));
    tem->next = NULL;
    queue->tail->value = val;
    queue->tail->next = tem;
    queue->tail = tem;
    queue->size++;
}

int pop() {    //head 뒤에서 빼기
    int ret;
    if (empty()) return;
    NODE* tem = queue->head->next;
    ret = tem->value;
    queue->head->next = tem->next;
    free(tem);
    queue->size--;
    return ret;
}

void bfs(int st) {
    init_queue();
    push(st);
    visit[st] = true;
    while (!empty()) {
        int here = pop();
        for (int i = 0; i <= vecinfo[here].lastOfVector; i++) {
            if (visit[vector[here][i].value]) continue;
            visit[vector[here][i].value] = true;
            push(vector[here][i].value);
        }
    }
}

int main() {
    //init_vt();
    scanf("%d %d", &n, &m);
    vector = (ELEM**)malloc(sizeof(ELEM*) * n);
    vecinfo = (VecInfo*)malloc(sizeof(VecInfo) * n);
    for (int i = 0; i < n; i++) {
        vector[i] = (ELEM*)malloc(sizeof(ELEM));
        vecinfo[i].lastOfVector = -1;
        vecinfo[i].vtSize = 1;
    }
    while (m--) {
        int a, b;
        scanf("%d %d", &a, &b);
        push_back(a - 1, (ELEM) { b - 1 });
        push_back(b - 1, (ELEM) { a - 1 });
    }
    for (int i = 0; i < n; i++) {
        if (visit[i] == true) continue;
        bfs(i);
        answer++;
    }
    printf("%d", answer);
}
```  