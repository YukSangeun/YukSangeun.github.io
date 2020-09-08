---
title: "연결리스트(Linked List)"
excerpt: "c언어로 연결리스트 구현"

toc: true
toc_sticky: true
toc_label: "LIST"

categories:
  - C
  - Data Structure
tags:
  - linked list
  - queue
last_modified_at: 2020-09-08
---
연결리스트(Linked list)란?  
-----  
기차처럼 데이터들을 **한 줄로 연결**해서 저장하는 방식의 자료구조이다.  
즉, 데이터를 담고 있는 노드들이 **연결**되어 있다.  


구현 방법으로는 2가지가 존재한다.  
1. 배열  
2. **포인터**  

**배열**  
배열을 이용하는 방법은 구현이 단순하지만, 배열의 단점인 크기가 초기 설정시 정해지기 때문에 특정 크기를 넘어서 데이터를 저장하지 못한다.  
만약 배열의 크기를 넘어 저장하고자 한다면, 크기가 더 큰 배열을 만들어 옮겨주는 방법을 사용해야 한다.  


**포인터**  
배열에 비해 다소 구현하기 어려울 수 있지만, 배열의 단점인 크기 문제가 적용되지 않는다.  
포인터를 이용해 노드를 연결시켜 줄 수 있다.  
이를 이용해 다음에 queue를 만들 것이다.  


포인터를 이용한 단방향 연결리스트: Single Linked List  
--------  
연결리스트는 **노드**의 연결로 이루어진다.  
노드는 기본적으로 **데이터와 다음노드의 주소**로 구성된다.  


linked list의 첫번째 노드를 Head노드, 마지막 노드를 Tail노드라고 부르며 Tail노드는 다음노드의 주소로 NULL값을 가진다.  
이때, head와 tail은 값이 없는 노드로 맨앞과 뒤를 상징한다.  


**구현 함수**  
* void init() : list의 크기와 head, tail을 초기화  
* bool empty(): list가 빈 상태인지 여부 반환  
* void insertBack(int data): list의 tail에 노드를 추가  
* void insertFront(int data): list의 head에 노드를 추가  
* void deleteFront(): list의 head다음 노드를 제거  
* int top(): list의 head다음 노드를 반환(노드 data)  
* void clear(): list를 초기 상태로 되돌림  
* void print(): list의 크기와 모든 값을 출력 (결과 출력하기 위해 만든 것)  


단일 연결리스트를 이용해 **queue와 stack을 구현**할 수 있다.  
queue: FIFO (insertBack과 deleteFront 사용)  
stack: LIFO (insertFront와 deleteFront 사용)  


**구현**  
``` c  
#include<stdio.h>
#include<stdlib.h>
#include<stdbool.h>

//연결리스트 구현할 구조체  
//구조체 이름: _NODE, 구조체 별칭: NODE
typedef struct _NODE {
	int data;
	struct _NODE* next;
}NODE;

typedef struct _LinkedList {
	int size;
	NODE* head;	//head와 tail은 값을 나타내는 node가 아님
	NODE* tail;
} LinkedList;

void init(LinkedList* list) {
	list->size = 0;
	list->head = (NODE*)malloc(sizeof(NODE));
	list->tail = (NODE*)malloc(sizeof(NODE));
	list->head->next = list->tail;
	list->tail->next = NULL;
}

bool empty(LinkedList* list) {
	if (list->head->next == list->tail)
		return true;
	else return false;
}

void insertBack(LinkedList* list, int data) {
	NODE* node = (NODE*)malloc(sizeof(NODE));
	NODE* tem = list->tail;
	tem->data = data;
	tem->next = node;
	node->next = NULL;
	list->tail = node;

	list->size++;
}

void insertFront(LinkedList* list, int data) {
	NODE* node = (NODE*)malloc(sizeof(NODE));
	node->data = data;
	node->next = list->head->next;
	list->head->next = node;

	list->size++;
}

void deleteFront(LinkedList* list) {
	if (empty(list)) return;
	NODE* node = list->head->next;
	list->head->next = node->next;
	free(node);
	list->size--;
}

int top(LinkedList* list) {
	return list->head->next->data;
}

void clear(LinkedList* list) {
	while (list->head->next != list->tail) {
		deleteFront(list);
	}
}

void print(LinkedList* list) {
	NODE* node = list->head->next;
	printf("size: %d ==== ", list->size);
	while (node != list->tail) {
		printf("%d ", node->data);
		node = node->next;
	}
	printf("\n");
}

int main() {
	LinkedList* linkedlist = (LinkedList*)malloc(sizeof(LinkedList));
	init(linkedlist);
	print(linkedlist);
	insertFront(linkedlist, 5);
	print(linkedlist);
	insertFront(linkedlist, 10);
	print(linkedlist);
	insertBack(linkedlist, 20);
	print(linkedlist);
	insertFront(linkedlist, 35);
	print(linkedlist);
	insertBack(linkedlist, 7);
	print(linkedlist);
	while (!empty(linkedlist)) {
		deleteFront(linkedlist);
		print(linkedlist);
	}

	return 0;
}
```  

**출력**  
```  
size: 0 ====
size: 1 ==== 5
size: 2 ==== 10 5
size: 3 ==== 10 5 20
size: 4 ==== 35 10 5 20
size: 5 ==== 35 10 5 20 7
size: 4 ==== 10 5 20 7
size: 3 ==== 5 20 7
size: 2 ==== 20 7
size: 1 ==== 7
size: 0 ====  
```  


포인터를 이용한 양방향 연결리스트: Double Linked List    
--------  
양방향 연결리스트 경우 node구성에 이전노드의 주소까지 포함  


**구현 함수**  
* void init() : list의 크기와 head, tail을 초기화  
* bool empty(): list가 빈 상태인지 여부 반환  
* void insertBack(int data): list의 tail에 노드를 추가  
* void deleteFront(): list의 head다음 노드를 제거  


이를 이용해 **deque를 구현**할 수 있다.  


**구현**  
``` c  
#include<stdio.h>
#include<stdlib.h>
#include<stdbool.h>

//연결리스트 구현할 구조체  
//구조체 이름: _NODE, 구조체 별칭: NODE
typedef struct _NODE {
	int data;
	struct _NODE* next;
	struct _NODE* prev;
}NODE;

typedef struct _LinkedList {
	NODE* head;	//head와 tail은 값을 나타내는 node가 아님
	NODE* tail;
} LinkedList;

LinkedList list;

void init() {
	list.head = (NODE*)malloc(sizeof(NODE));
	list.tail = (NODE*)malloc(sizeof(NODE));
	list.head->next = list.tail;
	list.tail->prev = list.head;
	list.tail->next = NULL;
}

bool empty() {
	if (list.head->next == list.tail)
		return true;
	else return false;
}

NODE* insertBack(int data) {
	NODE* node = (NODE*)malloc(sizeof(NODE));
	node->data = data;
	node->next = list.tail;
	node->prev = list.tail->prev;
	list.tail->prev->next = node;
	list.tail->prev = node;
	return node;
}

void deleteFront() {
	if (empty()) return;
	NODE* node = list.head->next;
	list.head->next = node->next;
	node->next->prev = list.head;
	printf("%d ", node->data);
	free(node);
}

int main(){
	init();
	
	insertBack(1);
	insertBack(5);
	insertBack(10);
	insertBack(22);

	while(!empty())
		deleteFront();
	
	return 0;
}
```   


**출력**  
```  
1 5 10 22
```  
